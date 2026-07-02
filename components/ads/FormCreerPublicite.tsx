"use client";

import React, { useState } from "react";
import {
  createPublicite,
  uploadPubliciteImage,
  MAX_IMAGE_SIZE,
} from "@/app/services/vente/api";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
export function FormCreerPublicite({ onSuccess }: { onSuccess: () => void }) {
    const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    libelle: "",
    nom_structure: "",
    lien: "",
    imageFile: null as File | null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation : l'emplacement et l'image sont obligatoires
    if (!formValues.libelle) {
      toast.error("Veuillez sélectionner un emplacement.");
      return;
    }
    if (!formValues.imageFile) {
      toast.error("Veuillez sélectionner une image.");
      return;
    }
    if (formValues.imageFile.size > MAX_IMAGE_SIZE) {
      toast.error("L’image est trop volumineuse (max 5 Mo).");
      return;
    }

    try {
      setLoading(true);

      // 1) Upload de l'image directement vers Supabase (contourne la limite Vercel de 4,5 Mo)
      const imageMeta = await uploadPubliciteImage(formValues.imageFile);

      // 2) Création de la publicité avec les métadonnées (JSON léger)
      await createPublicite({
        libelle: formValues.libelle,
        nom_structure: formValues.nom_structure,
        lien: formValues.lien.trim() || null,
        ...imageMeta,
      });

      toast.success("Publicité créée avec succès !");
      setFormValues({ libelle: "", nom_structure: "", lien: "", imageFile: null });
      onSuccess();
    } catch (error) {
      console.error(error);
      const message =
        error instanceof Error
          ? error.message
          : "Erreur lors de la création de la publicité.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="grid grid-cols-2 gap-5" onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Nom de la structure"
        required
        value={formValues.nom_structure}
        onChange={(e) =>
          setFormValues({ ...formValues, nom_structure: e.target.value })
        }
      />
      <Select
        onValueChange={(value) =>
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
        placeholder="Lien (optionnel)"
        value={formValues.lien}
        onChange={(e) =>
          setFormValues({ ...formValues, lien: e.target.value })
        }
      />
      <Input
        type="file"
        accept="image/png,image/jpeg,image/gif"
        onChange={(e) =>
          setFormValues({
            ...formValues,
            imageFile: e.target.files?.[0] || null,
          })
        }
      />
      <Button variant="default" type="submit" disabled={loading}>

        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Création…
          </>
        ) : (
          "Créer"
        )}
      </Button>
    </form>
  );
}
