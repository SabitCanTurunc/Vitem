// @ts-nocheck
import { createRouter, publicQuery } from "./middleware";
import { productRouter } from "./productRouter";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  product: productRouter,
});

export type AppRouter = typeof appRouter;
