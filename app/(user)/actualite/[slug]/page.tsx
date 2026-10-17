import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import prisma from "@/lib/prisma";
import { extraireUuid } from "@/lib/api-utils";

// Page serveur : on lit directement la base (l'ancienne version était un
// composant client `async` qui appelait l'API avec une URL relative et lisait
// `params.id` alors que le segment s'appelle `[slug]`, donc elle plantait toujours).
// Pas de `force-dynamic` : il empêchait `notFound()` de renvoyer un vrai statut 404
// (la réponse partait en streaming avec un 200), ce qui faisait indexer des pages vides.
export const revalidate = 0;

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const id = extraireUuid(slug);
  if (!id) notFound();

  const article = await prisma.actualite.findUnique({ where: { id } });
  if (!article) notFound();

  const formatDate = (date: Date) =>
    date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Link href="/actualite">
          <Button variant="outline" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux actualités
          </Button>
        </Link>

        <article className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="relative h-96">
            <Image
              src={article.imageUrl || "/article.png"}
              alt={article.titre}
              fill
              className="object-cover"
              priority
            />
            {article.categorie && (
              <div className="absolute bottom-6 left-6">
                <Badge className="bg-[#063a1e] text-white">{article.categorie}</Badge>
              </div>
            )}
          </div>

          <div className="p-6">
            <h1 className="text-3xl font-bold text-[#063a1e] mb-4">{article.titre}</h1>
            <p className="text-gray-500 mb-4">{formatDate(article.datePub)}</p>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{article.contenu}</p>

            {(article.source || article.lienSource) && (
              <p className="mt-6 text-sm text-muted-foreground">
                Source :{" "}
                {article.lienSource ? (
                  <a
                    href={article.lienSource}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#063a1e] hover:underline inline-flex items-center gap-1"
                  >
                    {article.source || article.lienSource} <ExternalLink className="h-3 w-3" />
                  </a>
                ) : (
                  <span>{article.source}</span>
                )}
              </p>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}
