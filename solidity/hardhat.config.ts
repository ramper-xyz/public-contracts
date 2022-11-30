import * as dotenv from "dotenv";

import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "@nomiclabs/hardhat-ethers";

dotenv.config();
require("@nomiclabs/hardhat-etherscan");

const config: HardhatUserConfig = {
  solidity: "0.8.4",
  networks: {
    goerli: {
      url: process.env.ALCHEMY_GOERLI,
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    mumbai: {
      url: process.env.ALCHEMY_MUMBAI,
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    polygon: {
      url: process.env.ALCHEMY_POLYGON,
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: {
      goerli: process.env.ETHERSCAN_API_KEY!,
      polygonMumbai: process.env.POLYGONSCAN_API_KEY!,
      polygon: process.env.POLYGONSCAN_API_KEY!,
    },
  },
};

export default config;
