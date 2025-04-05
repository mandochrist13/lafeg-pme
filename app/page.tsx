"use client"

import Link from "next/link";
import Image from "next/image";
import HamburgerMenu from "@/components/section/burgermenu";
import {
  ArrowRight,
  FileText,
  BookOpen,
  ExternalLink,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { usePathname } from "next/navigation";

export default function Home() {

  const pathname = usePathname();

  const isActive = (path: string): boolean => pathname === path;


  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="px-4 md:container flex h-20 items-center justify-between">
          <div className="flex items-center gap-5">
            <Image
              src="/images/logo-feg.png"
              alt="Logo FEG"
              width={80}
              height={80}
              className="h-16 w-auto"
            />
            <div>
              <h1 className="text-2xl font-bold text-[#063a1e]">
                GUIDE NUMÉRIQUE <br className="md:hidden" /> DES PME
              </h1>
            </div>
          </div>
          <HamburgerMenu />
          <nav className="hidden md:flex gap-6">
            <ul className="hidden text-sm font-medium lg:flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
              {[
                { name: "Accueil", path: "/" },
                { name: "Textes Juridiques", path: "/textes-juridiques" },
                { name: "Institutions Financières", path: "/institutions-financieres" },
                { name: "SEA", path: "/structures-accompagnement" },
                { name: "À propos", path: "/a-propos" },
                { name: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className={`pb-1 relative font-bold cursor-pointer transition-all ease-in-out 
              before:transition-[width] before:ease-in-out before:duration-700 before:absolute 
              before:bg-[#063a1e] before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] 
              before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 
              after:absolute after:bg-[#063a1e] after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] 
              after:bottom-0 after:right-[50%] ${
                isActive(link.path)
                  ? "text-[#063a1e] border-b border-[#063a1e]"
                  : "text-black hover:text-[#063a1e]"
              }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {/* Scrolling News Ticker */}
      <div className="bg-[#063a1e] py-2 text-white overflow-hidden">
        <div className="ticker-container">
          <div className="ticker-wrapper">
            <div className="ticker-text">
              Mise à jour des textes relatifs à la fiscalité des PME - Mai 2025
              &nbsp;&nbsp;•&nbsp;&nbsp; Nouveau décret sur les avantages fiscaux
              pour les startups gabonaises &nbsp;&nbsp;•&nbsp;&nbsp; Séminaire
              sur le droit OHADA le 15 juin 2025 à Libreville &nbsp;&nbsp;•
              Séminaire sur le droit OHADA le 15 juin 2025 à Libreville
              &nbsp;&nbsp;•&nbsp;&nbsp; Publication du guide pratique sur la
              création d'entreprise au Gabon &nbsp;&nbsp;•&nbsp;&nbsp;
              Consultations juridiques gratuites pour les PME du 1er au 5
              juillet 2025
            </div>
          </div>
        </div>
      </div>

      {/* Flash News */}
      <div className="bg-[#063a1e]/10 py-2 border-b">
        <div className="container">
          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className="bg-gradient-to-r from-[#dcdaa4] to-[#bdbd95] text-[#063a1e] font-bold border-none"
            >
              NOUVEAU
            </Badge>
            <p className="text-sm">
              Mise à jour des textes relatifs à la fiscalité des PME - Mai 2025
            </p>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#063a1e] to-[#063a1e]/50 text-white p-10 md:p-16">
        <div className="md:container">
          <div className="grid grid-cols-1 md:flex md:justify-between gap-8 items-center">
            <div className="space-y-6 w-full md:max-w-[40%]">
              <h2 className="text-3xl text-center md:text-left md:text-4xl font-bold">
                Les textes juridiques pour votre PME au Gabon
              </h2>
              <p className="text-white/90 text-center md:text-left text-lg">
                Accédez facilement aux textes juridiques, lois et règlements
                concernant les PME gabonaises.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-[#063a1e] relative hover:bg-white"
                >
                  <span className="absolute inset-0 w-full h-full bg-[#dcdaa4] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0"></span>
                  <span className="relative mr-3 z-10 transition-colors duration-500 ease-in-out group-hover:text-[#063a1e]">
                    <p>Consulter les textes</p>
                  </span>
                </Button>
                <Button
                  size="lg"
                  className=" hover:text-[#063a1e] duration-300 ease-in-out hover:bg-white  border-none font-medium"
                >
                  En savoir plus
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <Image
                src="/images/hero-img.jpg"
                alt="Consultation juridique pour entreprises"
                width={500}
                height={400}
                className="rounded-lg shadow-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">
                Recherchez un texte juridique
              </h2>
              <p className="text-muted-foreground">
                Trouvez rapidement les textes juridiques dont vous avez besoin
                pour votre entreprise
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <form className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <Input
                    type="search"
                    placeholder="Mots-clés (ex: fiscalité, OHADA, création...)"
                    className="flex-1"
                  />
                  <Button
                    type="submit"
                    className="md:w-auto bg-gradient-to-r from-[#dcdaa4] to-[#bdbd95] text-[#063a1e] hover:from-[#e6e4b4] hover:to-[#c7c7a0] font-medium"
                  >
                    Rechercher
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Badge
                    variant="secondary"
                    className="cursor-pointer hover:bg-secondary/80"
                  >
                    Création d'entreprise
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="cursor-pointer hover:bg-secondary/80"
                  >
                    Fiscalité
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="cursor-pointer hover:bg-secondary/80"
                  >
                    Droit du travail
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="cursor-pointer hover:bg-secondary/80"
                  >
                    OHADA
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="cursor-pointer hover:bg-secondary/80"
                  >
                    Import/Export
                  </Badge>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-12">
        <div className="container">
          <h2 className="text-2xl font-bold mb-8 text-[#063a1e]">
            Catégories principales
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Category 1 */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="w-12 h-12 rounded-full bg-[#063a1e]/10 flex items-center justify-center mb-3">
                  <FileText className="h-6 w-6 text-[#063a1e]" />
                </div>
                <CardTitle>Création d'entreprise</CardTitle>
                <CardDescription>
                  Textes relatifs à la création et l'immatriculation des PME
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm">
                  <li className="text-muted-foreground">
                    • Loi sur les sociétés commerciales
                  </li>
                  <li className="text-muted-foreground">
                    • Acte uniforme OHADA
                  </li>
                  <li className="text-muted-foreground">
                    • Formalités d'immatriculation
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  className="w-full gap-1 text-[#063a1e] hover:text-[#063a1e]/90 hover:bg-[#063a1e]/10"
                >
                  Consulter <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            {/* Category 2 */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="w-12 h-12 rounded-full bg-[#063a1e]/10 flex items-center justify-center mb-3">
                  <FileText className="h-6 w-6 text-[#063a1e]" />
                </div>
                <CardTitle>Fiscalité</CardTitle>
                <CardDescription>
                  Textes relatifs aux impôts et taxes pour les PME
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm">
                  <li className="text-muted-foreground">
                    • Code général des impôts
                  </li>
                  <li className="text-muted-foreground">
                    • TVA et droits d'accises
                  </li>
                  <li className="text-muted-foreground">
                    • Avantages fiscaux pour les PME
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  className="w-full gap-1 text-[#063a1e] hover:text-[#063a1e]/90 hover:bg-[#063a1e]/10"
                >
                  Consulter <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            {/* Category 3 */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="w-12 h-12 rounded-full bg-[#063a1e]/10 flex items-center justify-center mb-3">
                  <FileText className="h-6 w-6 text-[#063a1e]" />
                </div>
                <CardTitle>Droit du travail</CardTitle>
                <CardDescription>
                  Textes relatifs aux relations employeur-employés
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm">
                  <li className="text-muted-foreground">• Code du travail</li>
                  <li className="text-muted-foreground">
                    • Conventions collectives
                  </li>
                  <li className="text-muted-foreground">
                    • Protection sociale
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  className="w-full gap-1 text-[#063a1e] hover:text-[#063a1e]/90 hover:bg-[#063a1e]/10"
                >
                  Consulter <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            {/* Category 4 */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="w-12 h-12 rounded-full bg-[#063a1e]/10 flex items-center justify-center mb-3">
                  <FileText className="h-6 w-6 text-[#063a1e]" />
                </div>
                <CardTitle>Commerce</CardTitle>
                <CardDescription>
                  Textes relatifs aux activités commerciales
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm">
                  <li className="text-muted-foreground">
                    • Réglementation commerciale
                  </li>
                  <li className="text-muted-foreground">• Import/Export</li>
                  <li className="text-muted-foreground">
                    • Concurrence et prix
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  className="w-full gap-1 text-[#063a1e] hover:text-[#063a1e]/90 hover:bg-[#063a1e]/10"
                >
                  Consulter <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Recent Updates */}
      <section className="py-12 bg-gray-50">
        <div className="container">
          <h2 className="text-2xl font-bold mb-8">Mises à jour récentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-gradient-to-r from-[#dcdaa4] to-[#bdbd95] text-[#063a1e] font-medium">
                      Nouveau
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      15 Mai 2025
                    </span>
                  </div>
                  <CardTitle className="mt-2">
                    Modification du régime fiscal des PME
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Nouvelles dispositions concernant les avantages fiscaux
                    accordés aux PME gabonaises dans les secteurs prioritaires.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full gap-1">
                    Lire le texte complet <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button
              variant="outline"
              className="border-[#dcdaa4] text-[#bdbd95] hover:bg-[#dcdaa4]/10"
            >
              Voir toutes les mises à jour
            </Button>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-12">
        <div className="container">
          <h2 className="text-2xl font-bold mb-8 text-[#063a1e]">
            Ressources utiles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Resource 1 */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-[#063a1e]/10 flex items-center justify-center mb-3">
                  <BookOpen className="h-6 w-6 text-[#063a1e]" />
                </div>
                <CardTitle>Guides pratiques</CardTitle>
                <CardDescription>
                  Guides d'application des textes juridiques
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Des guides explicatifs pour comprendre et appliquer
                  correctement les textes juridiques dans votre entreprise.
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  className="w-full text-[#063a1e] hover:text-[#063a1e]/90 hover:bg-[#063a1e]/10"
                >
                  Consulter les guides
                </Button>
              </CardFooter>
            </Card>

            {/* Resource 2 */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-[#063a1e]/10 flex items-center justify-center mb-3">
                  <FileText className="h-6 w-6 text-[#063a1e]" />
                </div>
                <CardTitle>Modèles de documents</CardTitle>
                <CardDescription>
                  Documents types pour votre entreprise
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Téléchargez des modèles de documents juridiques prêts à
                  l'emploi pour votre PME (statuts, contrats, etc.).
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  className="w-full text-[#063a1e] hover:text-[#063a1e]/90 hover:bg-[#063a1e]/10"
                >
                  Télécharger les modèles
                </Button>
              </CardFooter>
            </Card>

            {/* Resource 3 */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-[#063a1e]/10 flex items-center justify-center mb-3">
                  <ExternalLink className="h-6 w-6 text-[#063a1e]" />
                </div>
                <CardTitle>Liens utiles</CardTitle>
                <CardDescription>
                  Sites officiels et ressources externes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Accédez aux sites des institutions et organismes officiels
                  liés au droit des affaires au Gabon.
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  className="w-full text-[#063a1e] hover:text-[#063a1e]/90 hover:bg-[#063a1e]/10"
                >
                  Voir les liens
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-[#063a1e] text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">
              Besoin d'assistance juridique ?
            </h2>
            <p className="text-white/90 text-lg">
              Nos experts sont disponibles pour vous aider à comprendre et
              appliquer les textes juridiques pertinents pour votre entreprise.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#dcdaa4] to-[#bdbd95] text-[#063a1e] hover:from-[#e6e4b4] hover:to-[#c7c7a0] border-none font-medium"
            >
              Contacter un expert
            </Button>
          </div>
        </div>
      </section>

      {/* Subscription Section */}
      <section id="subscription" className="py-16 bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-[#dcdaa4]">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="bg-[#063a1e] p-8 text-white">
                  <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#dcdaa4] to-[#bdbd95] bg-clip-text text-transparent">
                    Restez informé
                  </h2>
                  <p className="mb-6">
                    Abonnez-vous à notre newsletter pour recevoir les dernières
                    mises à jour sur :
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <span className="bg-gradient-to-r from-[#dcdaa4] to-[#bdbd95] text-[#063a1e] rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold mt-0.5">
                        ✓
                      </span>
                      <span>Nouveaux textes juridiques</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-gradient-to-r from-[#dcdaa4] to-[#bdbd95] text-[#063a1e] rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold mt-0.5">
                        ✓
                      </span>
                      <span>Événements et formations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-gradient-to-r from-[#dcdaa4] to-[#bdbd95] text-[#063a1e] rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold mt-0.5">
                        ✓
                      </span>
                      <span>Opportunités de financement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-gradient-to-r from-[#dcdaa4] to-[#bdbd95] text-[#063a1e] rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold mt-0.5">
                        ✓
                      </span>
                      <span>Conseils pratiques pour votre PME</span>
                    </li>
                  </ul>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-semibold mb-6 text-[#063a1e]">
                    Formulaire d'abonnement
                  </h3>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="firstname"
                          className="text-sm font-medium"
                        >
                          Prénom
                        </label>
                        <Input id="firstname" placeholder="Votre prénom" />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="lastname"
                          className="text-sm font-medium"
                        >
                          Nom
                        </label>
                        <Input id="lastname" placeholder="Votre nom" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email professionnel
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="votre.email@entreprise.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="company" className="text-sm font-medium">
                        Entreprise
                      </label>
                      <Input
                        id="company"
                        placeholder="Nom de votre entreprise"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Centres d'intérêt
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="interest1"
                            className="rounded text-[#dcdaa4]"
                          />
                          <label htmlFor="interest1" className="text-sm">
                            Textes juridiques
                          </label>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="interest2"
                            className="rounded text-[#dcdaa4]"
                          />
                          <label htmlFor="interest2" className="text-sm">
                            Financement
                          </label>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="interest3"
                            className="rounded text-[#dcdaa4]"
                          />
                          <label htmlFor="interest3" className="text-sm">
                            Formation
                          </label>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="interest4"
                            className="rounded text-[#dcdaa4]"
                          />
                          <label htmlFor="interest4" className="text-sm">
                            Événements
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 mt-4">
                      <input
                        type="checkbox"
                        id="consent"
                        className="rounded text-[#dcdaa4] mt-1"
                      />
                      <label
                        htmlFor="consent"
                        className="text-xs text-muted-foreground"
                      >
                        J'accepte de recevoir des informations par email et je
                        comprends que je peux me désabonner à tout moment.
                        Consultez notre{" "}
                        <Link
                          href="#"
                          className="underline hover:text-[#bdbd95]"
                        >
                          politique de confidentialité
                        </Link>
                        .
                      </label>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#dcdaa4] to-[#bdbd95] text-[#063a1e] hover:from-[#e6e4b4] hover:to-[#c7c7a0] mt-2 font-medium"
                    >
                      S'abonner à la newsletter
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">À propos</h3>
              <p className="text-sm">
                Le Répertoire des Textes Juridiques pour les PME Gabonaises est
                une initiative de la Fédération des Entreprises du Gabon visant
                à faciliter l'accès à l'information juridique.
              </p>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-4">
                Liens rapides
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="hover:text-white">
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link href="/textes-juridiques" className="hover:text-white">
                    Textes juridiques
                  </Link>
                </li>
                <li>
                  <Link
                    href="/institutions-financieres"
                    className="hover:text-white"
                  >
                    Institutions financières
                  </Link>
                </li>
                <li>
                  <Link
                    href="/structures-accompagnement"
                    className="hover:text-white"
                  >
                    Structures d'accompagnement
                  </Link>
                </li>
                <li>
                  <Link href="/a-propos" className="hover:text-white">
                    À propos
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Libreville, Gabon</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>+241 XX XX XX XX</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>contact@pme-gabon.ga</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Newsletter</h3>
              <p className="text-sm mb-4">
                Recevez nos dernières mises à jour juridiques et actualités
                directement dans votre boîte mail.
              </p>
              <Button
                variant="outline"
                className="w-full text-white border-[#dcdaa4] hover:bg-[#dcdaa4]/20"
                asChild
              >
                <Link href="#subscription">S'abonner à la newsletter</Link>
              </Button>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>
              © 2025 Répertoire des Textes Juridiques pour les PME Gabonaises.
              Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
