### NFT Checkout - Example Contracts + Interfaces

These folders show examples of contract that are compatible with Ramper's NFT Checkout product.
More detail is available at https://ramper.xyz/nftcheckout

### Types of contracts

We support 2 common NFT contracts:

- ERC721: this contract is commonly used for "candy-machine" style NFT drops, where a user purchases an token and is given a random or unknown token. Support for "vending-machine" style drops is planned.

- ERC1155: this contract is commonly used for "vending-machine" style drops, where a user is purchasing a specific token ID. Often the supply of a given token ID is >0 and limited to some number

### New vs. Pre-existing

In the examples you will find 2 scenarios: new contracts and pre-existing.

- New contracts (or upgradable) can implement the Ramper Interface as given, so you only need to deploy a single contract.

- Pre-existing contracts require a "Bridge" contract that Ramper can call -- this ensures that Ramper can call a consistent function on the contracts, which is interpreted in the bridge and adapted to your pre-existing contract's functions and logic.

### Support

For support please reach out via one of the channels listed here: https://www.ramper.xyz/#talktous