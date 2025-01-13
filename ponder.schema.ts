import { onchainTable, primaryKey } from "ponder";

export const pool = onchainTable(
  "pool",
  (t) => ({
    chainId: t.integer().notNull(),
    address: t.hex().notNull(),
    token0: t.hex().notNull(),
    token1: t.hex().notNull(),
  }),
  (t) => ({
    primaryKey: primaryKey({ columns: [t.address, t.chainId] }),
  })
);

export const swapEvent = onchainTable(
  "swap_event",
  (t) => ({
    chainId: t.integer(),
    id: t.text().notNull(),
    pool: t.hex().notNull(),
    amount0: t.bigint().notNull(),
    amount1: t.bigint().notNull(),
  }),
  (t) => ({
    primaryKey: primaryKey({ columns: [t.chainId, t.id] }),
  })
);
