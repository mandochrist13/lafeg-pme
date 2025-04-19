"use client";
import { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye,
  CheckCircle2,
  XCircle,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Interface pour les structures d'accompagnement
interface Structure {
  id: number;
  nom: string;
  type: string;
  adresse: string;
  telephone: string;
  email: string;
  site_web: string;
  description: string;
  services: string;
  date_ajout: string;
}

// Interface pour la nouvelle structure
interface NewStructure {
  nom: string;
  type: string;
  adresse: string;
  telephone: string;
  email: string;
  site_web: string;
  description: string;
  services: string;
}

// Données fictives pour les structures d'accompagnement
const structuresData: Structure[] = [
  {
    id: 1,
    nom: "Gabon Incubateur",
    type: "Incubateur",
    adresse: "Quartier Glass, Libreville",
    telephone: "+241 77 12 34 56",
    email: "contact@gabonincubateur.ga",
    site_web: "https://www.gabonincubateur.ga",
    description:
      "Gabon Incubateur est une structure d'accompagnement qui aide les entrepreneurs à transformer leurs idées en entreprises viables, avec un accent sur l'innovation et la technologie.",
    services: "Incubation, Formation, Mentorat, Mise en réseau",
    date_ajout: "2023-05-10",
  },
  {
    id: 2,
    nom: "Centre d'Appui aux PME (CAP-PME)",
    type: "Centre de formation",
    adresse: "Boulevard Triomphal, Libreville",
    telephone: "+241 77 98 76 54",
    email: "contact@cap-pme.ga",
    site_web: "https://www.cap-pme.ga",
    description:
      "Le Centre d'Appui aux PME (CAP-PME) est une structure publique qui offre des services de formation et d'accompagnement aux petites et moyennes entreprises gabonaises.",
    services: "Formation, Conseil, Accompagnement administratif, Financement",
    date_ajout: "2023-04-15",
  },
  {
    id: 3,
    nom: "Cabinet Conseil Entreprendre",
    type: "Cabinet conseil",
    adresse: "Quartier Lalala, Libreville",
    telephone: "+241 77 45 67 89",
    email: "info@entreprendre.ga",
    site_web: "https://www.entreprendre.ga",
    description:
      "Cabinet Conseil Entreprendre est un cabinet de conseil spécialisé dans l'accompagnement des entrepreneurs et des PME dans leurs démarches administratives, juridiques et fiscales.",
    services: "Conseil juridique, Conseil fiscal, Accompagnement administratif",
    date_ajout: "2023-06-20",
  },
  {
    id: 4,
    nom: "Agence Nationale de Promotion des Investissements (ANPI)",
    type: "Structure publique",
    adresse: "Avenue du Colonel Parant, Libreville",
    telephone: "+241 77 23 45 67",
    email: "contact@anpi.ga",
    site_web: "https://www.anpi.ga",
    description:
      "L'ANPI est une agence gouvernementale chargée de promouvoir les investissements au Gabon et d'accompagner les entrepreneurs dans la création et le développement de leurs entreprises.",
    services: "Guichet unique, Conseil, Promotion des investissements",
    date_ajout: "2023-03-05",
  },
  {
    id: 5,
    nom: "Centre de Formation Professionnelle",
    type: "Centre de formation",
    adresse: "Quartier Nzeng-Ayong, Libreville",
    telephone: "+241 77 34 56 78",
    email: "info@cfp.ga",
    site_web: "https://www.cfp.ga",
    description:
      "Le Centre de Formation Professionnelle offre des formations pratiques dans divers domaines pour aider les entrepreneurs et les employés à développer leurs compétences.",
    services: "Formation professionnelle, Certification, Ateliers pratiques",
    date_ajout: "2023-02-18",
  },
];

export default function StructuresPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [statutFilter, setStatutFilter] = useState<string>("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [selectedStructure, setSelectedStructure] = useState<Structure | null>(
    null
  );
  const [newStructure, setNewStructure] = useState<NewStructure>({
    nom: "",
    type: "",
    adresse: "",
    telephone: "",
    email: "",
    site_web: "",
    description: "",
    services: "",
  });

  // Filtrer les structures en fonction des critères de recherche
  const filteredStructures = structuresData.filter((structure) => {
    const matchesSearch =
      structure.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      structure.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "" || structure.type === typeFilter;
  });

  // Gérer l'édition d'une structure
  const handleEdit = (structure: Structure) => {
    setSelectedStructure(structure);
    setIsEditDialogOpen(true);
  };

  // Gérer la suppression d'une structure
  const handleDelete = (structure: Structure) => {
    setSelectedStructure(structure);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Structures d'accompagnement
          </h1>
          <p className="text-muted-foreground">
            Gérez les structures d'accompagnement présentes sur la plateforme
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#063a1e] hover:bg-[#063a1e]/90">
              <Plus className="mr-2 h-4 w-4" /> Ajouter une structure
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Ajouter une structure d'accompagnement</DialogTitle>
              <DialogDescription>
                Remplissez le formulaire ci-dessous pour ajouter une nouvelle
                structure d'accompagnement.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="nom" className="text-sm font-medium">
                    Nom de la structure
                  </label>
                  <Input
                    id="nom"
                    value={newStructure.nom}
                    onChange={(e) =>
                      setNewStructure({ ...newStructure, nom: e.target.value })
                    }
                    placeholder="Ex: Gabon Incubateur"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="type" className="text-sm font-medium">
                    Type de structure
                  </label>
                  <Select
                    value={newStructure.type}
                    onValueChange={(value) =>
                      setNewStructure({ ...newStructure, type: value })
                    }
                  >
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Sélectionner un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Incubateur">Incubateur</SelectItem>
                      <SelectItem value="Centre de formation">
                        Centre de formation
                      </SelectItem>
                      <SelectItem value="Cabinet conseil">
                        Cabinet conseil
                      </SelectItem>
                      <SelectItem value="Structure publique">
                        Structure publique
                      </SelectItem>
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
                    value={newStructure.telephone}
                    onChange={(e) =>
                      setNewStructure({
                        ...newStructure,
                        telephone: e.target.value,
                      })
                    }
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
                    value={newStructure.email}
                    onChange={(e) =>
                      setNewStructure({
                        ...newStructure,
                        email: e.target.value,
                      })
                    }
                    placeholder="Ex: contact@structure.ga"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="adresse" className="text-sm font-medium">
                  Adresse
                </label>
                <Input
                  id="adresse"
                  value={newStructure.adresse}
                  onChange={(e) =>
                    setNewStructure({
                      ...newStructure,
                      adresse: e.target.value,
                    })
                  }
                  placeholder="Ex: Quartier Glass, Libreville"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="site_web" className="text-sm font-medium">
                  Site web
                </label>
                <Input
                  id="site_web"
                  value={newStructure.site_web}
                  onChange={(e) =>
                    setNewStructure({
                      ...newStructure,
                      site_web: e.target.value,
                    })
                  }
                  placeholder="Ex: https://www.structure.ga"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <textarea
                  id="description"
                  className="w-full min-h-[100px] p-2 border rounded-md"
                  value={newStructure.description}
                  onChange={(e) =>
                    setNewStructure({
                      ...newStructure,
                      description: e.target.value,
                    })
                  }
                  placeholder="Description de la structure d'accompagnement..."
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="services" className="text-sm font-medium">
                  Services offerts
                </label>
                <textarea
                  id="services"
                  className="w-full min-h-[80px] p-2 border rounded-md"
                  value={newStructure.services}
                  onChange={(e) =>
                    setNewStructure({
                      ...newStructure,
                      services: e.target.value,
                    })
                  }
                  placeholder="Liste des services offerts par la structure..."
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Annuler
              </Button>
              <Button
                className="bg-[#063a1e] hover:bg-[#063a1e]/90"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Ajouter la structure
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
                  placeholder="Rechercher une structure..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-end">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSearchTerm("");
                  setTypeFilter("");
                  setStatutFilter("");
                }}
              >
                <Filter className="mr-2 h-4 w-4" /> Réinitialiser les filtres
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liste des structures */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des structures d'accompagnement</CardTitle>
          <CardDescription>
            {filteredStructures.length} structure(s) trouvée(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Nom</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Localisation</TableHead>

                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStructures.map((structure) => (
                <TableRow key={structure.id}>
                  <TableCell className="font-medium">{structure.nom}</TableCell>
                  <TableCell>{structure.type}</TableCell>
                  <TableCell>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <span>{structure.adresse}</span>
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
                          onClick={() =>
                            window.open(
                              `/structures-accompagnement/${structure.id}`,
                              "_blank"
                            )
                          }
                        >
                          <Eye className="mr-2 h-4 w-4" /> Voir
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(structure)}>
                          <Pencil className="mr-2 h-4 w-4" /> Modifier
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDelete(structure)}
                          className="text-red-600"
                        >
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
            Affichage de {filteredStructures.length} sur {structuresData.length}{" "}
            structures
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
      {selectedStructure && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Modifier une structure d'accompagnement</DialogTitle>
              <DialogDescription>
                Modifiez les informations de la structure d'accompagnement.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="edit-nom" className="text-sm font-medium">
                    Nom de la structure
                  </label>
                  <Input id="edit-nom" defaultValue={selectedStructure.nom} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="edit-type" className="text-sm font-medium">
                    Type de structure
                  </label>
                  <Select defaultValue={selectedStructure.type}>
                    <SelectTrigger id="edit-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Incubateur">Incubateur</SelectItem>
                      <SelectItem value="Centre de formation">
                        Centre de formation
                      </SelectItem>
                      <SelectItem value="Cabinet conseil">
                        Cabinet conseil
                      </SelectItem>
                      <SelectItem value="Structure publique">
                        Structure publique
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Autres champs similaires à ceux du formulaire d'ajout */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="edit-telephone"
                    className="text-sm font-medium"
                  >
                    Téléphone
                  </label>
                  <Input
                    id="edit-telephone"
                    defaultValue={selectedStructure.telephone}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="edit-email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="edit-email"
                    type="email"
                    defaultValue={selectedStructure.email}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="edit-adresse" className="text-sm font-medium">
                  Adresse
                </label>
                <Input
                  id="edit-adresse"
                  defaultValue={selectedStructure.adresse}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="edit-site_web" className="text-sm font-medium">
                  Site web
                </label>
                <Input
                  id="edit-site_web"
                  defaultValue={selectedStructure.site_web}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="edit-description"
                  className="text-sm font-medium"
                >
                  Description
                </label>
                <textarea
                  id="edit-description"
                  className="w-full min-h-[100px] p-2 border rounded-md"
                  defaultValue={selectedStructure.description}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="edit-services" className="text-sm font-medium">
                  Services offerts
                </label>
                <textarea
                  id="edit-services"
                  className="w-full min-h-[80px] p-2 border rounded-md"
                  defaultValue={selectedStructure.services}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Annuler
              </Button>
              <Button
                className="bg-[#063a1e] hover:bg-[#063a1e]/90"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Enregistrer les modifications
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Dialogue de suppression */}
      {selectedStructure && (
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Confirmer la suppression</DialogTitle>
              <DialogDescription>
                Êtes-vous sûr de vouloir supprimer la structure "
                {selectedStructure.nom}" ? Cette action est irréversible.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-4">
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Annuler
              </Button>
              <Button
                variant="destructive"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Supprimer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
