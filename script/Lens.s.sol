// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.12;

import "forge-std/Script.sol";
import "../src/lens-contracts/core/Lens.sol";

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

contract LensScript is Script {

    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        Lens lens = new Lens({
            _sismoAppId: bytes16(0xd1ed6346b89bedcde994a68052a76579),
            _sismoGroupId:bytes16(0x1fee7d55244f5069b773599d5f1286a1),
            _lensHub: address(0x60Ae865ee4C725cd04353b5AAb364553f56ceF82),
            _collectModule: address(0x0BE6bD7092ee83D44a6eC1D949626FeE48caB30c),
            _worldId: new WorldID(),
            _appId: "",
            _actionId: ""
        });

        vm.stopBroadcast();

    }
}
