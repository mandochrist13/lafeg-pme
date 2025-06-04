"use client";

import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AdBannerProps {
  type: "image";
  size: "small" | "medium" | "large" | "leaderboard" | "skyscraper";
  position: string;
  content: {
    title?: string;
    description?: string;
    imageUrl?: string;
    ctaText?: string;
    advertiser?: string;
    targetUrl?: string;
  };
}

export function Advert({ type, size, position, content }: AdBannerProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const adRef = useRef<HTMLDivElement>(null);

  // Lazy loading avec Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLoaded) {
            setTimeout(() => {
              setIsLoaded(true);
            }, Math.random() * 1000 + 500);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (adRef.current) {
      observer.observe(adRef.current);
    }

    return () => observer.disconnect();
  }, [isLoaded]);

  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return "w-full max-w-sm h-32";
      case "medium":
        return "w-full max-w-md h-48";
      case "large":
        return "w-full max-w-2xl h-64";
      case "leaderboard":
        return "w-full max-w-4xl h-24 md:h-32";
      case "skyscraper":
        return "w-full max-w-5xl mx-10 mb-10 h-72 flex";
      default:
        return "w-full max-w-md h-48";
    }
  };

  return (
    <div ref={adRef} className={`relative ${getSizeClasses()}`}>
      <div className="absolute top-2 left-2 z-10 bg-gray-500/80 text-white text-xs px-1 rounded">
        Publicité
      </div>

      {!isLoaded ? (
        <Card className="w-full h-full animate-pulse bg-gray-200 flex items-center justify-center">
          <div className="text-gray-400 text-sm">
            Chargement de la publicité...
          </div>
        </Card>
      ) : (
        <Card className="w-full h-full overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
          <div className="relative w-full h-full">
            <img
              src={content.imageUrl || "/placeholder.svg?height=200&width=400"}
              alt={content.title || "Publicité"}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <h3 className="text-white font-semibold text-sm">
                {content.title}
              </h3>
              {content.ctaText && (
                <Button
                  size="sm"
                  className="mt-2 bg-white text-black hover:bg-gray-100"
                >
                  {content.ctaText}
                </Button>
              )}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
