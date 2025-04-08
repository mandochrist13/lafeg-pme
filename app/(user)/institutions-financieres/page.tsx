import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Search, ExternalLink, MapPin, Phone, Mail, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function InstitutionsFinancieres() {
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
            <span>Institutions Financières</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-[#063a1e] text-white py-12">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold mb-4">Institutions Financières pour les PME Gabonaises</h1>
            <p className="text-white/90 text-lg mb-6">
              Découvrez les banques, établissements de microfinance et fonds d'investissement qui peuvent financer votre
              entreprise au Gabon.
            </p>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Rechercher une institution financière..."
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 h-12"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container py-12">
        <Tabs defaultValue="banques" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
            <TabsTrigger value="banques">Banques</TabsTrigger>
            <TabsTrigger value="microfinance">Microfinance</TabsTrigger>
            <TabsTrigger value="fonds">Fonds d'investissement</TabsTrigger>
            <TabsTrigger value="publiques">Institutions publiques</TabsTrigger>
          </TabsList>

          {/* Banques */}
          <TabsContent value="banques" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Banque 1 */}
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#063a1e]/10 rounded-md flex items-center justify-center">
                        <Image
                          src="/placeholder.svg?height=40&width=40"
                          alt="Logo banque"
                          width={40}
                          height={40}
                          className="rounded"
                        />
                      </div>
                      <div>
                        <CardTitle>Banque Gabonaise de Développement (BGD)</CardTitle>
                        <CardDescription>Banque publique de développement</CardDescription>
                      </div>
                    </div>
                    <Badge>Partenaire FEG</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      La Banque Gabonaise de Développement (BGD) est une institution financière publique qui accompagne
                      le développement des PME/PMI gabonaises à travers des financements adaptés.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">Boulevard de l'Indépendance, Libreville, Gabon</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Phone className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">+241 XX XX XX XX</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Mail className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">contact@bgd.ga</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Globe className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">www.bgd.ga</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Badge variant="outline" className="text-[#063a1e]">
                    Prêts PME
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 border-[#063a1e] text-[#063a1e] hover:bg-[#063a1e]/10"
                  >
                    Visiter le site <ExternalLink className="h-3 w-3" />
                  </Button>
                </CardFooter>
              </Card>

              {/* Banque 2 */}
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#063a1e]/10 rounded-md flex items-center justify-center">
                        <Image
                          src="/placeholder.svg?height=40&width=40"
                          alt="Logo banque"
                          width={40}
                          height={40}
                          className="rounded"
                        />
                      </div>
                      <div>
                        <CardTitle>BGFI Bank Gabon</CardTitle>
                        <CardDescription>Banque commerciale</CardDescription>
                      </div>
                    </div>
                    <Badge>Partenaire FEG</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      BGFI Bank Gabon propose des solutions de financement adaptées aux PME gabonaises, notamment des
                      crédits d'investissement et des facilités de trésorerie.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">Boulevard Georges Rawiri, Libreville, Gabon</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Phone className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">+241 XX XX XX XX</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Mail className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">contact@bgfibank.com</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Globe className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">www.bgfibank.com</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Badge variant="outline" className="text-[#063a1e]">
                    Crédits d'investissement
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 border-[#063a1e] text-[#063a1e] hover:bg-[#063a1e]/10"
                  >
                    Visiter le site <ExternalLink className="h-3 w-3" />
                  </Button>
                </CardFooter>
              </Card>

              {/* Banque 3 */}
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#063a1e]/10 rounded-md flex items-center justify-center">
                        <Image
                          src="/placeholder.svg?height=40&width=40"
                          alt="Logo banque"
                          width={40}
                          height={40}
                          className="rounded"
                        />
                      </div>
                      <div>
                        <CardTitle>UBA Gabon</CardTitle>
                        <CardDescription>Banque commerciale</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      UBA Gabon offre des solutions bancaires complètes pour les PME, incluant des prêts, des services
                      de gestion de trésorerie et des facilités de commerce international.
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
                        <span className="text-sm">contact@uba-gabon.com</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Globe className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">www.ubagroup.com/gabon</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Badge variant="outline" className="text-[#063a1e]">
                    Services bancaires PME
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 border-[#063a1e] text-[#063a1e] hover:bg-[#063a1e]/10"
                  >
                    Visiter le site <ExternalLink className="h-3 w-3" />
                  </Button>
                </CardFooter>
              </Card>

              {/* Banque 4 */}
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#063a1e]/10 rounded-md flex items-center justify-center">
                        <Image
                          src="/placeholder.svg?height=40&width=40"
                          alt="Logo banque"
                          width={40}
                          height={40}
                          className="rounded"
                        />
                      </div>
                      <div>
                        <CardTitle>Orabank Gabon</CardTitle>
                        <CardDescription>Banque commerciale</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Orabank Gabon propose des solutions de financement pour les PME, notamment des crédits
                      d'équipement, des crédits de trésorerie et des garanties bancaires.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">Avenue du Général de Gaulle, Libreville, Gabon</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Phone className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">+241 XX XX XX XX</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Mail className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">contact@orabank.net</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Globe className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">www.orabank.net/gabon</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Badge variant="outline" className="text-[#063a1e]">
                    Crédits PME
                  </Badge>
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

          {/* Microfinance */}
          <TabsContent value="microfinance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Microfinance 1 */}
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#063a1e]/10 rounded-md flex items-center justify-center">
                        <Image
                          src="/placeholder.svg?height=40&width=40"
                          alt="Logo microfinance"
                          width={40}
                          height={40}
                          className="rounded"
                        />
                      </div>
                      <div>
                        <CardTitle>FINAM</CardTitle>
                        <CardDescription>Institution de microfinance</CardDescription>
                      </div>
                    </div>
                    <Badge>Partenaire FEG</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      FINAM est une institution de microfinance qui propose des microcrédits aux TPE et PME gabonaises,
                      avec un accent particulier sur l'accompagnement des entrepreneurs.
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
                        <span className="text-sm">contact@finam.ga</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Globe className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">www.finam.ga</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Badge variant="outline" className="text-[#063a1e]">
                    Microcrédits
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 border-[#063a1e] text-[#063a1e] hover:bg-[#063a1e]/10"
                  >
                    Visiter le site <ExternalLink className="h-3 w-3" />
                  </Button>
                </CardFooter>
              </Card>

              {/* Microfinance 2 */}
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#063a1e]/10 rounded-md flex items-center justify-center">
                        <Image
                          src="/placeholder.svg?height=40&width=40"
                          alt="Logo microfinance"
                          width={40}
                          height={40}
                          className="rounded"
                        />
                      </div>
                      <div>
                        <CardTitle>LOXIA</CardTitle>
                        <CardDescription>Institution de microfinance</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      LOXIA est une institution de microfinance qui offre des services financiers adaptés aux petites
                      entreprises et aux entrepreneurs individuels au Gabon.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">Avenue de Cointet, Libreville, Gabon</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Phone className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">+241 XX XX XX XX</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Mail className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">contact@loxia.ga</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Globe className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">www.loxia.ga</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Badge variant="outline" className="text-[#063a1e]">
                    Microcrédits
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 border-[#063a1e] text-[#063a1e] hover:bg-[#063a1e]/10"
                  >
                    Visiter le site <ExternalLink className="h-3 w-3" />
                  </Button>
                </CardFooter>
              </Card>

              {/* Microfinance 3 */}
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#063a1e]/10 rounded-md flex items-center justify-center">
                        <Image
                          src="/placeholder.svg?height=40&width=40"
                          alt="Logo microfinance"
                          width={40}
                          height={40}
                          className="rounded"
                        />
                      </div>
                      <div>
                        <CardTitle>Express Union Gabon</CardTitle>
                        <CardDescription>Institution de microfinance</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Express Union Gabon propose des services de microfinance, notamment des microcrédits pour les
                      petits entrepreneurs et les commerçants.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">Quartier Montagne Sainte, Libreville, Gabon</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Phone className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">+241 XX XX XX XX</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Mail className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">contact@expressunion.ga</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Globe className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">www.expressunion.cm/gabon</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Badge variant="outline" className="text-[#063a1e]">
                    Microcrédits
                  </Badge>
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

          {/* Fonds d'investissement */}
          <TabsContent value="fonds" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Fonds 1 */}
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#063a1e]/10 rounded-md flex items-center justify-center">
                        <Image
                          src="/placeholder.svg?height=40&width=40"
                          alt="Logo fonds"
                          width={40}
                          height={40}
                          className="rounded"
                        />
                      </div>
                      <div>
                        <CardTitle>Fonds Gabonais d'Investissements Stratégiques (FGIS)</CardTitle>
                        <CardDescription>Fonds souverain</CardDescription>
                      </div>
                    </div>
                    <Badge>Partenaire FEG</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Le FGIS est le fonds souverain du Gabon qui investit dans des projets stratégiques, y compris dans
                      le développement des PME à fort potentiel de croissance.
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
                        <span className="text-sm">contact@fgis-gabon.com</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Globe className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">www.fgis-gabon.com</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Badge variant="outline" className="text-[#063a1e]">
                    Investissement stratégique
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 border-[#063a1e] text-[#063a1e] hover:bg-[#063a1e]/10"
                  >
                    Visiter le site <ExternalLink className="h-3 w-3" />
                  </Button>
                </CardFooter>
              </Card>

              {/* Fonds 2 */}
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#063a1e]/10 rounded-md flex items-center justify-center">
                        <Image
                          src="/placeholder.svg?height=40&width=40"
                          alt="Logo fonds"
                          width={40}
                          height={40}
                          className="rounded"
                        />
                      </div>
                      <div>
                        <CardTitle>Fonds d'Aide aux PME (FA-PME)</CardTitle>
                        <CardDescription>Fonds public</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Le Fonds d'Aide aux PME est un mécanisme public de financement destiné à soutenir la création, le
                      développement et la restructuration des PME gabonaises.
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
                        <span className="text-sm">contact@fapme.ga</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Globe className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">www.fapme.ga</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Badge variant="outline" className="text-[#063a1e]">
                    Subventions et prêts
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 border-[#063a1e] text-[#063a1e] hover:bg-[#063a1e]/10"
                  >
                    Visiter le site <ExternalLink className="h-3 w-3" />
                  </Button>
                </CardFooter>
              </Card>

              {/* Fonds 3 */}
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#063a1e]/10 rounded-md flex items-center justify-center">
                        <Image
                          src="/placeholder.svg?height=40&width=40"
                          alt="Logo fonds"
                          width={40}
                          height={40}
                          className="rounded"
                        />
                      </div>
                      <div>
                        <CardTitle>Gabon Invest</CardTitle>
                        <CardDescription>Fonds d'investissement privé</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Gabon Invest est un fonds d'investissement privé qui cible les PME gabonaises à fort potentiel de
                      croissance dans des secteurs stratégiques comme l'agro-industrie, les TIC et les services.
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
                        <span className="text-sm">contact@gaboninvest.com</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Globe className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">www.gaboninvest.com</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Badge variant="outline" className="text-[#063a1e]">
                    Capital-risque
                  </Badge>
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

          {/* Institutions publiques */}
          <TabsContent value="publiques" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Institution 1 */}
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#063a1e]/10 rounded-md flex items-center justify-center">
                        <Image
                          src="/placeholder.svg?height=40&width=40"
                          alt="Logo institution"
                          width={40}
                          height={40}
                          className="rounded"
                        />
                      </div>
                      <div>
                        <CardTitle>Agence Nationale de Promotion des Investissements (ANPI)</CardTitle>
                        <CardDescription>Agence gouvernementale</CardDescription>
                      </div>
                    </div>
                    <Badge>Partenaire FEG</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      L'ANPI est l'agence gouvernementale chargée de promouvoir les investissements au Gabon. Elle
                      facilite l'accès au financement pour les PME à travers divers programmes.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">Immeuble Arambo, Libreville, Gabon</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Phone className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">+241 XX XX XX XX</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Mail className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">contact@anpi-gabon.ga</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Globe className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">www.anpi-gabon.ga</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Badge variant="outline" className="text-[#063a1e]">
                    Facilitation d'investissements
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 border-[#063a1e] text-[#063a1e] hover:bg-[#063a1e]/10"
                  >
                    Visiter le site <ExternalLink className="h-3 w-3" />
                  </Button>
                </CardFooter>
              </Card>

              {/* Institution 2 */}
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#063a1e]/10 rounded-md flex items-center justify-center">
                        <Image
                          src="/placeholder.svg?height=40&width=40"
                          alt="Logo institution"
                          width={40}
                          height={40}
                          className="rounded"
                        />
                      </div>
                      <div>
                        <CardTitle>Ministère des PME</CardTitle>
                        <CardDescription>Institution gouvernementale</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Le Ministère des PME met en œuvre des programmes de financement et de soutien pour les petites et
                      moyennes entreprises gabonaises.
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
                        <span className="text-sm">contact@minpme.gouv.ga</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Globe className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">www.minpme.gouv.ga</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Badge variant="outline" className="text-[#063a1e]">
                    Programmes gouvernementaux
                  </Badge>
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
              <h3 className="text-xl font-bold text-[#063a1e] mb-2">Besoin d'aide pour trouver un financement ?</h3>
              <p className="text-muted-foreground">
                Nos experts peuvent vous aider à identifier les meilleures options de financement pour votre entreprise
                et vous accompagner dans vos démarches.
              </p>
            </div>
            <Button className="bg-[#063a1e] hover:bg-[#063a1e]/90 whitespace-nowrap">Prendre rendez-vous</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

