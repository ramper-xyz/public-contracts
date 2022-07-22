// contracts/ERC721/preexisting_contract_example/RamperBridge721.sol
// SPDX-License-Identifier: MIT
// This is an example showing a "bridge" contract that is compatible with Ramper's NFT Checkout
// Find out more at https://www.ramper.xyz/nftcheckout

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "./IRamperBridgeInterface721.sol";
import "./PreExistingRamperToken721.sol";

// Bridge contract that Ramper can interact with
contract RamperBridge721 is IRamperBridgeInterface721 {

    PreExistingRamperToken721 existingContract;

    constructor(PreExistingRamperToken721 existingAddress) {
        existingContract = existingAddress;
    }

    function availableTokens(address) override external view returns (uint256 quantity) {
        // The example shows a 2-part limitation for users:
        // 1. a remaining-tokens limit (required)
        // 2. a per-transaction limit (optional)
        // Where the limit retured is the lowest of these 2

        uint256 remainingSupply = existingContract.maxTokens() - existingContract.totalSupply();
        uint256 maxTokensPerTxn = existingContract.maxTokensPerTxn();

        // Find minimum value and return
        if (remainingSupply < maxTokensPerTxn) {
            return remainingSupply;
        } else {
            return maxTokensPerTxn;
        }
    }

    function price() override external view returns (uint256) {
        return existingContract.tokenPrice();
    }

    function mint(address _userWallet, uint256 _quantity) override external payable {
        existingContract.mintRamper{value:msg.value}(_userWallet, _quantity);
    }
}