// SPDX-License-Identifier: MIT
// Ramper (contracts/ERC1155/new_contract_example/IRamperInterface1155.sol)
// This Interface should be implemented to be compatible with Ramper's NFT Checkout
// Find out more at https://www.ramper.xyz/nftcheckout

pragma solidity ^0.8.0;

interface IRamperInterface1155 {
    /// @notice Gets the number of tokens the specified wallet is able to purchase currently.
    ///
    /// @param _userWallet The wallet address to check available tokens for
    /// @param _tokenId The ID of the token to check availability
    /// @return quantity Number of tokens this wallet can purchase currently
    function availableTokens(address _userWallet, uint256 _tokenId) external view returns (uint256 quantity);


    /// @notice Gets the price of a single NFT in Wei
    ///
    /// @param _tokenId The ID of the token to check price of
    /// @return uint256 The price of a single NFT in Wei
    function price(uint256 _tokenId) external view returns (uint256);


    /// @notice Mint function that mints the NFT
    ///
    /// @param _userWallet The wallet to mint the NFT into
    /// @param _quantity The number of NFTs to be minted
    /// @param _tokenId The ID of the token to mint
    function mint(address _userWallet, uint256 _quantity, uint256 _tokenId) external payable;
}
