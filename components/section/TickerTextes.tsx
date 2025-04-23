"use client";

import { useEffect, useRef, useState } from "react";
import { fetchTextesJuridiques } from "@/app/services/texte/api";

interface TexteJuridique {
  id: string;
  titre: string;
  [key: string]: any;
}

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
        console.error(
          "Erreur lors du chargement des textes juridiques :",
          error
        );
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
      <div className="bg-[#063a1e] text-white overflow-hidden">
        <div className="ticker-container">
          <div className="ticker-wrapper">
            <div className="ticker-text ">
              <div className="flex">
                {" "}
                {textes.map((texte) => (
                  <div
                    key={texte.id}
                    className=" text-sm uppercase  whitespace-nowrap"
                  >
                    {texte.titre} <span className="px-4 text-lg">&nbsp;&nbsp;•&nbsp;&nbsp;</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TickerTextes;
