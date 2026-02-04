"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const financingOffers = [
  {
    id: 1,
    title: "Crédit Équipement Pro",
    institution: "BCEG - Banque",
    badge: "Taux préférentiel",
    backgroundImage: "/images/institution/banque/bceg_logo.png",
    badgeColor: "bg-green-100 text-green-800",
    borderColor: "border-l-green-500",
    amount: "À partir de 1 000 000 F CFA",
    rate: "Variable selon profil",
    rateColor: "text-green-600",
    duration: "3 à 12 mois",
    description: "Financement d'équipements professionnels.",
  },
  {
    id: 2,
    title: "CRÉDIT D'INVESTISSEMENT",
    institution: "BCEG - Banque",
    badge: "Flexible",
    backgroundImage: "/images/institution/banque/bceg_logo.png",
    badgeColor: "bg-blue-100 text-blue-800",
    borderColor: "border-l-blue-500",
    amount: "À partir de 3 000 000 F CFA",
    rate: "Variable selon profil",
    rateColor: "text-blue-600",
    duration: "6 à 36 mois",
    description:
      "Ligne de crédit flexible pour financer le besoin en fonds de roulement de votre entreprise.",
  },
  {
    id: 3,
    title: "Crédit Investissement",
    institution: "FINAM - Microfinance",
    badge: "Accessible",
    backgroundImage: "/images/institution/micro/finam.jpg",
    badgeColor: "bg-orange-100 text-orange-800",
    borderColor: "border-l-orange-500",
    amount: "Variable",
    rate: "Variable",
    rateColor: "text-orange-600",
    duration: "Selon contrat",
    description:
      "Solution de financement adaptée aux petites entreprises et entrepreneurs individuels.",
  },
  {
    id: 4,
    title: "INTRODUCTION EN BOURSE PME",
    institution: "BVMAC",
    badge: "Long terme",
    backgroundImage: "/images/BVMAC.jpg",
    badgeColor: "bg-purple-100 text-purple-800",
    borderColor: "border-l-purple-500",
    amount: "200 000 000 - 10 000 000 000 F CFA",
    rate: "N/A",
    rateColor: "text-purple-600",
    duration: "Aucun remboursement",
    description:
      "Financement pour l'acquisition de locaux commerciaux ou industriels pour votre entreprise.",
  },
];

export default function FinancingOffersCarousel() {
  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const intervalRef = React.useRef<number | null>(null);
  const [paused, setPaused] = React.useState(false);

  const start = React.useCallback(() => {
    if (!api) return;
    if (intervalRef.current) window.clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      // option loop: true => ça tourne en boucle
      api.scrollNext();
    }, 4000);
  }, [api]);

  const stop = React.useCallback(() => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  React.useEffect(() => {
    if (!api) return;
    if (paused) return stop();
    start();
    return stop;
  }, [api, paused, start, stop]);

  return (
    <section className="pb-6 md:px-4 bg-white">
      <div className="container">
        {/* <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#063a1e] mb-4">
            Instrument de Financement
          </h2>
          <p className="text-black/80 text-lg max-w-3xl mx-auto">
            Découvrez et comparez les meilleures opportunités de financement
            disponibles pour les PME gabonaises
          </p>
        </div> */}

        {/* Carousel */}
        <div className="md:px-12 mb-8">
          <Carousel
            setApi={setApi}
            opts={{ align: "start", loop: true }}
            className="w-full"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <CarouselContent className="-ml-4">
              {financingOffers.map((offer) => (
                <CarouselItem
                  key={offer.id}
                  className="pl-4 md:basis-1/2 lg:basis-1/2"
                >
                  <Card
                    className={`
    group relative h-full overflow-hidden rounded-2xl border-l-4
    ${offer.borderColor}
    text-white shadow-xl transition-all duration-500 hover:shadow-2xl
    animate-shimmer
    bg-[linear-gradient(110deg,#0B3E23,45%,#386140,55%,#0B3E23)]
    bg-[length:200%_100%]
  `}
                  >
                    {/* Image de banque */}
                    <div
                      className="absolute inset-0 bg-cover bg-center opacity-10 transition-transform duration-700 group-hover:scale-110"
                      style={{
                        backgroundImage: `url(${offer.backgroundImage})`,
                      }}
                    />

                    {/* Overlay glass */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-white/10 to-transparent backdrop-blur-[2px]" />

                    {/* Shimmer renforcé au hover 
                    <div
                      className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100
    transition-opacity duration-500
    bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.45),transparent)]
    bg-[length:200%_100%] animate-shimmer"
                    />*/}

                    {/* Contenu */}
                    <div className="relative z-10">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-white">
                              <h3 className="text-base tracking-wide">
                                {offer.title}
                              </h3>
                            </CardTitle>
                            <p className="text-sm text-white/80">
                              {offer.institution}
                            </p>
                          </div>
                          <Badge
                            className={`${offer.badgeColor} backdrop-blur`}
                          >
                            {offer.badge}
                          </Badge>
                        </div>
                      </CardHeader>

                      <CardContent>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-white/70">Montant</p>
                            <p className="font-semibold">{offer.amount}</p>
                          </div>
                          <div>
                            <p className="text-xs text-white/70">Taux</p>
                            <p className={`font-semibold`}>
                              {offer.rate}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-white/70">Durée</p>
                            <p className="font-semibold">{offer.duration}</p>
                          </div>
                        </div>

                        <p className="text-sm text-white/80">
                          {offer.description}
                        </p>
                      </CardContent>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>

        {/* Comparison Tool 
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#063a1e] to-[#063a1e]/90 text-white">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-10 -right-10 h-48 w-48 rounded-full bg-[#dcdaa4]/20 blur-2xl"
          />
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 p-8 md:p-12 lg:grid-cols-2">
            <div className="flex flex-col">
              <div className="mb-6 text-left">
                <h3 className="text-3xl">Outil de comparaison</h3>
                <p className="mt-2 text-white/90">
                  Comparez jusqu&apos;à 3 offres de financement pour trouver
                  celle qui correspond le mieux à vos besoins.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[
                  { title: "Analyse détaillée", desc: "Comparez les taux, durées et conditions" },
                  { title: "Recommandations", desc: "Suggestions basées sur votre profil" },
                  { title: "Simulation", desc: "Calculez vos mensualités" },
                  { title: "Contact direct", desc: "Demandez un rendez-vous facilement" },
                ].map(({ title, desc }) => (
                  <div
                    key={title}
                    className="flex items-start gap-3 rounded-xl bg-white/10 p-4 backdrop-blur"
                  >
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#dcdaa4] text-[#063a1e]">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <div>
                      <p className="font-medium leading-tight">{title}</p>
                      <p className="text-sm text-white/70">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center">
              <figure className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/15 bg-white/5 shadow-2xl ring-1 ring-white/10">
                <img
                  src="/pub_offre3.png"
                  alt="Illustration d'un tableau comparatif de trois offres de financement"
                  className="h-full w-full object-cover"
                />
              </figure>
            </div>
          </div>
        </div>*/}
      </div>
    </section>
  );
}
