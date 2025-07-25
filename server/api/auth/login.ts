import { defineEventHandler, readBody } from 'h3';
import bcrypt from 'bcrypt';
import prisma from '~/lib/prisma';

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);

  if (!email || !password) {
    return { error: 'Email and password are required.' };
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return { error: 'Invalid email or password.' };
  }

  return { user: { id: user.id, email: user.email } };
});