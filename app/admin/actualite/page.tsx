"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  Calendar,
  Clock,
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
import ActualiteForm from "./ActualiteForm";
import ActualitePreview from "./ActualitePreview"

import {
  listActualites,
  deleteActualite,
  type Actualite,
  type PageMeta,
} from "@/app/services/actualite/api";

function formatFR(d: string) {
  try {
    return new Date(d).toLocaleDateString("fr-FR");
  } catch {
    return d;
  }
}

export default function ActualitesAdmin() {
  const [items, setItems] = useState<Actualite[]>([]);
  const [meta, setMeta] = useState<PageMeta>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState<Actualite | null>(null);
const [openPreview, setOpenPreview] = useState(false)
const [viewing, setViewing] = useState<Actualite | null>(null)

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategorie, setSelectedCategorie] = useState<string>("");
  const [selectedStatut, setSelectedStatut] = useState<string>(""); // affichage seulement
  const [page, setPage] = useState(1);
  const limit = 10;

  async function fetchData(p = page) {
    try {
      setLoading(true);
      setError(null);
      const res = await listActualites({
        page: p,
        limit,
        categorie: selectedCategorie,
      });
      setItems(res.data);
      setMeta(res.pagination);
    } catch (e: any) {
      setError(e?.message || "Erreur de chargement");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData(1); // réinitialise page si filtre change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategorie]);

  useEffect(() => {
    fetchData(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const filtered = useMemo(() => {
    const s = searchTerm.trim().toLowerCase();
    return items.filter((a) => {
      const matchSearch =
        s === "" ||
        a.titre.toLowerCase().includes(s) ||
        a.contenu.toLowerCase().includes(s);
      const matchStatut =
        selectedStatut === "" ||
        selectedStatut === "all" ||
        selectedStatut === "Publié"; // statut virtuel
      return matchSearch && matchStatut;
    });
  }, [items, searchTerm, selectedStatut]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    items.forEach((i) => i.categorie && set.add(i.categorie));
    return Array.from(set);
  }, [items]);

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer cette actualité ?")) return;
    try {
      await deleteActualite(id);
      // Optimistic: on recharge la page courante
      fetchData(page);
    } catch (e: any) {
      alert(e?.message || "Erreur lors de la suppression");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Actualités</h1>
        <Button
          className="bg-[#063a1e] hover:bg-[#063a1e]/90"
          onClick={() => {
            setEditing(null);
            setOpenForm(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> Ajouter une actualité
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher une actualité..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select
                value={selectedCategorie}
                onValueChange={(v) => setSelectedCategorie(v)}
              >
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  {categories.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedStatut} onValueChange={setSelectedStatut}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="Publié">Publié</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {selectedCategorie && selectedCategorie !== "all" && (
              <Badge
                variant="outline"
                className="bg-[#063a1e]/10 border-[#063a1e]/30 gap-1"
              >
                <span>Catégorie: {selectedCategorie}</span>
                <button
                  className="text-xs"
                  onClick={() => setSelectedCategorie("")}
                >
                  ✕
                </button>
              </Badge>
            )}
            {selectedStatut && selectedStatut !== "all" && (
              <Badge
                variant="outline"
                className="bg-[#063a1e]/10 border-[#063a1e]/30 gap-1"
              >
                <span>Statut: {selectedStatut}</span>
                <button
                  className="text-xs"
                  onClick={() => setSelectedStatut("")}
                >
                  ✕
                </button>
              </Badge>
            )}
            {(selectedCategorie && selectedCategorie !== "all") ||
            (selectedStatut && selectedStatut !== "all") ? (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs"
                onClick={() => {
                  setSelectedCategorie("");
                  setSelectedStatut("");
                }}
              >
                Effacer tous les filtres
              </Button>
            ) : null}
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[400px]">Titre</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Date de publication</TableHead>
                  <TableHead>Date de l'événement</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading && (
                  <TableRow>
                    <TableCell colSpan={6}>Chargement…</TableCell>
                  </TableRow>
                )}
                {error && !loading && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-red-600">
                      {error}
                    </TableCell>
                  </TableRow>
                )}
                {!loading && !error && filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6}>Aucune actualité</TableCell>
                  </TableRow>
                )}
                {!loading &&
                  !error &&
                  filtered.map((a) => (
                    <TableRow key={a.id}>
                      <TableCell className="font-medium">{a.titre}</TableCell>
                      <TableCell>
                        {a.categorie ? (
                          <Badge
                            variant="outline"
                            className="bg-[#063a1e]/10 border-[#063a1e]/30"
                          >
                            {a.categorie}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell>{formatFR(a.datePub)}</TableCell>
                      <TableCell>
                        <span className="text-muted-foreground">-</span>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-500">Publié</Badge>
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
                            <DropdownMenuItem
  onClick={() => {
    setViewing(a)
    setOpenPreview(true)
  }}
>
  <Eye className="mr-2 h-4 w-4" /> Voir
</DropdownMenuItem>

                            <DropdownMenuItem
                              onClick={() => {
                                setEditing(a);
                                setOpenForm(true);
                              }}
                            >
                              <Edit className="mr-2 h-4 w-4" /> Modifier
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleDelete(a.id)}
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
              Affichage de {filtered.length} sur {meta?.total ?? 0 } actualités
            </p>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setPage((p) => Math.max(1, p - 1));
                    }}
                  />
                </PaginationItem>
                {Array.from({ length: meta?.totalPages ?? 0 })
                  .slice(0, 5)
                  .map((_, i) => {
                    const n = i + 1;
                    return (
                      <PaginationItem key={n}>
                        <PaginationLink
                          href="#"
                          isActive={n === meta.page}
                          onClick={(e) => {
                            e.preventDefault();
                            setPage(n);
                          }}
                        >
                          {n}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                {meta?.totalPages > 5 && <PaginationEllipsis />}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setPage((p) => Math.min(meta.totalPages, p + 1));
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
      <ActualiteForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        actualite={editing}
        onSaved={() => fetchData(page)}
      />
    </div>
  );
}
