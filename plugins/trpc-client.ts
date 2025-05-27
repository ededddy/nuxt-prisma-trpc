import type { AppRouter } from "~/server/trpc/routers";
import { createTRPCNuxtClient } from "trpc-nuxt/client";
import { httpBatchLink, loggerLink } from "@trpc/client";

export default defineNuxtPlugin(() => {
  const trpc = createTRPCNuxtClient<AppRouter>({
    links: [
      loggerLink({
        enabled: (opts) =>
          (process.env.NODE_ENV === "development" &&
            typeof window !== "undefined") ||
          (opts.direction === "down" && opts.result instanceof Error),
      }),
      httpBatchLink({ url: `${process.env.URL ?? ""}/api/trpc` }),
    ],
  });
  return { provide: { trpc } };
});
