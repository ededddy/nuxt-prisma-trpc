import { createTRPCRouter } from "~/server/trpc/init";
import usersRouter from "~/server/trpc/routers/users";

export const appRouter = createTRPCRouter({
  users: usersRouter,
});

export type AppRouter = typeof appRouter;
