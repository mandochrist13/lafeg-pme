const { PrismaClient: PrismaClientGenerated } = require("../generated/prisma");
const { hash: bcryptHash } = require("bcryptjs");

const prisma = new PrismaClientGenerated();

async function main() {
  const email = "mandochrist13@gmail.com";
  const plainPassword = "admin789";

  console.log("🔍 Vérification ou création de l'utilisateur :", email);

  // Recherche insensible à la casse
  const user = await prisma.utilisateur.findFirst({
    where: { email: { equals: email, mode: "insensitive" } },
  });

  const hashed = await bcryptHash(plainPassword, 10);

  if (!user) {
    console.log("⚠️ Aucun utilisateur trouvé — création en cours...");

    const newUser = await prisma.utilisateur.create({
      data: {
        nom: "Admin",
        prenom: "FEG",
        email,
        mot_de_passe: hashed,
        role: "ADMIN",
      },
    });

    console.log("✅ Nouvel utilisateur créé :", newUser.email);
  } else {
    console.log("✅ Utilisateur trouvé :", user.nom, user.prenom);
    await prisma.utilisateur.update({
      where: { id_utilisateur: user.id_utilisateur },
      data: { mot_de_passe: hashed },
    });
    console.log("✅ Mot de passe mis à jour avec succès !");
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error("❌ Erreur :", e);
    prisma.$disconnect();
  });
