# Ponder Template: Uniswap V3

This repository is a template for a Ponder project that indexes Uniswap V3 on Ethereum and Base.

## Setup

1. Install dependencies

```bash
pnpm install
```

2. Add environment variables (RPC endpoints)

Create a file named `.env.local` and add an RPC endpoint for Ethereum and Base.

```bash
PONDER_RPC_URL_1=
PONDER_RPC_URL_8453=
```

3. Start the dev server

```bash
pnpm dev
```

## Indexing logic

The `ponder.config.ts` file registers two contracts:

- `UniswapV3Pool` - Uses a factory address configuration to index Swap events emitted by any Uniswap V3 pool, starting from the latest block.
- `UniswapV3Factory` - Indexes `PoolCreated` events emitted by the factory contract and runs pool initialization logic, starting from the factory deployment block number.
