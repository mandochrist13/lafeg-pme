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
} from "@/app/services/texte/api";
import { Textarea } from "@/components/ui/textarea";

export default function TextesJuridiquesAdmin() {
  const [textesJuridiques, setTextesJuridiques] = useState<TexteJuridique[]>(
    []
  );
  const [filteredTextes, setFilteredTextes] = useState<TexteJuridique[]>([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedCategorie, setSelectedCategorie] = useState("all");
  const [showAddForm, setShowAddForm] = useState(false);

  // const [newTexte, setNewTexte] = useState<Omit<TexteJuridique, "id">>({
  //   titre: "",
  //   type: "",
  //   categorie: "",
  //   datePublication: "",
  //   lien: "",
  // });

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
  

  // Extraire les types, catégories uniques pour les filtres
  // const types = [...new Set(textesJuridiques.map((texte) => texte.type))];
  // const categories = [
  //   ...new Set(textesJuridiques.map((texte) => texte.categorie)),
  // ];

  // const handleAddTexte = () => {
  //   if (
  //     !newTexte.titre ||
  //     !newTexte.type ||
  //     !newTexte.lien ||
  //     !newTexte.datePublication ||
  //     !newTexte.categorie
  //   ) {
  //     alert("Veuillez remplir tous les champs obligatoires");
  //     return;
  //   }

  //   const newId = Math.max(...textesJuridiques.map((t) => t.id)) + 1;
  //   const texteToAdd: TexteJuridique = {
  //     id: newId,
  //     ...newTexte,
  //   };

  //   setTextesJuridiques([texteToAdd, ...textesJuridiques]);
  //   setShowAddForm(false);
  //   setNewTexte({
  //     titre: "",
  //     type: "",
  //     categorie: "",
  //     datePublication: "",
  //     lien: "",
  //   });
  // };

  const handleDeleteTexte = (id: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce texte juridique ?")) {
      setTextesJuridiques(textesJuridiques.filter((texte) => texte.id !== id));
    }
  };

  // ... (le reste de votre code JSX reste inchangé)

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
                <label className="block text-sm font-medium mb-1">Titre*</label>
                <Input
                  value={newTexte.titre}
                  onChange={(e) =>
                    setNewTexte({ ...newTexte, titre: e.target.value })
                  }
                  placeholder="Titre du texte juridique"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Type*
                  </label>
                  <Select
                    value={newTexte.type}
                    onValueChange={(value) =>
                      setNewTexte({ ...newTexte, type: value })
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un type" />
                    </SelectTrigger>
                    <SelectContent>
                      {types.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Catégorie*
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
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Lien du document*
                </label>
                <Input
                  type="url"
                  value={newTexte.lien}
                  onChange={(e) =>
                    setNewTexte({ ...newTexte, lien: e.target.value })
                  }
                  placeholder="https://example.com/document.pdf"
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Veuillez entrer l'URL complète du document (PDF, DOCX, etc.)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Date de publication*
                </label>
                <Input
                  type="date"
                  value={newTexte.datePublication}
                  onChange={(e) =>
                    setNewTexte({
                      ...newTexte,
                      datePublication: e.target.value,
                    })
                  }
                  required
                />
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
                  <SelectItem value="publique">
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
                {filteredTextes.map((texte) => (
                  <TableRow key={texte.id}>
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
                          <DropdownMenuItem>
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
    </div>
  );
}
