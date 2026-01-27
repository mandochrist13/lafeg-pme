// import { PrismaClient } from "../generated/prisma";
import { PrismaClient } from "@prisma/client";

import { PrismaPg } from "@prisma/adapter-pg";

const prismaClientSingleton = () => {
  const connectionString = process.env.DATABASE_URL || process.env.DIRECT_URL;
  if (!connectionString) throw new Error("Missing DATABASE_URL / DIRECT_URL");

  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({ adapter });
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();
export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
