import { initTRPC } from "@trpc/server";
import prisma from "@/lib/prisma";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createTRPCContext = async (_opts: any) => {
  return { prisma: prisma };
};

export type PrismaContext = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<PrismaContext>().create();

export const baseProcedure = t.procedure;
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
