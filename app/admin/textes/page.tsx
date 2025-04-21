"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  MoreHorizontal,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  TexteJuridique,
  fetchTextesJuridiques,
  createTexteJuridique,
  updateTexteJuridique,
} from "@/app/services/texte/api";
import { Textarea } from "@/components/ui/textarea";

export default function TextesJuridiquesAdmin() {
  const [textesJuridiques, setTextesJuridiques] = useState<TexteJuridique[]>(
    []
  );
  const [selectedTexteId, setSelectedTexteId] = useState<string | null>(null);
  const [editedTexte, setEditedTexte] = useState<Partial<TexteJuridique>>({});
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [filteredTextes, setFilteredTextes] = useState<TexteJuridique[]>([]);
  const [fichier, setFichier] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedCategorie, setSelectedCategorie] = useState("all");
  const [showAddForm, setShowAddForm] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const [newTexte, setNewTexte] = useState<Omit<TexteJuridique, "id">>({
    titre: "",
    categorie: "",
    type_texte: "",
    description: "",
    date_parution: "",
    version: "",
    fichier: null,
    fichier_url: "",
    fichier_nom: "",
    taille_fichier: 0,
    mime_type: "",
  });

  const resetNewTexteForm = () => {
    setNewTexte({
      titre: "",
      categorie: "",
      type_texte: "",
      description: "",
      date_parution: "",
      version: "",
      fichier: null,
      fichier_url: "",
      fichier_nom: "",
      taille_fichier: 0,
      mime_type: "",
    });
  };

  const refreshTextes = async () => {
    setLoading(true);
    try {
      const  {data}  = await fetchTextesJuridiques();
      setTextesJuridiques(data);

    } catch (err: any) {
      setError(err.message || "Erreur inconnue");
    } finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    async function loadTextes() {
      try {
        const { data } = await fetchTextesJuridiques();
        setTextesJuridiques(data);
        setFilteredTextes(data); // ou appliquer ton filtre ici si besoin
      } catch (error) {
        console.error("Erreur de chargement des textes juridiques :", error);
      }
    }

    loadTextes();
  }, []);

  // Filtrer les textes juridiques
  useEffect(() => {
    const filtered = textesJuridiques.filter((texte) => {
      const matchSearch = texte.titre
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchType =
        selectedType === "all" || texte.type_texte === selectedType;

      const matchCategorie =
        selectedCategorie === "all" || texte.categorie === selectedCategorie;

      return matchSearch && matchType && matchCategorie;
    });

    setFilteredTextes(filtered);
  }, [searchTerm, selectedType, selectedCategorie, textesJuridiques]);

  const handleAddTexte = async () => {
    if (
      !newTexte.titre ||
      !newTexte.type_texte ||
      !newTexte.fichier ||
      !newTexte.date_parution ||
      !newTexte.categorie
    ) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    try {
      console.log("Texte à envoyer :", newTexte);

      const createdTexte = await createTexteJuridique(newTexte);
      console.log("Texte créé :", createdTexte);

      setTextesJuridiques([...textesJuridiques, createdTexte]);
      setShowAddForm(false);
      setNewTexte({
        titre: "",
        categorie: "",
        type_texte: "",
        description: "",
        date_parution: "",
        version: "",
        fichier: null,
        fichier_url: "",
        fichier_nom: "",
        taille_fichier: 0,
        mime_type: "",
      });
      setFichier(null);
    } catch (error) {
      alert("Erreur lors de l’ajout du texte.");
      console.error("Erreur lors de l’ajout du texte :", error);
    }
  };

  const openEditDialog = (texte: TexteJuridique) => {
    setSelectedTexteId(texte.id.toString); // nombre
    setEditedTexte(texte); // ici pas besoin de changement
    setIsEditDialogOpen(true);
  };

  const handleEditTexte = async (texteData: TexteJuridique) => {
    if (!texteData.titre || !texteData.type_texte || !texteData.date_parution || !texteData.categorie) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }
  
    try {
      setLoading(true);
      
      if (!selectedTexteId) {
        console.error("Aucun ID de texte sélectionné");
        return;
      }
  
      // Créer un FormData pour gérer les fichiers
      const formData = new FormData();
      formData.append('titre', texteData.titre);
      formData.append('description', texteData.description || '');
      formData.append('type_texte', texteData.type_texte);
      formData.append('categorie', texteData.categorie);
      formData.append('date_parution', texteData.date_parution);
      
      if (texteData.fichier instanceof File) {
        formData.append('fichier', texteData.fichier);
      }
  
      await updateTexteJuridique(selectedTexteId, formData);
      await refreshTextes();
      
      setIsEditDialogOpen(false);
      setSelectedTexteId(null);
    } catch (error) {
      console.error("Erreur lors de la modification du texte :", error);
      alert("Une erreur est survenue lors de la modification du texte.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTexte = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce texte juridique ?")) {
      setTextesJuridiques(textesJuridiques.filter((texte) => texte.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Modal d'ajout */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b p-4">
              <h2 className="text-xl font-bold">
                Ajouter un nouveau texte juridique
              </h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Titre <span className="text-red-600">*</span>
                </label>
                <Input
                  value={newTexte.titre}
                  onChange={(e) =>
                    setNewTexte({ ...newTexte, titre: e.target.value })
                  }
                  placeholder="Titre du texte juridique"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <Input
                  value={newTexte.description}
                  onChange={(e) =>
                    setNewTexte({ ...newTexte, description: e.target.value })
                  }
                  placeholder="Renseignez une description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Type <span className="text-red-600">*</span>
                  </label>

                  <Select
                    value={newTexte.type_texte}
                    onValueChange={(value) =>
                      setNewTexte({ ...newTexte, type_texte: value })
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les types</SelectItem>
                      <SelectItem value="Loi">Loi</SelectItem>
                      <SelectItem value="Décret">Décret</SelectItem>
                      <SelectItem value="Acte uniforme OHADA">OHADA</SelectItem>
                      <SelectItem value="Code">Code</SelectItem>
                      <SelectItem value="Arrêté">Arrêté</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Catégorie <span className="text-red-600">*</span>
                  </label>
                  <Select
                    value={newTexte.categorie}
                    onValueChange={(value) =>
                      setNewTexte({ ...newTexte, categorie: value })
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les catégories</SelectItem>
                      <SelectItem value="pmes">Textes pour les PME</SelectItem>
                      <SelectItem value="administrations">
                        Textes des administrations
                      </SelectItem>
                      <SelectItem value="internationaux">
                        Textes régionaux et Internationaux
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Choisir le fichier <span className="text-red-600">*</span>
                  </label>

                  <Input
                    id="fichier"
                    type="file"
                    accept="application/pdf"
                    required
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setFichier(file);
                        setNewTexte({
                          ...newTexte,
                          fichier: file,
                        });
                      }
                    }}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Veuillez téléverser un document (PDF)
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Date de publication<span className="text-red-600">*</span>
                  </label>
                  <Input
                    type="date"
                    value={newTexte.date_parution}
                    onChange={(e) =>
                      setNewTexte({
                        ...newTexte,
                        date_parution: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 p-4 border-t">
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Annuler
              </Button>
              <Button
                className="bg-[#063a1e] hover:bg-[#063a1e]/90"
                onClick={handleAddTexte}
              >
                Enregistrer
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Ajouter un texte */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Textes juridiques</h1>
        <Button
          className="bg-[#063a1e] hover:bg-[#063a1e]/90"
          onClick={() => setShowAddForm(true)}
        >
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
                  <SelectItem value="Loi">Loi</SelectItem>
                  <SelectItem value="Décret">Décret</SelectItem>
                  <SelectItem value="Acte uniforme OHADA">OHADA</SelectItem>
                  <SelectItem value="Code">Code</SelectItem>
                  <SelectItem value="Arrêté">Arrêté</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={selectedCategorie}
                onValueChange={setSelectedCategorie}
              >
                <SelectTrigger id="categorie" className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  <SelectItem value="pmes">Textes pour les PME</SelectItem>
                  <SelectItem value="administrations">
                    Textes des administrations
                  </SelectItem>
                  <SelectItem value="internationaux">
                    Textes régionaux et Internationaux
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {selectedType !== "all" && (
              <Badge
                variant="outline"
                className="bg-[#063a1e]/10 border-[#063a1e]/30 gap-1"
              >
                <span>Type: {selectedType}</span>
                <button
                  className="text-xs"
                  onClick={() => setSelectedType("all")}
                >
                  ✕
                </button>
              </Badge>
            )}
            {selectedCategorie !== "all" && (
              <Badge
                variant="outline"
                className="bg-[#063a1e]/10 border-[#063a1e]/30 gap-1"
              >
                <span>Catégorie: {selectedCategorie}</span>
                <button
                  className="text-xs"
                  onClick={() => setSelectedCategorie("all")}
                >
                  ✕
                </button>
              </Badge>
            )}
            {(selectedType !== "all" || selectedCategorie !== "all") && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs"
                onClick={() => {
                  setSelectedType("all");
                  setSelectedCategorie("all");
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
                  <TableHead>Document</TableHead>
                  <TableHead>Date de publication</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTextes.map((texte, index) => (
                  <TableRow key={texte.id || index}>
                    <TableCell className="font-medium">{texte.titre}</TableCell>
                    <TableCell>{texte.type_texte}</TableCell>
                    <TableCell>{texte.categorie}</TableCell>
                    <TableCell>
                      <a
                        href={texte.fichier_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Voir
                      </a>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {new Date(texte.date_parution).toLocaleDateString(
                          "fr-FR",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </span>{" "}
                    </TableCell>
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
                          <DropdownMenuItem
                            onClick={() => openEditDialog(texte)}
                          >
                            <Edit className="mr-2 h-4 w-4" /> Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" /> Télécharger
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleDeleteTexte(texte.id)}
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
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Affichage de {filteredTextes.length} sur {textesJuridiques.length}{" "}
              textes juridiques
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
    {/* Dialogue de modification */}
{selectedTexteId && (
  <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
    <DialogContent className="sm:max-w-[600px] sm:max-h-[500px] overflow-y-auto z-50">
      <DialogHeader>
        <DialogTitle>Modifier un texte juridique</DialogTitle>
        <DialogDescription>
          Modifiez les informations du texte juridique.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 p-6">
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Titre <span className="text-red-600">*</span>
            </label>
            <Input
              id="edit-titre"
              value={editedTexte.titre}
              onChange={(e) =>
                setEditedTexte({ ...editedTexte, titre: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <Input
              id="edit-description"
              value={editedTexte.description}
              onChange={(e) =>
                setEditedTexte({
                  ...editedTexte,
                  description: e.target.value,
                })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Type <span className="text-red-600">*</span>
              </label>
              <Select
                value={editedTexte.type_texte}
                onValueChange={(value) =>
                  setEditedTexte({ ...editedTexte, type_texte: value })
                }
              >
                <SelectTrigger id="type_texte">
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Loi">Loi</SelectItem>
                  <SelectItem value="Décret">Décret</SelectItem>
                  <SelectItem value="Acte uniforme OHADA">
                    OHADA
                  </SelectItem>
                  <SelectItem value="Code">Code</SelectItem>
                  <SelectItem value="Arrêté">Arrêté</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Catégorie <span className="text-red-600">*</span>
              </label>
              <Select
                value={editedTexte.categorie}
                onValueChange={(value) =>
                  setEditedTexte({ ...editedTexte, categorie: value })
                }
              >
                <SelectTrigger id="categorie">
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pmes">
                    Textes pour les PME
                  </SelectItem>
                  <SelectItem value="administrations">
                    Textes des administrations
                  </SelectItem>
                  <SelectItem value="internationaux">
                    Textes régionaux et Internationaux
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Fichier actuel
              </label>
              <div className="text-sm text-gray-600 p-2 border rounded">
                {editedTexte.fichier_nom || "Aucun fichier sélectionné"}
              </div>
              <label className="block text-sm font-medium mb-1 mt-2">
                Changer le fichier (PDF)
              </label>
              <Input
                id="fichier"
                type="file"
                accept="application/pdf"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setEditedTexte({
                      ...editedTexte,
                      fichier: file,
                      fichier_nom: file.name,
                    });
                  }
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Date de publication
                <span className="text-red-600">*</span>
              </label>
              <Input
                type="date"
                value={editedTexte.date_parution}
                onChange={(e) =>
                  setEditedTexte({
                    ...editedTexte,
                    date_parution: e.target.value,
                  })
                }
                required
              />
            </div>
          </div>
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
          onClick={() => handleEditTexte(editedTexte as TexteJuridique)}
          disabled={loading}
        >
          {loading ? "Enregistrement..." : "Enregistrer les modifications"}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
)}
    </div>
  );
}
