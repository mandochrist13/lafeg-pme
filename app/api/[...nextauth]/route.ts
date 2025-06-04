import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// Au lieu de NextAuth(authOptions), fais ceci :
const { handlers } = NextAuth(authOptions);

export const { GET, POST } = handlers;
// app/api/auth/[...nextauth]/route.ts
// /app/api/auth/[...nextauth]/route.ts

// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { PrismaClient } from "@prisma/client";
// import { compare } from "bcryptjs";

// const prisma = new PrismaClient();

// const handler = NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         username: { label: "Email", type: "text" },
//         password: { label: "Mot de passe", type: "password" },
//       },
//       async authorize(credentials, req) {
//         const { username, password } = credentials ?? {}

//         if (typeof username !== "string" || typeof password !== "string") {
//           throw new Error("Email et mot de passe requis.")
//         }

//         const user = await prisma.utilisateur.findUnique({
//           where: { email: username },
//         })

//         if (!user) {
//           throw new Error("Aucun utilisateur trouvé avec cet email.")
//         }

//         const isPasswordValid = await compare(password, user.mot_de_passe)

//         if (!isPasswordValid) {
//           throw new Error("Mot de passe incorrect.")
//         }

//         return {
//           id: user.id_utilisateur,
//           email: user.email,
//           name: `${user.prenom} ${user.nom}`,
//           role: user.role,
//         }
//       },
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//   },
//   pages: {
//     signIn: "/auth/login",
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       // ✅ Ajout du rôle dans le token JWT si présent
//       if (user && "role" in user) {
//         token.role = user.role;
//       }
//       return token;
//     },
//     // async session({ session, token }) {
//     //   // ✅ Ajout du rôle dans la session si présent dans le token
//     //   if (session.user && token.role) {
//     //     session.user.role = token.role as string
//     //   }
//     //   return session
//     // },
//   },
// });

// export { handler as GET, handler as POST };
