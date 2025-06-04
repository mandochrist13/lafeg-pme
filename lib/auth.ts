// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         username: { label: "Username", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (
//           credentials?.username === "admin" &&
//           credentials?.password === "admin123"
//         ) {
//           return { id: "1", name: "Admin User", email: "admin@example.com" };
//         }
//         return null;
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/auth/login", // ici on pointe correctement
//     error: "/auth/login",   // et ici aussi
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// };

// lib/auth.ts
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import prisma from "./prisma";

export const authOptions: NextAuthConfig = {
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

        return prisma.utilisateur
          .findUnique({ where: { email } })
          .then(async (user) => {
            if (!user) {
              throw new Error("Aucun utilisateur trouvé avec cet email.");
            }

            const isValid = await compare(password, user.mot_de_passe);
            if (!isValid) {
              throw new Error("Mot de passe incorrect.");
            }

            return {
              id: user.id_utilisateur,
              email: user.email,
              name: `${user.prenom} ${user.nom}`,
            };
          });
      },
    }),
  ],
  session: {
    strategy: "jwt",
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
