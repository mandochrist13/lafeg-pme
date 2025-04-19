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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface TexteJuridique {
  id: number;
  titre: string;
  type_texte: string;
  categorie: string;
  date_parution: string;
  fichier_url: string;
  description?: string;
  version?: string;
}

interface PaginationData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function TextesJuridiquesAdmin() {
  const [textesJuridiques, setTextesJuridiques] = useState<TexteJuridique[]>([]);
  const [pagination, setPagination] = useState<PaginationData>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedCategorie, setSelectedCategorie] = useState("all");
  const [showAddForm, setShowAddForm] = useState(false);
  const [viewingTexte, setViewingTexte] = useState<TexteJuridique | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const [newTexte, setNewTexte] = useState<Omit<TexteJuridique, "id"> & { fichier?: File }>({
    titre: "",
    type_texte: "",
    categorie: "",
    date_parution: "",
    fichier_url: "",
  });

  // Fonction pour récupérer les textes juridiques
  const fetchTextesJuridiques = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const params = new URLSearchParams();
      params.append("page", pagination.page.toString());
      params.append("limit", pagination.limit.toString());
      
      if (selectedType !== "all") params.append("type_texte", selectedType);
      if (selectedCategorie !== "all") params.append("categorie", selectedCategorie);
      if (searchTerm) params.append("search", searchTerm);

      const response = await fetch(`/api/texte-juridique?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des textes juridiques");
      }

      const data = await response.json();
      setTextesJuridiques(data.data);
      setPagination(prev => ({
        ...prev,
        total: data.pagination.total,
        totalPages: data.pagination.totalPages,
      }));
    } catch (err) {
      console.error("Erreur:", err);
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
      toast({
        title: "Erreur",
        description: "Impossible de charger les textes juridiques",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTextesJuridiques();
  }, [pagination.page, selectedType, selectedCategorie]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== "") {
        fetchTextesJuridiques();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const types = [...new Set(textesJuridiques.map((texte) => texte.type_texte))];
  const categories = [...new Set(textesJuridiques.map((texte) => texte.categorie))];

  const handleAddTexte = async () => {
    if (
      !newTexte.titre ||
      !newTexte.type_texte ||
      !newTexte.categorie ||
      !newTexte.date_parution ||
      !newTexte.fichier
    ) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("titre", newTexte.titre);
      formData.append("type_texte", newTexte.type_texte);
      formData.append("categorie", newTexte.categorie);
      formData.append("date_parution", newTexte.date_parution);
      formData.append("fichier", newTexte.fichier);
      if (newTexte.description) formData.append("description", newTexte.description);
      if (newTexte.version) formData.append("version", newTexte.version);

      const response = await fetch("/api/texte-juridique", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout du texte juridique");
      }

      const addedTexte = await response.json();
      
      toast({
        title: "Succès",
        description: "Le texte juridique a été ajouté avec succès",
      });

      setShowAddForm(false);
      setNewTexte({
        titre: "",
        type_texte: "",
        categorie: "",
        date_parution: "",
        fichier_url: "",
      });
      
      fetchTextesJuridiques();
    } catch (err) {
      console.error("Erreur:", err);
      toast({
        title: "Erreur",
        description: err instanceof Error ? err.message : "Une erreur est survenue",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTexte = async (id: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce texte juridique ?")) {
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`/api/texte-juridique/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression du texte juridique");
      }

      toast({
        title: "Succès",
        description: "Le texte juridique a été supprimé avec succès",
      });

      fetchTextesJuridiques();
    } catch (err) {
      console.error("Erreur:", err);
      toast({
        title: "Erreur",
        description: err instanceof Error ? err.message : "Une erreur est survenue",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination(prev => ({ ...prev, page: newPage }));
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
                  Fichier PDF*
                </label>
                <Input
                  type="file"
                  accept=".pdf"
                  onChange={(e) =>
                    setNewTexte({
                      ...newTexte,
                      fichier: e.target.files?.[0],
                    })
                  }
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Veuillez sélectionner un fichier PDF
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Date de publication*
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

              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <Textarea
                  value={newTexte.description || ""}
                  onChange={(e) =>
                    setNewTexte({ ...newTexte, description: e.target.value })
                  }
                  placeholder="Description du texte juridique"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Version
                </label>
                <Input
                  value={newTexte.version || ""}
                  onChange={(e) =>
                    setNewTexte({ ...newTexte, version: e.target.value })
                  }
                  placeholder="Version du texte"
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
                disabled={isLoading}
              >
                {isLoading ? "Enregistrement..." : "Enregistrer"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de visualisation */}
      {viewingTexte && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b p-4">
              <h2 className="text-xl font-bold">{viewingTexte.titre}</h2>
              <button
                onClick={() => setViewingTexte(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Type</h3>
                  <p>{viewingTexte.type_texte}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Catégorie</h3>
                  <p>{viewingTexte.categorie}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Date de publication</h3>
                  <p>{new Date(viewingTexte.date_parution).toLocaleDateString('fr-FR')}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Version</h3>
                  <p>{viewingTexte.version || "Non spécifiée"}</p>
                </div>
              </div>

              {viewingTexte.description && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                  <p className="whitespace-pre-line">{viewingTexte.description}</p>
                </div>
              )}

              <div className="pt-4">
                <a
                  href={viewingTexte.fichier_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 bg-[#063a1e] text-white hover:bg-[#063a1e]/90 h-10 px-4 py-2"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Télécharger le document
                </a>
              </div>
            </div>
            <div className="flex justify-end gap-2 p-4 border-t">
              <Button variant="outline" onClick={() => setViewingTexte(null)}>
                Fermer
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Contenu principal */}
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
          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

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
              <Select
                value={selectedCategorie}
                onValueChange={setSelectedCategorie}
              >
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

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#063a1e]"></div>
            </div>
          ) : (
            <>
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
                    {textesJuridiques.map((texte) => (
                      <TableRow key={texte.id}>
                        <TableCell className="font-medium">{texte.titre}</TableCell>
                        <TableCell>{texte.type_texte}</TableCell>
                        <TableCell>{texte.categorie}</TableCell>
                        <TableCell>
                          {new Date(texte.date_parution).toLocaleDateString('fr-FR')}
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
                              <DropdownMenuItem onClick={() => setViewingTexte(texte)}>
                                <Eye className="mr-2 h-4 w-4" /> Voir
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" /> Modifier
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <a 
                                  href={texte.fichier_url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="flex items-center"
                                >
                                  <Download className="mr-2 h-4 w-4" /> Télécharger
                                </a>
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
                  Affichage de {textesJuridiques.length} sur {pagination.total} textes juridiques
                </p>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(pagination.page - 1);
                        }}
                        className={pagination.page <= 1 ? "opacity-50 cursor-not-allowed" : ""}
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                      let pageNum;
                      if (pagination.totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (pagination.page <= 3) {
                        pageNum = i + 1;
                      } else if (pagination.page >= pagination.totalPages - 2) {
                        pageNum = pagination.totalPages - 4 + i;
                      } else {
                        pageNum = pagination.page - 2 + i;
                      }
                      
                      return (
                        <PaginationItem key={pageNum}>
                          <PaginationLink 
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handlePageChange(pageNum);
                            }}
                            isActive={pageNum === pagination.page}
                          >
                            {pageNum}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}

                    {pagination.totalPages > 5 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}

                    <PaginationItem>
                      <PaginationNext 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(pagination.page + 1);
                        }}
                        className={pagination.page >= pagination.totalPages ? "opacity-50 cursor-not-allowed" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}