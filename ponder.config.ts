import { createConfig, factory } from "ponder";
import { http, getAbiItem, createPublicClient } from "viem";

import { UniswapV3FactoryAbi } from "./abis/UniswapV3FactoryAbi";
import { UniswapV3PoolAbi } from "./abis/UniswapV3PoolAbi";

const mainnetClient = createPublicClient({
  transport: http(process.env.PONDER_RPC_URL_1),
});
const mainnetLatestBlock = await mainnetClient.getBlockNumber();
const mainnetStartBlock = Number(mainnetLatestBlock) - 1000;

const baseClient = createPublicClient({
  transport: http(process.env.PONDER_RPC_URL_8453),
});
const baseLatestBlock = await baseClient.getBlockNumber();
const baseStartBlock = Number(baseLatestBlock) - 1000;

export default createConfig({
  networks: {
    mainnet: {
      chainId: 1,
      transport: http(process.env.PONDER_RPC_URL_1),
    },
    base: {
      chainId: 8453,
      transport: http(process.env.PONDER_RPC_URL_8453),
    },
  },
  contracts: {
    UniswapV3Factory: {
      abi: UniswapV3FactoryAbi,
      network: {
        mainnet: {
          address: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
          startBlock: mainnetStartBlock,
        },
        base: {
          address: "0x33128a8fC17869897dcE68Ed026d694621f6FDfD",
          startBlock: baseStartBlock,
        },
      },
    },
    UniswapV3Pool: {
      abi: UniswapV3PoolAbi,
      network: {
        mainnet: {
          address: factory({
            address: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
            event: getAbiItem({
              abi: UniswapV3FactoryAbi,
              name: "PoolCreated",
            }),
            parameter: "pool",
          }),
          startBlock: mainnetStartBlock,
        },
        base: {
          address: factory({
            address: "0x33128a8fC17869897dcE68Ed026d694621f6FDfD",
            event: getAbiItem({
              abi: UniswapV3FactoryAbi,
              name: "PoolCreated",
            }),
            parameter: "pool",
          }),
          startBlock: baseStartBlock,
        },
      },
    },
  },
});
