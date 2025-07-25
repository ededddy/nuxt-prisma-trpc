import { createTRPCNuxtHandler } from "trpc-nuxt/server";
import { createTRPCContext } from "~/server/trpc/init";
import { appRouter } from "~/server/trpc/routers";
import { betterAuth } from "better-auth";

const auth = betterAuth({
  // Add your auth configuration here
});

import type { IncomingMessage, ServerResponse } from 'http';

export default createTRPCNuxtHandler({
  router: appRouter,
  createContext: createTRPCContext
});