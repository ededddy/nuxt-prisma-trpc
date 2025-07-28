import { initTRPC, TRPCError } from "@trpc/server";
import prisma from "@/lib/prisma";
import { auth } from "@/server/auth";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createTRPCContext = async (opts: { headers: Headers }) => {
  const authSession = await auth.api.getSession({
    headers: opts.headers,
  });

  const source = opts.headers.get("x-trpc-source") ?? "unknown";
  console.log(">>> tRPC Request from", source, "by", authSession?.user.email);

  return {
    prisma,
    user: authSession?.user,
  };
};

export type PrismaContext = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<PrismaContext>().create();

export const baseProcedure = t.procedure;
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.user?.id) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to access this resource.",
    });
  }
  return next({
    ctx: {
      user: ctx.user,
    },
  });
});
