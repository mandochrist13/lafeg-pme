import Link from "next/link";
import {
  ChevronRight,
  Search,
  Filter,
  FileText,
  Download,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function TextesJuridiques() {
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
            <span>Textes Juridiques</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container w-full py-8 ">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
            <div className=" hidden lg:block lg:w-64 md:hidden">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-[#063a1e]">Filtres</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Type de texte</h3>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="type1"
                          className="rounded text-[#063a1e]"
                        />
                        <label htmlFor="type1" className="text-sm">
                          Loi
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="type2"
                          className="rounded text-[#063a1e]"
                        />
                        <label htmlFor="type2" className="text-sm">
                          Décret
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="type3"
                          className="rounded text-[#063a1e]"
                        />
                        <label htmlFor="type3" className="text-sm">
                          Arrêté
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="type4"
                          className="rounded text-[#063a1e]"
                        />
                        <label htmlFor="type4" className="text-sm">
                          Code
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="type5"
                          className="rounded text-[#063a1e]"
                        />
                        <label htmlFor="type5" className="text-sm">
                          Acte uniforme OHADA
                        </label>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-[#063a1e] hover:bg-[#063a1e]/90">
                    Appliquer les filtres
                  </Button>
                </CardContent>
              </Card>
            </div>

          {/* Main Content */}
          <div className="flex-1 w-full">
            <div className="bg-white p-6 rounded-lg border ">
              <h1 className="text-2xl font-bold mb-6 text-[#063a1e]">
                Textes Juridiques pour les PME Gabonaises
              </h1>

              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Rechercher un texte juridique..."
                    className="pl-8"
                  />
                </div>
                <Select>
                  <SelectTrigger className="w-full md:w-[180px] gap-2 border-[#063a1e] text-[#063a1e] hover:bg-[#063a1e]/10">
                    <SelectValue placeholder="Trier par" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Plus récents</SelectItem>
                    <SelectItem value="old">Plus anciens</SelectItem>
                    <SelectItem value="az">A-Z</SelectItem>
                    <SelectItem value="za">Z-A</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Tabs defaultValue="pmes">
                <TabsList className="bg-gray-200 w-auto h-full flex flex-col md:flex-row justify-evenly items-center ">
                  <TabsTrigger
                    value="pmes"
                    className="w-full md:w-auto text-center px-4 py-2"
                  >
                    Textes pour les PME
                  </TabsTrigger>
                  <TabsTrigger
                    value="internationaux"
                    className="w-full md:w-auto text-center px-4 py-2"
                  >
                    Textes régionaux et internationaux
                  </TabsTrigger>
                  <TabsTrigger
                    value="administrations"
                    className="w-full md:w-auto text-center px-4 py-2"
                  >
                    Textes des administrations
                  </TabsTrigger>
                </TabsList>

                <TabsContent id="pmes" value="pmes">
                  <p className="text-sm text-muted-foreground mb-6 ">
                    Affichage de 1-10 sur 48 résultats
                  </p>

                  <div className="space-y-4 ">
                    {/* Exemples de textes pour PME */}
                    <Card className="hover:shadow-sm transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge className="bg-[#063a1e] text-white">
                                Loi
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                Publié le 15/03/2024
                              </span>
                            </div>
                            <h3 className="font-medium">
                              Loi n°023/2023 portant mesures d'allègement fiscal
                              pour les PME
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              Texte relatif aux mesures d'allègement fiscal pour
                              les petites et moyennes entreprises gabonaises.
                            </p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <Badge variant="outline" className="text-xs">
                                Fiscalité
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                PME
                              </Badge>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1 border-[#063a1e] text-[#063a1e] hover:bg-[#063a1e]/10"
                            >
                              <FileText className="h-4 w-4" />
                              <span>Lire</span>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1 border-[#063a1e] text-[#063a1e] hover:bg-[#063a1e]/10"
                            >
                              <Download className="h-4 w-4" />
                              <span>Télécharger</span>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="hover:shadow-sm transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge className="bg-[#063a1e] text-white">
                                Décret
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                Publié le 10/01/2024
                              </span>
                            </div>
                            <h3 className="font-medium">
                              Décret n°001/2024 fixant les modalités de création
                              des PME
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              Décret précisant les formalités administratives et
                              les conditions de création des PME au Gabon.
                            </p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <Badge variant="outline" className="text-xs">
                                Création d'entreprise
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                Formalités
                              </Badge>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1 border-[#063a1e] text-[#063a1e] hover:bg-[#063a1e]/10"
                            >
                              <FileText className="h-4 w-4" />
                              <span>Lire</span>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1 border-[#063a1e] text-[#063a1e] hover:bg-[#063a1e]/10"
                            >
                              <Download className="h-4 w-4" />
                              <span>Télécharger</span>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent id="internationaux" value="internationaux">
                  <p className="text-sm text-muted-foreground mb-6 ">
                    Affichage de 1-5 sur 12 résultats
                  </p>
                  <div className="space-y-4">
                    {/* Exemples de textes internationaux */}
                    <Card className="hover:shadow-sm transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge className="bg-[#063a1e] text-white">
                                Traité
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                Publié le 22/02/2023
                              </span>
                            </div>
                            <h3 className="font-medium">
                              Accord de libre-échange continental africain
                              (ZLECAF)
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              Traité établissant une zone de libre-échange
                              continentale en Afrique, avec implications pour
                              les PME gabonaises.
                            </p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <Badge variant="outline" className="text-xs">
                                Commerce international
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                CEMAC
                              </Badge>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1 border-[#063a1e] text-[#063a1e] hover:bg-[#063a1e]/10"
                            >
                              <FileText className="h-4 w-4" />
                              <span>Lire</span>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1 border-[#063a1e] text-[#063a1e] hover:bg-[#063a1e]/10"
                            >
                              <Download className="h-4 w-4" />
                              <span>Télécharger</span>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="hover:shadow-sm transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge className="bg-[#063a1e] text-white">
                                Directive
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                Publié le 05/12/2022
                              </span>
                            </div>
                            <h3 className="font-medium">
                              Directive CEMAC sur l'harmonisation des régimes
                              fiscaux
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              Directive visant à harmoniser les politiques
                              fiscales dans les pays membres de la CEMAC.
                            </p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <Badge variant="outline" className="text-xs">
                                Fiscalité
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                CEMAC
                              </Badge>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1 border-[#063a1e] text-[#063a1e] hover:bg-[#063a1e]/10"
                            >
                              <FileText className="h-4 w-4" />
                              <span>Lire</span>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1 border-[#063a1e] text-[#063a1e] hover:bg-[#063a1e]/10"
                            >
                              <Download className="h-4 w-4" />
                              <span>Télécharger</span>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent id="administrations" value="administrations">
                  <p className="text-sm text-muted-foreground mb-6 ">
                    Affichage de 1-8 sur 8 résultats
                  </p>
                  <div className="space-y-4">
                    {/* Exemples de textes des administrations */}
                    <Card className="hover:shadow-sm transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge className="bg-[#063a1e] text-white">
                                Circulaire
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                Publié le 30/04/2024
                              </span>
                            </div>
                            <h3 className="font-medium">
                              Circulaire DGID n°2024-001 sur les déclarations
                              fiscales des PME
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              Instructions relatives aux nouvelles modalités de
                              déclaration fiscale pour les petites entreprises.
                            </p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <Badge variant="outline" className="text-xs">
                                Fiscalité
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                DGID
                              </Badge>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1 border-[#063a1e] text-[#063a1e] hover:bg-[#063a1e]/10"
                            >
                              <FileText className="h-4 w-4" />
                              <span>Lire</span>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1 border-[#063a1e] text-[#063a1e] hover:bg-[#063a1e]/10"
                            >
                              <Download className="h-4 w-4" />
                              <span>Télécharger</span>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="hover:shadow-sm transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge className="bg-[#063a1e] text-white">
                                Arrêté
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                Publié le 15/03/2024
                              </span>
                            </div>
                            <h3 className="font-medium">
                              Arrêté ministériel n°045/MEF/2024 relatif aux
                              seuils PME
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              Définition des seuils chiffrés pour la
                              qualification des entreprises en tant que PME au
                              Gabon.
                            </p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <Badge variant="outline" className="text-xs">
                                Classification
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                MEF
                              </Badge>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1 border-[#063a1e] text-[#063a1e] hover:bg-[#063a1e]/10"
                            >
                              <FileText className="h-4 w-4" />
                              <span>Lire</span>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1 border-[#063a1e] text-[#063a1e] hover:bg-[#063a1e]/10"
                            >
                              <Download className="h-4 w-4" />
                              <span>Télécharger</span>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Pagination */}
              <div className="mt-6 ">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
