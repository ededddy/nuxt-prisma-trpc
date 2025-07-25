import { defineEventHandler } from 'h3';
import prisma from '~/lib/prisma';

export default defineEventHandler(async () => {
  const user = await prisma.user.findUnique({
    where: { email: 'test@example.com' },
    select: { id: true, email: true, password: true },
  });

  return user;
});