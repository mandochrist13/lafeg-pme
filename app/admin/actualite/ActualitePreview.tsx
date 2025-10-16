"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { CalendarDays, ExternalLink } from "lucide-react"
import type { Actualite } from "@/app/services/actualite/api"

type Props = {
  open: boolean
  onClose: () => void
  actualite?: Actualite | null
}

export default function ActualitePreview({ open, onClose, actualite }: Props) {
  if (!actualite) return null

  const datePub = new Date(actualite.datePub).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Image */}
          {actualite.imageUrl && (
            <div className="relative w-full md:w-1/2 h-64 md:h-auto">
              <Image
                src={actualite.imageUrl}
                alt={actualite.titre}
                fill
                className="object-cover object-center"
               
              />
            </div>
          )}

          {/* Contenu */}
          <div className="flex-1 p-6 space-y-4 overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">{actualite.titre}</DialogTitle>
            </DialogHeader>

            {actualite.categorie && (
              <Badge variant="outline" className="bg-[#063a1e]/10 border-[#063a1e]/30">
                {actualite.categorie}
              </Badge>
            )}

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDays className="h-4 w-4 text-[#063a1e]" />
              <span>Publié le {datePub}</span>
            </div>

            <Separator />

            <div
              className="text-sm leading-relaxed text-gray-800 whitespace-pre-line"
              dangerouslySetInnerHTML={{ __html: actualite.contenu }}
            />

            {actualite.source && (
              <div className="text-sm text-muted-foreground">
                Source :{" "}
                {actualite.lienSource ? (
                  <a
                    href={actualite.lienSource}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#063a1e] hover:underline inline-flex items-center gap-1"
                  >
                    {actualite.source} <ExternalLink className="h-3 w-3" />
                  </a>
                ) : (
                  <span>{actualite.source}</span>
                )}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
