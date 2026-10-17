// Crée un administrateur ou réinitialise son mot de passe.
// Usage : pnpm tsx scripts/resetPassword.ts <email> <mot_de_passe> [nom] [prenom]
// (les identifiants ne sont plus écrits en dur dans le dépôt).
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { hash as bcryptHash } from "bcryptjs";

const prismaClient = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DIRECT_URL || process.env.DATABASE_URL,
  }),
});

async function main() {
  const [email, plainPassword, nom = "ADMIN", prenom = "Admin"] = process.argv.slice(2);
  if (!email || !plainPassword) {
    console.error("Usage : pnpm tsx scripts/resetPassword.ts <email> <mot_de_passe> [nom] [prenom]");
    process.exit(1);
  }

  console.log("🔍 Vérification ou création de l'utilisateur :", email);

  // Recherche insensible à la casse
  const user = await prismaClient.utilisateur.findFirst({
    where: { email: { equals: email, mode: "insensitive" } },
  });

  const hashed = await bcryptHash(plainPassword, 10);

  if (!user) {
    console.log("⚠️ Aucun utilisateur trouvé — création en cours...");

    const newUser = await prismaClient.utilisateur.create({
      data: {
        nom,
        prenom,
        email,
        mot_de_passe: hashed,
        role: "ADMIN",
      },
    });

    console.log("✅ Nouvel utilisateur créé :", newUser.email);
  } else {
    console.log("✅ Utilisateur trouvé :", user.nom, user.prenom);
    await prismaClient.utilisateur.update({
      where: { id_utilisateur: user.id_utilisateur },
      data: { mot_de_passe: hashed },
    });
    console.log("✅ Mot de passe mis à jour avec succès !");
  }
}

main()
  .then(() => prismaClient.$disconnect())
  .catch((e) => {
    console.error("❌ Erreur :", e);
    prismaClient.$disconnect();
    process.exit(1);
  });
