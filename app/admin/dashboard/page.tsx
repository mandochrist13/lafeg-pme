"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, Building, Briefcase, Newspaper, Megaphone, ClipboardList } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  fetchFinancialInstitutions,
  Institutions,
} from "@/app/services/institution/api";
import {
  fetchTextesJuridiques,
  TexteJuridique,
} from "@/app/services/texte/api";
import { fetchAllSEAs, SEA } from "@/app/services/sea/api";
import { listActualites, Actualite } from "@/app/services/actualite/api";
import { fetchOffres, Offre } from "@/app/services/offre/api";
import { fetchAllPublicites, Annonce } from "@/app/services/vente/api";

export default function AdminDashboard() {
  const [institutions, setInstitutions] = useState<Institutions[]>([]);
  const [loading, setLoading] = useState(true);
  const [textes, setTextes] = useState<TexteJuridique[]>([]);
  const [sea, setSea] = useState<SEA[]>([]);
  const [loadingTextes, setLoadingTextes] = useState(true);
  const [loadingSea, setLoadingSea] = useState(true);
  const [actualites, setActualites] = useState<Actualite[]>([]);
  const [loadingActualites, setLoadingActualites] = useState(true);
  const [offres, setOffres] = useState<Offre[]>([]);
  const [loadingOffres, setLoadingOffres] = useState(true);
  const [publicites, setPublicites] = useState<Annonce[]>([]);
  const [loadingPublicites, setLoadingPublicites] = useState(true);

  // fetch Textes
  useEffect(() => {
    const fetchTextesData = async () => {
      try {
        const { data } = await fetchTextesJuridiques();
        setTextes(data);
      } catch (error) {
        console.error("Erreur lors du chargement des textes :", error);
      } finally {
        setLoadingTextes(false);
      }
    };
    fetchTextesData();
  }, []);

  // fetch SEA
useEffect(() => {
  const fetchSeaData = async () => {
    try {
      const data = await fetchAllSEAs(); // ✅ Appelle ta fonction du service
      setSea(data || []);
    } catch (error) {
      console.error("Erreur lors du chargement des données SEA :", error);
      setSea([]);
    } finally {
      setLoadingSea(false); // ✅ Corrigé ici aussi
    }
  };

  fetchSeaData();
}, []);


  // fetch Actualités
  useEffect(() => {
    const fetchActualitesData = async () => {
      try {
        const res = await listActualites({ limit: 1000 }) as { data: Actualite[] };
        setActualites(res.data);
      } catch (error) {
        console.error("Erreur lors du chargement des actualités :", error);
      } finally {
        setLoadingActualites(false);
      }
    };
    fetchActualitesData();
  }, []);

  // fetch Offres
  useEffect(() => {
    const fetchOffresData = async () => {
      try {
        const { data } = await fetchOffres({ limit: 1000 });
        setOffres(data);
      } catch (error) {
        console.error("Erreur lors du chargement des offres :", error);
      } finally {
        setLoadingOffres(false);
      }
    };
    fetchOffresData();
  }, []);

  // fetch Publicités
  useEffect(() => {
    const fetchPublicitesData = async () => {
      try {
        const data = await fetchAllPublicites();
        setPublicites(data || []);
      } catch (error) {
        console.error("Erreur lors du chargement des publicités :", error);
        setPublicites([]);
      } finally {
        setLoadingPublicites(false);
      }
    };
    fetchPublicitesData();
  }, []);

  // fetch Institutions
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchFinancialInstitutions();
        setInstitutions(data);
      } catch (error) {
        console.error("Erreur lors du chargement des institutions :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Institutions stats
  const getCategorieCounts = () => {
    const counts: Record<string, number> = {};
    institutions.forEach((inst) => {
      const categorie = inst.categorie || "Autre";
      counts[categorie] = (counts[categorie] || 0) + 1;
    });
    return counts;
  };
  const categorieCounts = getCategorieCounts();
  const total = institutions.length;

  const getPercentage = (count: number) =>
    total ? Math.round((count / total) * 100) : 0;

  // Textes stats
  const getTextCategorieCounts = () => {
    const counts: Record<string, number> = {};
    textes.forEach((texte) => {
      const categorie = texte.categorie || "Autre";
      counts[categorie] = (counts[categorie] || 0) + 1;
    });
    return counts;
  };
  const textesCategorieCounts = getTextCategorieCounts();
  const totalTextes = textes.length;

  const getTextPercentage = (count: number) =>
    totalTextes ? Math.round((count / totalTextes) * 100) : 0;

  // SEA stats
  const getCategorieSeaCounts = () => {
    const counts: Record<string, number> = {};

    if (Array.isArray(sea)) {
      sea.forEach((item) => {
        const categorieSea = item?.categorie || "Autre";
        counts[categorieSea] = (counts[categorieSea] || 0) + 1;
      });
    }

    return counts;
  };

  const seaCategorieCounts = getCategorieSeaCounts();
  const totalSea = Array.isArray(sea) ? sea.length : 0;

  const getPercentageSea = (count: number) =>
    totalSea ? Math.round((count / totalSea) * 100) : 0;

  // Actualités stats
  const getActualiteCategorieCounts = () => {
    const counts: Record<string, number> = {};
    actualites.forEach((actu) => {
      const categorie = actu.categorie || "Autre";
      counts[categorie] = (counts[categorie] || 0) + 1;
    });
    return counts;
  };
  const actualiteCategorieCounts = getActualiteCategorieCounts();
  const totalActualites = actualites.length;

  const getActualitePercentage = (count: number) =>
    totalActualites ? Math.round((count / totalActualites) * 100) : 0;

  // Offres stats
  const getOffreTypeCounts = () => {
    const counts: Record<string, number> = {};
    offres.forEach((offre) => {
      const type = offre.type_offre || "Autre";
      counts[type] = (counts[type] || 0) + 1;
    });
    return counts;
  };
  const offreTypeCounts = getOffreTypeCounts();
  const totalOffres = offres.length;

  const getOffrePercentage = (count: number) =>
    totalOffres ? Math.round((count / totalOffres) * 100) : 0;

  // Publicités stats
  const totalPublicites = publicites.length;

  // Rendu JSX
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Tableau de bord</h1>
      </div>

      {/* Statistiques principales */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {/* Textes */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Textes juridiques
            </CardTitle>
            <FileText className="h-8 w-8 text-[#063a1e]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loadingTextes ? "..." : totalTextes}
            </div>
          </CardContent>
        </Card>

        {/* Institutions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Institutions financières
            </CardTitle>
            <Building className="h-8 w-8 text-[#063a1e]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? "..." : total}</div>
          </CardContent>
        </Card>

        {/* SEA */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Structures d'accompagnement
            </CardTitle>
            <Briefcase className="h-8 w-8 text-[#063a1e]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loadingSea ? "..." : totalSea}
            </div>
          </CardContent>
        </Card>

        {/* Actualités */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Actualités
            </CardTitle>
            <Newspaper className="h-8 w-8 text-[#063a1e]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loadingActualites ? "..." : totalActualites}
            </div>
          </CardContent>
        </Card>

        {/* Offres */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Offres
            </CardTitle>
            <ClipboardList className="h-8 w-8 text-[#063a1e]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loadingOffres ? "..." : totalOffres}
            </div>
          </CardContent>
        </Card>

        {/* Publicités */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Publicités
            </CardTitle>
            <Megaphone className="h-8 w-8 text-[#063a1e]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loadingPublicites ? "..." : totalPublicites}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Statistiques par catégorie */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Textes par catégorie */}
        <Card>
          <CardHeader>
            <CardTitle>Textes par catégorie</CardTitle>
            <CardDescription>
              Répartition des textes juridiques par catégorie
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {loadingTextes ? (
              <p className="text-sm text-gray-500">Chargement...</p>
            ) : totalTextes === 0 ? (
              <p className="text-sm text-gray-500">Aucun texte enregistré</p>
            ) : (
              Object.entries(textesCategorieCounts).map(
                ([categorie, count], i) => (
                  <div className="space-y-2" key={i}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{
                            backgroundColor: [
                              "#063a1e",
                              "#dcdaa4",
                              "#bdbd95",
                              "#888",
                            ][i % 4],
                          }}
                        />
                        <span className="text-sm capitalize">{categorie}</span>
                      </div>
                      <span className="text-sm font-medium">{count}</span>
                    </div>
                    <Progress
                      value={getTextPercentage(count)}
                      className="h-2 bg-gray-200"
                    />
                  </div>
                )
              )
            )}
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/admin/textes">Voir tous les textes</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Institutions par catégorie */}
        <Card>
          <CardHeader>
            <CardTitle>Institutions financières</CardTitle>
            <CardDescription>
              Répartition par type d'institution
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {loading ? (
              <p className="text-sm text-gray-500">Chargement...</p>
            ) : total === 0 ? (
              <p className="text-sm text-gray-500">
                Aucune institution enregistrée
              </p>
            ) : (
              Object.entries(categorieCounts).map(([categorie, count], i) => (
                <div className="space-y-2" key={i}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor: [
                            "#063a1e",
                            "#dcdaa4",
                            // "#bdbd95",
                            "#bdbd95",
                          ][i % 4],
                        }}
                      />
                      <span className="text-sm capitalize">{categorie}</span>
                    </div>
                    <span className="text-sm font-medium">{count}</span>
                  </div>
                  <Progress
                    value={getPercentage(count)}
                    className="h-2 bg-gray-200"
                  />
                </div>
              ))
            )}
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/admin/contenu?tab=institutions">
                Gérer les institutions
              </Link>
            </Button>
          </CardFooter>
        </Card>

        {/* SEA par catégorie */}
        <Card>
          <CardHeader>
            <CardTitle>Structures d'accompagnement</CardTitle>
            <CardDescription>Répartition par type de structure</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {loadingSea ? (
              <p className="text-sm text-gray-500">Chargement...</p>
            ) : totalSea === 0 ? (
              <p className="text-sm text-gray-500">
                Aucune structure enregistrée
              </p>
            ) : (
              Object.entries(seaCategorieCounts).map(
                ([categorie, count], i) => (
                  <div className="space-y-2" key={i}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{
                            backgroundColor: [
                              "#063a1e",
                              "#dcdaa4",
                              "#bdbd95",
                              "#888",
                            ][i % 4],
                          }}
                        />
                        <span className="text-sm capitalize">{categorie}</span>
                      </div>
                      <span className="text-sm font-medium">{count}</span>
                    </div>
                    <Progress
                      value={getPercentageSea(count)}
                      className="h-2 bg-gray-200"
                    />
                  </div>
                )
              )
            )}
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/admin/contenu?tab=structures">
                Gérer les structures
              </Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Actualités par catégorie */}
        <Card>
          <CardHeader>
            <CardTitle>Actualités</CardTitle>
            <CardDescription>
              Répartition des actualités par catégorie
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {loadingActualites ? (
              <p className="text-sm text-gray-500">Chargement...</p>
            ) : totalActualites === 0 ? (
              <p className="text-sm text-gray-500">
                Aucune actualité enregistrée
              </p>
            ) : (
              Object.entries(actualiteCategorieCounts).map(
                ([categorie, count], i) => (
                  <div className="space-y-2" key={i}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{
                            backgroundColor: [
                              "#063a1e",
                              "#dcdaa4",
                              "#bdbd95",
                              "#888",
                            ][i % 4],
                          }}
                        />
                        <span className="text-sm capitalize">{categorie}</span>
                      </div>
                      <span className="text-sm font-medium">{count}</span>
                    </div>
                    <Progress
                      value={getActualitePercentage(count)}
                      className="h-2 bg-gray-200"
                    />
                  </div>
                )
              )
            )}
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/admin/actualite">Voir les actualités</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Offres par type */}
        <Card>
          <CardHeader>
            <CardTitle>Offres</CardTitle>
            <CardDescription>
              Répartition des offres par type
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {loadingOffres ? (
              <p className="text-sm text-gray-500">Chargement...</p>
            ) : totalOffres === 0 ? (
              <p className="text-sm text-gray-500">
                Aucune offre enregistrée
              </p>
            ) : (
              Object.entries(offreTypeCounts).map(
                ([type, count], i) => (
                  <div className="space-y-2" key={i}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{
                            backgroundColor: [
                              "#063a1e",
                              "#dcdaa4",
                              "#bdbd95",
                              "#888",
                            ][i % 4],
                          }}
                        />
                        <span className="text-sm capitalize">{type.toLowerCase()}</span>
                      </div>
                      <span className="text-sm font-medium">{count}</span>
                    </div>
                    <Progress
                      value={getOffrePercentage(count)}
                      className="h-2 bg-gray-200"
                    />
                  </div>
                )
              )
            )}
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/admin/entreprise">Gérer les offres</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Publicités - récap simple */}
        <Card>
          <CardHeader>
            <CardTitle>Publicités</CardTitle>
            <CardDescription>
              Annonces publicitaires enregistrées
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {loadingPublicites ? (
              <p className="text-sm text-gray-500">Chargement...</p>
            ) : totalPublicites === 0 ? (
              <p className="text-sm text-gray-500">
                Aucune publicité enregistrée
              </p>
            ) : (
              <div className="text-center py-4">
                <div className="text-4xl font-bold text-[#063a1e]">{totalPublicites}</div>
                <p className="text-sm text-gray-500 mt-1">publicités actives</p>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/admin/vente">Gérer les publicités</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
