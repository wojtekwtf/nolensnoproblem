// SPDX-License-Identifier: MIT

pragma solidity ^0.8.12;

import "../interfaces/ILensHub.sol";


contract Lens {

    ILensHub lensHub;
    address collectModule;
    uint256 handleTokenId;
    
    constructor (address _lensHub, address _collectModule) {
        lensHub = ILensHub(_lensHub);
        collectModule = _collectModule;
    }

    function setHandleTokenId() external {
        handleTokenId = ILensHub(lensHub).tokenOfOwnerByIndex(address(this), 0);
    }

    function post(string memory postContent) external {
        
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