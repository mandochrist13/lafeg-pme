"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { fetchOffres, Offre } from "@/app/services/offre/api";
import {
  Search,
  MapPin,
  Phone,
  Mail,
  Users,
  BookOpen,
  Network,
  ChevronRight,
  // UserGroup,
  Award,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  PenTool,
  Megaphone,
  FileText,
  ExternalLink,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tarifsPublication1 = {
  "Tarif Membre": {
    "1 mois": { membre: "61,000" },
    "3 mois": { membre: "162,000" },
    "6 mois": { membre: "285, 000" },
    "12 mois": { membre: "500,000" },
  },
};
const tarifsPublication2 = {
  "Tarif Non-membre": {
    "1 mois": { membre: "80,000" },
    "3 mois": { membre: "210,000" },
    "6 mois": { membre: "370,000" },
    "12 mois": { membre: "670,000" },
  },
};

export default function EntreprisesServices() {
  const [entreprises, setEntreprises] = useState<Offre[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [selectedEntreprise, setSelectedEntreprise] = useState<Offre | null>(
    null,
  );

  const [secteurFiltre, setSecteurFiltre] = useState("tous");
  const [localisationFiltre, setLocalisationFiltre] = useState("toutes");
  const [rechercheTexte, setRechercheTexte] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const filtrerOffresActivesEtNonExpirees = (offres: Offre[]) => {
    const now = new Date();
    return offres.filter(
      (offre) =>
        offre.statut === "ACTIF" &&
        (!offre.date_fin || new Date(offre.date_fin) >= now),
    );
  };

  // Chargement des entreprises à chaque changement de filtre
  useEffect(() => {
    const chargerOffres = async () => {
      setLoading(true);
      setFetchError(null);

      try {
        // Seules les offres actives sont affichées ; sans `limit`, l'API n'en renvoyait que 10.
        const data = await fetchOffres({
          statut: "ACTIF",
          limit: 200,
          type_offre: secteurFiltre !== "tous" ? secteurFiltre : undefined,
          localisation:
            localisationFiltre !== "toutes" ? localisationFiltre : undefined,
          search: rechercheTexte || undefined,
        });
        const offresFiltrees = filtrerOffresActivesEtNonExpirees(
          data.data || [],
        );
        setEntreprises(offresFiltrees);
      } catch (error: any) {
        setFetchError(error.message || "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    };

    chargerOffres();
  }, [secteurFiltre, localisationFiltre, rechercheTexte]);

  const openModal = (entreprise: Offre) => {
    setSelectedEntreprise(entreprise);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEntreprise(null);
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-[#063a1e]">
              Accueil
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span>Offres</span>
            <ChevronRight className="h-4 w-4" />
            <span>Offres de Services</span>
          </div>
        </div>
      </div>
      {/* Hero Section */}
      {isModalOpen && selectedEntreprise && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          {/* Click overlay to close (optional) */}
          <div
            className="absolute inset-0"
            onClick={closeModal}
            aria-hidden="true"
          />

          <div
            className="relative bg-white rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden"
            role="dialog"
            aria-modal="true"
          >
            {/* HEADER */}
            <div className="sticky top-0 z-10 bg-white border-b">
              <div className="flex items-start gap-3 p-4 sm:p-6">
                <div className="min-w-0 flex-1">
                  <h2 className="text-lg sm:text-xl font-bold leading-snug break-words">
                    {selectedEntreprise.titre_offre}
                  </h2>
                  <p className="mt-1 text-xs sm:text-sm text-gray-500 break-words">
                    {selectedEntreprise.nom_structure}
                  </p>
                </div>

                <button
                  onClick={closeModal}
                  className="shrink-0 rounded-full p-2 text-gray-500 hover:text-black hover:bg-gray-100 transition"
                  aria-label="Fermer"
                >
                  <span className="text-2xl leading-none">&times;</span>
                </button>
              </div>
            </div>

            {/* BODY (scroll here only) */}
            <div className="max-h-[80vh] overflow-y-auto">
              <div className="p-4 sm:p-6">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                  {/* LEFT: Image */}
                  <div className="lg:col-span-2">
                    <div className="rounded-xl overflow-hidden bg-gray-100">
                      <Image
                        src={
                          selectedEntreprise.bannier_url || "/placeholder.svg"
                        }
                        alt={
                          selectedEntreprise.bannier_nom ||
                          "Image de l'entreprise"
                        }
                        width={900}
                        height={900}
                        className="w-full h-auto object-cover"
                      />
                    </div>

                    {/* PDF */}
                    {selectedEntreprise.fichier_nom && (
                      <a
                        href={selectedEntreprise.fichier_url}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 inline-flex w-full items-center justify-center rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700 hover:bg-green-100 transition"
                        download
                      >
                        Télécharger le cahier des charges (PDF)
                      </a>
                    )}
                  </div>

                  {/* RIGHT: Content */}
                  <div className="lg:col-span-3 space-y-5">
                    {/* Description */}
                    <div className="rounded-xl border bg-white p-4">
                      <h3 className="text-sm font-semibold text-gray-900">
                        Description
                      </h3>
                      <p className="mt-2 text-sm text-gray-700 leading-relaxed whitespace-pre-line break-words">
                        {selectedEntreprise.description ||
                          "Aucune description fournie."}
                      </p>
                    </div>

                    {/* Contacts */}
                    <div className="rounded-xl border bg-white p-4">
                      <h3 className="text-sm font-semibold text-gray-900">
                        Contacts
                      </h3>

                      <div className="mt-3 space-y-3 text-sm text-gray-800">
                        {/* Tel */}
                        {selectedEntreprise.contact && (
                          <div className="flex items-start gap-3">
                            <Phone className="h-4 w-4 mt-0.5 shrink-0" />
                            <div className="min-w-0">
                              <div className="text-xs text-gray-500">
                                Téléphone
                              </div>
                              <a
                                className="text-blue-600 underline break-all"
                                href={`tel:${selectedEntreprise.contact}`}
                              >
                                {selectedEntreprise.contact}
                              </a>
                            </div>
                          </div>
                        )}

                        {/* Email */}
                        {selectedEntreprise.email && (
                          <div className="flex items-start gap-3">
                            <Mail className="h-4 w-4 mt-0.5 shrink-0" />
                            <div className="min-w-0">
                              <div className="text-xs text-gray-500">Email</div>
                              <a
                                className="text-blue-600 underline break-all"
                                href={`mailto:${selectedEntreprise.email}`}
                              >
                                {selectedEntreprise.email}
                              </a>
                            </div>
                          </div>
                        )}

                        {/* Localisation */}
                        {selectedEntreprise.localisation && (
                          <div className="flex items-start gap-3">
                            <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                            <div className="min-w-0">
                              <div className="text-xs text-gray-500">
                                Localisation
                              </div>
                              <div className="break-words">
                                {selectedEntreprise.localisation}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Site */}
                        {selectedEntreprise.site_web && (
                          <div className="flex items-start gap-3">
                            <ExternalLink className="h-4 w-4 mt-0.5 shrink-0" />
                            <div className="min-w-0">
                              <div className="text-xs text-gray-500">
                                Site web
                              </div>
                              <a
                                href={
                                  selectedEntreprise.site_web.startsWith("http")
                                    ? selectedEntreprise.site_web
                                    : `https://${selectedEntreprise.site_web}`
                                }
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-600 underline break-all"
                              >
                                {selectedEntreprise.site_web}
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Extra zone (optional) */}
                    {/* <div className="rounded-xl border bg-white p-4">...</div> */}
                  </div>
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="sticky bottom-0 bg-white border-t">
              <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-3 sm:justify-end">
                <button
                  onClick={closeModal}
                  className="w-full sm:w-auto rounded-xl border px-4 py-2 text-sm font-medium hover:bg-gray-50 transition"
                >
                  Fermer
                </button>

                {selectedEntreprise.email && (
                  <a
                    href={`mailto:${selectedEntreprise.email}`}
                    className="w-full sm:w-auto text-center rounded-xl bg-black text-white px-4 py-2 text-sm font-medium hover:opacity-90 transition"
                  >
                    Contacter par email
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <section className="relative bg-gradient-to-r from-[#063a1e] to-[#063a1e]/80 text-white py-16">
        <div className="absolute inset-0 bg-[url('/ban_feg.png?height=600&width=1200')] bg-cover bg-center opacity-10" />
        <div className="container">
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold">
              Offre de services des PME
            </h1>
            <p className="text-xl text-white/90">
              Découvrez les services proposés par les entreprises gabonaises et
              publiez vos propres offres
            </p>

            {/* Statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {/* <div className="bg-white/10 rounded-lg p-6 backdrop-blur">
                <div className="text-3xl font-bold text-[#dcdaa4]">150+</div>
                <div className="text-white/90">Entreprises inscrites</div>
              </div>
              <div className="bg-white/10 rounded-lg p-6 backdrop-blur">
                <div className="text-3xl font-bold text-[#dcdaa4]">500+</div>
                <div className="text-white/90">Services proposés</div>
              </div>
              <div className="bg-white/10 rounded-lg p-6 backdrop-blur">
                <div className="text-3xl font-bold text-[#dcdaa4]">85%</div>
                <div className="text-white/90">Membres FEG</div>
              </div> */}
              <div className="bg-white/10 rounded-lg p-6 backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#dcdaa4]/20 flex items-center justify-center">
                    <ShieldCheck className="h-5 w-5 text-[#dcdaa4]" />
                  </div>
                  <h3 className="text-lg font-semibold">Profils vérifiés</h3>
                </div>
                <p className="mt-2 text-white/90 text-sm">
                  Chaque entreprise est contrôlée avant publication pour
                  renforcer la confiance.
                </p>
              </div>

              <div className="bg-white/10 rounded-lg p-6 backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#dcdaa4]/20 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-[#dcdaa4]" />
                  </div>
                  <h3 className="text-lg font-semibold">
                    Mise en relation simple
                  </h3>
                </div>
                <p className="mt-2 text-white/90 text-sm">
                  Contact direct, sans intermédiaires, et outils clairs pour
                  gagner du temps.
                </p>
              </div>

              <div className="bg-white/10 rounded-lg p-6 backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#dcdaa4]/20 flex items-center justify-center">
                    <Users className="h-5 w-5 text-[#dcdaa4]" />
                  </div>
                  <h3 className="text-lg font-semibold">Communauté FEG</h3>
                </div>
                <p className="mt-2 text-white/90 text-sm">
                  Accès privilégié aux membres FEG et à des opportunités
                  locales.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className="py-8 bg-white border-b">
        <div className="container">
          <Tabs defaultValue="entreprises" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
              <TabsTrigger value="entreprises">
                Parcourir les offres
              </TabsTrigger>
              <TabsTrigger value="publier">Publier mes services</TabsTrigger>
            </TabsList>

            <TabsContent value="entreprises" className="mt-8">
              {/* Filtres et Recherche */}
              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Rechercher une entreprise..."
                      className="pl-10"
                      value={rechercheTexte}
                      onChange={(e) => setRechercheTexte(e.target.value)}
                    />
                  </div>

                  <Select
                    value={secteurFiltre}
                    onValueChange={setSecteurFiltre}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Secteur d'activité" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tous">Tous les secteurs</SelectItem>
                      {[...new Set(entreprises.map((e) => e.type_offre))].map(
                        (type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>

                  <Select
                    value={localisationFiltre}
                    onValueChange={setLocalisationFiltre}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Localisation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="toutes">Toutes les villes</SelectItem>
                      <SelectItem value="Libreville">Libreville</SelectItem>
                      <SelectItem value="Port-Gentil">Port-Gentil</SelectItem>
                      <SelectItem value="Franceville">Franceville</SelectItem>
                      <SelectItem value="Oyem">Oyem</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button
                    variant="outline"
                    onClick={() => {
                      setSecteurFiltre("tous");
                      setLocalisationFiltre("toutes");
                      setRechercheTexte("");
                    }}
                  >
                    Réinitialiser
                  </Button>
                </div>
              </div>

              {loading && (
                <div className="text-center py-6 text-gray-500">
                  Chargement des offres...
                </div>
              )}

              {fetchError && (
                <div className="text-center py-6 text-red-500">
                  {fetchError}
                </div>
              )}

              {/* Liste des entreprises */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {entreprises.map((entreprise) => (
                  <Card
                    key={entreprise.id_offre}
                    className={`transition-transform transform hover:scale-[1.02] border-2 rounded-xl 
                     `}
                  >
                    <CardHeader className="p-4 pb-2 bg-gradient-to-r from-[#063a1e] to-[#145c35] text-white rounded-t-xl">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <Image
                            src={entreprise.image_url || "/placeholder.svg"}
                            alt={`Logo ${entreprise.image_nom}`}
                            width={40}
                            height={40}
                            className="rounded-md bg-white p-1"
                          />
                          <div>
                            <CardTitle className="font-bold bg-gradient-to-r from-[#dcdaa4] to-[#bdbd95] bg-clip-text text-transparent">
                              {entreprise.nom_structure}
                            </CardTitle>
                            <p className="text-xs text-white/80 italic">
                              {entreprise.type_offre}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-start gap-1">
                          {entreprise.membre_feg && (
                            <Badge className="bg-white text-[#063a1e] text-[9px] font-bold">
                              Membre FEG
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-3 p-4">
                      <Image
                        src={entreprise.bannier_url || "/placeholder.svg"}
                        alt={entreprise.bannier_nom || "Image de l'entreprise"}
                        width={600}
                        height={200}
                        className="w-full h-40 object-cover rounded-lg"
                      />

                      <p className="text-sm text-gray-700 leading-relaxed font-light">
                        {entreprise.titre_offre}
                      </p>

                      {/* <div>
                        <h4 className="text-sm font-semibold mb-1">
                          Services phares :
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {entreprise.services
                            .slice(0, 3)
                            .map((service, index) => (
                              <Badge
                                key={index}
                                className="bg-gray-100 text-gray-800 text-xs border"
                              >
                                {service}
                              </Badge>
                            ))}
                          {entreprise.services.length > 3 && (
                            <Badge className="bg-gray-200 text-gray-800 text-xs border">
                              +{entreprise.services.length - 3} autres
                            </Badge>
                          )}
                        </div>
                      </div> */}

                      <div className="flex items-center gap-2 text-sm text-black/80">
                        <Phone className="h-4 w-4" />
                        <a href={`tel:${entreprise.contact}`}>
                          {entreprise.contact}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-black/80">
                        <Mail className="h-4 w-4" />
                        <a href={`mailto:${entreprise.email}`}>
                          {entreprise.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-black/80">
                        <MapPin className="h-4 w-4" />
                        <span>{entreprise.localisation}</span>
                      </div>
                    </CardContent>

                    <CardFooter className="p-4 pt-0 flex flex-col gap-5">
                      <div className="grid grid-cols-2 gap-2 w-full">
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => openModal(entreprise)}
                        >
                          Voir le profil
                        </Button>

                        {/* <Button
                          size="sm"
                          className="bg-[#063a1e] hover:bg-[#063a1e]/90 text-white"
                        >
                          Contacter
                        </Button> */}
                      </div>

                      {entreprise.site_web && (
                        <div className="text-xs text-gray-500 w-full text-center">
                          Site web :{" "}
                          <a
                            href={
                              entreprise.site_web.startsWith("http")
                                ? entreprise.site_web
                                : `https://${entreprise.site_web}`
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 underline break-all"
                          >
                            {entreprise.site_web}
                          </a>
                        </div>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
              {entreprises.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <h4 className="text-lg font-semibold">
                    Aucune offre pour l&apos;instant
                  </h4>
                  <p className="mt-1 text-sm ">
                    Essayez de modifier les filtres ou revenez plus tard.
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="publier" className="mt-8">
              {/* Section Modalités Tarifaires */}
              <div className="space-y-8">
                {/* Avantages pour les Entreprises Partenaires */}

                <div className=" text-[#063a1e] p-8 rounded-lg">
                  <div className=" flex flex-col justify-center items-center mx-auto">
                    <div className="text-center mb-8">
                      <h2 className="text-3xl font-bold mb-4">
                        Pourquoi publier sur le Guide Numérique des PME ?
                      </h2>
                      <p className="text-xl text-[#063a1e] /90">
                        Accélérez votre visibilité, vos ventes et vos
                        opportunités B2B
                      </p>
                    </div>

                    {/* --- Services FEG (version cards 4 colonnes) --- */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                      {[
                        {
                          title: "Visibilité Ciblée",
                          desc: "Touchez directement un public professionnel, engagé et local",
                          img: "/visibilit.jpeg",
                          Icon: Users,
                        },
                        {
                          title: "Offres Valorisées",
                          desc: "Vos offres sont mises en avant dans une section dédiée du guide",
                          img: "/pub_offre1.jpeg",
                          Icon: ShieldCheck,
                        },
                        {
                          title: "Communication Optimisée",
                          desc: "Profitez de notre audience web, réseaux sociaux et de notre communauté fédérale",
                          img: "/communication.jpeg",
                          Icon: Megaphone,
                        },
                        {
                          title: "Nouvelles Opportunités",
                          desc: "Entrez en contact avec de nouveaux clients, partenaires et fournisseurs",
                          img: "/opportunite.jpeg",
                          Icon: FileText,
                        },
                      ].map(({ title, desc, img, Icon }) => (
                        <div
                          key={title}
                          className="group relative rounded-md overflow-hidden bg-[#063a1e] border-2 border-[#145c35]/30 shadow-lg hover:border-[#dcdaa4]/60 transition-all"
                        >
                          {/* image de fond */}
                          <img
                            src={img}
                            alt={title}
                            className="absolute brightness-50 inset-0 h-full w-full object-cover"
                            loading="lazy"
                          />

                          {/* voile qui monte au survol */}
                          <div
                            className="absolute inset-0 bg-gradient-to-t from-[#063a1e] via-[#063a1e]/80 to-transparent
                   translate-y-2/3 group-hover:translate-y-1/3 transition-transform duration-500 ease-out"
                          />

                          {/* zone de contenu calée en bas */}
                          <div className="relative h-56 flex items-end">
                            <div className="w-full p-4">
                              {/* icône + titre (toujours visibles) */}
                              <div className="flex items-center gap-3 transition-transform duration-300 ease-out group-hover:-translate-y-1">
                                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-[#dcdaa4]/20 ring-1 ring-[#dcdaa4]/30">
                                  <Icon className="h-5 w-5 text-[#dcdaa4]" />
                                </div>
                                <h3 className="text-white font-semibold text-lg drop-shadow">
                                  {title}
                                </h3>
                              </div>

                              {/* description : cachée, puis apparaît en montant */}
                              <p
                                className="mt-2 text-sm text-white/90 leading-relaxed
                       max-h-0 overflow-hidden opacity-0 translate-y-2
                       group-hover:max-h-24 group-hover:opacity-100 group-hover:translate-y-0
                       transition-all duration-300 ease-out"
                              >
                                {desc}
                              </p>
                            </div>
                          </div>

                          {/* halo fin au survol */}
                          <div className="pointer-events-none absolute inset-0 rounded-md ring-0 ring-[#dcdaa4]/0 transition-all duration-300 group-hover:ring-2 group-hover:ring-[#dcdaa4]/40" />
                        </div>
                      ))}
                    </div>
                    {/* --- /fin Services FEG --- */}
                  </div>
                </div>

                {/* Processus de Publication  */}

                <section className="relative rounded-lg overflow-hidden bg-gradient-to-r from-[#063a1e] to-[#063a1e]/80 text-white">
                  {/* texture légère, optionnelle : remplace l’URL si tu as une image locale */}
                  <div className="absolute inset-0 bg-[url('/ban_feg.png?height=600&width=1200')] bg-cover bg-center opacity-10 pointer-events-none" />
                  <div className="relative px-6 py-12 md:py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
                      {/* Images à gauche */}
                      <div className="relative order-2 md:order-1">
                        <img
                          src="/etape2.jpeg"
                          alt="Événement FEG"
                          className="w-full brightness-50 rounded-xl shadow-xl"
                          loading="lazy"
                        />
                        <img
                          src="/étape.png"
                          alt="Illustration FEG"
                          className="absolute w-full -bottom-10 -right-6  md:max-w-[450px] rounded-xl shadow-xl translate-y-6 md:translate-y-10"
                          loading="lazy"
                        />
                      </div>

                      {/* Contenu à droite */}
                      <div className="order-1 md:order-2">
                        <span className="inline-block text-[#dcdaa4] font-medium mb-2">
                          Comment publier ?
                        </span>
                        <h3 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
                          Publier son offre en 3 étapes
                        </h3>

                        <ul className="space-y-6">
                          <li className="flex gap-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 backdrop-blur">
                              <PenTool className="h-5 w-5 text-[#dcdaa4]" />
                            </div>
                            <div>
                              <h4 className="font-semibold">
                                Compléter le formulaire de souscription de
                                publication
                              </h4>
                              <p className="text-white/85">
                                Renseignez les informations clés sur votre
                                entreprise et le temps d'abonnement choisis
                              </p>
                            </div>
                          </li>

                          <li className="flex gap-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 backdrop-blur">
                              <Mail className="h-5 w-5 text-[#dcdaa4]" />
                            </div>
                            <div>
                              <h4 className="font-semibold">
                                Envoyer les éléments requis par email
                              </h4>
                              <p className="text-white/85">
                                Joindre les documents nécessaires (logo,
                                bannière, description, contacts et un document
                                PDF si disponible) à l'adresse :{" "}
                                <a
                                  href="mailto:a.obiang@lafeg.ga"
                                  className="underline"
                                >
                                  a.obiang@lafeg.ga
                                </a>
                              </p>
                            </div>
                          </li>

                          <li className="flex gap-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 backdrop-blur">
                              <CheckCircle2 className="h-5 w-5 text-[#dcdaa4]" />
                            </div>
                            <div>
                              <h4 className="font-semibold">
                                S'acquiter du paiement de l'abonnement
                              </h4>
                              <p className="text-white/85">
                                Vous rendre au siège de la FEG ou effectuer un
                                virement bancaire pour finaliser votre
                                inscription.
                              </p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col my-8 sm:flex-row sm:justify-center items-center w-full gap-4">
                    <Link href="https://forms.gle/XdeLVsN2cqkUdZnU7">
                      <Button
                        variant="secondary"
                        size="lg"
                        className="bg-[#063a1e] relative hover:bg-white min-w-[200px] group"
                      >
                        <span className="absolute inset-0 w-full h-full bg-[#dcdaa4] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0"></span>
                        <span className="relative mr-3 z-10 transition-colors duration-500 ease-in-out group-hover:text-[#063a1e]">
                          <p>Publier mon offre sur le Guide</p>
                        </span>
                      </Button>
                    </Link>
                    <Link href="https://www.lafeg.ga/home#register">
                      <Button
                        size="lg"
                        className="text-[#063a1e] hover:bg-white/70 duration-300 ease-in-out bg-white border-none font-medium min-w-[200px]"
                      >
                        Devenir membre FEG
                      </Button>
                    </Link>
                  </div>
                </section>

                {/* Grille Tarifaire */}
                <div className="bg-white">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-[#063a1e] mb-4">
                      Modalités Tarifaires
                    </h2>
                    <p className="text-lg ">
                      Choisissez le forfait qui correspond à vos besoins
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-3xl mx-auto">
                    {Object.entries(tarifsPublication1).map(
                      ([forfait, tarifs]) => (
                        <Card
                          key={forfait}
                          className={`relative rounded-xl overflow-hidden transition-transform transform hover:scale-[1.01] shadow-md ${
                            forfait === "Tarif membre"
                              ? "border-[#063a1e] border-2 ring-2 ring-[#063a1e]"
                              : "border border-gray-200"
                          }`}
                        >
                          <CardHeader className="text-center bg-gradient-to-r from-[#063a1e] to-[#145c35] text-white py-5">
                            <CardTitle className="text-xl text-[#dcdaa4] font-bold">
                              {forfait}
                            </CardTitle>
                            <CardDescription className="text-sm text-white/80 italic">
                              {forfait === "Profil Basique" &&
                                "Exclusivement pour les membres FEG"}
                              {forfait === "Profil Elite" &&
                                "Pour tout autres types d'entreprises"}
                            </CardDescription>
                          </CardHeader>

                          <CardContent className="space-y-4 p-4  bg-gradient-to-r from-[#063a1e] to-[#145c35]">
                            {Object.entries(tarifs).map(([duree, prix]) => (
                              <div
                                key={duree}
                                className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border"
                              >
                                <span className="font-medium">{duree}</span>
                                <div className="text-right">
                                  <div className="font-bold text-[#063a1e]">
                                    {prix.membre} FCFA
                                  </div>
                                  <div className="text-xs text-green-600">
                                    {forfait === "Profil Basique" &&
                                      "Membre FEG"}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </CardContent>

                          <CardFooter className="p-4  bg-gradient-to-r from-[#063a1e] to-[#145c35]"></CardFooter>
                        </Card>
                      ),
                    )}
                    {Object.entries(tarifsPublication2).map(
                      ([forfait, tarifs]) => (
                        <Card
                          key={forfait}
                          className={`relative rounded-xl overflow-hidden transition-transform transform hover:scale-[1.01] shadow-md ${
                            forfait === "Profil Premium"
                              ? "border-[#063a1e] border-2 ring-2 ring-[#063a1e]"
                              : "border border-gray-200"
                          }`}
                        >
                          <CardHeader className="text-center bg-[#dcdaa4]  py-5">
                            <CardTitle className="text-xl text-[#063a1e] font-bold">
                              {forfait}
                            </CardTitle>
                            <CardDescription className="text-sm text-white/80 italic">
                              {forfait === "Profil Basique" &&
                                "Exclusivement pour les membres FEG"}
                              {forfait === "Profil Elite" &&
                                "Pour tout autres types d'entreprises"}
                            </CardDescription>
                          </CardHeader>

                          <CardContent className="space-y-4 p-4 bg-[#dcdaa4] ">
                            {Object.entries(tarifs).map(([duree, prix]) => (
                              <div
                                key={duree}
                                className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border"
                              >
                                <span className="font-medium">{duree}</span>
                                <div className="text-right">
                                  {/* <div className="text-sm text-muted-foreground line-through">
                                    {prix.nonMembre} FCFA
                                  </div> */}
                                  <div className="font-bold text-[#063a1e]">
                                    {prix.membre} FCFA
                                  </div>
                                  <div className="text-xs text-green-600">
                                    {forfait === "Profil Basique" &&
                                      "Membre FEG"}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </CardContent>

                          <CardFooter className="p-4  bg-[#dcdaa4]"></CardFooter>
                        </Card>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
