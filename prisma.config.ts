// prisma.config.ts
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    // seed: "tsx prisma/seed.ts", // optionnel
  },
  datasource: {
    // URL utilisée par Prisma Migrate & co
    url: process.env.DATABASE_URL!,
    // optionnel : connexion directe non poolée (si tu en as une)
    // directUrl: process.env.DIRECT_URL,
  },
});
