"use client"
import { useState } from "react"
import { Plus, Search, Filter, MoreHorizontal, Pencil, Trash2, Eye, CheckCircle2, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

// Interface pour les institutions financières
interface Institution {
  id: number
  nom: string
  type: string
  adresse: string
  telephone: string
  email: string
  site_web: string
  description: string
  services: string
  date_ajout: string
}

// Interface pour la nouvelle institution
interface NewInstitution {
  nom: string
  type: string
  adresse: string
  telephone: string
  email: string
  site_web: string
  description: string
  services: string
}

// Données fictives pour les institutions financières
const institutionsData: Institution[] = [
  {
    id: 1,
    nom: "Banque Gabonaise de Développement (BGD)",
    type: "Banque publique",
    adresse: "Boulevard de l'Indépendance, Libreville",
    telephone: "+241 77 12 34 56",
    email: "contact@bgd.ga",
    site_web: "https://www.bgd.ga",
    description:
      "La Banque Gabonaise de Développement (BGD) est une institution financière publique qui accompagne le développement des PME/PMI gabonaises à travers des financements adaptés.",
    services: "Prêts d'investissement, Crédit d'exploitation, Garanties bancaires",
    date_ajout: "2023-05-10",
  },
  {
    id: 2,
    nom: "BGFI Bank Gabon",
    type: "Banque commerciale",
    adresse: "Boulevard Georges Rawiri, Libreville",
    telephone: "+241 77 98 76 54",
    email: "contact@bgfibank.ga",
    site_web: "https://www.bgfibank.ga",
    description:
      "BGFI Bank Gabon est une banque commerciale offrant une gamme complète de services financiers aux entreprises et aux particuliers.",
    services: "Comptes bancaires, Prêts commerciaux, Services de trésorerie",
    date_ajout: "2023-04-15",
  },
  {
    id: 3,
    nom: "Fonds Gabonais d'Investissements Stratégiques (FGIS)",
    type: "Fonds d'investissement",
    adresse: "Quartier Glass, Libreville",
    telephone: "+241 77 45 67 89",
    email: "info@fgis.ga",
    site_web: "https://www.fgis.ga",
    description:
      "Le FGIS est un fonds souverain gabonais qui investit dans des projets stratégiques pour le développement économique du pays.",
    services: "Investissements en capital, Financement de projets, Partenariats public-privé",
    date_ajout: "2023-06-20",
  },
  {
    id: 4,
    nom: "Orabank Gabon",
    type: "Banque commerciale",
    adresse: "Avenue du Colonel Parant, Libreville",
    telephone: "+241 77 23 45 67",
    email: "contact@orabank.ga",
    site_web: "https://www.orabank.ga",
    description:
      "Orabank Gabon est une banque commerciale offrant des services financiers aux entreprises et aux particuliers.",
    services: "Comptes bancaires, Prêts, Services de paiement",
    date_ajout: "2023-03-05",
  },
  {
    id: 5,
    nom: "Finam Gabon",
    type: "Microfinance",
    adresse: "Quartier Lalala, Libreville",
    telephone: "+241 77 34 56 78",
    email: "info@finam.ga",
    site_web: "https://www.finam.ga",
    description:
      "Finam Gabon est une institution de microfinance qui offre des services financiers aux micro-entrepreneurs et aux PME.",
    services: "Microcrédits, Épargne, Transferts d'argent",
    date_ajout: "2023-02-18",
  },
]

export default function InstitutionsPage() {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [typeFilter, setTypeFilter] = useState<string>("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false)
  const [selectedInstitution, setSelectedInstitution] = useState<Institution | null>(null)
  const [newInstitution, setNewInstitution] = useState<NewInstitution>({
    nom: "",
    type: "",
    adresse: "",
    telephone: "",
    email: "",
    site_web: "",
    description: "",
    services: "",
  })

  // Filtrer les institutions en fonction des critères de recherche
  const filteredInstitutions = institutionsData.filter((institution) => {
    const matchesSearch =
      institution.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      institution.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "" || institution.type === typeFilter
  })

  // Gérer l'édition d'une institution
  const handleEdit = (institution: Institution) => {
    setSelectedInstitution(institution)
    setIsEditDialogOpen(true)
  }

  // Gérer la suppression d'une institution
  const handleDelete = (institution: Institution) => {
    setSelectedInstitution(institution)
    setIsDeleteDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Institutions financières</h1>
          <p className="text-muted-foreground">Gérez les institutions financières présentes sur la plateforme</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#063a1e] hover:bg-[#063a1e]/90">
              <Plus className="mr-2 h-4 w-4" /> Ajouter une institution
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Ajouter une institution financière</DialogTitle>
              <DialogDescription>
                Remplissez le formulaire ci-dessous pour ajouter une nouvelle institution financière.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="nom" className="text-sm font-medium">
                    Nom de l'institution
                  </label>
                  <Input
                    id="nom"
                    value={newInstitution.nom}
                    onChange={(e) => setNewInstitution({ ...newInstitution, nom: e.target.value })}
                    placeholder="Ex: Banque Gabonaise de Développement"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="type" className="text-sm font-medium">
                    Type d'institution
                  </label>
                  <Select
                    value={newInstitution.type}
                    onValueChange={(value) => setNewInstitution({ ...newInstitution, type: value })}
                  >
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Sélectionner un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Banque publique">Banque publique</SelectItem>
                      <SelectItem value="Banque commerciale">Banque commerciale</SelectItem>
                      <SelectItem value="Microfinance">Microfinance</SelectItem>
                      <SelectItem value="Fonds d'investissement">Fonds d'investissement</SelectItem>
                      <SelectItem value="Institution publique">Institution publique</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="telephone" className="text-sm font-medium">
                    Téléphone
                  </label>
                  <Input
                    id="telephone"
                    value={newInstitution.telephone}
                    onChange={(e) => setNewInstitution({ ...newInstitution, telephone: e.target.value })}
                    placeholder="Ex: +241 77 12 34 56"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={newInstitution.email}
                    onChange={(e) => setNewInstitution({ ...newInstitution, email: e.target.value })}
                    placeholder="Ex: contact@institution.ga"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="adresse" className="text-sm font-medium">
                  Adresse
                </label>
                <Input
                  id="adresse"
                  value={newInstitution.adresse}
                  onChange={(e) => setNewInstitution({ ...newInstitution, adresse: e.target.value })}
                  placeholder="Ex: Boulevard de l'Indépendance, Libreville"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="site_web" className="text-sm font-medium">
                  Site web
                </label>
                <Input
                  id="site_web"
                  value={newInstitution.site_web}
                  onChange={(e) => setNewInstitution({ ...newInstitution, site_web: e.target.value })}
                  placeholder="Ex: https://www.institution.ga"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <textarea
                  id="description"
                  className="w-full min-h-[100px] p-2 border rounded-md"
                  value={newInstitution.description}
                  onChange={(e) => setNewInstitution({ ...newInstitution, description: e.target.value })}
                  placeholder="Description de l'institution financière..."
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="services" className="text-sm font-medium">
                  Services offerts
                </label>
                <textarea
                  id="services"
                  className="w-full min-h-[80px] p-2 border rounded-md"
                  value={newInstitution.services}
                  onChange={(e) => setNewInstitution({ ...newInstitution, services: e.target.value })}
                  placeholder="Liste des services offerts par l'institution..."
                />
              </div>

            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Annuler
              </Button>
              <Button className="bg-[#063a1e] hover:bg-[#063a1e]/90" onClick={() => setIsAddDialogOpen(false)}>
                Ajouter l'institution
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filtres et recherche */}
      <Card>
        <CardContent className="p-6">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <label htmlFor="search" className="text-sm font-medium">
                Rechercher
              </label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Rechercher une institution..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="type-filter" className="text-sm font-medium">
                Type d'institution
              </label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger id="type-filter">
                  <SelectValue placeholder="Tous les types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="Banque publique">Banque publique</SelectItem>
                  <SelectItem value="Banque commerciale">Banque commerciale</SelectItem>
                  <SelectItem value="Microfinance">Microfinance</SelectItem>
                  <SelectItem value="Fonds d'investissement">Fonds d'investissement</SelectItem>
                  <SelectItem value="Institution publique">Institution publique</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSearchTerm("")
                  setTypeFilter("")
                }}
              >
                <Filter className="mr-2 h-4 w-4" /> Réinitialiser les filtres
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liste des institutions */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des institutions financières</CardTitle>
          <CardDescription>{filteredInstitutions.length} institution(s) trouvée(s)</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Nom</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInstitutions.map((institution) => (
                <TableRow key={institution.id}>
                  <TableCell className="font-medium">{institution.nom}</TableCell>
                  <TableCell>{institution.type}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm">{institution.telephone}</div>
                      <div className="text-sm text-muted-foreground">{institution.email}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Ouvrir le menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => window.open(`/institutions-financieres/${institution.id}`, "_blank")}
                        >
                          <Eye className="mr-2 h-4 w-4" /> Voir
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(institution)}>
                          <Pencil className="mr-2 h-4 w-4" /> Modifier
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDelete(institution)} className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" /> Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Affichage de {filteredInstitutions.length} sur {institutionsData.length} institutions
          </div>
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
        </CardFooter>
      </Card>

      {/* Dialogue de modification */}
      {selectedInstitution && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Modifier une institution financière</DialogTitle>
              <DialogDescription>Modifiez les informations de l'institution financière.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="edit-nom" className="text-sm font-medium">
                    Nom de l'institution
                  </label>
                  <Input id="edit-nom" defaultValue={selectedInstitution.nom} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="edit-type" className="text-sm font-medium">
                    Type d'institution
                  </label>
                  <Select defaultValue={selectedInstitution.type}>
                    <SelectTrigger id="edit-type">
                      <SelectValue placeholder={selectedInstitution.type} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Banque publique">Banque publique</SelectItem>
                      <SelectItem value="Banque commerciale">Banque commerciale</SelectItem>
                      <SelectItem value="Microfinance">Microfinance</SelectItem>
                      <SelectItem value="Fonds d'investissement">Fonds d'investissement</SelectItem>
                      <SelectItem value="Institution publique">Institution publique</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Autres champs similaires à ceux du formulaire d'ajout */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="edit-telephone" className="text-sm font-medium">
                    Téléphone
                  </label>
                  <Input id="edit-telephone" defaultValue={selectedInstitution.telephone} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="edit-email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input id="edit-email" type="email" defaultValue={selectedInstitution.email} />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="edit-adresse" className="text-sm font-medium">
                  Adresse
                </label>
                <Input id="edit-adresse" defaultValue={selectedInstitution.adresse} />
              </div>

              <div className="space-y-2">
                <label htmlFor="edit-site_web" className="text-sm font-medium">
                  Site web
                </label>
                <Input id="edit-site_web" defaultValue={selectedInstitution.site_web} />
              </div>

              <div className="space-y-2">
                <label htmlFor="edit-description" className="text-sm font-medium">
                  Description
                </label>
                <textarea
                  id="edit-description"
                  className="w-full min-h-[100px] p-2 border rounded-md"
                  defaultValue={selectedInstitution.description}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="edit-services" className="text-sm font-medium">
                  Services offerts
                </label>
                <textarea
                  id="edit-services"
                  className="w-full min-h-[80px] p-2 border rounded-md"
                  defaultValue={selectedInstitution.services}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Annuler
              </Button>
              <Button className="bg-[#063a1e] hover:bg-[#063a1e]/90" onClick={() => setIsEditDialogOpen(false)}>
                Enregistrer les modifications
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Dialogue de suppression */}
      {selectedInstitution && (
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Confirmer la suppression</DialogTitle>
              <DialogDescription>
                Êtes-vous sûr de vouloir supprimer l'institution "{selectedInstitution.nom}" ? Cette action est
                irréversible.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Annuler
              </Button>
              <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(false)}>
                Supprimer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
