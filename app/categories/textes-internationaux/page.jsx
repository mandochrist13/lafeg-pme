import Link from "next/link"
import { ChevronRight, Search, Filter, FileText, Download, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default function TextesInternationaux() {
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
            <Link href="/categories" className="hover:text-[#063a1e]">
              Catégories
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span>Textes juridiques internationaux</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-[#063a1e]">Filtres</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Organisations</h3>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="org1" className="rounded text-[#063a1e]" />
                      <label htmlFor="org1" className="text-sm">
                        OHADA
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="org2" className="rounded text-[#063a1e]" />
                      <label htmlFor="org2" className="text-sm">
                        CEMAC
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="org3" className="rounded text-[#063a1e]" />
                      <label htmlFor="org3" className="text-sm">
                        CIMA
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="org4" className="rounded text-[#063a1e]" />
                      <label htmlFor="org4" className="text-sm">
                        OAPI
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="org5" className="rounded text-[#063a1e]" />
                      <label htmlFor="org5" className="text-sm">
                        ONU
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Type de texte</h3>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="type1" className="rounded text-[#063a1e]" />
                      <label htmlFor="type1" className="text-sm">
                        Acte uniforme
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="type2" className="rounded text-[#063a1e]" />
                      <label htmlFor="type2" className="text-sm">
                        Règlement
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="type3" className="rounded text-[#063a1e]" />
                      <label htmlFor="type3" className="text-sm">
                        Directive
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="type4" className="rounded text-[#063a1e]" />
                      <label htmlFor="type4" className="text-sm">
                        Convention
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="type5" className="rounded text-[#063a1e]" />
                      <label htmlFor="type5" className="text-sm">
                        Traité
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Date de publication</h3>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <input type="radio" name="date" id="date1" className="rounded text-[#063a1e]" />
                      <label htmlFor="date1" className="text-sm">
                        Tous
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="radio" name="date" id="date2" className="rounded text-[#063a1e]" />
                      <label htmlFor="date2" className="text-sm">
                        Derniers 3 mois
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="radio" name="date" id="date3" className="rounded text-[#063a1e]" />
                      <label htmlFor="date3" className="text-sm">
                        Dernière année
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="radio" name="date" id="date4" className="rounded text-[#063a1e]" />
                      <label htmlFor="date4" className="text-sm">
                        Dernières 5 années
                      </label>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-[#063a1e] hover:bg-[#063a1e]/90">Appliquer les filtres</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Ressources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link href="#" className="flex items-center gap-2 text-sm hover:text-primary">
                  <FileText className="h-4 w-4" />
                  <span>Guides d'application</span>
                </Link>
                <Link href="#" className="flex items-center gap-2 text-sm hover:text-primary">
                  <Download className="h-4 w-4" />
                  <span>Modèles de documents</span>
                </Link>
                <Link href="#" className="flex items-center gap-2 text-sm hover:text-primary">
                  <ExternalLink className="h-4 w-4" />
                  <span>Sites officiels</span>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white p-6 rounded-lg border mb-6">
              <h1 className="text-2xl font-bold mb-6 text-[#063a1e]">Textes Juridiques Internationaux</h1>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Rechercher un texte juridique..." className="pl-8" />
                </div>
                <Select>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Trier par" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Plus récents</SelectItem>
                    <SelectItem value="old">Plus anciens</SelectItem>
                    <SelectItem value="az">A-Z</SelectItem>
                    <SelectItem value="za">Z-A</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="gap-2 border-[#063a1e] text-[#063a1e] hover:bg-[#063a1e]/10">
                  <Filter className="h-4 w-4" />
                  <span className="hidden md:inline">Filtres avancés</span>
                </Button>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="outline" className="bg-[#063a1e]/10 border-[#063a1e]/30">
                  OHADA
                </Badge>
                <Badge variant="outline" className="bg-[#063a1e]/10 border-[#063a1e]/30">
                  Acte uniforme
                </Badge>
                <Badge variant="outline" className="bg-[#063a1e]/10 border-[#063a1e]/30">
                  2020-2025
                </Badge>
                <Badge variant="outline" className="bg-[#063a1e]/10 border-[#063a1e]/30 gap-1">
                  <span>Filtres actifs</span>
                  <button className="text-xs">✕</button>
                </Badge>
              </div>

              <p className="text-sm text-muted-foreground mb-6">Affichage de 1-10 sur 38 résultats</p>

              {/* Results */}
              <div className="space-y-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                  <Card key={item} className="hover:shadow-sm transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className="bg-[#063a1e] text-white">Acte uniforme</Badge>
                            <span className="text-sm text-muted-foreground">Publié le 30/01/2024</span>
                          </div>
                          <h3 className="font-medium">
                            Acte uniforme OHADA relatif au droit des sociétés commerciales et du GIE
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Texte régissant la création, le fonctionnement et la dissolution des sociétés commerciales
                            et des groupements d'intérêt économique dans l'espace OHADA.
                          </p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Badge variant="outline" className="text-xs">
                              OHADA
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              Création d'entreprise
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
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-6">
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
  )
}

