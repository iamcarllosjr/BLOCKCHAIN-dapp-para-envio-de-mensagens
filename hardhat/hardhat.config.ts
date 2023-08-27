import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

const { ALCHEMY_API_KEY, METAMASK_PRIVATE_KEY, API_POLYGONSCAN } = process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.7",
  networks: {
    mumbai: {
      url: ALCHEMY_API_KEY,
      accounts: [`0x${METAMASK_PRIVATE_KEY}`],
    },
  },
  etherscan: {
    // Your API key for PolygonScan or Etherscan
    // For cerify contract
    apiKey: API_POLYGONSCAN,
  },
};

export default config;
