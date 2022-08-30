import '@nomiclabs/hardhat-etherscan';
import '@nomiclabs/hardhat-waffle';
import '@typechain/hardhat';
import {config as dotenvConfig} from 'dotenv';
import 'hardhat-gas-reporter';
import {HardhatUserConfig} from 'hardhat/config';
import {NetworkUserConfig} from 'hardhat/types';
import {resolve} from 'path';
import 'solidity-coverage';

import './deploy/001_deploy_counter';

dotenvConfig({path: resolve(__dirname, './.env')});

// Ensure that we have all the environment variables we need.
const mnemonic: string | undefined = process.env.MNEMONIC;
if (!mnemonic) {
  throw new Error('Please set your MNEMONIC in a .env file');
}

const infuraApiKey: string | undefined = process.env.INFURA_API_KEY;
// if (!infuraApiKey) {
//   throw new Error("Please set your INFURA_API_KEY in a .env file");
// }

const privateKey: string | undefined = process.env.PRIVATE_KEY;
// if (!privateKey) {
//   throw new Error("Please set your PRIVATE_KEY in a .env file");
// }

const chainIds = {
  'arbitrum-mainnet': 42161,
  avalanche: 43114,
  fuji: 43113,
  bsc: 56,
  hardhat: 31337,
  mainnet: 1,
  'optimism-mainnet': 10,
  'polygon-mainnet': 137,
  'polygon-mumbai': 80001,
  rinkeby: 4,
};

const FORK_FUJI = false;
const FORK_MAINNET = false;
const forkingData = FORK_FUJI
  ? {
      url: 'https://api.avax-test.network/ext/bc/C/rpc',
      enabled: true,
    }
  : FORK_MAINNET
  ? {
      url: 'https://api.avax.network/ext/bc/C/rpc',
      enabled: true,
    }
  : undefined;

function getChainConfig(chain: keyof typeof chainIds): NetworkUserConfig {
  let jsonRpcUrl: string;
  switch (chain) {
    case 'avalanche':
      jsonRpcUrl = 'https://api.avax.network/ext/bc/C/rpc';
      break;
    case 'bsc':
      jsonRpcUrl = 'https://bsc-dataseed1.binance.org';
      break;
    case 'fuji':
      jsonRpcUrl = 'https://api.avax-test.network/ext/bc/C/rpc';
      break;
    default:
      jsonRpcUrl = 'https://' + chain + '.infura.io/v3/' + infuraApiKey;
  }
  return {
    accounts: {
      count: 10,
      mnemonic,
      path: "m/44'/60'/0'/0",
    },
    chainId: chainIds[chain],
    url: jsonRpcUrl,
  };
}

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  gasReporter: {
    currency: 'USD',
    enabled: process.env.REPORT_GAS ? true : false,
    excludeContracts: [],
    src: './src',
  },
  networks: {
    hardhat: {
      accounts: [
        {
          privateKey: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbba', // owner (admin)
          balance: '1000000000000000000', // 1 ETH
        },
      ],
      gasPrice: 'auto',
      chainId: !forkingData ? 43112 : chainIds.hardhat, //Only specify a chainId if we are not forking
      forking: forkingData,
    },
    arbitrum: getChainConfig('arbitrum-mainnet'),
    avalanche: getChainConfig('avalanche'),
    fuji: getChainConfig('fuji'),
    bsc: getChainConfig('bsc'),
    mainnet: getChainConfig('mainnet'),
    optimism: getChainConfig('optimism-mainnet'),
    'polygon-mainnet': getChainConfig('polygon-mainnet'),
    'polygon-mumbai': getChainConfig('polygon-mumbai'),
    rinkeby: getChainConfig('rinkeby'),
  },
  paths: {
    artifacts: './artifacts',
    cache: './cache',
    sources: './src',
    tests: './test',
  },
  solidity: {
    version: '0.8.13',
    settings: {
      metadata: {
        // Not including the metadata hash
        // https://github.com/paulrberg/solidity-template/issues/31
        bytecodeHash: 'none',
      },
      // Disable the optimizer when debugging
      // https://hardhat.org/hardhat-network/#solidity-optimizer-support
      optimizer: {
        enabled: true,
        runs: 800,
      },
    },
  },
  typechain: {
    outDir: 'typechain',
    target: 'ethers-v5',
  },
};

export default config;
