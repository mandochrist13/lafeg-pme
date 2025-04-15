"use client"

import { useState } from "react"
import { Search, Plus, Edit, Trash2, Eye, Download, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

// Données fictives pour les textes juridiques
const textesJuridiques = [
  {
    id: 1,
    titre: "Loi n°023/2023 portant mesures d'allègement fiscal pour les PME",
    type: "Loi",
    categorie: "Fiscalité",
    datePublication: "15/03/2024",
  
  },
  {
    id: 2,
    titre: "Décret n°2025-123 relatif à la fiscalité des PME",
    type: "Décret",
    categorie: "Fiscalité",
    datePublication: "10/05/2025",
  
  },
  {
    id: 3,
    titre: "Arrêté n°0045/MPME fixant les modalités d'application du régime simplifié d'imposition",
    type: "Arrêté",
    categorie: "Fiscalité",
    datePublication: "22/04/2025",

  },
  {
    id: 4,
    titre: "Acte uniforme OHADA relatif au droit des sociétés commerciales et du GIE",
    type: "Acte uniforme",
    categorie: "Création d'entreprise",
    datePublication: "30/01/2024",
  
  },
  {
    id: 5,
    titre: "Loi n°042/2024 sur la promotion des startups et de l'innovation",
    type: "Loi",
    categorie: "Innovation",
    datePublication: "05/02/2024",
   
  },
  {
    id: 6,
    titre: "Décret n°2024-089 relatif aux procédures simplifiées pour les PME",
    type: "Décret",
    categorie: "Procédures administratives",
    datePublication: "18/03/2024",
   
  },
  {
    id: 7,
    titre: "Loi n°031/2024 portant code du travail (révision)",
    type: "Loi",
    categorie: "Droit du travail",
    datePublication: "12/04/2024",
 
  },
  {
    id: 8,
    titre: "Arrêté n°0078/MFP relatif aux obligations comptables simplifiées des TPE/PME",
    type: "Arrêté",
    categorie: "Comptabilité",
    datePublication: "25/04/2024",

  },
  {
    id: 9,
    titre: "Décret n°2025-056 relatif aux marchés publics réservés aux PME",
    type: "Décret",
    categorie: "Marchés publics",
    datePublication: "03/05/2025",
  
  },
  {
    id: 10,
    titre: "Loi n°015/2025 sur la protection des données personnelles",
    type: "Loi",
    categorie: "Numérique",
    datePublication: "08/05/2025",
  
  },
]

export default function TextesJuridiquesAdmin() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [selectedCategorie, setSelectedCategorie] = useState("")
  const [selectedStatut, setSelectedStatut] = useState("")

  // Filtrer les textes juridiques
  const filteredTextes = textesJuridiques.filter((texte) => {
    const matchSearch = texte.titre.toLowerCase().includes(searchTerm.toLowerCase())
    const matchType = selectedType === "" || texte.type === selectedType
    const matchCategorie = selectedCategorie === "" || texte.categorie === selectedCategorie
    return matchSearch && matchType && matchCategorie
  })

  // Extraire les types, catégories et statuts uniques pour les filtres
  const types = [...new Set(textesJuridiques.map((texte) => texte.type))]
  const categories = [...new Set(textesJuridiques.map((texte) => texte.categorie))]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Textes juridiques</h1>
        <Button className="bg-[#063a1e] hover:bg-[#063a1e]/90">
          <Plus className="mr-2 h-4 w-4" /> Ajouter un texte
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher un texte juridique..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Type de texte" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  {types.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedCategorie} onValueChange={setSelectedCategorie}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  {categories.map((categorie) => (
                    <SelectItem key={categorie} value={categorie}>
                      {categorie}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {selectedType && (
              <Badge variant="outline" className="bg-[#063a1e]/10 border-[#063a1e]/30 gap-1">
                <span>Type: {selectedType}</span>
                <button className="text-xs" onClick={() => setSelectedType("")}>
                  ✕
                </button>
              </Badge>
            )}
            {selectedCategorie && (
              <Badge variant="outline" className="bg-[#063a1e]/10 border-[#063a1e]/30 gap-1">
                <span>Catégorie: {selectedCategorie}</span>
                <button className="text-xs" onClick={() => setSelectedCategorie("")}>
                  ✕
                </button>
              </Badge>
            )}
            {selectedStatut && (
              <Badge variant="outline" className="bg-[#063a1e]/10 border-[#063a1e]/30 gap-1">
                <span>Statut: {selectedStatut}</span>
                <button className="text-xs" onClick={() => setSelectedStatut("")}>
                  ✕
                </button>
              </Badge>
            )}
            {(selectedType || selectedCategorie || selectedStatut) && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs"
                onClick={() => {
                  setSelectedType("")
                  setSelectedCategorie("")
                  setSelectedStatut("")
                }}
              >
                Effacer tous les filtres
              </Button>
            )}
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[400px]">Titre</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Date de publication</TableHead>
                
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTextes.map((texte) => (
                  <TableRow key={texte.id}>
                    <TableCell className="font-medium">{texte.titre}</TableCell>
                    <TableCell>{texte.type}</TableCell>
                    <TableCell>{texte.categorie}</TableCell>
                    <TableCell>{texte.datePublication}</TableCell>
                  
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" /> Voir
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" /> Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" /> Télécharger
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" /> Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Affichage de {filteredTextes.length} sur {textesJuridiques.length} textes juridiques
            </p>
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
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

