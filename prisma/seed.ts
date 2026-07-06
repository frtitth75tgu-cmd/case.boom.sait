import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { steamId: "admin" },
    update: {},
    create: { steamId: "admin", name: "Admin", role: "ADMIN", balance: 100000 }
  });
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  });
