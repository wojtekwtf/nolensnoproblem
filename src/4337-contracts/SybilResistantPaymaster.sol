// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.12;

/* solhint-disable reason-string */
/* solhint-disable no-inline-assembly */

import "./core/BasePaymaster.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

import "sismo-connect-solidity/SismoLib.sol";
import {ByteHasher} from "./helpers/ByteHasher.sol";
import {IWorldID} from "./interfaces/IWorldID.sol";

/**
 * A sybil resistant paymaster that uses worldcoin or sismo to decide whether to pay for the UserOp.
 * The paymaster verifies proofs on-chain to decide whether to pay for the UserOp.
 */
contract SybilResistantPaymaster is BasePaymaster, SismoConnect {

    /**
     * BasePaymaster definitions
     */
    using UserOperationLib for UserOperation;
    uint256 private constant VALID_TIMESTAMP_OFFSET = 20;
    uint256 private constant SIGNATURE_OFFSET = 84;
    mapping(address => uint256) public senderNonce;


    /**
     * Worldcoin definitions
     */
    IWorldID internal immutable worldId;
    error InvalidProof();
    using ByteHasher for bytes;
    /// @dev The contract's external nullifier hash
    uint256 internal immutable externalNullifier;
    /// @dev The World ID group ID (always 1)
    uint256 internal immutable groupId = 1;
    /// @dev Whether a nullifier hash has been used already. Used to guarantee an action is only performed once by a single person
    mapping(uint256 => bool) internal worldcoinNullifierHashes;


    /**
     * Sismo definitions
     */
    using SismoConnectHelper for SismoConnectVerifiedResult;
    ClaimRequest claim;
    mapping(uint256 => bool) internal sismoNullifierHashes;


    constructor(
        IEntryPoint _entryPoint,
        bytes16 _sismoAppId, 
        bytes16 _sismoGroupId,
        IWorldID _worldId,
        string memory _appId,
        string memory _actionId
        ) BasePaymaster(_entryPoint) SismoConnect(_sismoAppId) {
            worldId = _worldId;
            externalNullifier = abi
                .encodePacked(abi.encodePacked(_appId).hashToField(), _actionId)
                .hashToField();

            claim = buildClaim({groupId: _sismoGroupId});
        }



    function checkSismoProof(bytes memory sismoConnectResponse) internal returns (bool){
        SismoConnectVerifiedResult memory result = verify({
            responseBytes: sismoConnectResponse,
            claim: claim,
            auth: buildAuth({authType: AuthType.VAULT})
        });

        uint256 user = result.getUserId(AuthType.VAULT);

        if (sismoNullifierHashes[user] == true) {
            return false;
        }
        sismoNullifierHashes[user] = true;
        return true;
    }


    function checkWorldcoinProof(bytes memory worldcoinResponse) internal returns (bool) {
        (
            address worldcoinSignal, 
            uint256 worldcoinRoot,
            uint256 worldcoinNullifierHash,
            uint256[8] memory worldcoinProof
        ) = abi.decode(worldcoinResponse, (address, uint256, uint256, uint256[8]));

        if (worldcoinNullifierHashes[worldcoinNullifierHash]) revert InvalidProof();

        

        worldId.verifyProof(
            worldcoinRoot,
            groupId,
            abi.encodePacked(worldcoinSignal).hashToField(),
            worldcoinNullifierHash,
            externalNullifier,
            worldcoinProof
        );

        worldcoinNullifierHashes[worldcoinNullifierHash] = true;
        return true;
    }


    /**
     * verify our external signer signed this request.
     * the "paymasterAndData" is expected to be the paymaster and a signature over the entire request params
     * paymasterAndData[:20] : address(this)
     * paymasterAndData[20:84] : abi.encode(validUntil, validAfter)
     * paymasterAndData[84:] : abi.encode(sismoBytes, worldcoinBytes)
     */
    function _validatePaymasterUserOp(UserOperation calldata userOp, bytes32 userOpHash, uint256 requiredPreFund)
    internal override returns (bytes memory context, uint256 validationData) {
        (requiredPreFund);

        (
            uint48 validUntil,
            uint48 validAfter,
            bytes memory sismoConnectResponse,
            bytes memory worldcoinResponse
            ) = parsePaymasterAndData(userOp.paymasterAndData);

            
        
        if (sismoConnectResponse.length != 0){
            require(checkSismoProof(sismoConnectResponse) == true);
        } else if (worldcoinResponse.length != 0){
            // TODO check worldcoin response
            require(checkWorldcoinProof(worldcoinResponse) == true);
        } else {
            revert("No proof provided");
        }

        // After checking the proof, we can return the validation data
        return ("",_packValidationData(false,validUntil,validAfter));
    }


    function parsePaymasterAndData(bytes calldata paymasterAndData) public pure returns(
            uint48 validUntil, 
            uint48 validAfter, 
            bytes memory sismoConnectResponse, 
            bytes memory worldcoinResponse
        ) {
        (validUntil, validAfter) = abi.decode(paymasterAndData[VALID_TIMESTAMP_OFFSET:SIGNATURE_OFFSET],(uint48, uint48));

        (sismoConnectResponse, worldcoinResponse) = abi.decode(paymasterAndData[SIGNATURE_OFFSET:],(bytes, bytes));

        return (validUntil, validAfter, sismoConnectResponse, worldcoinResponse);
    }
}

