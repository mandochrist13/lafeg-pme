"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Calendar,
  ChevronRight,
  ArrowRight,
  Grid,
  List,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { fetchActualites, type Actualite } from "@/app/services/public/actualite";
// import slugify from "slugify"

const categories = [
  "Toutes",
  "Réglementation",
  "Événements",
  "Financement",
  "Innovation",
  "Commerce",
  "Formation",
];

export default function ActualitesPage() {
  // ✅ Les hooks doivent être dans le composant
  const [actualites, setActualites] = useState<Actualite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Toutes");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("recent");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const res = await fetchActualites();
        setActualites(res.data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // 🔍 Filtrage et tri
  const filteredActualites = useMemo(() => {
  const list = Array.isArray(actualites) ? actualites : [];

  const filtered = list.filter((article) => {
    const matchesSearch =
      article.titre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.contenu?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "Toutes" || article.categorie === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (sortBy === "recent") {
    filtered.sort(
      (a, b) => new Date(b.datePub).getTime() - new Date(a.datePub).getTime()
    );
  }

  return filtered;
}, [searchTerm, selectedCategory, sortBy, actualites]);

  const featuredArticles = actualites
    .filter((a) => a.categorie === "Événements")
    .slice(0, 2);

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading)
    return (
      <p className="p-8 text-center text-gray-500">
        Chargement des actualités...
      </p>
    );
  if (error)
    return (
      <p className="p-8 text-center text-red-600">
        Erreur : {error}
      </p>
    );

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
                  <span>Actualité</span>
                </div>
              </div>
            </div>
      {/* Hero Section */}
      <div className="relative bg-[#063a1e] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#063a1e]/90 to-[#0a4d28]/20" />
        <div className="absolute inset-0 bg-[url('/feg_actu.png?height=600&width=1200')] bg-cover bg-center opacity-20" />
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">Actualités</h1>
            <p className="text-xl text-green-100 mb-8">
              Restez informé des dernières nouvelles du monde des PME gabonaises
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        
        {/* Articles à la une */}
        {featuredArticles.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#063a1e] mb-8">À la une</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredArticles.map((article) => (
                <Card
                  key={article.id}
                  className="overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative h-64">
                    <Image
                      src={article.imageUrl || "/article.png"}
                      alt={article.titre}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-[#063a1e] text-white">
                        {article.categorie}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-[#063a1e] mb-3 line-clamp-2">
                      {article.titre}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {article.contenu.slice(0, 150)}...
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-4">
                       
                        <div className="flex text-black items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(article.datePub)}</span>
                        </div>
                        
                      </div>
                    </div>
                    <Link href={`/actualites/${article.id}`}>
                      <Button className="bg-[#063a1e] hover:bg-[#063a1e]/90 w-full">
                        Lire l'article
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Filtres et recherche */}
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-3/4">
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                  <div className="flex-1 w-full md:w-auto">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="Rechercher un article..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 w-full md:w-auto">
                    <Select
                      value={selectedCategory}
                      onValueChange={setSelectedCategory}
                    >
                      <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Trier par" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recent">Plus récent</SelectItem>
                        <SelectItem value="popular">Plus populaire</SelectItem>
                        <SelectItem value="alphabetical">
                          Alphabétique
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="flex border rounded-md">
                      <Button
                        variant={viewMode === "grid" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("grid")}
                        className="rounded-r-none"
                      >
                        <Grid className="w-4 h-4" />
                      </Button>
                      <Button
                        variant={viewMode === "list" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("list")}
                        className="rounded-l-none"
                      >
                        <List className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Liste des articles */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredActualites.map((article) => (
                  <Card
                    key={article.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="relative h-48">
                      <Image
                        src={article.imageUrl || "/article.png"}
                        alt={article.titre}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge variant="secondary">{article.categorie}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold text-[#063a1e] mb-2 line-clamp-2">
                        {article.titre}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {article.contenu.slice(0, 100)}...
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                        <span>{formatDate(article.datePub)}</span>
                       
                      </div>
                      <Link href={`/actualite/${article.id}`}>
  <Button variant="default" size="sm" className="w-full">
    Lire la suite
  </Button>
</Link>

                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredActualites.map((article) => (
                  <Card
                    key={article.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <div className="relative w-32 h-24 flex-shrink-0">
                          <Image
                            src={article.imageUrl || "/article.png"}
                            alt={article.titre}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-lg font-semibold text-[#063a1e] line-clamp-1">
                              {article.titre}
                            </h3>
                            <Badge variant="secondary" className="ml-2">
                              {article.categorie}
                            </Badge>
                          </div>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                            {article.contenu.slice(0, 120)}...
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span>{formatDate(article.datePub)}</span>
                              {/* <span>{article.tempsLecture}</span>
                              <span>{article.vues} vues</span> */}
                            </div>
                            <Link href={`/actualite${article.id}`}>
                              <Button variant="outline" size="sm">
                                Lire
                                <ArrowRight className="w-3 h-3 ml-1" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {filteredActualites.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-gray-500 text-lg">
                    Aucun article ne correspond à vos critères de recherche.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("Toutes");
                    }}
                    className="mt-4"
                  >
                    Réinitialiser les filtres
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="space-y-6">
              {/* Catégories */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-[#063a1e]">
                    Catégories
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {categories.slice(1).map((category) => {
                      const count = actualites.filter(
                        (article) => article.categorie === category
                      ).length;
                      return (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                            selectedCategory === category
                              ? "bg-[#063a1e] text-white"
                              : "hover:bg-gray-100 text-gray-700"
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span>{category}</span>
                            <Badge variant="outline" className="text-xs">
                              {count}
                            </Badge>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
