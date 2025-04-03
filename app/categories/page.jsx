import Link from "next/link"
import { ChevronRight, FileText, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Categories() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-[#063a1e]">
              Accueil
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span>Catégories</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-3 text-[#063a1e]">Catégories de Textes Juridiques</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explorez notre bibliothèque de textes juridiques organisée par catégories pour faciliter vos recherches.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {/* Catégorie 1 */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="w-12 h-12 rounded-full bg-[#063a1e]/10 flex items-center justify-center mb-3">
                  <FileText className="h-6 w-6 text-[#063a1e]" />
                </div>
                <CardTitle className="text-xl">Textes juridiques des administrations publiques</CardTitle>
                <CardDescription>
                  Textes émis par les administrations publiques gabonaises concernant les PME
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Cette catégorie regroupe l'ensemble des textes juridiques émis par les administrations publiques
                  gabonaises qui concernent directement ou indirectement les PME. Vous y trouverez les lois, décrets,
                  arrêtés et circulaires publiés par les différents ministères et organismes publics.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Nombre de textes</span>
                    <span className="font-medium">98</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Dernière mise à jour</span>
                    <span className="font-medium">15/05/2025</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Principaux émetteurs</span>
                    <span className="font-medium">Ministère des Finances, Ministère des PME</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  className="w-full gap-1 text-[#063a1e] hover:text-[#063a1e]/90 hover:bg-[#063a1e]/10"
                  asChild
                >
                  <Link href="/categories/textes-administrations-publiques">
                    Consulter <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Catégorie 2 */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="w-12 h-12 rounded-full bg-[#063a1e]/10 flex items-center justify-center mb-3">
                  <FileText className="h-6 w-6 text-[#063a1e]" />
                </div>
                <CardTitle className="text-xl">Textes juridiques des PME</CardTitle>
                <CardDescription>Textes spécifiques aux petites et moyennes entreprises</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Cette catégorie rassemble tous les textes juridiques spécifiquement dédiés aux PME gabonaises. Vous y
                  trouverez les textes relatifs à la création d'entreprise, à la fiscalité des PME, au droit du travail,
                  au financement et aux marchés publics réservés aux PME.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Nombre de textes</span>
                    <span className="font-medium">112</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Dernière mise à jour</span>
                    <span className="font-medium">10/05/2025</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Principales thématiques</span>
                    <span className="font-medium">Fiscalité, Création d'entreprise, Financement</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  className="w-full gap-1 text-[#063a1e] hover:text-[#063a1e]/90 hover:bg-[#063a1e]/10"
                  asChild
                >
                  <Link href="/categories/textes-pme">
                    Consulter <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Catégorie 3 */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="w-12 h-12 rounded-full bg-[#063a1e]/10 flex items-center justify-center mb-3">
                  <FileText className="h-6 w-6 text-[#063a1e]" />
                </div>
                <CardTitle className="text-xl">Textes juridiques internationaux</CardTitle>
                <CardDescription>Textes internationaux applicables au Gabon</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Cette catégorie comprend les textes juridiques internationaux qui s'appliquent au Gabon et qui
                  concernent les PME. Vous y trouverez notamment les actes uniformes OHADA, les règlements CEMAC, les
                  conventions CIMA, ainsi que d'autres textes internationaux pertinents.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Nombre de textes</span>
                    <span className="font-medium">38</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Dernière mise à jour</span>
                    <span className="font-medium">30/04/2025</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Principales organisations</span>
                    <span className="font-medium">OHADA, CEMAC, CIMA</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  className="w-full gap-1 text-[#063a1e] hover:text-[#063a1e]/90 hover:bg-[#063a1e]/10"
                  asChild
                >
                  <Link href="/categories/textes-internationaux">
                    Consulter <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-12 bg-gradient-to-r from-[#dcdaa4] to-[#bdbd95] p-6 rounded-lg">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold text-[#063a1e] mb-2">
                  Besoin d'aide pour trouver un texte juridique ?
                </h3>
                <p className="text-[#063a1e]/80">
                  Notre équipe est à votre disposition pour vous aider à trouver les textes juridiques pertinents pour
                  votre entreprise.
                </p>
              </div>
              <Button className="bg-[#063a1e] hover:bg-[#063a1e]/90 whitespace-nowrap">Contactez-nous</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

