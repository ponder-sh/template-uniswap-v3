import { ponder, type Context, type Event } from "ponder:registry";
import schema from "ponder:schema";

ponder.on("UniswapV3Factory:PoolCreated", async ({ event, context }) => {
  await context.db.insert(schema.pool).values({
    chainId: context.chain.id,
    address: event.args.pool,
    token0: event.args.token0,
    token1: event.args.token1,
  });
});

ponder.on("UniswapV3Pool:Swap", async ({ event, context }) => {
  await createAccounts(event, context);

  await context.db.insert(schema.swapEvent).values({
    chainId: context.chain.id,
    swapId: event.id,
    pool: event.log.address,
    sender: event.args.sender,
    recipient: event.args.recipient,
    amount0: event.args.amount0,
    amount1: event.args.amount1,
    timestamp: Number(event.block.timestamp),
  });
});

async function createAccounts(
  event: Event<"UniswapV3Pool:Swap">,
  context: Context
) {
  const sender = await context.db
    .insert(schema.account)
    .values({ address: event.args.sender })
    .onConflictDoNothing();

  const recipient = await context.db
    .insert(schema.account)
    .values({ address: event.args.sender })
    .onConflictDoNothing();

  return { sender, recipient };
}
