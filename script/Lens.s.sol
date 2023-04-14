// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/lens-contracts/core/Lens.sol";

contract CounterScript is Script {

    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        Lens lens = new Lens(address(0x60Ae865ee4C725cd04353b5AAb364553f56ceF82), address(0x0BE6bD7092ee83D44a6eC1D949626FeE48caB30c) );

        vm.stopBroadcast();
    }
}
