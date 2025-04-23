"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, Building, Briefcase } from "lucide-react";
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
  FinancialInstitution,
} from "@/app/services/institution/api";
import {
  fetchTextesJuridiques,
  TexteJuridique,
} from "@/app/services/texte/api";
import { fetchAllSEAs, SEA } from "@/app/services/sea/api";

type ProgressProps = {
  value: number;
  className?: string;
  indicatorClassName?: string;
};

export default function AdminDashboard() {
  const [institutions, setInstitutions] = useState<FinancialInstitution[]>([]);
  const [loading, setLoading] = useState(true);
  const [textes, setTextes] = useState<TexteJuridique[]>([]);
  const [sea, setSea] = useState<SEA[]>([]);
  const [loadingTextes, setLoadingTextes] = useState(true);
  const [loadingSea, setLoadingSea] = useState(true);

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

  useEffect(() => {
    const fetchSeaData = async () => {
      try {
        const  data  = await fetchAllSEAs();
        setSea(data);
      } catch (error) {
        console.error("Erreur lors du chargement des SEA :", error);
      } finally {
        setLoadingSea(false);
      }
    };

    fetchSeaData();
  }, []);

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


  //institutions
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




  //SEA
  const getCategorieSeaCounts = () => {
    const counts: Record<string, number> = {};

    sea.forEach((sea) => {
      const categorieSea = sea.categorie || "Autre";
      counts[categorieSea] = (counts[categorieSea] || 0) + 1;
    });

    return counts;
  };
  const seaCategorieCounts = getCategorieSeaCounts();
  const totalSea = sea.length;

  const getPercentageSea = (count: number) =>
    totalSea ? Math.round((count / totalSea) * 100) : 0;


 
//textes
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




  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Tableau de bord</h1>
      </div>

      {/* Statistiques */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Institutions financières
            </CardTitle>
            <Building className="h-8 w-8 text-[#063a1e]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? "..." :total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Structures d'accompagnement
            </CardTitle>
            <Briefcase className="h-8 w-8 text-[#063a1e]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loadingSea ? "..." :totalSea}</div>
          </CardContent>
        </Card>
      </div>

      {/* Statistiques par catégorie */}
      <div className="grid gap-4 md:grid-cols-3">
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
                        ></div>
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
                        className={`w-3 h-3 rounded-full`}
                        style={{
                          backgroundColor: [
                            "#063a1e",
                            "#dcdaa4",
                            "#bdbd95",
                            "#888",
                          ][i % 4],
                        }}
                      ></div>
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

        <Card>
          <CardHeader>
            <CardTitle>Structures d'accompagnement</CardTitle>
            <CardDescription>Répartition par type de structure</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
          {loadingSea ? (
              <p className="text-sm text-gray-500">Chargement...</p>
            ) : totalSea === 0 ? (
              <p className="text-sm text-gray-500">Aucun texte enregistré</p>
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
                        ></div>
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
              <Link href="/admin/contenu?tab=structures">
                Gérer les structures
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
