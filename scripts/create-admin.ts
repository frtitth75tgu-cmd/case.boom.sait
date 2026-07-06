import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { steamId: "admin" },
    update: { role: "ADMIN", balance: 100000 },
    create: { steamId: "admin", name: "Admin", role: "ADMIN", balance: 100000 },
  });

  console.log("Admin ready");
}

main().finally(() => prisma.$disconnect());
