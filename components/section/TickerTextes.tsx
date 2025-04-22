"use client";

import { useEffect, useRef, useState } from "react";
import { fetchTextesJuridiques, TexteJuridique } from "@/app/services/texte/api";


const TickerTextes = () => {
  const [textes, setTextes] = useState<TexteJuridique[]>([]);
  const tickerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTextesJuridiques();
        const textesArray = Array.isArray(data) ? data : data.data || [];
        const derniersTextes = textesArray.slice(0, 4);
        setTextes(derniersTextes);
      } catch (error) {
        console.error("Erreur lors du chargement des textes juridiques :", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const ticker = tickerRef.current;
    const container = containerRef.current;
    if (!ticker || !container) return;

    let animationFrame: number;
    let position = container.offsetWidth;

    const step = () => {
      position -= 1;
      container.style.transform = `translateX(${position}px)`;

      if (-position >= container.scrollWidth) {
        position = ticker.offsetWidth;
      }

      animationFrame = requestAnimationFrame(step);
    };

    animationFrame = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrame);
  }, [textes]);

  return (
    <div className="bg-[#063a1e] py-2 text-white overflow-hidden">
      <div ref={tickerRef} className="relative  w-full h-[25px] overflow-hidden">
        <div
          ref={containerRef}
          className="absolute top-0 left-0 flex gap-6 whitespace-nowrap"
          style={{ willChange: "transform" }}
        >
          {textes.map((texte) => (
            <div
              key={texte.id_texteJuridique}
              className=" px-4 py-1 text-sm whitespace-nowrap"
            >
              {texte.titre}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TickerTextes;
