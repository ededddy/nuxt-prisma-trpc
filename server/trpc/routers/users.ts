import { z } from "zod/v4";
import {
  baseProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "~/server/trpc/init";

const userRouter = createTRPCRouter({
  first: baseProcedure.query(async ({ ctx }) => {
    try {
      const user = await ctx.prisma.user.findFirst();
      return { user };
    } catch (e) {
      console.error(e);
    }
  }),
  findByEmail: protectedProcedure
    .input(
      z.object({
        email: z.string().email(),
      }),
    )
    .query(async ({ input, ctx }) => {
      try {
        const user = await ctx.prisma.user.findFirst({
          where: {
            email: input.email,
          },
        });
        return { user };
      } catch (e) {
        console.error(e);
      }
    }),
});

export default userRouter;
