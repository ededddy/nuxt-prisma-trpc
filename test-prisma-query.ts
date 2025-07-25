import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testQuery() {
  const user = await prisma.user.findUnique({
    where: { email: 'test@example.com' },
    select: { id: true, email: true, password: true },
  });

  console.log(user);
}

testQuery().catch((e) => {
  console.error(e);
  process.exit(1);
});