"use client";

import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FormValues {
  lastname: string;
  firstname: string;
  email: string;
  company: string;
  contact: string;
  address: string;
  textes_legislatifs_et_reglementaires_des_administrations_publiques?: boolean;
  textes_legislatifs_et_reglementaires_pour_les_pme?: boolean;
  textes_juridiques_regionaux_et_internationaux?: boolean;
  institutions_financieres?: boolean;
  sea?: boolean;
  consent: boolean;
}

interface Notification {
  show: boolean;
  message: string;
  type: "success" | "error" | "info";
}

export default function Form() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    mode: "onBlur",
  });

  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<Notification>({
    show: false,
    message: "",
    type: "info",
  });

  const showNotification = (message: string, type: "success" | "error" | "info") => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: "", type: "info" }), 5000);
  };

  const onSubmit = async (data: FormValues) => {
    setLoading(true);

     // 1. Correspondance Case à cocher → entry.xxx Google Forms
  const checkboxMapping = {
    textes_legislatifs_et_reglementaires_des_administrations_publiques: "entry.1384270388",
    textes_legislatifs_et_reglementaires_pour_les_pme: "entry.1029160559",
    textes_juridiques_regionaux_et_internationaux: "entry.487191522",
    institutions_financieres: "entry.1435833601",
    sea: "entry.1601997713"
  };
  
    try {
      // 1. Préparation des données pour HubSpot (inchangé)
      const hubspotPayload = {
        fields: [
          { name: "lastname", value: data.lastname },
          { name: "firstname", value: data.firstname },
          { name: "email", value: data.email },
          { name: "entreprise", value: data.company },
          { name: "contact", value: data.contact },
          { name: "addresse_de_l_entreprise", value: data.address },
          // { 
          //   name: "textes_legislatifs_et_reglementaires_des_administrations_publiques", 
          //   value: data.textes_legislatifs_et_reglementaires_des_administrations_publiques ? "Oui" : "Non" 
          // },
          // { 
          //   name: "textes_legislatifs_et_reglementaires_pour_les_pme", 
          //   value: data.textes_legislatifs_et_reglementaires_pour_les_pme ? "Oui" : "Non"
          // },
          // { 
          //   name: "textes_juridiques_regionaux_et_internationaux", 
          //   value: data.textes_juridiques_regionaux_et_internationaux ? "Oui" : "Non"
          // },
          // { 
          //   name: "institutions_financieres", 
          //   value: data.institutions_financieres ? "Oui" : "Non"
          // },
          // { name: "sea", value: data.sea ? "Oui" : "Non" },
          { name: "consent", value: data.consent ? "Oui" : "Non" },
        ],
      };
  
      // 2. Correction de l'envoi à Google Forms
      const formData = new URLSearchParams();
      formData.append("entry.544471118", data.lastname);
      formData.append("entry.1592220517", data.firstname);
      formData.append("entry.436600464", data.email);
      formData.append("entry.1262164274", data.company);
      formData.append("entry.27916088", data.contact);
      formData.append("entry.1562709965", data.address);
      

      // Cases à cocher → Transformées en "Oui"/"Non"
  Object.entries(checkboxMapping).forEach(([field, entryId]) => {
    formData.append(entryId, data[field as keyof FormValues] ? "Oui" : "Non");
  });


      // Cases à cocher
      // const interests = [];
      // if (data.textes_legislatifs_et_reglementaires_des_administrations_publiques) {
      //   interests.push("Textes administration");
      // }
      // if (data.textes_legislatifs_et_reglementaires_pour_les_pme) {
      //   interests.push("Textes PME");
      // }
      // if (data.textes_juridiques_regionaux_et_internationaux) {
      //   interests.push("Textes internationaux");
      // }
      // if (data.institutions_financieres) {
      //   interests.push("Institutions financières");
      // }
      // if (data.sea) {
      //   interests.push("sea");
      // }
      
      // if (interests.length > 0) {
      //   formData.append("entry.1646452430", interests.join(", "));
      // }
  
      // 3. URL corrigée pour Google Forms
      const googleFormsUrl = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfuP1j6-cAoftKQNNLF5DRYIom445w0NtMKxPdptxqaVErcqQ/formResponse";
  
      // Envoi simultané
      const [hubspotRes, googleFormsRes] = await Promise.all([
        fetch(
          "https://api.hsforms.com/submissions/v3/integration/submit/146034890/7daccfd8-efad-4139-a2cc-30bd3a5c4476",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(hubspotPayload),
          }
        ),
        fetch(googleFormsUrl, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: formData,
        })
      ]);
  
      // Vérification HubSpot
      if (!hubspotRes.ok) {
  let errorText = await hubspotRes.text();
  throw new Error(`HubSpot: ${errorText || "Erreur inconnue"}`);
}

  
      showNotification("✅ Merci ! Votre inscription a été envoyée.", "success");
      reset();
    } catch (err) {
      console.error("Erreur:", err);
      let errorMessage = "Une erreur s'est produite lors de l'envoi du formulaire";
      if (err instanceof Error) errorMessage = err.message;
      showNotification(`❌ ${errorMessage}`, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-medium">
              Nom <span className="text-red-600">*</span>
            </label>
            <Input
              {...register("lastname", { required: "Ce champ est requis" })}
              type="text"
              placeholder="Nom"
              className="w-full"
            />
            {errors.lastname && <p className="mt-1 text-sm text-red-600">{errors.lastname.message}</p>}
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Prénom <span className="text-red-600">*</span>
            </label>
            <Input
              {...register("firstname", { required: "Ce champ est requis" })}
              type="text"
              placeholder="Prénom"
              className="w-full"
            />
            {errors.firstname && <p className="mt-1 text-sm text-red-600">{errors.firstname.message}</p>}
          </div>
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Email <span className="text-red-600">*</span>
          </label>
          <Input
            {...register("email", { 
              required: "Ce champ est requis",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Adresse email invalide"
              }
            })}
            type="email"
            placeholder="Email"
            className="w-full"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-medium">
              Entreprise <span className="text-red-600">*</span>
            </label>
            <Input
              {...register("company", { required: "Ce champ est requis" })}
              type="text"
              placeholder="Entreprise"
              className="w-full"
            />
            {errors.company && <p className="mt-1 text-sm text-red-600">{errors.company.message}</p>}
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Contact <span className="text-red-600">*</span>
            </label>
            <Input
              {...register("contact", { 
                required: "Ce champ est requis",
                pattern: {
                  value: /^[0-9\s+-]+$/,
                  message: "Numéro de téléphone invalide"
                }
              })}
              type="tel"
              placeholder="Téléphone"
              className="w-full"
            />
            {errors.contact && <p className="mt-1 text-sm text-red-600">{errors.contact.message}</p>}
          </div>
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Adresse <span className="text-red-600">*</span>
          </label>
          <Input
            {...register("address", { required: "Ce champ est requis" })}
            type="text"
            placeholder="Adresse"
            className="w-full"
          />
          {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>}
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Centres d'intérêt</h3>
          <div className="grid grid-cols-1 gap-3">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                {...register("textes_legislatifs_et_reglementaires_des_administrations_publiques")}
                className="h-5 w-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span>Textes législatifs et réglementaires des administrations publiques</span>
            </label>
            
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                {...register("textes_legislatifs_et_reglementaires_pour_les_pme")}
                className="h-5 w-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span>Textes législatifs et réglementaires pour les PME</span>
            </label>
            
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                {...register("textes_juridiques_regionaux_et_internationaux")}
                className="h-5 w-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span>Textes juridiques régionaux et internationaux</span>
            </label>
            
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                {...register("institutions_financieres")}
                className="h-5 w-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span>Institutions financières</span>
            </label>
            
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                {...register("sea")}
                className="h-5 w-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span>SEA</span>
            </label>
          </div>
        </div>
        {notification.show && (
        <div className={`mb-4 p-4 rounded ${
          notification.type === "success" ? "bg-green-100 text-green-800" :
          notification.type === "error" ? "bg-red-100 text-red-800" :
          "bg-blue-100 text-blue-800"
        }`}>
          {notification.message}
        </div>
      )}
        <div className="pt-2">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              {...register("consent", { required: "Vous devez accepter pour continuer" })}
              className="h-5 w-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
            <span className="font-medium text-green-900">
              J'accepte de recevoir des emails.
            </span>
          </label>
          {errors.consent && <p className="mt-1 text-sm text-red-600">{errors.consent.message}</p>}
        </div>

        <div className="pt-4">
          <Button type="submit"
            size="lg"
            disabled={loading}
                    variant="secondary"

                    className="w-full bg-[#063a1e] font-bold relative hover:bg-white"
                  >
                    <span className="absolute inset-0 w-full h-full bg-[#dcdaa4] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0"></span>
                    <span className="relative mr-3 z-10 transition-colors duration-500 ease-in-out group-hover:text-[#063a1e]">
                    {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Envoi en cours...
              </span>
            ) : (
              "S'abonner"
            )}
                    </span>
                  </Button>
        </div>
      </form>
    </div>
  );
}