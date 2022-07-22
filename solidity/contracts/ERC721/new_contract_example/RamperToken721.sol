// contracts/ERC721/new_contract_example/RamperToken721.sol
// SPDX-License-Identifier: MIT
// This is an example showing a contract that is compatible with Ramper's NFT Checkout
// Find out more at https://www.ramper.xyz/nftcheckout

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "./IRamperInterface721.sol";

contract RamperToken721 is ERC721Enumerable, IRamperInterface721 {
    uint256 constant public MAX_TOKENS = 10000;
    uint256 constant public MAX_TOKENS_PER_TXN = 3;
    uint256 constant public MAX_TOKENS_PER_ADDRESS = 5;
    uint256 constant public TOKEN_PRICE = 0.0013 ether;

    string public baseTokenURI = "https://nfts-public.s3.amazonaws.com/rampertoken721/metadata/";

    constructor() ERC721("Ramper Sample Token 721", "RAMP") {

    }

    function availableTokens(address _userWallet) override external view returns (uint256 quantity) {
        // The example shows a 3-part limitation for users:
        // 1. a remaining-tokens limit (required)
        // 2. a per-wallet limit (optional)
        // 3. a per-transaction limit (optional)
        // Where the limit retured is the lowest of these 3

        uint256 userRemaining = MAX_TOKENS_PER_ADDRESS - balanceOf(_userWallet);
        uint256 remainingSupply = MAX_TOKENS - totalSupply();

        // Find minimum value and return
        if (MAX_TOKENS_PER_TXN < userRemaining && MAX_TOKENS_PER_TXN < remainingSupply) {
            return MAX_TOKENS_PER_TXN;
        } else if (userRemaining < remainingSupply) {
            return userRemaining;
        } else {
            return remainingSupply;
        }
    }

    function price() override external pure returns (uint256) {
        return TOKEN_PRICE;
    }

    function mint(address _userWallet, uint256 _quantity) override external payable {
        require(msg.value >= TOKEN_PRICE * _quantity, "Insufficient funds for requested tokens");
        require(this.availableTokens(msg.sender) >= _quantity, "Requested number of tokens is over limit for minting");

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

    function safeBulkTransferFrom(address _from, address _to, uint256[] memory _tokenIds) override external {
        for (uint256 i = 0; i < _tokenIds.length; i++) {
            safeTransferFrom(_from, _to, _tokenIds[i]);
        }
    }
}