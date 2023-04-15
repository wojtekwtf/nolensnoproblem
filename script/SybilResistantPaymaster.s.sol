// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.12;

import "forge-std/Script.sol";
import "../src/account-contracts/SybilResistantPaymaster.sol";

contract WorldID is IWorldID {
    function verifyProof(
        uint256,
        uint256,
        uint256,
        uint256,
        uint256,
        uint256[8] calldata
    ) external view override {
        // do nothing
    }
}

contract SybilResistantPaymasterScript is Script {

    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);


        SybilResistantPaymaster paymaster = new SybilResistantPaymaster({
            _sismoAppId: bytes16(0xd1ed6346b89bedcde994a68052a76579),
            _sismoGroupId:bytes16(0x1fee7d55244f5069b773599d5f1286a1),
            _entryPoint: IEntryPoint(address(0x0576a174D229E3cFA37253523E645A78A0C91B57)),
            _worldId: new WorldID(),
            _appId: "",
            _actionId: ""

        });

        vm.stopBroadcast();

    }
}
