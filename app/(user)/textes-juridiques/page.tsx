"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ChevronRight, Search, FileText, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

// Données de textes juridiques pour la démonstration
const textesJuridiques = [
  {
    id: 1,
    type: "Loi",
    date: "15/03/2024",
    titre: "Loi n°023/2023 portant mesures d'allègement fiscal pour les PME",
    description: "Texte relatif aux mesures d'allègement fiscal pour les petites et moyennes entreprises gabonaises.",
    tags: ["Fiscalité", "PME"],
    categorie: "pmes",
  },
  {
    id: 2,
    type: "Décret",
    date: "10/01/2024",
    titre: "Décret n°001/2024 fixant les modalités de création des PME",
    description: "Décret précisant les formalités administratives et les conditions de création des PME au Gabon.",
    tags: ["Création d'entreprise", "Formalités"],
    categorie: "pmes",
  },
  {
    id: 3,
    type: "Traité",
    date: "22/02/2023",
    titre: "Accord de libre-échange continental africain (ZLECAF)",
    description:
      "Traité établissant une zone de libre-échange continentale en Afrique, avec implications pour les PME gabonaises.",
    tags: ["Commerce international", "CEMAC"],
    categorie: "internationaux",
  },
  {
    id: 4,
    type: "Directive",
    date: "05/12/2022",
    titre: "Directive CEMAC sur l'harmonisation des régimes fiscaux",
    description: "Directive visant à harmoniser les politiques fiscales dans les pays membres de la CEMAC.",
    tags: ["Fiscalité", "CEMAC"],
    categorie: "internationaux",
  },
  {
    id: 5,
    type: "Circulaire",
    date: "30/04/2024",
    titre: "Circulaire DGID n°2024-001 sur les déclarations fiscales des PME",
    description: "Instructions relatives aux nouvelles modalités de déclaration fiscale pour les petites entreprises.",
    tags: ["Fiscalité", "DGID"],
    categorie: "administrations",
  },
  {
    id: 6,
    type: "Arrêté",
    date: "15/03/2024",
    titre: "Arrêté ministériel n°045/MEF/2024 relatif aux seuils PME",
    description: "Définition des seuils chiffrés pour la qualification des entreprises en tant que PME au Gabon.",
    tags: ["Classification", "MEF"],
    categorie: "administrations",
  },
]

export default function TextesJuridiques() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("pmes")
  const [sortOption, setSortOption] = useState("recent")
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])

  // Fonction pour gérer la recherche
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  // Fonction pour gérer le changement d'onglet
  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  // Fonction pour gérer le tri
  const handleSort = (value: string) => {
    setSortOption(value)
  }

  // Fonction pour gérer les filtres de type
  const handleTypeFilter = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type))
    } else {
      setSelectedTypes([...selectedTypes, type])
    }
  }

  // Fonction pour appliquer tous les filtres
  const applyFilters = () => {
    // Cette fonction est appelée lorsque le bouton "Appliquer les filtres" est cliqué
    // Dans cette implémentation, les filtres sont déjà appliqués en temps réel
  }

  // Filtrer les textes en fonction de la recherche et des filtres
  const filteredTextes = textesJuridiques.filter((texte) => {
    // Filtre par onglet actif
    if (texte.categorie !== activeTab) return false

    // Filtre par terme de recherche
    if (
      searchTerm &&
      !texte.titre.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !texte.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !texte.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    ) {
      return false
    }

    // Filtre par type de texte
    if (selectedTypes.length > 0 && !selectedTypes.includes(texte.type)) {
      return false
    }

    return true
  })

  // Trier les textes
  const sortedTextes = [...filteredTextes].sort((a, b) => {
    switch (sortOption) {
      case "recent":
        return (
          new Date(b.date.split("/").reverse().join("-")).getTime() -
          new Date(a.date.split("/").reverse().join("-")).getTime()
        )
      case "old":
        return (
          new Date(a.date.split("/").reverse().join("-")).getTime() -
          new Date(b.date.split("/").reverse().join("-")).getTime()
        )
      case "az":
        return a.titre.localeCompare(b.titre)
      case "za":
        return b.titre.localeCompare(a.titre)
      default:
        return 0
    }
  })

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
          <div className="hidden lg:block lg:w-64 md:hidden">
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
                        checked={selectedTypes.includes("Loi")}
                        onChange={() => handleTypeFilter("Loi")}
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
                        checked={selectedTypes.includes("Décret")}
                        onChange={() => handleTypeFilter("Décret")}
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
                        checked={selectedTypes.includes("Arrêté")}
                        onChange={() => handleTypeFilter("Arrêté")}
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
                        checked={selectedTypes.includes("Code")}
                        onChange={() => handleTypeFilter("Code")}
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
                        checked={selectedTypes.includes("Acte uniforme OHADA")}
                        onChange={() => handleTypeFilter("Acte uniforme OHADA")}
                      />
                      <label htmlFor="type5" className="text-sm">
                        Acte uniforme OHADA
                      </label>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-[#063a1e] hover:bg-[#063a1e]/90" onClick={applyFilters}>
                  Appliquer les filtres
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1 w-full">
            <div className="bg-white p-6 rounded-lg border ">
              <h1 className="text-2xl font-bold mb-6 text-[#063a1e]">Textes Juridiques pour les PME Gabonaises</h1>

              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Rechercher un texte juridique..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
                <Select value={sortOption} onValueChange={handleSort}>
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

              <Tabs defaultValue="pmes" value={activeTab} onValueChange={handleTabChange}>
                <TabsList className="bg-gray-200 w-auto h-full flex flex-col md:flex-row justify-evenly items-center ">
                  <TabsTrigger value="pmes" className="w-full md:w-auto text-center px-4 py-2">
                    Textes pour les PME
                  </TabsTrigger>
                  <TabsTrigger value="internationaux" className="w-full md:w-auto text-center px-4 py-2">
                    Textes régionaux et internationaux
                  </TabsTrigger>
                  <TabsTrigger value="administrations" className="w-full md:w-auto text-center px-4 py-2">
                    Textes des administrations
                  </TabsTrigger>
                </TabsList>

                {["pmes", "internationaux", "administrations"].map((tab) => (
                  <TabsContent key={tab} id={tab} value={tab}>
                    <p className="text-sm text-muted-foreground mb-6 ">
                      Affichage de {sortedTextes.length > 0 ? `1-${sortedTextes.length}` : "0"} sur{" "}
                      {textesJuridiques.filter((t) => t.categorie === tab).length} résultats
                      {searchTerm && ` pour "${searchTerm}"`}
                    </p>

                    {sortedTextes.length > 0 ? (
                      <div className="space-y-4">
                        {sortedTextes.map((texte) => (
                          <Card key={texte.id} className="hover:shadow-sm transition-shadow">
                            <CardContent className="p-4">
                              <div className="flex flex-col md:flex-row md:items-center gap-4">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <Badge className="bg-[#063a1e] text-white">{texte.type}</Badge>
                                    <span className="text-sm text-muted-foreground">Publié le {texte.date}</span>
                                  </div>
                                  <h3 className="font-medium">{texte.titre}</h3>
                                  <p className="text-sm text-muted-foreground mt-1">{texte.description}</p>
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    {texte.tags.map((tag, index) => (
                                      <Badge key={index} variant="outline" className="text-xs">
                                        {tag}
                                      </Badge>
                                    ))}
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
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">Aucun résultat trouvé pour votre recherche.</p>
                      </div>
                    )}
                  </TabsContent>
                ))}
              </Tabs>

              {/* Pagination */}
              {sortedTextes.length > 0 && (
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
