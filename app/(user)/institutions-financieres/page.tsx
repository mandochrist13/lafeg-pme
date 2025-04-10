import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  Search,
  ExternalLink,
  MapPin,
  Phone,
  Mail,
  Globe,
  Facebook,
  Linkedin,
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
import banque from "@/components/data/institution/banque";
import fond from "@/components/data/institution/fond";
import micro from "@/components/data/institution/micro";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
            <h1 className="text-3xl font-bold mb-4">
              Institutions Financières pour les PME Gabonaises
            </h1>
            <p className="text-white/90 text-lg mb-6">
              Découvrez les banques, établissements de microfinance et fonds
              d'investissement qui peuvent financer votre entreprise au Gabon.
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
              {banque.map((item) => (
                <Card
                  key={item.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-[#063a1e]/10 rounded-md flex items-center justify-center">
                          <Image
                            src={item.logo}
                            alt="Logo banque"
                            width={1000}
                            height={1000}
                            className="rounded bg-cover bg-center w-full h-full"
                          />
                        </div>
                        <div>
                          <CardTitle>{item.title}</CardTitle>
                          <CardDescription>{item.type}</CardDescription>
                        </div>
                      </div>
                      <div>{item.partenaire}</div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        {item.description}{" "}
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-[#063a1e] mt-0.5" />
                          <span className="text-sm"> {item.adresse} </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Phone className="h-4 w-4 text-[#063a1e] mt-0.5" />
                          <a
                            href={`tel:${item.tel}`}
                            className="text-sm hover:underline underline-offset-4"
                          >
                            {item.tel}
                          </a>
                        </div>
                        <div className="flex items-start gap-2">
                          <Mail className="h-4 w-4 text-[#063a1e] mt-0.5" />
                          <a
                            href={`mailto:${item.mail}`}
                            className="text-sm hover:underline underline-offset-4"
                          >
                            {" "}
                            {item.mail}{" "}
                          </a>
                        </div>
                        <Link
                          target="_blank"
                          href={item.rs1}
                          className="flex text-[rgb(6,58,30)] hover:underline underline-offset-4 items-start gap-2"
                        >
                          {/* <Facebook className="h-4 w-4 text-[rgb(6,58,30)] mt-0.5" />
                          <span className="text-sm">Visiter la page</span> */}
                          {item.textrs1}
                        </Link>
                        <Link
                          target="_blank"
                          href={item.rs2}
                          className="flex text-[rgb(6,58,30)] hover:underline underline-offset-4 items-start gap-2"
                        >
                          {item.textrs2}
                          {/* <Linkedin className="h-4 w-4 text-[#063a1e] mt-0.5" />
                          <span className="text-sm">Visiter la page</span> */}
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Badge variant="outline" className="text-[#063a1e]">
                      Prêts PME
                    </Badge>
                    <Link target="_blank" href={item.site}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1 border-[#063a1e] text-[#063a1e] hover:bg-[#063a1e]/10"
                      >
                        Visiter le site <ExternalLink className="h-3 w-3" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
              {/* <Card className="hover:shadow-md transition-shadow">
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
                        <CardTitle>
                          Banque Gabonaise de Développement (BGD)
                        </CardTitle>
                        <CardDescription>
                          Banque publique de développement
                        </CardDescription>
                      </div>
                    </div>
                    <Badge>Partenaire FEG</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      La Banque Gabonaise de Développement (BGD) est une
                      institution financière publique qui accompagne le
                      développement des PME/PMI gabonaises à travers des
                      financements adaptés.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">
                          Boulevard de l'Indépendance, Libreville, Gabon
                        </span>
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
              </Card> */}

              {/* Banque 4 
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
                      Orabank Gabon propose des solutions de financement pour
                      les PME, notamment des crédits d'équipement, des crédits
                      de trésorerie et des garanties bancaires.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">
                          Avenue du Général de Gaulle, Libreville, Gabon
                        </span>
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
              </Card>*/}
            </div>
          </TabsContent>

          {/* Microfinance */}
          <TabsContent value="microfinance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Microfinance 1 */}
              {micro.map((item) => (
                <Card
                  key={item.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-[#063a1e]/10 rounded-md flex items-center justify-center">
                          <Image
                            src={item.logo}
                            alt="Logo banque"
                            width={1000}
                            height={1000}
                            className="rounded bg-cover bg-center w-full h-full"
                          />
                        </div>
                        <div>
                          <CardTitle>{item.title}</CardTitle>
                          <CardDescription>{item.type}</CardDescription>
                        </div>
                      </div>
                      <div>{item.partenaire}</div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        {item.description}{" "}
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-[#063a1e] mt-0.5" />
                          <span className="text-sm"> {item.adresse} </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Phone className="h-4 w-4 text-[#063a1e] mt-0.5" />
                          <a
                            href={`tel:${item.tel}`}
                            className="text-sm hover:underline underline-offset-4"
                          >
                            {item.tel}
                          </a>
                        </div>
                        <div className="flex items-start gap-2">
                          <Mail className="h-4 w-4 text-[#063a1e] mt-0.5" />
                          <a
                            href={`mailto:${item.mail}`}
                            className="text-sm hover:underline underline-offset-4"
                          >
                            {" "}
                            {item.mail}{" "}
                          </a>
                        </div>
                        <Link
                          target="_blank"
                          href={item.rs1}
                          className="flex text-[rgb(6,58,30)] hover:underline underline-offset-4 items-start gap-2"
                        >
                          {/* <Facebook className="h-4 w-4 text-[rgb(6,58,30)] mt-0.5" />
                          <span className="text-sm">Visiter la page</span> */}
                          {item.textrs1}
                        </Link>
                        <Link
                          target="_blank"
                          href={item.rs2}
                          className="flex text-[rgb(6,58,30)] hover:underline underline-offset-4 items-start gap-2"
                        >
                          {item.textrs2}
                          {/* <Linkedin className="h-4 w-4 text-[#063a1e] mt-0.5" />
                          <span className="text-sm">Visiter la page</span> */}
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Badge variant="outline" className="text-[#063a1e]">
                      Prêts PME
                    </Badge>
                    <Link target="_blank" href={item.site}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1 border-[#063a1e] text-[#063a1e] hover:bg-[#063a1e]/10"
                      >
                        Visiter le site <ExternalLink className="h-3 w-3" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}

              {/* Microfinance 3 
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
                        <CardDescription>
                          Institution de microfinance
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Express Union Gabon propose des services de microfinance,
                      notamment des microcrédits pour les petits entrepreneurs
                      et les commerçants.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">
                          Quartier Montagne Sainte, Libreville, Gabon
                        </span>
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
                        <span className="text-sm">
                          www.expressunion.cm/gabon
                        </span>
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
              </Card>*/}
            </div>
          </TabsContent>

          {/* Fonds d'investissement */}
          <TabsContent value="fonds" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Fonds 1 
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
                        <CardTitle>
                          Fonds Gabonais d'Investissements Stratégiques (FGIS)
                        </CardTitle>
                        <CardDescription>Fonds souverain</CardDescription>
                      </div>
                    </div>
                    <Badge>Partenaire FEG</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Le FGIS est le fonds souverain du Gabon qui investit dans
                      des projets stratégiques, y compris dans le développement
                      des PME à fort potentiel de croissance.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">
                          Boulevard Triomphal, Libreville, Gabon
                        </span>
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
              </Card> */}
              {fond.map((item) => (
                <Card
                  key={item.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-[#063a1e]/10 rounded-md flex items-center justify-center">
                          <Image
                            src={item.logo}
                            alt="Logo banque"
                            width={1000}
                            height={1000}
                            className="rounded bg-cover bg-center w-full h-full"
                          />
                        </div>
                        <div>
                          <CardTitle>{item.title}</CardTitle>
                          <CardDescription>{item.type}</CardDescription>
                        </div>
                      </div>
                      <div>{item.partenaire}</div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        {item.description}{" "}
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-[#063a1e] mt-0.5" />
                          <span className="text-sm"> {item.adresse} </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Phone className="h-4 w-4 text-[#063a1e] mt-0.5" />
                          <a
                            href={`tel:${item.tel}`}
                            className="text-sm hover:underline underline-offset-4"
                          >
                            {item.tel}
                          </a>
                        </div>
                        <div className="flex items-start gap-2">
                          <Mail className="h-4 w-4 text-[#063a1e] mt-0.5" />
                          <a
                            href={`mailto:${item.mail}`}
                            className="text-sm hover:underline underline-offset-4"
                          >
                            {" "}
                            {item.mail}{" "}
                          </a>
                        </div>
                        <Link
                          target="_blank"
                             href={item.rs1}
                          className="flex text-[rgb(6,58,30)] hover:underline underline-offset-4 items-start gap-2"
                        >
                          {item.textrs1}
                        </Link>
                        <Link
                          target="_blank"
                          href={item.rs2}
                          className="flex text-[rgb(6,58,30)] hover:underline underline-offset-4 items-start gap-2"
                        >
                          {item.textrs2}
                             </Link>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Badge variant="outline" className="text-[#063a1e]">
                      Prêts PME
                    </Badge>
                    <Link target="_blank" href={item.site}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1 border-[#063a1e] text-[#063a1e] hover:bg-[#063a1e]/10"
                      >
                        Visiter le site <ExternalLink className="h-3 w-3" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Institutions publiques */}
          <TabsContent value="publiques" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Institution 1 
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
                        <CardTitle>
                          Agence Nationale de Promotion des Investissements
                          (ANPI)
                        </CardTitle>
                        <CardDescription>
                          Agence gouvernementale
                        </CardDescription>
                      </div>
                    </div>
                    <Badge>Partenaire FEG</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      L'ANPI est l'agence gouvernementale chargée de promouvoir
                      les investissements au Gabon. Elle facilite l'accès au
                      financement pour les PME à travers divers programmes.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-[#063a1e] mt-0.5" />
                        <span className="text-sm">
                          Immeuble Arambo, Libreville, Gabon
                        </span>
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
              </Card> */}
            </div>
          </TabsContent>
        </Tabs>
        {/* CTA Section */}
        <div className="mt-12 bg-[#063a1e]/10 p-6 rounded-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-[#063a1e] mb-2">
                Trouvez rapidement le bon contact pour vos besoins en
                financement.
              </h3>
              <p className="text-muted-foreground">
                Abonnez-vous à notre newsletter pour connaître quels sont les
                institutions utiles aux PME, avec leurs coordonnées et une
                description de leurs services. Accédez facilement à toutes ces
                informations depuis notre site.
              </p>
            </div>
            <Link href="/#subscription">
              <Button className="bg-[#063a1e] hover:bg-[#063a1e]/90 whitespace-nowrap">
                S'abonner à la newsletter
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
