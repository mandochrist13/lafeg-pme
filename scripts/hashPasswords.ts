// Hache les mots de passe encore stockés en clair dans la table `utilisateur`.
// Usage : pnpm tsx scripts/hashPasswords.ts
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { hash } from "bcryptjs";

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    // ✅ préfère DIRECT_URL si tu l'as (port 5432), sinon DATABASE_URL
    connectionString: process.env.DIRECT_URL || process.env.DATABASE_URL,
  }),
});

async function run() {
  const users = await prisma.utilisateur.findMany();

  for (const user of users) {
    if (user.mot_de_passe && !/^\$2[aby]\$/.test(user.mot_de_passe)) {
      const hashed = await hash(user.mot_de_passe, 10);

      await prisma.utilisateur.update({
        where: { id_utilisateur: user.id_utilisateur },
        data: { mot_de_passe: hashed },
      });

      console.log(`✅ Mot de passe hashé pour ${user.email}`);
    }
  }
}

run()
  .then(() => console.log("🎉 Terminé"))
  .catch((e) => console.error("❌ Erreur :", e))
  .finally(async () => prisma.$disconnect());
