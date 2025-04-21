"use client";

import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye,
  X,
  MapPin,
  Phone,
  Mail,
  Globe,
  ExternalLink,
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
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  fetchFinancialInstitutions,
  FinancialInstitution,
} from "@/app/services/institution/api";
import {
  createFinancialInstitution,
  deleteFinancialInstitution,
  updateFinancialInstitution,
} from "@/app/services/institution/api";
import Image from "next/image";

import { toast } from "sonner";

export default function InstitutionsPage({}: {
  refreshInstitutions: () => void;
}) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedInstitution, setSelectedInstitution] =
    useState<FinancialInstitution | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Tu peux ajuster ce chiffre

  const [selectedInstitutionId, setSelectedInstitutionId] = useState<
    string | null
  >(null);

  const [editedInstitution, setEditedInstitution] = useState<
    Partial<FinancialInstitution>
  >({});
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDetailsCardVisible, setIsDetailsCardVisible] =
    useState<boolean>(false);

  const [selectedInstitutionDetails, setSelectedInstitutionDetails] =
    useState<FinancialInstitution | null>(null);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [institutions, setInstitutions] = useState<FinancialInstitution[]>([]);
  const [newInstitution, setNewInstitution] = useState<
    Omit<
      FinancialInstitution,
      "id_institutionFinanciere" | "createdAt" | "updatedAt"
    >
  >({
    nom: "",
    categorie: "",
    type_institution: "",
    description: "",
    adresse: "",
    contact: "",
    mail: "",
    site_web: "",
    service: "",
    logo: "",
    rs_1: "",
    rs_2: "",
    partenaire_feg: false,
  });

  const resetNewInstitutionForm = () => {
    setNewInstitution({
      nom: "",
      categorie: "",
      type_institution: "",
      description: "",
      adresse: "",
      contact: "",
      mail: "",
      site_web: "",
      service: "",
      logo: "",
      rs_1: "",
      rs_2: "",
      partenaire_feg: false,
    });
  };

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshInstitutions = async () => {
    setLoading(true);
    try {
      const data = await fetchFinancialInstitutions();
      setInstitutions(data);
    } catch (err: any) {
      setError(err.message || "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchFinancialInstitutions();
        console.log("🔎 Institutions récupérées :", data);
        setInstitutions(data);
      } catch (err: any) {
        setError(err.message || "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, typeFilter]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  const openEditDialog = (institution: FinancialInstitution) => {
    setSelectedInstitutionId(institution.id_institutionFinanciere); // nombre
    setEditedInstitution(institution); // ici pas besoin de changement
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (institution: FinancialInstitution) => {
    setSelectedInstitutionId(institution.id_institutionFinanciere);
    setSelectedInstitution(institution);
    setIsDeleteDialogOpen(true);
  };

  const openViewDialog = (institution: FinancialInstitution) => {
    setSelectedInstitutionId(institution.id_institutionFinanciere);
    setSelectedInstitution(institution);
    setSelectedInstitutionDetails(institution);
    setIsDetailsCardVisible(true);
  };

  const closeViewDialog = () => {
    setSelectedInstitution(null);
    setSelectedInstitutionId(null);
    setSelectedInstitutionDetails(null);
    setIsDetailsCardVisible(false);
  };

  const filteredInstitutions = institutions.filter((institution) => {
    const matchesSearch = institution.nom
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType =
      typeFilter === "all" || institution.categorie === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleCreateInstitution = async () => {
    try {
      setLoading(true);
      console.log("Institution envoyée :", newInstitution);

      await createFinancialInstitution(newInstitution);
      await refreshInstitutions(); // rafraîchit la liste
      resetNewInstitutionForm(); // reset du formulaire
      setIsAddDialogOpen(false); // ferme le dialog
    } catch (error) {
      console.error("Erreur création:", error);
    } finally {
      setLoading(false);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedInstitutions = filteredInstitutions.slice(
    startIndex,
    endIndex
  );
  const totalPages = Math.ceil(filteredInstitutions.length / itemsPerPage);

  const handleEditInstitution = async (institution: FinancialInstitution) => {
    try {
      setLoading(true);
      setSelectedInstitutionId(institution.id_institutionFinanciere); // Ajoute l'ID de l'institution sélectionnée
      setEditedInstitution({
        nom: institution.nom,
        categorie: institution.categorie,
        type_institution: institution.type_institution,
        description: institution.description,
        adresse: institution.adresse,
        contact: institution.contact,
        mail: institution.mail,
        site_web: institution.site_web,
        service: institution.service,
        logo: institution.logo,
        rs_1: institution.rs_1,
        rs_2: institution.rs_2,
        partenaire_feg: institution.partenaire_feg,
      });

      // Vérifier que l'ID est bien défini avant de procéder
      if (institution.id_institutionFinanciere) {
        console.log("ID Institution:", institution.id_institutionFinanciere); // Vérification de l'ID

        await updateFinancialInstitution(
          institution.id_institutionFinanciere,
          editedInstitution
        );
      } else {
        console.error("L'ID de l'institution sélectionnée est manquant.");
      }
      await refreshInstitutions();
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteInstitution = async (id: string) => {
    try {
      setLoading(true);
      await deleteFinancialInstitution(id);
      await refreshInstitutions();
    } catch (error) {
      console.error("Erreur suppression :", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 relative">
      {/* Overlay de fond flouté */}
      {(isAddDialogOpen ||
        isEditDialogOpen ||
        isDeleteDialogOpen ||
        isDetailsCardVisible) && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => {
            if (isDetailsCardVisible) closeViewDialog();
            if (isAddDialogOpen) setIsAddDialogOpen(false);
            if (isEditDialogOpen) setIsEditDialogOpen(false);
            if (isDeleteDialogOpen) setIsDeleteDialogOpen(false);
          }}
        />
      )}

      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Institutions financières
          </h1>
          <p className="text-muted-foreground">
            Gérez les institutions financières présentes sur la plateforme
          </p>
        </div>
        <Dialog
          open={isAddDialogOpen}
          onOpenChange={(open) => {
            setIsAddDialogOpen(open);
            if (!open) resetNewInstitutionForm();
          }}
        >
          <DialogTrigger asChild>
            <Button className="bg-[#063a1e] hover:bg-[#063a1e]/90">
              <Plus className="mr-2 h-4 w-4" /> Ajouter une institution
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] sm:max-h-[500px] overflow-y-auto z-50">
            <DialogHeader>
              <DialogTitle>Ajouter une institution financière</DialogTitle>
              <DialogDescription>
                Remplissez le formulaire ci-dessous pour ajouter une nouvelle
                institution financière.
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
                    onChange={(e) =>
                      setNewInstitution({
                        ...newInstitution,
                        nom: e.target.value,
                      })
                    }
                    placeholder="Ex: Banque Gabonaise de Développement"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="logo" className="text-sm font-medium">
                    Logo de l'institution
                  </label>
                  <Input
                    id="logo"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setNewInstitution({
                            ...newInstitution,
                            logo: reader.result as string, // Stocke l'URL base64 dans le state
                          });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="categorie" className="text-sm font-medium">
                    Catégorie d'institution
                  </label>
                  <Select
                    value={newInstitution.categorie}
                    onValueChange={(value) =>
                      setNewInstitution({
                        ...newInstitution,
                        categorie: value, // ✅ ceci manquait
                      })
                    }
                  >
                    <SelectTrigger id="categorie">
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="banque">Banque</SelectItem>
                      <SelectItem value="microfinance">Microfinance</SelectItem>
                      <SelectItem value="fonds">
                        Fonds d'investissement
                      </SelectItem>
                      <SelectItem value="institution_publique">
                        Institution publique
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="type_institution"
                    className="text-sm font-medium"
                  >
                    Type d'institution
                  </label>
                  <Select
                    value={newInstitution.type_institution}
                    onValueChange={(value) =>
                      setNewInstitution({
                        ...newInstitution,
                        type_institution: value,
                      })
                    }
                  >
                    <SelectTrigger id="type_institution">
                      <SelectValue placeholder="Sélectionner un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="banque commerciale">
                        Banque commerciale
                      </SelectItem>
                      <SelectItem value="banque d'investissement">
                        Banque d'investissement
                      </SelectItem>
                      <SelectItem value="cooperative d'épargne">
                        Coopérative d'épargne
                      </SelectItem>
                      <SelectItem value="fonds souverain">
                        Fonds souverain
                      </SelectItem>
                      <SelectItem value="établissement public">
                        Établissement public
                      </SelectItem>
                      <SelectItem value="autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="contact" className="text-sm font-medium">
                    Contact (Téléphone)
                  </label>
                  <Input
                    id="contact"
                    value={newInstitution.contact}
                    onChange={(e) =>
                      setNewInstitution({
                        ...newInstitution,
                        contact: e.target.value,
                      })
                    }
                    placeholder="Ex: +241 77 12 34 56"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="mail" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="mail"
                    type="email"
                    value={newInstitution.mail}
                    onChange={(e) =>
                      setNewInstitution({
                        ...newInstitution,
                        mail: e.target.value,
                      })
                    }
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
                  onChange={(e) =>
                    setNewInstitution({
                      ...newInstitution,
                      adresse: e.target.value,
                    })
                  }
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
                  onChange={(e) =>
                    setNewInstitution({
                      ...newInstitution,
                      site_web: e.target.value,
                    })
                  }
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
                  onChange={(e) =>
                    setNewInstitution({
                      ...newInstitution,
                      description: e.target.value,
                    })
                  }
                  placeholder="Description de l'institution financière..."
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="service" className="text-sm font-medium">
                  Services offerts
                </label>
                <textarea
                  id="service"
                  className="w-full min-h-[80px] p-2 border rounded-md"
                  value={newInstitution.service}
                  onChange={(e) =>
                    setNewInstitution({
                      ...newInstitution,
                      service: e.target.value,
                    })
                  }
                  placeholder="Liste des services offerts par l'institution..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="rs_1" className="text-sm font-medium">
                    Réseau social 1 (rs_1)
                  </label>
                  <Input
                    id="rs_1"
                    value={newInstitution.rs_1}
                    onChange={(e) =>
                      setNewInstitution({
                        ...newInstitution,
                        rs_1: e.target.value,
                      })
                    }
                    placeholder="Ex: https://facebook.com/institution"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="rs_2" className="text-sm font-medium">
                    Réseau social 2 (rs_2)
                  </label>
                  <Input
                    id="rs_2"
                    value={newInstitution.rs_2}
                    onChange={(e) =>
                      setNewInstitution({
                        ...newInstitution,
                        rs_2: e.target.value,
                      })
                    }
                    placeholder="Ex: https://linkedin.com/institution"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="partenaire_feg" className="text-sm font-medium">
                  Est partenaire FEG ?
                </label>
                <Select
                  value={newInstitution.partenaire_feg ? "oui" : "non"}
                  onValueChange={(value) =>
                    setNewInstitution({
                      ...newInstitution,
                      partenaire_feg: value === "oui",
                    })
                  }
                >
                  <SelectTrigger id="partenaire_feg">
                    <SelectValue placeholder="Oui ou Non" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="oui">Oui</SelectItem>
                    <SelectItem value="non">Non</SelectItem>
                  </SelectContent>
                </Select>
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
                onClick={handleCreateInstitution}
              >
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
                Catégorie d'institution
              </label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger id="type-filter">
                  <SelectValue placeholder="Tous les types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  <SelectItem value="banque">Banque</SelectItem>
                  <SelectItem value="microfinance">Microfinance</SelectItem>
                  <SelectItem value="fonds">Fonds d'investissement</SelectItem>
                  <SelectItem value="institution_publique">
                    Institution publique
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSearchTerm("");
                  setTypeFilter("");
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
          <CardDescription>
            {filteredInstitutions.length} institution(s) trouvée(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Logo</TableHead>
                <TableHead className="w-[300px]">Nom</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedInstitutions.map((institution) => (
                <TableRow key={institution.id_institutionFinanciere}>
                  <TableCell>
                    {institution.logo && (
                      <Image
                        src={institution.logo}
                        alt={institution.nom}
                        width={50}
                        height={50}
                        className="rounded-md"
                      />
                    )}
                  </TableCell>
                  <TableCell className="font-medium">
                    {institution.nom}
                  </TableCell>
                  <TableCell>{institution.categorie}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm">{institution.contact}</div>
                      <div className="text-sm text-muted-foreground">
                        {institution.mail}
                      </div>
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
                          onClick={() => openViewDialog(institution)}
                        >
                          <Eye className="mr-2 h-4 w-4" /> Voir
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => openEditDialog(institution)}
                        >
                          <Pencil className="mr-2 h-4 w-4" /> Modifier
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => openDeleteDialog(institution)}
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
            Affichage de {filteredInstitutions.length} sur {institutions.length}{" "}
            institutions
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage((prev) => Math.max(prev - 1, 1));
                  }}
                  className={
                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>

              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      isActive={currentPage === page}
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(page);
                      }}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                  }}
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardFooter>
      </Card>

      {/* Dialogue de modification */}
      {selectedInstitutionId && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px] sm:max-h-[500px] overflow-y-auto z-50">
            <DialogHeader>
              <DialogTitle>Modifier une institution financière</DialogTitle>
              <DialogDescription>
                Modifiez les informations de l'institution financière.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="edit-nom" className="text-sm font-medium">
                    Nom de l'institution
                  </label>
                  <Input
                    id="edit-nom"
                    value={editedInstitution.nom}
                    onChange={(e) =>
                      setEditedInstitution({
                        ...editedInstitution,
                        nom: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="logo" className="text-sm font-medium">
                    Logo de l'institution
                  </label>
                  <Input
                    id="logo"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setEditedInstitution({
                            ...editedInstitution,
                            logo: reader.result as string, // Stocke l'URL base64 dans le state
                          });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="type_institution"
                    className="text-sm font-medium"
                  >
                    Type d'institution
                  </label>
                  <Select
                    value={editedInstitution.type_institution}
                    onValueChange={(value) =>
                      setEditedInstitution({
                        ...editedInstitution,
                        type_institution: value,
                      })
                    }
                  >
                    <SelectTrigger id="type_institution">
                      <SelectValue placeholder="Sélectionner un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="banque commerciale">
                        Banque commerciale
                      </SelectItem>
                      <SelectItem value="banque d'investissement">
                        Banque d'investissement
                      </SelectItem>
                      <SelectItem value="cooperative d'épargne">
                        Coopérative d'épargne
                      </SelectItem>
                      <SelectItem value="fonds souverain">
                        Fonds souverain
                      </SelectItem>
                      <SelectItem value="établissement public">
                        Établissement public
                      </SelectItem>
                      <SelectItem value="autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="edit-categorie"
                    className="text-sm font-medium"
                  >
                    Catégorie d'institution
                  </label>
                  <Select
                    value={editedInstitution.categorie}
                    onValueChange={(value) =>
                      setEditedInstitution({
                        ...editedInstitution,
                        categorie: value,
                      })
                    }
                  >
                    <SelectTrigger id="categorie">
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="banque">Banque</SelectItem>
                      <SelectItem value="microfinance">Microfinance</SelectItem>
                      <SelectItem value="fonds">
                        Fonds d'investissement
                      </SelectItem>
                      <SelectItem value="institution_publique">
                        Institution publique
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

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
                    value={editedInstitution.contact}
                    onChange={(e) =>
                      setEditedInstitution({
                        ...editedInstitution,
                        contact: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="edit-email" className="text-sm font-medium">
                    Email
                  </label>

                  <Input
                    id="edit-email"
                    value={editedInstitution.mail}
                    onChange={(e) =>
                      setEditedInstitution({
                        ...editedInstitution,
                        mail: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="edit-adresse" className="text-sm font-medium">
                  Adresse
                </label>

                <Input
                  id="edit-adresse"
                  value={editedInstitution.adresse}
                  onChange={(e) =>
                    setEditedInstitution({
                      ...editedInstitution,
                      adresse: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="edit-site_web" className="text-sm font-medium">
                  Site web
                </label>

                <Input
                  id="edit-site_web"
                  value={editedInstitution.site_web}
                  onChange={(e) =>
                    setEditedInstitution({
                      ...editedInstitution,
                      site_web: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="edit-description"
                  className="text-sm font-medium"
                >
                  Description
                </label>

                <Input
                  id="edit-description"
                  className="w-full min-h-[100px] p-2 border rounded-md"
                  value={editedInstitution.description}
                  onChange={(e) =>
                    setEditedInstitution({
                      ...editedInstitution,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="edit-services" className="text-sm font-medium">
                  Services offerts
                </label>

                <Input
                  id="edit-services"
                  className="w-full min-h-[80px] p-2 border rounded-md"
                  value={editedInstitution.service}
                  onChange={(e) =>
                    setEditedInstitution({
                      ...editedInstitution,
                      service: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="rs_1" className="text-sm font-medium">
                  Réseau social 1 (rs_1)
                </label>
                <Input
                  id="rs_1"
                  value={editedInstitution.rs_1}
                  onChange={(e) =>
                    setEditedInstitution({
                      ...editedInstitution,
                      rs_1: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="rs_2" className="text-sm font-medium">
                  Réseau social 2 (rs_2)
                </label>
                <Input
                  id="rs_2"
                  value={editedInstitution.rs_2}
                  onChange={(e) =>
                    setEditedInstitution({
                      ...editedInstitution,
                      rs_2: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="partenaire_feg" className="text-sm font-medium">
                  Est partenaire FEG ?
                </label>
                <Select
                  value={editedInstitution.partenaire_feg ? "oui" : "non"}
                  onValueChange={(value) =>
                    setEditedInstitution({
                      ...editedInstitution,
                      partenaire_feg: value === "oui",
                    })
                  }
                >
                  <SelectTrigger id="partenaire_feg">
                    <SelectValue placeholder="Oui ou Non" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="oui">Oui</SelectItem>
                    <SelectItem value="non">Non</SelectItem>
                  </SelectContent>
                </Select>
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
                onClick={() =>
                  handleEditInstitution(
                    editedInstitution as FinancialInstitution
                  )
                }
              >
                Enregistrer les modifications
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Dialogue de suppression */}
      {selectedInstitutionId && (
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-[425px] z-50">
            <DialogHeader>
              <DialogTitle>Confirmer la suppression</DialogTitle>
              <DialogDescription>
                Êtes-vous sûr de vouloir supprimer l'institution "
                {selectedInstitution?.nom}" ? Cette action est irréversible.
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
                onClick={async () => {
                  if (selectedInstitutionId) {
                    await handleDeleteInstitution(selectedInstitutionId);
                    setIsDeleteDialogOpen(false);
                    setSelectedInstitution(null);
                    setSelectedInstitutionId(null);
                  }
                }}
              >
                Supprimer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Carte de détails de l'institution - NOUVELLE VERSION */}
      {isDetailsCardVisible && selectedInstitutionDetails && (
        <Card
          onClick={(e) => e.stopPropagation()}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-11/12 max-w-2xl hover:shadow-md transition-shadow"
        >
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#063a1e]/10 rounded-md flex items-center justify-center">
                  <Image
                    src={
                      selectedInstitutionDetails?.logo ||
                      "/images/default-logo.png"
                    }
                    alt="Logo de l'institution"
                    width={48}
                    height={48}
                    className="rounded-md"
                  />
                </div>

                <div>
                  <CardTitle>{selectedInstitutionDetails.nom}</CardTitle>
                  <CardDescription>
                    {selectedInstitutionDetails.type_institution}
                  </CardDescription>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={closeViewDialog}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 ">
              <p className="text-sm text-muted-foreground">
                {selectedInstitutionDetails.description}
              </p>
              <div className="space-y-2 grid grid-cols-2">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-[#063a1e] mt-0.5" />
                  <span className="text-sm">
                    {selectedInstitutionDetails.adresse}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Phone className="h-4 w-4 text-[#063a1e] mt-0.5" />
                  <a
                    href={`tel:${selectedInstitutionDetails.contact}`}
                    className="text-sm hover:underline underline-offset-4"
                  >
                    {selectedInstitutionDetails.contact}
                  </a>
                </div>
                <div className="flex items-start gap-2">
                  <Mail className="h-4 w-4 text-[#063a1e] mt-0.5" />
                  <a
                    href={`mailto:${selectedInstitutionDetails.mail}`}
                    className="text-sm hover:underline underline-offset-4"
                  >
                    {selectedInstitutionDetails.mail}
                  </a>
                </div>
                {selectedInstitutionDetails.site_web && (
                  <Link
                    target="_blank"
                    href={selectedInstitutionDetails.site_web}
                    className="flex text-[rgb(6,58,30)] hover:underline underline-offset-4 items-start gap-2"
                  >
                    <Globe className="h-4 w-4 text-[#063a1e] mt-0.5" />
                    Visiter le site web
                  </Link>
                )}
                {selectedInstitutionDetails.rs_1 && (
                  <Link
                    target="_blank"
                    href={selectedInstitutionDetails.rs_1}
                    className="flex text-[rgb(6,58,30)] hover:underline underline-offset-4 items-start gap-2"
                  >
                    <Facebook className="h-4 w-4 text-[#063a1e] mt-0.5" />
                    Facebook
                  </Link>
                )}
                {selectedInstitutionDetails.rs_2 && (
                  <Link
                    target="_blank"
                    href={selectedInstitutionDetails.rs_2}
                    className="flex text-[rgb(6,58,30)] hover:underline underline-offset-4 items-start gap-2"
                  >
                    <Linkedin className="h-4 w-4 text-[#063a1e] mt-0.5" />
                    Linkedin
                  </Link>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex flex-wrap gap-2">
              {selectedInstitutionDetails?.service &&
                selectedInstitutionDetails.service
                  .split(", ")
                  .map((service, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-[#063a1e]"
                    >
                      {service.trim()}
                    </Badge>
                  ))}
            </div>
            {selectedInstitutionDetails.site_web && (
              <Link target="_blank" href={selectedInstitutionDetails.site_web}>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1 border-[#063a1e] text-[#063a1e] hover:bg-[#063a1e]/10"
                >
                  Visiter le site <ExternalLink className="h-3 w-3" />
                </Button>
              </Link>
            )}
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
