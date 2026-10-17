"use client"

import { useEffect, useState } from "react"
import { createActualite, updateActualite, type Actualite } from "@/app/services/actualite/api"
import { CATEGORIES_ACTUALITE } from "@/lib/categories-actualite"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { toast } from "sonner"

type Props = {
  open: boolean
  onClose: () => void
  actualite?: Actualite | null
  onSaved?: () => void
}

export default function ActualiteForm({ open, onClose, actualite, onSaved }: Props) {
  const [titre, setTitre] = useState("")
  const [contenu, setContenu] = useState("")
  const [categorie, setCategorie] = useState("")
  const [source, setSource] = useState("")
  const [lienSource, setLienSource] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  // Le dialogue reste monté en permanence : on (ré)initialise les champs à chaque ouverture,
  // sinon le formulaire de modification s'affichait vide.
  useEffect(() => {
    if (!open) return
    setTitre(actualite?.titre ?? "")
    setContenu(actualite?.contenu ?? "")
    setCategorie(actualite?.categorie ?? "")
    setSource(actualite?.source ?? "")
    setLienSource(actualite?.lienSource ?? "")
    setFile(null)
  }, [open, actualite])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (actualite) {
        await updateActualite(actualite.id, {
          titre,
          contenu,
          categorie,
          source,
          lienSource,
          imageFile: file,
        })
        toast.success("Actualité mise à jour")
      } else {
        await createActualite({
          titre,
          contenu,
          categorie,
          source,
          lienSource,
          imageFile: file,
        })
        toast.success("Actualité créée avec succès")
      }
      onSaved?.()
      onClose()
    } catch (e: any) {
      toast.error(e.message || "Erreur lors de l’enregistrement")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{actualite ? "Modifier l’actualité" : "Ajouter une actualité"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="titre">Titre</Label>
            <Input id="titre" value={titre} onChange={(e) => setTitre(e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contenu">Contenu</Label>
            <Textarea
              id="contenu"
              value={contenu}
              onChange={(e) => setContenu(e.target.value)}
              required
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="categorie">Catégorie</Label>
              <Select value={categorie} onValueChange={setCategorie}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir..." />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES_ACTUALITE.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image (optionnelle)</Label>
              <Input id="image" type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
              {actualite?.imageUrl && !file && (
                <p className="text-xs text-muted-foreground">Une image est déjà associée ; laissez vide pour la conserver.</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="source">Source</Label>
            <Input id="source" value={source} onChange={(e) => setSource(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lienSource">Lien source</Label>
            <Input
              id="lienSource"
              type="url"
              placeholder="https://..."
              value={lienSource}
              onChange={(e) => setLienSource(e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="ghost" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" disabled={loading} className="bg-[#063a1e] hover:bg-[#063a1e]/90">
              {loading ? "Enregistrement..." : actualite ? "Mettre à jour" : "Créer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
