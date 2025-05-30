import { createConfig, factory } from "ponder";
import { getAbiItem } from "viem";
import { UniswapV3FactoryAbi } from "./abis/UniswapV3FactoryAbi";
import { UniswapV3PoolAbi } from "./abis/UniswapV3PoolAbi";

const factoryEventAbiItem = getAbiItem({
  abi: UniswapV3FactoryAbi,
  name: "PoolCreated",
});

export default createConfig({
  chains: {
    mainnet: {
      id: 1,
      rpc: process.env.PONDER_RPC_URL_1,
    },
    base: {
      id: 8453,
      rpc: process.env.PONDER_RPC_URL_8453,
    },
  },
  contracts: {
    UniswapV3Pool: {
      abi: UniswapV3PoolAbi,
      chain: {
        mainnet: {
          address: factory({
            address: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
            event: factoryEventAbiItem,
            parameter: "pool",
            startBlock: 12369621,
          }),
          startBlock: "latest",
        },
        base: {
          address: factory({
            address: "0x33128a8fC17869897dcE68Ed026d694621f6FDfD",
            event: factoryEventAbiItem,
            parameter: "pool",
            startBlock: 1371680,
          }),
          startBlock: "latest",
        },
      },
    },
    UniswapV3Factory: {
      abi: UniswapV3FactoryAbi,
      chain: {
        mainnet: {
          address: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
          startBlock: 12369621,
        },
        base: {
          address: "0x33128a8fC17869897dcE68Ed026d694621f6FDfD",
          startBlock: 1371680,
        },
      },
    },
  },
});
