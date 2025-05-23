import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
// import Nav from "@/components/section/nav";
// import Footer from "@/components/section/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Guide numérique des PME",
  description:
    "Accédez facilement aux textes juridiques, lois et règlements concernant les PME gabonaises.",
  icons: {
    icon: "/images/logo-feg.png",
  },
  generator: 'La Fédération des Entreprises du Gabon',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="light" style={{ colorScheme: "light" }}>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {/* <Nav /> */}
          {children}
        </ThemeProvider>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
