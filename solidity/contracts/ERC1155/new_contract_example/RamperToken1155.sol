// contracts/ERC1155/new_contract_example/RamperToken1155.sol
// SPDX-License-Identifier: MIT
// This is an example showing a contract that is compatible with Ramper's NFT Checkout
// Find out more at https://www.ramper.xyz/nftcheckout

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "./IRamperInterface1155.sol";

contract RamperToken1155 is ERC1155, IRamperInterface1155 {

    struct TokenInfo {
        string name;
        uint256 available_quantity;
        uint256 price;
        bool exists;
    }
    mapping(uint256 => TokenInfo) public tokenIdToInfo;
    uint256 constant public MAX_TOKENS_PER_TXN = 10;

    string public baseTokenURI = "https://nfts-public.s3.amazonaws.com/rampertoken1155/metadata/{id}.json";

    constructor() ERC1155(baseTokenURI) {
        // Fill in specific token information
        tokenIdToInfo[0] = TokenInfo(
            "Basic Avatar",
            10000,
            0.0013 ether,
            true
        );
        tokenIdToInfo[1] = TokenInfo(
            "Rare Avatar",
            15,
            0.0019 ether,
            true
        );
        tokenIdToInfo[2] = TokenInfo(
            "Basic Armor",
            10000,
            0.0013 ether,
            true
        );
        tokenIdToInfo[3] = TokenInfo(
            "Rare Armor",
            15,
            0.0019 ether,
            true
        );
    }

    function tokenExists(uint256 _tokenId) private view returns (bool exists) {
        return tokenIdToInfo[_tokenId].exists;
    }

    function availableTokens(address, uint256 _tokenId) override external view returns (uint256 quantity) {
        // The example shows a 2-part limitation for users:
        // 1. a remaining-tokens limit (required)
        // 2. a per-transaction limit (optional)
        // Where the limit retured is the lowest of these 2
        // _userWallet is not used here, but included for compatibility with Ramper
        require(tokenExists(_tokenId), "Token does not exist");
        if (tokenIdToInfo[_tokenId].available_quantity < MAX_TOKENS_PER_TXN) {
            return tokenIdToInfo[_tokenId].available_quantity;
        }
        return MAX_TOKENS_PER_TXN;
    }

    function price(uint256 _tokenId) override external view returns (uint256) {
        require(tokenExists(_tokenId), "Token does not exist");
        return tokenIdToInfo[_tokenId].price;
    }

    function mint(address _userWallet, uint256 _quantity, uint256 _tokenId) override external payable {
        require(tokenExists(_tokenId), "Token does not exist");
        require(msg.value >= tokenIdToInfo[_tokenId].price * _quantity, "Insufficient funds for requested tokens");
        require(this.availableTokens(msg.sender, _tokenId) >= _quantity, "Requested number of tokens is over limit for minting");
        // Debit from the available quantity
        tokenIdToInfo[_tokenId].available_quantity -= _quantity;
        _mint(_userWallet, _tokenId, _quantity, "");
    }
}