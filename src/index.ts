import { ponder } from "ponder:registry";
import schema from "ponder:schema";

ponder.on("UniswapV3Factory:PoolCreated", async ({ event, context }) => {
  const poolAddress = event.args.pool;
  await context.db.insert(schema.pool).values({
    chainId: context.network.chainId,
    address: poolAddress,
    token0: event.args.token0,
    token1: event.args.token1,
  });
});

ponder.on("UniswapV3Pool:Swap", async ({ event, context }) => {
  await context.db.insert(schema.swapEvent).values({
    chainId: context.network.chainId,
    id: event.log.id,
    pool: event.log.address,
    amount0: event.args.amount0,
    amount1: event.args.amount1,
  });
});
