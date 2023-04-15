// SPDX-License-Identifier: MIT

pragma solidity ^0.8.12;

import "../interfaces/ILensHub.sol";

import {ByteHasher} from "../helpers/ByteHasher.sol";
import {IWorldID} from "../interfaces/IWorldID.sol";

import "sismo-connect-solidity/SismoLib.sol";

contract Lens is SismoConnect {

    //lens
    ILensHub lensHub;
    address collectModule;
    uint256 handleTokenId;

    //worldcoin
    IWorldID internal immutable worldId;
    error InvalidProof();
    using ByteHasher for bytes;

    /// @dev The contract's external nullifier hash
    uint256 internal immutable externalNullifier;

    /// @dev The World ID group ID (always 1)
    uint256 internal immutable groupId = 1;

    /// @dev Whether a nullifier hash has been used already. Used to guarantee an action is only performed once by a single person
    mapping(uint256 => bool) internal worldcoinNullifierHashes;

    // sismo
    using SismoConnectHelper for SismoConnectVerifiedResult;
    ClaimRequest claim;
    mapping(uint256 => bool) internal sismoNullifierHashes;
    
    constructor (
        bytes16 _sismoAppId, 
        bytes16 _sismoGroupId, 
        address _lensHub,
        address _collectModule,
        IWorldID _worldId,
        string memory _appId,
        string memory _actionId
        ) SismoConnect(_sismoAppId) {

        lensHub = ILensHub(_lensHub);
        collectModule = _collectModule;

        worldId = _worldId;
        externalNullifier = abi
            .encodePacked(abi.encodePacked(_appId).hashToField(), _actionId)
            .hashToField();

        claim = buildClaim({groupId: _sismoGroupId});
    }

    /// @dev Used to set the handle token id after transfering it to the contract, must be used before posting
    function setHandleTokenId() external {
        handleTokenId = ILensHub(lensHub).tokenOfOwnerByIndex(address(this), 0);
    }

    function checkWorldcoinProof(
        address worldcoinSignal,
        uint256 worldcoinRoot,
        uint256 worldcoinNullifierHash,
        uint256[8] calldata worldcoinProof
    ) internal returns (bool) {
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


    function post(
        string memory postContent, 
        bytes memory sismoConnectResponse,
        address worldcoinSignal,
        uint256 worldcoinRoot,
        uint256 worldCoinNullifierHash,
        uint256[8] calldata worldcoinProof
        ) external {
        
        require(checkWorldcoinProof(worldcoinSignal, worldcoinRoot, worldCoinNullifierHash, worldcoinProof));
        require(checkSismoProof(sismoConnectResponse));
        
        if (handleTokenId == 0) {
            revert("Lens profile hasn't been defined");
        }
        
        ILensHub.PostData memory data = ILensHub.PostData({
            profileId: handleTokenId,
            contentURI: postContent, // TODO: add IPFS hash
            collectModule: collectModule,
            collectModuleInitData: abi.encode(false),
            referenceModule: address(0),
            referenceModuleInitData: ""
        });

        lensHub.post(data);
    }
}