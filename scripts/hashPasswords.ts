// ✅ Version compatible sans ES modules
const { PrismaClient } = require("../generated/prisma");
const { hash } = require("bcryptjs");

const prisma = new PrismaClient();

async function run() {
  const users = await prisma.utilisateur.findMany();

  for (const user of users) {
    if (!user.mot_de_passe.startsWith("$2b$")) {
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
  .finally(() => prisma.$disconnect());
