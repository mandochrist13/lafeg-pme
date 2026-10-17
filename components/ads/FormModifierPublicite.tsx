"use client";
import React, { useState } from "react";
import {
  updatePubliciteWithImage,
  uploadPubliciteImage,
  MAX_IMAGE_SIZE,
} from "@/app/services/vente/api";
import { Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function FormModifierPublicite({
  publicite,
  onSuccess,
}: {
  publicite: any;
  onSuccess: () => void;
}) {

  const [formValues, setFormValues] = useState({
    libelle: publicite.libelle,
    nom_structure: publicite.nom_structure,
    imageFile: null as File | null,
    lien: publicite.lien || "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formValues.libelle) {
      toast.error("Veuillez sélectionner un emplacement.");
      return;
    }
    if (formValues.imageFile && formValues.imageFile.size > MAX_IMAGE_SIZE) {
      toast.error("L’image est trop volumineuse (max 5 Mo).");
      return;
    }

    try {
      setLoading(true);

      // Si une nouvelle image est fournie, on l'upload directement vers Supabase
      const imageMeta = formValues.imageFile
        ? await uploadPubliciteImage(formValues.imageFile)
        : null;

      await updatePubliciteWithImage(publicite.id_vente, {
        libelle: formValues.libelle,
        nom_structure: formValues.nom_structure,
        lien: formValues.lien.trim() || null,
        ...(imageMeta ?? {}),
      });

      toast.success("Publicité mise à jour avec succès !");
      onSuccess();
    } catch (error) {
      console.error(error);
      const message =
        error instanceof Error
          ? error.message
          : "Erreur lors de la mise à jour de la publicité.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="grid grid-cols-2 gap-5" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <Select
        value={formValues.libelle}
        onValueChange={(value: string) =>
          setFormValues({ ...formValues, libelle: value })
        }
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Sélectionnez l’emplacement" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="HEADER">Entête (HEADER)</SelectItem>
          <SelectItem value="MIDDLE">Section Accueil (MIDDLE)</SelectItem>
                 <SelectItem value="HERO">Section Hero (HERO)</SelectItem>
                    <SelectItem value="ACTU">Section Actualités (ACTU)</SelectItem>
          <SelectItem value="INSTITUTION">
            Page Institution Financière (INSTITUTION)
          </SelectItem>
          <SelectItem value="SEA">Page SEA (SEA)</SelectItem>
        </SelectContent>
      </Select>
      <Input
        type="text"
        placeholder="Nom de la structure"
        value={formValues.nom_structure}
        onChange={(e) => setFormValues({ ...formValues, nom_structure: e.target.value })}
        required
      />
      <Input
        type="file"
        accept="image/png,image/jpeg,image/gif"
        onChange={(e) => setFormValues({ ...formValues, imageFile: e.target.files?.[0] || null })}
      />
      <Input
        type="text"
        placeholder="Lien (optionnel)"
        value={formValues.lien}
        onChange={(e) => setFormValues({ ...formValues, lien: e.target.value })}
      />
      </div>
      

      {publicite.image_url && (
        <img src={publicite.image_url} alt="Image existante" style={{ maxWidth: 200 }} />
      )}

      <Button variant="default" type="submit" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Modification…
          </>
        ) : (
          "Modifier"
        )}
      </Button>
    </form>
  );
}
