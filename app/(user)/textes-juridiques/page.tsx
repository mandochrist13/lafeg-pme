"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Search,
  FileText,
  Download,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import textesJuridiques from "@/components/data/text/text";

// Mapping des noms d'onglets pour l'affichage
const tabNames = {
  pmes: "Textes pour les PME",
  internationaux: "Textes régionaux et internationaux",
  administrations: "Textes des administrations",
};

export default function TextesJuridiques() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("pmes");
  const [sortOption, setSortOption] = useState("recent");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [suggestedTab, setSuggestedTab] = useState<string | null>(null);
  const [suggestedResults, setSuggestedResults] = useState<
    typeof textesJuridiques
  >([]);

  // Fonction pour gérer la recherche
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Fonction pour gérer le changement d'onglet
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Réinitialiser les suggestions lors du changement d'onglet
    setSuggestedTab(null);
  };

  // Fonction pour gérer le tri
  const handleSort = (value: string) => {
    setSortOption(value);
  };

  // Fonction pour gérer les filtres de type
  const handleTypeFilter = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  // Fonction pour appliquer tous les filtres
  const applyFilters = () => {
    // Cette fonction est appelée lorsque le bouton "Appliquer les filtres" est cliqué
    // Dans cette implémentation, les filtres sont déjà appliqués en temps réel
  };

  // Filtrer les textes en fonction de la recherche et des filtres
  const filteredTextes = textesJuridiques.filter((texte) => {
    // Filtre par onglet actif
    if (texte.categorie !== activeTab) return false;

    // Filtre par terme de recherche
    if (
      searchTerm &&
      !texte.titre.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !texte.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !texte.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
    ) {
      return false;
    }

    // Filtre par type de texte
    if (selectedTypes.length > 0 && !selectedTypes.includes(texte.type)) {
      return false;
    }

    return true;
  });

  // Trier les textes
  const sortedTextes = [...filteredTextes].sort((a, b) => {
    switch (sortOption) {
      case "recent":
        return (
          new Date(b.date.split("/").reverse().join("-")).getTime() -
          new Date(a.date.split("/").reverse().join("-")).getTime()
        );
      case "old":
        return (
          new Date(a.date.split("/").reverse().join("-")).getTime() -
          new Date(b.date.split("/").reverse().join("-")).getTime()
        );
      case "az":
        return a.titre.localeCompare(b.titre);
      case "za":
        return b.titre.localeCompare(a.titre);
      default:
        return 0;
    }
  });

  // Trouver des résultats dans d'autres onglets lorsqu'aucun résultat n'est trouvé
  useEffect(() => {
    if (searchTerm && filteredTextes.length === 0) {
      // Chercher dans les autres onglets
      const otherTabsResults: Record<string, typeof textesJuridiques> = {};

      Object.keys(tabNames).forEach((tab) => {
        if (tab !== activeTab) {
          const results = textesJuridiques.filter((texte) => {
            if (texte.categorie !== tab) return false;

            // Appliquer les mêmes filtres de recherche
            if (
              searchTerm &&
              !texte.titre.toLowerCase().includes(searchTerm.toLowerCase()) &&
              !texte.description
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) &&
              !texte.tags.some((tag) =>
                tag.toLowerCase().includes(searchTerm.toLowerCase())
              )
            ) {
              return false;
            }

            // Appliquer les filtres de type
            if (
              selectedTypes.length > 0 &&
              !selectedTypes.includes(texte.type)
            ) {
              return false;
            }

            return true;
          });

          otherTabsResults[tab] = results;
        }
      });

      // Trouver l'onglet avec le plus de résultats
      let bestTab = null;
      let maxResults = 0;

      Object.entries(otherTabsResults).forEach(([tab, results]) => {
        if (results.length > maxResults) {
          maxResults = results.length;
          bestTab = tab;
        }
      });

      if (bestTab && maxResults > 0) {
        setSuggestedTab(bestTab);
        setSuggestedResults(otherTabsResults[bestTab]);
      } else {
        setSuggestedTab(null);
        setSuggestedResults([]);
      }
    } else {
      setSuggestedTab(null);
      setSuggestedResults([]);
    }
  }, [searchTerm, activeTab, selectedTypes, filteredTextes.length]);

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
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-4 py-5 sm:px-6 bg-[#f7f7f7]">
                <h3 className="text-lg font-semibold text-[#063a1e]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 inline-block mr-2 align-middle"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 18h3.75"
                    />
                  </svg>
                  Filtres avancés
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Affinez votre recherche par type de document.
                </p>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">
                      Type de texte
                    </h3>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center">
                        <input
                          id="type1"
                          name="type"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-[#063a1e] focus:ring-[#063a1e]"
                          checked={selectedTypes.includes("Loi")}
                          onChange={() => handleTypeFilter("Loi")}
                        />
                        <label
                          htmlFor="type1"
                          className="ml-2 block text-sm text-gray-900"
                        >
                          Loi
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="type2"
                          name="type"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-[#063a1e] focus:ring-[#063a1e]"
                          checked={selectedTypes.includes("Décret")}
                          onChange={() => handleTypeFilter("Décret")}
                        />
                        <label
                          htmlFor="type2"
                          className="ml-2 block text-sm text-gray-900"
                        >
                          Décret
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="type3"
                          name="type"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-[#063a1e] focus:ring-[#063a1e]"
                          checked={selectedTypes.includes("Arrêté")}
                          onChange={() => handleTypeFilter("Arrêté")}
                        />
                        <label
                          htmlFor="type3"
                          className="ml-2 block text-sm text-gray-900"
                        >
                          Arrêté
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="type4"
                          name="type"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-[#063a1e] focus:ring-[#063a1e]"
                          checked={selectedTypes.includes("Code")}
                          onChange={() => handleTypeFilter("Code")}
                        />
                        <label
                          htmlFor="type4"
                          className="ml-2 block text-sm text-gray-900"
                        >
                          Code
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="type5"
                          name="type"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-[#063a1e] focus:ring-[#063a1e]"
                          checked={selectedTypes.includes(
                            "Acte uniforme OHADA"
                          )}
                          onChange={() =>
                            handleTypeFilter("Acte uniforme OHADA")
                          }
                        />
                        <label
                          htmlFor="type5"
                          className="ml-2 block text-sm text-gray-900"
                        >
                          Acte uniforme OHADA
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 w-full">
            <div className="bg-white p-6 rounded-lg border ">
              <h1 className="text-2xl font-bold mb-6 text-[#063a1e]">
                Textes Juridiques pour les PME Gabonaises
              </h1>

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

              <Tabs
                defaultValue="pmes"
                value={activeTab}
                onValueChange={handleTabChange}
              >
                <TabsList className="bg-gray-200 w-auto h-full flex flex-col md:flex-row justify-evenly items-center ">
                  <TabsTrigger
                    value="pmes"
                    className="w-full md:w-auto text-center px-4 py-2"
                  >
                    Textes pour les PME
                  </TabsTrigger>
                  <TabsTrigger
                    value="internationaux"
                    className="w-full md:w-auto text-center px-4 py-2"
                  >
                    Textes régionaux et internationaux
                  </TabsTrigger>
                  <TabsTrigger
                    value="administrations"
                    className="w-full md:w-auto text-center px-4 py-2"
                  >
                    Textes des administrations
                  </TabsTrigger>
                </TabsList>

                {["pmes", "internationaux", "administrations"].map((tab) => (
                  <TabsContent key={tab} id={tab} value={tab}>
                    <p className="text-sm text-muted-foreground mb-6 ">
                      Affichage de{" "}
                      {sortedTextes.length > 0
                        ? `1-${sortedTextes.length}`
                        : "0"}{" "}
                      sur{" "}
                      {
                        textesJuridiques.filter((t) => t.categorie === tab)
                          .length
                      }{" "}
                      résultats
                      {searchTerm && ` pour "${searchTerm}"`}
                    </p>

                    {sortedTextes.length > 0 ? (
                      <div className="space-y-4">
                        {sortedTextes.map((texte) => (
                          <Card
                            key={texte.id}
                            className="hover:shadow-sm transition-shadow"
                          >
                            <CardContent className="p-4">
                              <div className="flex flex-col md:flex-row md:items-center gap-4">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <Badge className="bg-[#063a1e] text-white">
                                      {texte.type}
                                    </Badge>
                                    <span className="text-sm text-muted-foreground">
                                      Publié le {texte.date}
                                    </span>
                                  </div>
                                  <h3 className="font-medium">{texte.titre}</h3>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {texte.description}
                                  </p>
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    {texte.tags.map((tag, index) => (
                                      <Badge
                                        key={index}
                                        variant="outline"
                                        className="text-xs"
                                      >
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
                      <div className="space-y-4">
                        <div className="text-center py-4">
                          <p className="text-muted-foreground">
                            Aucun résultat trouvé pour votre recherche dans
                            cette section.
                          </p>
                        </div>

                        {suggestedTab && suggestedResults.length > 0 && (
                          <Alert className="bg-[#f0f9f1] border-[#063a1e]/20">
                            <AlertTitle className="text-[#063a1e] flex items-center gap-2">
                              <ArrowRight className="h-4 w-4" />
                              Résultats trouvés dans une autre section
                            </AlertTitle>
                            <AlertDescription className="mt-2">
                              <p className="mb-3">
                                Nous avons trouvé {suggestedResults.length}{" "}
                                résultat(s) pour "{searchTerm}" dans la section
                                "
                                {
                                  tabNames[
                                    suggestedTab as keyof typeof tabNames
                                  ]
                                }
                                ".
                              </p>
                              <Button
                                onClick={() => setActiveTab(suggestedTab)}
                                className="bg-[#063a1e] hover:bg-[#063a1e]/90"
                              >
                                Voir les résultats
                              </Button>
                            </AlertDescription>
                          </Alert>
                        )}

                        {(!suggestedTab || suggestedResults.length === 0) && (
                          <div className="text-center py-4">
                            <p className="text-muted-foreground">
                              Aucun résultat trouvé dans les autres sections non
                              plus.
                            </p>
                            <p className="text-muted-foreground mt-2">
                              Essayez de modifier vos termes de recherche ou vos
                              filtres.
                            </p>
                          </div>
                        )}
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
  );
}
