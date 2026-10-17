import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import prisma from "./prisma";

export const authOptions: NextAuthConfig = {
  // Indispensable derrière un proxy (Vercel, reverse proxy) : sans cela, Auth.js v5
  // refuse toutes les requêtes avec « UntrustedHost », ce qui rendait la connexion
  // à l'espace administrateur totalement impossible en production.
  trustHost: true,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;

        if (typeof email !== "string" || typeof password !== "string") {
          throw new Error("Email et mot de passe requis.");
        }

        const user = await prisma.utilisateur.findUnique({ where: { email } });
        if (!user) {
          throw new Error("Aucun utilisateur trouvé avec cet email.");
        }

        const isValid = await compare(password, user.mot_de_passe);
        if (!isValid) {
          throw new Error("Mot de passe incorrect.");
        }

        // Mémorise la dernière connexion (non bloquant).
        prisma.utilisateur
          .update({
            where: { id_utilisateur: user.id_utilisateur },
            data: { derniere_connexion: new Date() },
          })
          .catch(() => {});

        return {
          id: user.id_utilisateur,
          email: user.email,
          name: `${user.prenom} ${user.nom}`,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,      // 1 heure
    updateAge: 60 * 60,   // Ne renouvelle pas automatiquement
  },
  jwt: {
    maxAge: 60 * 60,      // 1 heure
  },
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};

// `handlers` alimente la route /api/auth/[...nextauth] ;
// `auth()` permet de lire la session côté serveur (routes API, server components).
export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
