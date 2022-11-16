import { config as dotenvConfig } from 'dotenv';
dotenvConfig();
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-etherscan';
import '@typechain/hardhat';
import 'hardhat-deploy';
import 'hardhat-gas-reporter';
import 'solidity-coverage';
import './tasks';

const testMnemonic = {
  mnemonic: 'test test test test test test test test test test test junk',
  path: "m/44'/60'/0'/0",
  initialIndex: 0,
  count: 20,
  passphrase: '',
};
const accounts = process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : testMnemonic;
if (!process.env.PRIVATE_KEY) {
  console.log('Warning: Private key env is undefined test key !!!!!!!!!!!!!');
}

export default {
  paths: {
    sources: './contracts',
    cache: './cache',
    artifacts: './build',
    tests: './tests',
  },
  defaultNetwork: 'hardhat',
  solidity: {
    compilers: [
      {
        version: '0.8.16',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  networks: {
    hardhat: {
      chainId: 1337,
      accounts: testMnemonic,
      allowUnlimitedContractSize: false,
    },
    goerli: {
      chainId: 5,
      url: `https://goerli.infura.io/v3/${process.env.WEB3_INFURA_PROJECT_ID}`,
      accounts: accounts,
    },
    mainnet: {
      chainId: 1,
      url: `https://mainnet.infura.io/v3/${process.env.WEB3_INFURA_PROJECT_ID}`,
      accounts: accounts,
    },
  },
  namedAccounts: {
    deployer: 0,
  },
  gasReporter: {
    enabled: true,
    showTimeSpent: true,
    token: 'ETH',
    gasPriceApi: 'https://api.etherscan.io/api?module=proxy&action=eth_gasPrice',
    currency: 'USD',
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  typechain: {
    outDir: 'build/typechain',
    target: 'ethers-v5',
    alwaysGenerateOverloads: false,
    externalArtifacts: ['externalArtifacts/*.json'],
  },
};
