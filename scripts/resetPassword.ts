const { PrismaClient: PrismaClientGenerated } = require("../generated/prisma");
const { hash: bcryptHash } = require("bcryptjs");

const prismaClient = new PrismaClientGenerated();

async function main() {
  const email = "coeurllyb@gmail.com";
  const plainPassword = "coeurlly";

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
        nom: "BOUROBOU",
        prenom: "Coeurlly",
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
  });
