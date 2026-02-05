"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Form from "@/components/section/form";
import AdBanner from "@/components/ads/AdBanner";
import {
  ArrowRight,
  Linkedin,
  Facebook,
  Rocket,
  Building,
  GraduationCap,
  Mail,
  Phone,
} from "lucide-react";
import Reveal from "@/components/ui/reveal";
import Parallax from "@/components/ui/parallax";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import TickerTextes from "@/components/section/TickerTextes";

// import AddressAutocomplete from "@/components/AddressAutocomplete"

import TextSearch from "@/components/section/search";
import NewText from "@/components/section/new_text";
import DernieresActualites from "./actualite/ActuLast";
import FinancingOffersCarousel from "@/components/section/FinancingOffersCarousel";
import { RecentOffersMiniCarousel } from "./entreprise/recentOffre";
import { fetchOffres, Offre } from "../services/offre/api";


export default function Home() {
  const [loading, setLoading] = useState(true);
const [offres, setOffres] = useState<Offre[]>([]);
const [offresLoading, setOffresLoading] = useState(true);

useEffect(() => {
  const loadOffres = async () => {
    try {
      setOffresLoading(true);
      const res = await fetchOffres({}); // ou sans filtre
      setOffres(res?.data ?? []);
    } catch (e) {
      console.error("Erreur fetchOffres:", e);
      setOffres([]);
    } finally {
      setOffresLoading(false);
    }
  };

  loadOffres();
}, []);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisited");

    if (hasVisited) {
      setLoading(false);
    } else {
      const timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem("hasVisited", "true");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="flex flex-col items-center">
          <div className="relative w-16 h-16 mb-4">
            <div className="absolute inset-0 rounded-full border-4 border-[#063a1e]/20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-[#063a1e] animate-spin"></div>
          </div>

          <div className="flex flex-col items-center">
            <Image
              src="/images/logo-feg.png"
              alt="Logo FEG"
              width={60}
              height={60}
              className="h-12 w-auto mb-2"
            />
            <h2 className="text-lg font-bold text-[#063a1e]">
              Guide Numérique des PME
            </h2>
          </div>
          <div className="mt-4 h-1 w-48 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#dcdaa4] to-[#bdbd95] animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#eaeeeb]">
      <TickerTextes />
      {/* Scrolling News Ticker */}

      {/* Flash News */}
      <div className="bg-[#063a1e]/10 py-2 border-b">
        <div className="container">
          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className="bg-gradient-to-r from-[#dcdaa4] to-[#bdbd95] text-[#063a1e] font-bold border-none"
            >
              NOUVEAU
            </Badge>
            <p className="text-sm">La Loi de Finances 2026</p>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#063a1e] to-[#063a1e]/50 text-white relative overflow-hidden p-10 lg:p-16">
        <div className="absolute inset-0 opacity-35">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#fff] to-transparent rounded-full -translate-x-48 -translate-y-48"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#063a1e] to-transparent rounded-full translate-x-48 translate-y-48"></div>
        </div>
        <div className="lg:container">
          <div className="grid grid-cols-1 md:flex md:justify-between gap-8 lg:gap-12 items-center">
            <div className="space-y-6 w-full md:max-w-[50%] flex flex-col items-center text-center md:items-start md:text-left">
              <Reveal preset="slide" direction="left" distance={40}>
                <h2 className="text-3xl text-center md:text-left lg:text-4xl font-bold">
                  Les textes juridiques pour votre PME au Gabon
                </h2>
              </Reveal>
              <Reveal preset="blur" delay={0.08}>
                <p className="text-white/90 text-center md:text-left text-lg">
                  Accédez facilement aux textes juridiques, lois et règlements
                  concernant les PME gabonaises.
                </p>
              </Reveal>
              <Reveal preset="scaleFade" delay={0.14}>
                <div className="flex flex-col sm:flex-row sm:justify-center md:justify-normal gap-4">
                  <Link href="/textes-juridiques">
                    <Button
                      variant="secondary"
                      size="lg"
                      className="bg-[#063a1e] relative hover:bg-white min-w-[200px] group"
                    >
                      <span className="absolute inset-0 w-full h-full bg-[#dcdaa4] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0"></span>
                      <span className="relative mr-3 z-10 transition-colors duration-500 ease-in-out group-hover:text-[#063a1e]">
                        <p>Consulter les textes</p>
                      </span>
                    </Button>
                  </Link>
                  <Link href="/a-propos">
                    <Button
                      size="lg"
                      className="hover:text-[#063a1e] relative z-10 duration-300 ease-in-out hover:bg-white border-none font-medium min-w-[200px]"
                    >
                      En savoir plus
                    </Button>
                  </Link>
                </div>
              </Reveal>
            </div>
            <Parallax
              offset={34}
              className="group [transform:perspective(1500px)_rotateY(15deg)] rounded-xl "
            >
              <Reveal
                preset="slideFade"
                direction="right"
                distance={30}
                delay={0.5}
              >
                <div className="hidden md:block group [transform:perspective(1500px)_rotateY(15deg)] rounded-xl shadow-[rgba(0,0,0,0.25)_0px_25px_50px_-12px] transition-transform duration-1000 ease-in-out hover:[transform:perspective(3000px)_rotateY(5deg)] ">
                  <Image
                    src="/images/hero-img.jpg"
                    alt="Texte et loi pour les PME"
                    width={1000}
                    height={1000}
                    className="rounded-lg shadow-lg object-cover"
                  />
                </div>
              </Reveal>
            </Parallax>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <Reveal preset="slideFade" direction="up" distance={30} delay={0.2}>
        <section className="py-12 bg-white">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">
                  Recherchez un texte juridique
                </h2>
                <p className="text-muted-foreground font-bold">
                  Trouvez rapidement les textes juridiques dont vous avez besoin
                  pour votre entreprise
                </p>
              </div>
              <TextSearch />
            </div>
          </div>
        </section>
      </Reveal>
      {/* Recent Updates + Ad avec effet "parallax" Tailwind (bg-fixed) */}
      <section
        className="w-full
    relative overflow-hidden
    bg-[url('/images/arriere_texte_2.jpg')]
    bg-cover bg-center bg-no-repeat
    bg-fixed
  "
      >
        {/* Overlay pour lisibilité */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#eaeeeb]/95 via-[#eaeeeb]/75 to-[#eaeeeb]/95" />

        {/* Glow déco (optionnel) */}
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[#dcdaa4]/20 blur-3xl"
        />

        {/* Contenu */}
        <div className="relative z-10">
          {/* Recent Updates */}
          <NewText />

          {/* Sidebar Video Ad */}
          <div className="flex justify-center items-center pb-12 container">
            <AdBanner
              emplacement="MIDDLE"
              className="w-full max-w-[900px] h-full object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* Section horizontale simple : texte à gauche, image à droite */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#063a1e] to-[#063a1e] px-4 text-white">
        {/* petite image décorative flottante (hors cadre, optionnelle) */}
        <img
          src="/megaphone.jpeg"
          alt=""
          className="pointer-events-none absolute object-cover object-center left-[-8rem] hidden h-40 w-64 -rotate-3 rounded-xl opacity-40 ring-1 ring-white/10 md:block float-slow"
          loading="lazy"
        />

        <section className="container mx-auto px-4 py-12">
          <div className="grid items-center gap-8 md:grid-cols-2">
            {/* Colonne Image (à droite) */}
            <div className="relative">
              {/* <div className="relative h-56 w-full overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm md:h-72 lg:h-80">
                <Image
                  src="/pub_offre4.jpg" 
                  width={100}
                  height={100}
                  alt="Mise en relation professionnelle"
                  className="h-full w-full object-cover transition-transform duration-700 will-change-transform md:group-hover:scale-105"
                  loading="lazy"
                />
             
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#063a1e]/70 via-transparent to-transparent" />
              </div> */}
            <RecentOffersMiniCarousel offres={offres} interval={8000} />


              {/* halo doux derrière l'image */}
              <div className="pointer-events-none absolute -inset-4 -z-10 rounded-2xl bg-[#dcdaa4]/15 blur-2xl" />
            </div>
            {/* Colonne Texte */}
            <div>
              <h1 className="text-2xl text-[#dcdaa4]/90 font-bold leading-tight">
                Offres & Services des PME
              </h1>
              <p className="mt-3  text-base md:text-lg max-w-xl">
                Découvrez et publiez vos services sur notre plateforme dédiée
                aux PME gabonaises. Bénéficiez de tarifs préférentiels en tant
                que membre FEG.
              </p>

              <div className="flex flex-col mt-8 sm:flex-row items-center w-full gap-4">
                <Link href="/entreprise">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="bg-[#063a1e] relative hover:bg-white min-w-[200px] group"
                  >
                    <span className="absolute inset-0 w-full h-full bg-[#dcdaa4] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0"></span>
                    <span className="relative mr-3 z-10 transition-colors duration-500 ease-in-out group-hover:text-[#063a1e]">
                      <p className="justify-center items-center flex">
                        {" "}
                        Explorer les offres{" "}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </p>
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
            </div>
          </div>
        </section>
        <img
          src="/contrat.jpeg"
          alt=""
          className="pointer-events-none object-cover object-center absolute -bottom-10 right-[-5rem] hidden h-40 w-64 -rotate-3 rounded-xl opacity-40 ring-1 ring-white/10 md:block float-slow"
          loading="lazy"
        />

        {/* Animation flottante discrète */}
        <style jsx>{`
          @keyframes floatY {
            0% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-8px);
            }
            100% {
              transform: translateY(0);
            }
          }
          .float-slow {
            animation: floatY 10s ease-in-out infinite;
          }
          @media (prefers-reduced-motion: reduce) {
            .float-slow {
              animation: none;
            }
          }
        `}</style>
      </div>

      {/* Support Structures Section */}
      <section className="py-12 md:px-4 bg-gray-50">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-[#063a1e]">
                Structures d'Accompagnement
              </h2>
              <p className="text-muted-foreground mt-2">
                Bénéficiez d'un accompagnement personnalisé pour votre
                entreprise
              </p>
            </div>
            <Link
              className="flex justify-center"
              href="/structures-accompagnement"
            >
              <Button
                variant="secondary"
                size="lg"
                className="bg-[#063a1e] relative hover:bg-white"
              >
                <span className="absolute inset-0 w-full h-full bg-[#dcdaa4] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0"></span>
                <span className="relative mr-3 z-10 transition-colors duration-500 ease-in-out group-hover:text-[#063a1e]">
                  <p className="flex items-center justify-center">
                    Découvrir toutes les structures{" "}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </p>
                </span>
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Incubateurs */}
            <div className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-xl">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/incubateur.jpg"
                  alt="Incubateurs"
                  width={400}
                  height={300}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#063a1e] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-70" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="rounded-full bg-white/90 p-3 shadow-lg">
                    <Link href="/structures-accompagnement?tab=incubateurs">
                      <ArrowRight className="h-6 w-6 text-[#063a1e]" />
                    </Link>
                  </div>
                </div>

                {/* petit chip icône */}
                <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-[#063a1e] shadow">
                  <Rocket className="h-4 w-4" />
                  Incubateurs
                </div>
              </div>

              <div className="p-5">
                <h3 className="mb-1 text-xl font-bold text-[#063a1e]">
                  Incubateurs
                </h3>
                <p className="mb-3 text-sm text-gray-500">
                  Accompagnement startup
                </p>

                <ul className="mb-4 space-y-1 text-sm">
                  <li className="text-gray-600">
                    • Programme d&apos;incubation 6-12 mois
                  </li>
                  <li className="text-gray-600">• Mentorat personnalisé</li>
                  <li className="text-gray-600">• Accès au financement</li>
                </ul>

                <div className="flex items-center justify-between">
                  <Link
                    href="/structures-accompagnement?tab=incubateurs"
                    className="inline-flex items-center text-sm font-medium text-[#063a1e] hover:underline"
                  >
                    Explorer <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                  <Badge className="bg-[#063a1e]/20 text-[#063a1e] border-[#063a1e]/30">
                    3 structures disponibles
                  </Badge>
                </div>
              </div>
            </div>

            {/* Centres de formation */}
            <div className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-xl">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/formation.jpg"
                  alt="Centres de formation"
                  width={400}
                  height={300}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#063a1e] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-70" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="rounded-full bg-white/90 p-3 shadow-lg">
                    <Link href="/structures-accompagnement?tab=centresFormation">
                      <ArrowRight className="h-6 w-6 text-[#063a1e]" />
                    </Link>
                  </div>
                </div>

                <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-[#063a1e] shadow">
                  <GraduationCap className="h-4 w-4" />
                  Formation
                </div>
              </div>

              <div className="p-5">
                <h3 className="mb-1 text-xl font-bold text-[#063a1e]">
                  Centres de Formation
                </h3>
                <p className="mb-3 text-sm text-gray-500">
                  Développement des compétences
                </p>

                <ul className="mb-4 space-y-1 text-sm">
                  <li className="text-gray-600">• Formation professionnelle</li>
                  <li className="text-gray-600">• Certifications reconnues</li>
                  <li className="text-gray-600">• Formation continue</li>
                </ul>

                <div className="flex items-center justify-between">
                  <Link
                    href="/structures-accompagnement?tab=centresFormation"
                    className="inline-flex items-center text-sm font-medium text-[#063a1e] hover:underline"
                  >
                    Explorer <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                  <Badge className="bg-[#063a1e]/20 text-[#063a1e] border-[#063a1e]/30">
                    2 centres partenaires
                  </Badge>
                </div>
              </div>
            </div>

            {/* Structures publiques */}
            <div className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-xl">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/images/mine.jpg"
                  alt="Structures publiques"
                  width={400}
                  height={300}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#063a1e] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-70" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="rounded-full bg-white/90 p-3 shadow-lg">
                    <Link href="/structures-accompagnement?tab=structuresPubliques">
                      <ArrowRight className="h-6 w-6 text-[#063a1e]" />
                    </Link>
                  </div>
                </div>

                <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-[#063a1e] shadow">
                  <Building className="h-4 w-4" />
                  Public
                </div>
              </div>

              <div className="p-5">
                <h3 className="mb-1 text-xl font-bold text-[#063a1e]">
                  Structures Publiques
                </h3>
                <p className="mb-3 text-sm text-gray-500">
                  Accompagnement spécialisé
                </p>

                <ul className="mb-4 space-y-1 text-sm">
                  <li className="text-gray-600">• Ministère des PME</li>
                  <li className="text-gray-600">• CNSS, CNAMGS</li>
                  <li className="text-gray-600">• Chambre de commerce</li>
                </ul>

                <div className="flex items-center justify-between">
                  <Link
                    href="/structures-accompagnement?tab=structuresPubliques"
                    className="inline-flex items-center text-sm font-medium text-[#063a1e] hover:underline"
                  >
                    Explorer <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                  <Badge className="bg-[#063a1e]/20 text-[#063a1e] border-[#063a1e]/30">
                    9 institutions publiques
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Financial Institutions Section */}
      <section className="py-12 md:px-4 bg-[#063a1e]">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-5 justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-[#dcdaa4] to-[#bdbd95] bg-clip-text text-transparent">
                Institutions Financières
              </h2>
              <p className="text-white mt-2">
                Découvrez les institutions qui peuvent financer votre entreprise
              </p>
            </div>

            <Link
              className="flex justify-center"
              href="/institutions-financieres"
            >
              <Button
                variant="secondary"
                size="lg"
                className="bg-[#063a1e] relative hover:bg-white"
              >
                <span className="absolute inset-0 w-full h-full bg-[#dcdaa4] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0"></span>
                <span className="relative mr-3 z-10 transition-colors duration-500 ease-in-out group-hover:text-[#063a1e]">
                  <p className="flex items-center justify-center">
                    Voir toutes les institutions{" "}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </p>
                </span>
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Banques */}
            <div className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-xl">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/images/bank.jpeg?height=300&width=400"
                  alt="Banques commerciales"
                  width={400}
                  height={300}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#063a1e] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-70"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="rounded-full bg-white/90 p-3 shadow-lg">
                    <Link href="/institutions-financieres?tab=banques">
                      {" "}
                      <ArrowRight className="h-6 w-6 text-[#063a1e]" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="mb-1 text-xl font-bold text-[#063a1e]">
                  Banques
                </h3>
                <p className="mb-3 text-sm text-gray-500">
                  Banques commerciales et de développement
                </p>
                <ul className="mb-4 space-y-1 text-sm">
                  <li className="text-gray-600">• Prêts d'investissement</li>
                  <li className="text-gray-600">• Lignes de crédit</li>
                  <li className="text-gray-600">
                    • Services bancaires aux entreprises
                  </li>
                </ul>
                <div className="flex items-center justify-between">
                  <Link
                    href="/institutions-financieres?tab=banques"
                    className="inline-flex items-center text-sm font-medium text-[#063a1e] hover:underline"
                  >
                    Explorer <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                  <Badge className="bg-[#063a1e]/20 text-[#063a1e] border-[#063a1e]/30">
                    7 disponibles
                  </Badge>
                </div>
              </div>
            </div>

            {/* Microfinance */}
            <div className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-xl">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/images/micro.jpeg?height=300&width=400"
                  alt="Institutions de microfinance"
                  width={400}
                  height={300}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#063a1e] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-70"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="rounded-full bg-white/90 p-3 shadow-lg">
                    <Link href="/institutions-financieres?tab=microfinance">
                      {" "}
                      <ArrowRight className="h-6 w-6 text-[#063a1e]" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="mb-1 text-xl font-bold text-[#063a1e]">
                  Microfinance
                </h3>
                <p className="mb-3 text-sm text-gray-500">
                  Institutions de microfinance
                </p>
                <ul className="mb-4 space-y-1 text-sm">
                  <li className="text-gray-600">• Microcrédits</li>
                  <li className="text-gray-600">• Épargne et crédit</li>
                  <li className="text-gray-600">
                    • Accompagnement de proximité
                  </li>
                </ul>
                <div className="flex items-center justify-between">
                  <Link
                    href="/institutions-financieres?tab=microfinance"
                    className="inline-flex items-center text-sm font-medium text-[#063a1e] hover:underline"
                  >
                    Explorer <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                  <Badge className="bg-[#063a1e]/20 text-[#063a1e] border-[#063a1e]/30">
                    5 disponibles
                  </Badge>
                </div>
              </div>
            </div>

            {/* Fonds d'investissement */}
            <div className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-xl">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/images/fond.jpeg?height=300&width=400"
                  alt="Fonds d'investissement"
                  width={400}
                  height={300}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#063a1e] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-70"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="rounded-full bg-white/90 p-3 shadow-lg">
                    <Link href="/institutions-financieres?tab=fonds">
                      {" "}
                      <ArrowRight className="h-6 w-6 text-[#063a1e]" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="mb-1 text-xl font-bold text-[#063a1e]">
                  Fonds d'investissement
                </h3>
                <p className="mb-3 text-sm text-gray-500">
                  Capital-risque et investissements
                </p>
                <ul className="mb-4 space-y-1 text-sm">
                  <li className="text-gray-600">• Capital-risque</li>
                  <li className="text-gray-600">
                    • Investissements stratégiques
                  </li>
                  <li className="text-gray-600">• Financement de croissance</li>
                </ul>
                <div className="flex items-center justify-between">
                  <Link
                    href="/institutions-financieres?tab=fonds"
                    className="inline-flex items-center text-sm font-medium text-[#063a1e] hover:underline"
                  >
                    Explorer <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                  <Badge className="bg-[#063a1e]/20 text-[#063a1e] border-[#063a1e]/30">
                    3 disponibles
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Financial Offers Comparison Section */}
      <section className="py-12 md:px-4 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#063a1e] mb-4">
              Instrument de Financement
            </h2>
            <p className="text-black/80 text-lg max-w-3xl mx-auto">
              Découvrez et comparez les meilleures opportunités de financement
              disponibles pour les PME gabonaises
            </p>
          </div>

          <FinancingOffersCarousel />
          <div className="mb-8 flex justify-center">
            <Link href="/offre">
              <Button
                variant="secondary"
                size="lg"
                className="bg-[#063a1e] relative hover:bg-white min-w-[200px] group"
              >
                <span className="absolute inset-0 w-full h-full bg-[#dcdaa4] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0"></span>
                <span className="relative mr-3 z-10 transition-colors duration-500 ease-in-out group-hover:text-[#063a1e]">
                  <p className="flex items-center justify-center">
                    {" "}
                    Voir toutes les offres{" "}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </p>
                </span>
              </Button>
            </Link>
          </div>
          {/* Comparison Tool */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#063a1e] to-[#063a1e]/90 text-white">
            {/* décor léger */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-10 -right-10 h-48 w-48 rounded-full bg-[#dcdaa4]/20 blur-2xl"
            />
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 p-8 md:p-12 lg:grid-cols-2">
              {/* Colonne texte */}
              <div className="flex flex-col">
                <div className="mb-6 text-left">
                  <h3 className="text-3xl text-[#dcdaa4]/90">
                    Outil de comparaison
                  </h3>
                  <p className="mt-2 text-white/90">
                    Comparez jusqu&apos;à 3 offres de financement pour trouver
                    celle qui correspond le mieux à vos besoins.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                    <h4 className="mb-2 font-semibold">
                      Critères de comparaison
                    </h4>
                    <ul className="space-y-1 text-sm text-white/90">
                      <li>• Taux d&apos;intérêt</li>
                      <li>• Montant maximum</li>
                      <li>• Durée de remboursement</li>
                      <li>• Conditions d&apos;éligibilité</li>
                    </ul>
                  </div>

                  <div className="rounded-xl border border-white/20 bg-white/5 p-4 backdrop-blur-sm">
                    <h4 className="mb-2 font-semibold">Astuce</h4>
                    <p className="text-sm text-white/90">
                      Ajoutez vos offres une par une et laissez-nous mettre en
                      évidence les avantages clés de chacune.
                    </p>
                  </div>
                </div>
              </div>

              {/* Colonne image */}
              <div className="flex items-center justify-center">
                <figure className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/15 bg-white/5 shadow-2xl ring-1 ring-white/10">
                  <img
                    src="/pub_offre3.png"
                    alt="Illustration d’un tableau comparatif de trois offres de financement"
                    className="h-full w-full object-cover"
                  />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News & Events Section */}
      <section className="py-12 px-4 ">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-5 justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-[#063a1e] flex items-center gap-3">
                Actualités & Événements
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              </h2>
              <p className="text-muted-foreground mt-2">
                Restez informé des dernières actualités du monde des PME
              </p>
            </div>

            <Link href="/actualite">
              <Button
                size="lg"
                className="hover:text-[#063a1e] duration-300 ease-in-out hover:bg-white border hover:border-[#063a1e] font-medium"
              >
                Toutes les actualités <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Featured Article */}
            <div className="lg:col-span-3">
              <DernieresActualites />
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Section */}
      <section id="subscription" className="py-16 bg-[#EAEEEB]">
        <div className="md:container">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-[#dcdaa4]">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="bg-[#063a1e] p-8 text-white">
                  <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#dcdaa4] to-[#bdbd95] bg-clip-text text-transparent">
                    Restez informé
                  </h2>
                  <p className="mb-6">
                    Abonnez-vous pour recevoir des alertes :
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <span className="bg-gradient-to-r from-[#dcdaa4] to-[#bdbd95] text-[#063a1e] rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold mt-0.5">
                        ✓
                      </span>
                      <span>Nouveaux textes juridiques</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-gradient-to-r from-[#dcdaa4] to-[#bdbd95] text-[#063a1e] rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold mt-0.5">
                        ✓
                      </span>
                      <span>Fil d'Actualité des PME </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-gradient-to-r from-[#dcdaa4] to-[#bdbd95] text-[#063a1e] rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold mt-0.5">
                        ✓
                      </span>
                      <span>Offres Financières </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-gradient-to-r from-[#dcdaa4] to-[#bdbd95] text-[#063a1e] rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold mt-0.5">
                        ✓
                      </span>
                      <span>Offres de services des PME </span>
                    </li>
                  </ul>
                  <div className="w-full mt-6">
                    <h3 className="text-[#dcdaa4] font-bold text-lg mb-3">
                      Informations de contact
                    </h3>
                    <h3>
                      Pour tous vos besoins d'informations contactez-nous ou
                      suivez-nous sur nos réseaux sociaux.
                    </h3>
                    <ul className="space-y-2 mt-4 text-sm">
                      <li className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <a className="hover:underline" href="tel:065815738">
                          (+241) 065 81 57 38
                        </a>
                      </li>
                      <li className="flex items-start gap-2">
                        <Mail className="h-4 w-4 mt-0.5" />
                        <div className="flex">
                          <a
                            className="hover:underline"
                            href="mailto:info@lafeg.ga"
                          >
                            info@lafeg.ga /
                          </a>
                          <a
                            className="hover:underline"
                            href="mailto:a.obiang@lafeg.ga"
                          >
                            a.obiang@lafeg.ga
                          </a>
                        </div>
                      </li>
                    </ul>

                    <div className="mt-4">
                      <p className="mb-2 text-sm font-semibold">Suivez-nous</p>
                      <div className="flex space-x-4">
                        <Link
                          target="_blank"
                          href="https://www.facebook.com/feggabon?locale=fr_FR"
                        >
                          <Facebook className="hover:scale-125 duration-200 hover:text-[#dcdaa4]" />
                        </Link>
                        <Link
                          target="_blank"
                          href="https://www.linkedin.com/company/lafeg/"
                        >
                          <Linkedin className="hover:scale-125 duration-200 hover:text-[#dcdaa4]" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" p-8">
                  <div className=" ">
                    <h3 className="text-xl font-semibold text-[#063a1e] mb-6">
                      Formulaire d'abonnement
                    </h3>
                  </div>
                  <Form />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
