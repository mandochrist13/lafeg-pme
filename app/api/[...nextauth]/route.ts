import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// Au lieu de NextAuth(authOptions), fais ceci :
const { handlers } = NextAuth(authOptions);

export const { GET, POST } = handlers;
