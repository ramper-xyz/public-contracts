# Ramper Solidity Contracts

This folder contains code for deploying Solidity contracts on the EVM (Current support for Ethereum and Polygon)

Check out the different contracts under `contracts/`, following the README file located in that folder.

### Basic Setup

Run `npm install` to install all the required packages

### Environment Variables
To use this repo, you'll need to make a copy of the .env.example file (e.g. a new file called `.env`), and fill in the various variables.

- Etherscan and Polygon Scan API keys can be obtained by setting up new accounts on the respective websites
    > https://docs.etherscan.io/
    > https://docs.polygonscan.com/
- Create an Alchemy account for yourself (if you don't have one) and create a new "App" for any applicable networks you want to use
    > https://dashboard.alchemyapi.io/
- Export your private key from e.g. Metamask
    > https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-export-an-account-s-private-key

### Running tests

To Run tests:
`npx hardhat node` // Start a local node if you don't have one running already
`npx truffle test` // Run tests

### Deploying sample contracts

Once you compile the contracts using `npx hardhat compile`, you can deploy any of the contracts with scripts. For example:

`npx hardhat run --network goerli deploy-scripts/ERC721/new_contract_example/deploy_rampertoken721.ts`

### Support

For support please reach out via one of the channels listed here: https://www.ramper.xyz/#talktous
