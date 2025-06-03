"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const ads = [
  {
    src: "/artiz.jpg",
    alt: "Promotion Fournitures scolaires",
    link: "/fournitures",
  },
  {
    src: "/bannière FEG.png",
    alt: "Promo rentrée 2025",
    link: "/promo-rentree",
  },
  {
    src: "/Vichy 1212 Big Sale Campaign 2020.jpeg",
    alt: "Livraison gratuite !",
    link: "/livraison-gratuite",
  },
];

const AdBanner = () => {
  const [current, setCurrent] = useState(0);
  const total = ads.length;

  // Auto-slide toutes les 5 secondes
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 5000);
    return () => clearInterval(timer);
  }, [total]);

  const goTo = (index: number) => {
    setCurrent(index);
  };

  return (
    <div className="relative w-full max-w-5xl h-[100px] md:h-[125px] bg-gray-100 overflow-hidden rounded-xl shadow-md">
      <div className="absolute top-2 left-2 z-10 bg-gray-500/80 text-white text-xs px-1 rounded">
        Publicité
      </div>
      <a href={ads[current].link}>
        <Image
          src={ads[current].src}
          alt={ads[current].alt}
          width={500}
          height={500}
          className="transition-all w-full bg-cover bg-center duration-700"
        />
      </a>

      {/* Indicateurs (points) */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {ads.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={`w-3 h-3 rounded-full ${
              index === current ? "bg-white" : "bg-white/50"
            } transition`}
          />
        ))}
      </div>
    </div>
  );
};

export default AdBanner;
