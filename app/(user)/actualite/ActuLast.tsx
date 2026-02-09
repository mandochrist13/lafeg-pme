"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { fetchActualites, type Actualite } from "@/app/services/public/actualite";


export default function DernieresActualites() {
  const [actus, setActus] = useState<Actualite[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/actualite?page=1&limit=3`, { cache: "no-store" })
        const json = await res.json()
        if (json?.data) setActus(json.data)
      } catch (e) {
        console.error("Erreur chargement actualités:", e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) {
    return (
      <div className="lg:col-span-2">
        <p className="text-center text-gray-500 py-10">Chargement des actualités...</p>
      </div>
    )
  }

  if (!actus.length) {
    return (
      <div className="lg:col-span-2">
        <p className="text-center text-gray-500 py-10">Aucune actualité disponible</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {actus.map((article, index) => {
        // const slug = `${slugify(article.titre, { lower: true, strict: true })}-${article.id}`
        return (
          <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-64 overflow-hidden">
              <Image
                src={article.imageUrl || "/article.png"}
                alt={article.titre}
                width={600}
                height={400}
                className="w-full h-full object-center object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute top-4 left-4">
                <Badge className={index === 0 ? "bg-red-500/80 text-white" : "bg-[#063a1e]/80 text-white"}>
                  {index === 0 ? "À LA UNE" : "RÉCENT"}
                </Badge>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-white text-xl font-bold mb-1 line-clamp-2">{article.titre}</h3>
                {/* <p className="text-white/90 text-sm line-clamp-2">{article.contenu}</p> */}
              </div>
            </div>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 text-sm text-[#063a1e] font-bold mb-4">
                <span>
                  {new Date(article.datePub).toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                {article.categorie && (
                  <>
                    <span>•</span>
                    <span>{article.categorie}</span>
                  </>
                )}
              </div>
              <p className="text-muted-foreground mb-4 line-clamp-3">
                {article.contenu.slice(0, 180)}...
              </p>
               <Link href={`${article.lienSource || "#"}`} target={article.lienSource ? "_blank" : "_self"} rel="noopener noreferrer">
                <Button
                  variant="ghost"
                  className="text-[#063a1e] hover:bg-[#063a1e]/10 p-0"
                >
                  Lire l'article complet
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link> 
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
