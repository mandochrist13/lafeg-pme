"use client";

import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";


interface AdBannerProps {
  type: "image" | "video" | "native";
  size: "small" | "medium" | "large" | "leaderboard" | "skyscraper";
  position: string;
  content: {
    title?: string;
    description?: string;
    imageUrl?: string;
    videoUrl?: string;
    ctaText?: string;
    advertiser?: string;
    targetUrl?: string;
  };
}

export function AdBanvideo({ type, size, position, content }: AdBannerProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoOperation, setVideoOperation] = useState<Promise<void> | null>(
    null
  );
  const videoRef = useRef<HTMLVideoElement>(null);
  const adRef = useRef<HTMLDivElement>(null);

  // Lazy loading avec Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLoaded) {
            // Simuler le chargement asynchrone
            setTimeout(() => {
              setIsLoaded(true);
            }, Math.random() * 1000 + 500); // 500-1500ms de délai
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

  // Gestion de la lecture vidéo automatique avec gestion d'erreur
  useEffect(() => {
    if (type === "video" && videoRef.current && isLoaded) {
      const video = videoRef.current;
      let playPromise: Promise<void> | null = null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(async (entry) => {
            if (entry.isIntersecting) {
              try {
                // Attendre que toute opération précédente soit terminée
                if (playPromise) {
                  await playPromise;
                }
                playPromise = video.play();
                await playPromise;
                setIsPlaying(true);
              } catch (error) {
                if ((error as Error).name !== "AbortError") {
                  console.warn("Erreur de lecture vidéo:", error);
                }
              }
            } else {
              try {
                // Attendre que toute opération précédente soit terminée
                if (playPromise) {
                  await playPromise;
                }
                video.pause();
                setIsPlaying(false);
              } catch (error) {
                console.warn("Erreur de pause vidéo:", error);
              }
            }
          });
        },
        { threshold: 0.5 }
      );

      observer.observe(video);
      return () => observer.disconnect();
    }
  }, [type, isLoaded]);

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
      {/* Indicateur de publicité (requis par les normes) */}
      <div className="absolute top-2 left-2 z-10 bg-gray-500/80 text-white text-xs px-1 rounded">
        Publicité
      </div>

     

      {!isLoaded ? (
        // Skeleton de chargement
        <Card className="w-full h-full animate-pulse bg-gray-200 flex items-center justify-center">
          <div className="text-gray-400 text-sm">
            Chargement de la publicité...
          </div>
        </Card>
      ) : (
        <Card className="w-full h-full overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
          {type === "image" && (
            <div className="relative w-full h-full">
              <img
                src={
                  content.imageUrl || "/placeholder.svg?height=200&width=400"
                }
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
          )}

          {type === "video" && (
            <div className="relative w-full h-full">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                muted={isMuted}
                loop
                playsInline
                poster={content.imageUrl}
              >
                <source
                  src={content.videoUrl || "/placeholder-video.mp4"}
                  type="video/mp4"
                />
                Votre navigateur ne supporte pas la lecture vidéo.
              </video>

              {/* Contrôles vidéo */}
           

              <div className="absolute bottom-0 right-0 bg-gradient-to-l from-[#063a1e] to-transparent p-4">
                <h3 className="text-white font-semibold text-sm">
                  {content.title}
                </h3>
              </div>
            </div>
          )}

          {type === "native" && (
            <div className="p-4 h-full flex flex-col">
              <div className="flex items-start gap-3 mb-3">
                <img
                  src={
                    content.imageUrl || "/placeholder.svg?height=60&width=60"
                  }
                  alt={content.advertiser || "Logo"}
                  className="w-12 h-12 rounded-lg object-cover"
                  loading="lazy"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-sm text-[#063a1e]">
                    {content.title}
                  </h3>
                  <p className="text-xs text-gray-500">{content.advertiser}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-3 flex-1">
                {content.description}
              </p>
              {content.ctaText && (
                <Button
                  size="sm"
                  className="w-full bg-gradient-to-r from-[#dcdaa4] to-[#bdbd95] text-[#063a1e] hover:from-[#e6e4b4] hover:to-[#c7c7a0]"
                >
                  {content.ctaText}
                </Button>
              )}
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
