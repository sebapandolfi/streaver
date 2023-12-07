import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function truncate() {
  const allTables: string[] = ["post", "user", "address", "company", "geoLocation"];
  for (let i = 0; i < allTables.length; i++) {
    const model = (prisma as any)[allTables[i]];
    if (model && model.deleteMany) {
      const result: { count: number } = await model.deleteMany({
        where: {}, // Empty where clause to delete all records
      });
      console.log(`Table ${allTables[i]} ${result.count} rows deleted.`)
    }

  }
  console.log('Database truncated successfully.');
  await prisma.$disconnect();

}

truncate().catch((e) => {
  throw e;
});