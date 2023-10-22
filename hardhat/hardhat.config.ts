import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const dotenv = require("dotenv");
dotenv.config();
const { SEPOLIA_PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: `https://sepolia-rpc.scroll.io/` || "",
      accounts: [SEPOLIA_PRIVATE_KEY]
    },
    mantle: {
      url: `https://rpc.testnet.mantle.xyz` || "",
      accounts: [SEPOLIA_PRIVATE_KEY]
    }
  }
  
};

export default config;
