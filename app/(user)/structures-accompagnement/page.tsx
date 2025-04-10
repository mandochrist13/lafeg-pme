import Link from "next/link"
import Image from "next/image"
import {
  ChevronRight,
  Search,
  ExternalLink,
  MapPin,
  Phone,
  Mail,
  Globe,
  Calendar,
  Users,
  BookOpen,
  Briefcase,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function StructuresAccompagnement() {
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
            <span>Structures d'Accompagnement</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-[#063a1e] text-white py-12">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold mb-4">Structures d'Accompagnement des PME Gabonaises</h1>
            <p className="text-white/90 text-lg mb-6">
              Découvrez les organismes qui peuvent vous aider à créer, développer et pérenniser votre entreprise au
              Gabon.
            </p>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Rechercher une structure d'accompagnement..."
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 h-12"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container py-12">
        <Tabs defaultValue="incubateurs" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
            <TabsTrigger value="incubateurs">Incubateurs</TabsTrigger>
            <TabsTrigger value="formation">Centres de formation</TabsTrigger>
            <TabsTrigger value="conseil">Cabinets conseil</TabsTrigger>
            <TabsTrigger value="publiques">Structures publiques</TabsTrigger>
          </TabsList>

          {/* Incubateurs */}
          <TabsContent value="incubateurs" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Incubateur 1 */}
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#063a1e]/10 rounded-md flex items-center justify-center">
                        <Image
                          src="/placeholder.svg?height=40&width=40"
                          alt="Logo incubateur"
                          width={40}
                          height={40}
                          className="rounded"
                        />
                      </div>
                      <div>
                        <CardTitle>Gabon Incubateur</CardTitle>
                        <CardDescription>Incubateur d'entreprises</CardDescription>
                      </div>
                    </div>
                    <Badge>Partenaire FEG</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Gabon Incubateur est une structure d'accompagnement qui aide les entrepreneurs à transformer leurs
                      idées en entreprises viables, avec un accent sur l'innovation et la technologie.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">Quartier Batterie IV, Libreville, Gabon</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Phone className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">+241 XX XX XX XX</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Mail className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">contact@gabonincubateur.ga</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Globe className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">www.gabonincubateur.ga</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-[#063a1e]">
                      Incubation
                    </Badge>
                    <Badge variant="outline" className="text-[#063a1e]">
                      Mentorat
                    </Badge>
                    <Badge variant="outline" className="text-[#063a1e]">
                      Financement
                    </Badge>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 border-[#063a1e] text-[#063a1e] hover:bg-[#063a1e]/10"
                  >
                    Visiter le site <ExternalLink className="h-3 w-3" />
                  </Button>
                </CardFooter>
              </Card>

              {/* Incubateur 2 */}
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#063a1e]/10 rounded-md flex items-center justify-center">
                        <Image
                          src="/placeholder.svg?height=40&width=40"
                          alt="Logo incubateur"
                          width={40}
                          height={40}
                          className="rounded"
                        />
                      </div>
                      <div>
                        <CardTitle>JA Gabon</CardTitle>
                        <CardDescription>Incubateur et accélérateur</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Junior Achievement (JA) Gabon propose des programmes d'incubation et d'accélération pour les
                      jeunes entrepreneurs gabonais, avec un accent sur l'entrepreneuriat social.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">Avenue de la Présidence, Libreville, Gabon</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Phone className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">+241 XX XX XX XX</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Mail className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">contact@jagabon.org</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Globe className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">www.jagabon.org</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-[#063a1e]">
                      Incubation
                    </Badge>
                    <Badge variant="outline" className="text-[#063a1e]">
                      Formation
                    </Badge>
                    <Badge variant="outline" className="text-[#063a1e]">
                      Jeunes
                    </Badge>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 border-[#063a1e] text-[#063a1e] hover:bg-[#063a1e]/10"
                  >
                    Visiter le site <ExternalLink className="h-3 w-3" />
                  </Button>
                </CardFooter>
              </Card>

              {/* Incubateur 3 */}
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#063a1e]/10 rounded-md flex items-center justify-center">
                        <Image
                          src="/placeholder.svg?height=40&width=40"
                          alt="Logo incubateur"
                          width={40}
                          height={40}
                          className="rounded"
                        />
                      </div>
                      <div>
                        <CardTitle>Ogooué Labs</CardTitle>
                        <CardDescription>Hub d'innovation</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Ogooué Labs est un hub d'innovation qui accompagne les startups et PME innovantes dans les
                      domaines du numérique, de l'agritech et des énergies renouvelables.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">Quartier Nzeng-Ayong, Libreville, Gabon</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Phone className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">+241 XX XX XX XX</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Mail className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">contact@ogoouélabs.ga</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Globe className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">www.ogoouélabs.ga</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-[#063a1e]">
                      Innovation
                    </Badge>
                    <Badge variant="outline" className="text-[#063a1e]">
                      Coworking
                    </Badge>
                    <Badge variant="outline" className="text-[#063a1e]">
                      Tech
                    </Badge>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 border-[#063a1e] text-[#063a1e] hover:bg-[#063a1e]/10"
                  >
                    Visiter le site <ExternalLink className="h-3 w-3" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          {/* Centres de formation */}
          <TabsContent value="formation" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Centre 1 */}
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#063a1e]/10 rounded-md flex items-center justify-center">
                        <BookOpen className="h-6 w-6 text-[#063a1e]" />
                      </div>
                      <div>
                        <CardTitle>Centre de Développement des PME (CDPME)</CardTitle>
                        <CardDescription>Centre de formation et d'accompagnement</CardDescription>
                      </div>
                    </div>
                    <Badge>Partenaire FEG</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Le CDPME propose des formations spécialisées pour les entrepreneurs et dirigeants de PME
                      gabonaises, couvrant la gestion, le marketing, la finance et le développement commercial.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">Boulevard du Bord de Mer, Libreville, Gabon</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Phone className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">+241 XX XX XX XX</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Mail className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">contact@cdpme.ga</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Globe className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">www.cdpme.ga</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-[#063a1e]">
                      Formation
                    </Badge>
                    <Badge variant="outline" className="text-[#063a1e]">
                      Coaching
                    </Badge>
                    <Badge variant="outline" className="text-[#063a1e]">
                      Certification
                    </Badge>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 border-[#063a1e] text-[#063a1e] hover:bg-[#063a1e]/10"
                  >
                    Visiter le site <ExternalLink className="h-3 w-3" />
                  </Button>
                </CardFooter>
              </Card>

              {/* Centre 2 */}
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#063a1e]/10 rounded-md flex items-center justify-center">
                        <BookOpen className="h-6 w-6 text-[#063a1e]" />
                      </div>
                      <div>
                        <CardTitle>Institut Gabonais de Management (IGM)</CardTitle>
                        <CardDescription>École de commerce et centre de formation</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      L'IGM propose des formations continues et des programmes spécifiques pour les entrepreneurs et
                      cadres de PME, avec un accent sur le management et l'entrepreneuriat.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">Quartier Glass, Libreville, Gabon</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Phone className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">+241 XX XX XX XX</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Mail className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">contact@igm.ga</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Globe className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">www.igm.ga</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-[#063a1e]">
                      Formation continue
                    </Badge>
                    <Badge variant="outline" className="text-[#063a1e]">
                      Management
                    </Badge>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 border-[#063a1e] text-[#063a1e] hover:bg-[#063a1e]/10"
                  >
                    Visiter le site <ExternalLink className="h-3 w-3" />
                  </Button>
                </CardFooter>
              </Card>

              {/* Centre 3 */}
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#063a1e]/10 rounded-md flex items-center justify-center">
                        <BookOpen className="h-6 w-6 text-[#063a1e]" />
                      </div>
                      <div>
                        <CardTitle>Centre de Formation Professionnelle (CFP)</CardTitle>
                        <CardDescription>Centre de formation technique</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Le CFP propose des formations techniques et professionnelles adaptées aux besoins des PME dans
                      divers secteurs comme l'industrie, l'artisanat et les services.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">Quartier Akébé, Libreville, Gabon</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Phone className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">+241 XX XX XX XX</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Mail className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">contact@cfp.ga</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Globe className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">www.cfp.ga</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-[#063a1e]">
                      Formation technique
                    </Badge>
                    <Badge variant="outline" className="text-[#063a1e]">
                      Certification
                    </Badge>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 border-[#063a1e] text-[#063a1e] hover:bg-[#063a1e]/10"
                  >
                    Visiter le site <ExternalLink className="h-3 w-3" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          {/* Cabinets conseil */}
          <TabsContent value="conseil" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Cabinet 1 */}
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#063a1e]/10 rounded-md flex items-center justify-center">
                        <Briefcase className="h-6 w-6 text-[#063a1e]" />
                      </div>
                      <div>
                        <CardTitle>Gabon Consulting Group</CardTitle>
                        <CardDescription>Cabinet de conseil en management</CardDescription>
                      </div>
                    </div>
                    <Badge>Partenaire FEG</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Gabon Consulting Group accompagne les PME dans leur développement stratégique, leur organisation
                      et leur gestion financière, avec une expertise sectorielle dans l'agro-industrie et les services.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">Boulevard du Bord de Mer, Libreville, Gabon</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Phone className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">+241 XX XX XX XX</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Mail className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">contact@gcg.ga</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Globe className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">www.gcg.ga</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-[#063a1e]">
                      Stratégie
                    </Badge>
                    <Badge variant="outline" className="text-[#063a1e]">
                      Finance
                    </Badge>
                    <Badge variant="outline" className="text-[#063a1e]">
                      Organisation
                    </Badge>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 border-[#063a1e] text-[#063a1e] hover:bg-[#063a1e]/10"
                  >
                    Visiter le site <ExternalLink className="h-3 w-3" />
                  </Button>
                </CardFooter>
              </Card>

              {/* Cabinet 2 */}
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#063a1e]/10 rounded-md flex items-center justify-center">
                        <Briefcase className="h-6 w-6 text-[#063a1e]" />
                      </div>
                      <div>
                        <CardTitle>PME Solutions</CardTitle>
                        <CardDescription>Cabinet de conseil spécialisé PME</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      PME Solutions est un cabinet spécialisé dans l'accompagnement des petites et moyennes entreprises
                      gabonaises, offrant des services de conseil en gestion, marketing et développement commercial.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">Quartier Louis, Libreville, Gabon</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Phone className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">+241 XX XX XX XX</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Mail className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">contact@pmesolutions.ga</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Globe className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">www.pmesolutions.ga</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-[#063a1e]">
                      Gestion
                    </Badge>
                    <Badge variant="outline" className="text-[#063a1e]">
                      Marketing
                    </Badge>
                    <Badge variant="outline" className="text-[#063a1e]">
                      Développement
                    </Badge>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 border-[#063a1e] text-[#063a1e] hover:bg-[#063a1e]/10"
                  >
                    Visiter le site <ExternalLink className="h-3 w-3" />
                  </Button>
                </CardFooter>
              </Card>

              {/* Cabinet 3 */}
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#063a1e]/10 rounded-md flex items-center justify-center">
                        <Briefcase className="h-6 w-6 text-[#063a1e]" />
                      </div>
                      <div>
                        <CardTitle>Juridis Consult</CardTitle>
                        <CardDescription>Cabinet de conseil juridique</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Juridis Consult est un cabinet spécialisé dans le conseil juridique aux PME gabonaises, couvrant
                      le droit des affaires, le droit fiscal, le droit du travail et la propriété intellectuelle.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">Avenue du Colonel Parant, Libreville, Gabon</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Phone className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">+241 XX XX XX XX</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Mail className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">contact@juridisconsult.ga</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Globe className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">www.juridisconsult.ga</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-[#063a1e]">
                      Juridique
                    </Badge>
                    <Badge variant="outline" className="text-[#063a1e]">
                      Fiscal
                    </Badge>
                    <Badge variant="outline" className="text-[#063a1e]">
                      Droit du travail
                    </Badge>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 border-[#063a1e] text-[#063a1e] hover:bg-[#063a1e]/10"
                  >
                    Visiter le site <ExternalLink className="h-3 w-3" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          {/* Structures publiques */}
          <TabsContent value="publiques" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Structure 1 */}
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#063a1e]/10 rounded-md flex items-center justify-center">
                        <Users className="h-6 w-6 text-[#063a1e]" />
                      </div>
                      <div>
                        <CardTitle>Agence Nationale de Promotion des PME (ANPME)</CardTitle>
                        <CardDescription>Agence gouvernementale</CardDescription>
                      </div>
                    </div>
                    <Badge>Partenaire FEG</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      L'ANPME est l'agence gouvernementale chargée de promouvoir et d'accompagner le développement des
                      PME au Gabon, à travers divers programmes de soutien et d'assistance technique.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">Boulevard Triomphal, Libreville, Gabon</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Phone className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">+241 XX XX XX XX</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Mail className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">contact@anpme.gouv.ga</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Globe className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">www.anpme.gouv.ga</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-[#063a1e]">
                      Accompagnement
                    </Badge>
                    <Badge variant="outline" className="text-[#063a1e]">
                      Financement
                    </Badge>
                    <Badge variant="outline" className="text-[#063a1e]">
                      Formation
                    </Badge>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 border-[#063a1e] text-[#063a1e] hover:bg-[#063a1e]/10"
                  >
                    Visiter le site <ExternalLink className="h-3 w-3" />
                  </Button>
                </CardFooter>
              </Card>

              {/* Structure 2 */}
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#063a1e]/10 rounded-md flex items-center justify-center">
                        <Users className="h-6 w-6 text-[#063a1e]" />
                      </div>
                      <div>
                        <CardTitle>Chambre de Commerce du Gabon (CCG)</CardTitle>
                        <CardDescription>Institution consulaire</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      La Chambre de Commerce du Gabon offre des services d'accompagnement aux entreprises, notamment des
                      formations, du conseil et des informations sur les marchés et les opportunités d'affaires.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">Place de l'Indépendance, Libreville, Gabon</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Phone className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">+241 XX XX XX XX</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Mail className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">contact@ccg.ga</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Globe className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">www.ccg.ga</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-[#063a1e]">
                      Information
                    </Badge>
                    <Badge variant="outline" className="text-[#063a1e]">
                      Réseautage
                    </Badge>
                    <Badge variant="outline" className="text-[#063a1e]">
                      Formation
                    </Badge>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 border-[#063a1e] text-[#063a1e] hover:bg-[#063a1e]/10"
                  >
                    Visiter le site <ExternalLink className="h-3 w-3" />
                  </Button>
                </CardFooter>
              </Card>

              {/* Structure 3 */}
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#063a1e]/10 rounded-md flex items-center justify-center">
                        <Users className="h-6 w-6 text-[#063a1e]" />
                      </div>
                      <div>
                        <CardTitle>Agence de Développement des PME (ADPME)</CardTitle>
                        <CardDescription>Agence gouvernementale</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      L'ADPME est une agence gouvernementale qui accompagne les PME dans leur développement, notamment à
                      travers des programmes de renforcement des capacités et d'accès aux marchés.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">Avenue de la Présidence, Libreville, Gabon</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Phone className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">+241 XX XX XX XX</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Mail className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">contact@adpme.gouv.ga</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Globe className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">www.adpme.gouv.ga</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-[#063a1e]">
                      Développement
                    </Badge>
                    <Badge variant="outline" className="text-[#063a1e]">
                      Marchés publics
                    </Badge>
                    <Badge variant="outline" className="text-[#063a1e]">
                      Capacités
                    </Badge>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 border-[#063a1e] text-[#063a1e] hover:bg-[#063a1e]/10"
                  >
                    Visiter le site <ExternalLink className="h-3 w-3" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* CTA Section */}
        <div className="mt-12 bg-[#063a1e]/10 p-6 rounded-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-[#063a1e] mb-2">Besoin d'accompagnement pour votre entreprise ?</h3>
              <p className="text-muted-foreground">
                Nos experts peuvent vous aider à identifier les structures d'accompagnement les plus adaptées à vos
                besoins et vous mettre en relation avec elles.
              </p>
            </div>
            <Button className="bg-[#063a1e] hover:bg-[#063a1e]/90 whitespace-nowrap">Prendre rendez-vous</Button>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-[#063a1e] mb-6">Événements à venir</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-[#063a1e]" />
                    <span className="text-sm font-medium text-[#063a1e]">15 Juin 2025</span>
                  </div>
                  <CardTitle>Atelier sur le financement des PME</CardTitle>
                  <CardDescription>Organisé par la Chambre de Commerce du Gabon</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Un atelier pratique pour aider les entrepreneurs à comprendre les différentes options de financement
                    disponibles pour leur entreprise.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full border-[#063a1e] text-[#063a1e] hover:bg-[#063a1e]/10">
                    S'inscrire
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

