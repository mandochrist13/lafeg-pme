"use client"

// import slugify from "slugify"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Calendar, ArrowLeft } from "lucide-react"
import { Button} from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  // ✅ On récupère uniquement l'id à la fin du slug
  const id = params.slug.split("-").pop()

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/actualite/${id}`, { cache: "no-store" })
  if (!res.ok) notFound()
  const article = await res.json()

  // Format de date
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Link href="/actualites">
          <Button variant="outline" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux actualités
          </Button>
        </Link>

        <article className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="relative h-96">
            <Image
              src={article.imageUrl || "/placeholder.svg"}
              alt={article.titre}
              fill
              className="object-cover"
            />
            <div className="absolute bottom-6 left-6">
              <Badge className="bg-[#063a1e] text-white">{article.categorie}</Badge>
            </div>
          </div>

          <div className="p-6">
            <h1 className="text-3xl font-bold text-[#063a1e] mb-4">{article.titre}</h1>
            <p className="text-gray-500 mb-4">{formatDate(article.datePub)}</p>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{article.contenu}</p>
          </div>
        </article>
      </div>
    </div>
  )
}
