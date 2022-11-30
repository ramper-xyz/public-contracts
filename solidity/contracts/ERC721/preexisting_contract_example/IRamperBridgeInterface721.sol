// SPDX-License-Identifier: MIT
// Ramper (contracts/ERC721/preexisting_contract_example/IRamperBridgeInterface721.sol)
// This Interface should be implemented to be compatible with Ramper's NFT Checkout
// Find out more at https://www.ramper.xyz/nftcheckout

// PLEASE NOTE: Ramper will need to approve this contract to manage tokens. Please reach out to support for more information.

pragma solidity ^0.8.0;

interface IRamperBridgeInterface721 {
    /// @notice Gets the number of tokens the specified wallet is able to purchase currently.
    ///
    /// @param _userWallet The wallet address to check available tokens for
    /// @return quantity Number of tokens this wallet can purchase currently
    function availableTokens(address _userWallet) external view returns (uint256 quantity);


    /// @notice Gets the price of a single NFT in Wei
    ///
    /// @return uint256 The price of a single NFT in Wei
    function price() external view returns (uint256);


    /// @notice Mint function that mints the NFT
    ///
    /// @param _userWallet The wallet to mint the NFT into
    /// @param _quantity The number of NFTs to be purchased
    function mint(address _userWallet, uint256 _quantity) external payable;

    /// @notice Helper Transfer function to allow multiple tokens to be transferred at once
    /// @dev Please note: This contract MUST check that the _from matches the sender
    ///
    /// @param _from The wallet to transfer tokens from
    /// @param _to The wallet to transfer tokens to
    /// @param _tokenIds An array of tokenIds to be transferred
    function safeBulkTransferFrom(address _from, address _to, uint256[] memory _tokenIds) external;
}
