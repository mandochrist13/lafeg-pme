"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Offre } from "@/app/services/offre/api";

export function RecentOffersMiniCarousel({
  offres,
  interval = 6000,
}: {
  offres: Offre[];
  interval?: number;
}) {
  const getTime = (o: any) => {
    // ✅ adapte à tes vrais champs si tu en as
    return o.created_at
      ? new Date(o.created_at).getTime()
      : o.date_creation
      ? new Date(o.date_creation).getTime()
      : o.date_debut
      ? new Date(o.date_debut).getTime()
      : 0;
  };

  const top = React.useMemo(() => {
  const arr = [...(offres ?? [])].sort((a, b) => getTime(b) - getTime(a));
  // ✅ minimum 1 si on a des offres, maximum 5
  return arr.slice(0, Math.min(5, arr.length));
}, [offres]);


  const [current, setCurrent] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    if (top.length <= 1 || paused) return;
    const t = setInterval(() => {
      setCurrent((c) => (c + 1) % top.length);
    }, interval);
    return () => clearInterval(t);
  }, [top.length, interval, paused]);

  if (!top.length) {
    return (
      <div className="relative h-56 w-full overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm md:h-72 lg:h-80">
        <Image
          src="/pub_offre4.jpg"
          width={1200}
          height={600}
          alt="Mise en relation professionnelle"
          className="h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#063a1e]/70 via-transparent to-transparent" />
      </div>
    );
  }
//test
  const item = top[current];

  return (
    <div
      className="group relative h-56 w-full overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm md:h-72 lg:h-80"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Link href="/entreprise" className="absolute inset-0">
        <img
          src={item.bannier_url || "/placeholder.svg"}
          alt={item.titre_offre || "Offre récente"}
          className="h-full w-full object-cover object-center transition-transform duration-700 will-change-transform md:group-hover:scale-105"
        />
      </Link>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#063a1e]/75 via-[#063a1e]/10 to-transparent" />

      <div className="absolute bottom-4 left-4 right-4 text-white">
        <p className="text-xs text-white/80">{item.nom_structure}</p>
        <p className="mt-1 text-lg font-semibold leading-tight line-clamp-2">
          {item.titre_offre}
        </p>
      </div>

      {top.length > 1 && (
        <div className="absolute bottom-3 right-4 flex items-center gap-2">
          {top.map((o, idx) => (
            <button
              key={String(o.id_offre)}
              aria-label={`Voir l'offre ${idx + 1}`}
              onClick={(e) => {
                e.preventDefault();
                setCurrent(idx);
              }}
              className={`h-2.5 w-2.5 rounded-full transition ${
                idx === current ? "bg-white" : "bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
