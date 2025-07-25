import { defineEventHandler, readBody } from 'h3';
import bcrypt from 'bcrypt';
import prisma from '~/lib/prisma';

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);

  if (!email || !password) {
    return { error: 'Email and password are required.' };
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    return { error: 'User already exists.' };
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  return { id: newUser.id, email: newUser.email };
});