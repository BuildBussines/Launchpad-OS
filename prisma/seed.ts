import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const lead = await prisma.lead.upsert({
    where: { email: "demo.founder@example.com" },
    update: {},
    create: {
      email: "demo.founder@example.com",
      source: "hero",
    },
  });

  await prisma.order.upsert({
    where: { id: "seed-order-1" },
    update: {},
    create: {
      id: "seed-order-1",
      email: lead.email,
      tier: "PRO",
      amountCents: 12900,
      status: "PAID",
      leadId: lead.id,
    },
  });

  console.log("Seed complete: 1 lead, 1 paid order.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
