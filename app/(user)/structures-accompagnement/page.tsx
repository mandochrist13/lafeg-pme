"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  Search,
  ExternalLink,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";

export default function InstitutionsFinancieres() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("banques");
  const [institutions, setInstitutions] = useState({
    banques: [],
    microfinance: [],
    fonds: [],
    publiques: []
  });
  const [loading, setLoading] = useState(true);

  // Fonction intégrée directement dans le composant
  const fetchInstitutions = async (type: string) => {
    try {
      const response = await fetch(`/api/sea?type=${type}`);
      if (!response.ok) {
        throw new Error('Échec de la récupération des institutions');
      }
      return await response.json();
    } catch (error) {
      console.error('Erreur:', error);
      return [];
    }
  };

  useEffect(() => {
    const chargerDonnees = async () => {
      try {
        setLoading(true);
        const [banques, microfinance, fonds, publiques] = await Promise.all([
          fetchInstitutions("banque"),
          fetchInstitutions("microfinance"),
          fetchInstitutions("fonds"),
          fetchInstitutions("publique")
        ]);
        
        setInstitutions({
          banques,
          microfinance,
          fonds,
          publiques
        });
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
      } finally {
        setLoading(false);
      }
    };

    chargerDonnees();
  }, []);

  const filtrerInstitutions = (data: any[]) => {
    return data.filter((item) => 
      item.nom.toLowerCase().includes(search.toLowerCase())
    );
  };

  const banquesFiltrees = filtrerInstitutions(institutions.banques);
  const microfinanceFiltree = filtrerInstitutions(institutions.microfinance);
  const fondsFiltres = filtrerInstitutions(institutions.fonds);
  const institutionsPubliquesFiltrees = filtrerInstitutions(institutions.publiques);

  const obtenirResultatsAutresSections = () => {
    const resultats = [];

    if (activeTab !== "banques" && banquesFiltrees.length > 0) {
      resultats.push({ tab: "banques", count: banquesFiltrees.length, label: "Banques" });
    }

    if (activeTab !== "microfinance" && microfinanceFiltree.length > 0) {
      resultats.push({ tab: "microfinance", count: microfinanceFiltree.length, label: "Microfinance" });
    }

    if (activeTab !== "fonds" && fondsFiltres.length > 0) {
      resultats.push({ tab: "fonds", count: fondsFiltres.length, label: "Fonds d'investissement" });
    }
    if (activeTab !== "publiques" && institutionsPubliquesFiltrees.length > 0) {
      resultats.push({ tab: "publiques", count: institutionsPubliquesFiltrees.length, label: "Institutions publiques" });
    }

    return resultats;
  };

  const resultatsAutresSections = search ? obtenirResultatsAutresSections() : [];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Chargement des données...</p>
      </div>
    );
  }

  const renderCarteInstitution = (item: any) => (
    <Card key={item.id} className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#063a1e]/10 rounded-md flex items-center justify-center">
              {item.logo && (
                <Image
                  src={item.logo}
                  alt={`Logo ${item.nom}`}
                  width={48}
                  height={48}
                  className="rounded bg-cover bg-center w-full h-full"
                />
              )}
            </div>
            <div>
              <CardTitle>{item.nom}</CardTitle>
              <CardDescription>{item.type_sea}</CardDescription>
            </div>
          </div>
          {item.partenaire_feg && <Badge variant="secondary">Partenaire FEG</Badge>}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {item.description || "Aucune description disponible"}
          </p>
          <div className="space-y-2">
            {item.adresse && (
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-[#063a1e] mt-0.5" />
                <span className="text-sm">{item.adresse}</span>
              </div>
            )}
            {item.contact && (
              <div className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-[#063a1e] mt-0.5" />
                <a
                  href={`tel:${item.contact}`}
                  className="text-sm hover:underline underline-offset-4"
                >
                  {item.contact}
                </a>
              </div>
            )}
            {item.mail && (
              <div className="flex items-start gap-2">
                <Mail className="h-4 w-4 text-[#063a1e] mt-0.5" />
                <a
                  href={`mailto:${item.mail}`}
                  className="text-sm hover:underline underline-offset-4"
                >
                  {item.mail}
                </a>
              </div>
            )}
            {item.rs_1 && (
              <Link
                target="_blank"
                href={item.rs_1}
                className="flex text-[rgb(6,58,30)] hover:underline underline-offset-4 items-start gap-2"
              >
                {item.rs_1.includes('facebook') ? 'Facebook' : 
                 item.rs_1.includes('linkedin') ? 'LinkedIn' : 
                 item.rs_1.includes('twitter') ? 'Twitter' : 'Réseau social'}
              </Link>
            )}
            {item.rs_2 && (
              <Link
                target="_blank"
                href={item.rs_2}
                className="flex text-[rgb(6,58,30)] hover:underline underline-offset-4 items-start gap-2"
              >
                {item.rs_2.includes('facebook') ? 'Facebook' : 
                 item.rs_2.includes('linkedin') ? 'LinkedIn' : 
                 item.rs_2.includes('twitter') ? 'Twitter' : 'Réseau social'}
              </Link>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Badge variant="outline" className="text-[#063a1e]">
          {item.categorie}
        </Badge>
        {item.site_web && (
          <Link target="_blank" href={item.site_web}>
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
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fil d'Ariane */}
      <div className="bg-white border-b">
        <div className="container py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-[#063a1e]">
              Accueil
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span>Institutions Financières</span>
          </div>
        </div>
      </div>

      {/* Section Hero */}
      <section className="bg-[#063a1e] text-white py-12">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold mb-4">
              Institutions Financières pour les PME Gabonaises
            </h1>
            <p className="text-white/90 text-lg mb-6">
              Découvrez les banques, établissements de microfinance et fonds
              d'investissement qui peuvent financer votre entreprise au Gabon.
            </p>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Rechercher une institution financière..."
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 h-12"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contenu Principal */}
      <div className="container py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
            <TabsTrigger value="banques">Banques</TabsTrigger>
            <TabsTrigger value="microfinance">Microfinance</TabsTrigger>
            <TabsTrigger value="fonds">Fonds d'investissement</TabsTrigger>
            <TabsTrigger value="publiques">Institutions publiques</TabsTrigger>
          </TabsList>

          {/* Banques */}
          <TabsContent value="banques" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {banquesFiltrees.map(renderCarteInstitution)}
            </div>
            {banquesFiltrees.length === 0 && (
              <p className="text-red-700 text-center font-bold italic">Aucun résultat trouvé dans la section Banques.</p>
            )}
          </TabsContent>

          {/* Microfinance */}
          <TabsContent value="microfinance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {microfinanceFiltree.map(renderCarteInstitution)}
            </div>
            {microfinanceFiltree.length === 0 && (
              <p className="text-red-700 text-center font-bold italic">Aucun résultat trouvé dans la section Microfinance.</p>
            )}
          </TabsContent>

          {/* Fonds d'investissement */}
          <TabsContent value="fonds" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {fondsFiltres.map(renderCarteInstitution)}
            </div>
            {fondsFiltres.length === 0 && (
              <p className="text-red-700 text-center font-bold italic">Aucun résultat trouvé dans la section Fonds d'Investissement.</p>
            )}
          </TabsContent>

          {/* Institutions publiques */}
          <TabsContent value="publiques" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {institutionsPubliquesFiltrees.map(renderCarteInstitution)}
            </div>
            {institutionsPubliquesFiltrees.length === 0 && (
              <p className="text-red-700 text-center font-bold italic">Aucun résultat trouvé dans la section Institutions Publiques.</p>
            )}
          </TabsContent>

          {/* Notification pour les résultats dans d'autres sections */}
          {search && resultatsAutresSections.length > 0 && (
            <div className="my-6 p-4 bg-[#063a1e]/5 rounded-lg border border-[#063a1e]/10">
              <p className="text-[#063a1e] font-medium mb-2">Résultats trouvés dans d'autres sections :</p>
              <div className="flex flex-wrap gap-2">
                {resultatsAutresSections.map((result) => (
                  <Button
                    key={result.tab}
                    variant="outline"
                    size="sm"
                    className="gap-1 border-[#063a1e] text-[#063a1e] hover:bg-[#063a1e]/10"
                    onClick={() => setActiveTab(result.tab)}
                  >
                    {result.label} ({result.count}) <ArrowRight className="h-3 w-3" />
                  </Button>
                ))}
              </div>
            </div>
          )}
        </Tabs>
        
        {/* Section CTA */}
        <div className="mt-12 bg-[#063a1e]/10 p-6 rounded-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-[#063a1e] mb-2">
                Trouvez rapidement le bon contact pour vos besoins en financement.
              </h3>
              <p className="text-muted-foreground">
                Abonnez-vous à notre newsletter pour connaître les institutions utiles aux PME,
                avec leurs coordonnées et une description de leurs services.
                Accédez facilement à toutes ces informations depuis notre site.
              </p>
            </div>
            <Link href="/#subscription">
              <Button className="bg-[#063a1e] hover:bg-[#063a1e]/90 whitespace-nowrap">
                S'abonner à la newsletter
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}