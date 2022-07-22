// contracts/ERC721/preexisting_contract_example/PreExistingRamperToken721.sol
// SPDX-License-Identifier: MIT
// This is an example showing a pre-existing contract that is called 
//       by the "bridge" contract in this folder
// Find out more at https://www.ramper.xyz/nftcheckout

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract PreExistingRamperToken721 is ERC721Enumerable {
    uint256 constant public maxTokens = 10000;
    uint256 constant public maxTokensPerTxn = 3;
    uint256 constant public tokenPrice = 0.0013 ether;
    string test;

    string public baseTokenURI = "https://nfts-public.s3.amazonaws.com/rampertoken721/metadata/";

    constructor() ERC721("Ramper Sample Token 721", "RAMP") {

    }

    function mintRamper(address _userWallet, uint256 _quantity) external payable {
        require(msg.value >= tokenPrice * _quantity, "Insufficient funds for requested tokens");
        require(totalSupply() +  _quantity <= maxTokensPerTxn, "Requested number of tokens is over limit for minting");
        require(_quantity <= maxTokensPerTxn, "Requested number of tokens is over limit for minting");

        uint256 tokenStart = totalSupply();

        for(uint256 i=0; i < _quantity; i++) {
            uint256 _tokenId = tokenStart + i;
            _safeMint(_userWallet, _tokenId);
        }
    }

    // ERC721Metadata
    function _baseURI() override internal view virtual returns (string memory) {
        return baseTokenURI;
    }

    function settest(string memory newval) external {
        test = newval;
    }

    function gettest() external view returns (string memory) {
        return test;
    }
}