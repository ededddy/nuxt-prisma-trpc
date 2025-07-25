import { betterAuth } from 'better-auth';
import bcrypt from 'bcrypt';
import prisma from '~/lib/prisma';

export default betterAuth({
  providers: [
    {
      id: 'email',
      authorize: async ({ email, password }: { email: string; password: string }) => {
        const user = await prisma.user.findUnique({ where: { email }, select: { id: true, email: true, password: true } });
        if (user && bcrypt.compareSync(password, user.password)) {
          return { id: user.id, email: user.email };
        }
        return null;
      },
    },
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
});