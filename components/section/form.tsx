"use client";

import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import Captcha from "@/components/Captcha";
import { Input } from "@/components/ui/input";
import AddressAutocomplete from "@/components/AddressAutocomplete";
import { Button } from "@/components/ui/button";

interface FormValues {
  lastname: string;
  firstname: string;
  email: string;
  company: string;
  contact: string;
  address: string;
  interests: string[];
  consent: boolean;
}

export default function Form() {
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormValues) => {
    const hubspotPayload = {
      fields: [
        { name: "lastname", value: data.lastname },
        { name: "firstname", value: data.firstname },
        { name: "email", value: data.email },
        { name: "company", value: data.company },
        { name: "contact", value: data.contact },
        { name: "address", value: data.address },
        { name: "interests", value: data.interests.join(", ") },
        { name: "consent", value: data.consent ? "Yes" : "No" },
      ],
    };

    try {
      const res = await fetch(
        "https://api.hsforms.com/submissions/v3/integration/submit/146034890/7daccfd8-efad-4139-a2cc-30bd3a5c4476",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(hubspotPayload),
        }
      );

      if (res.ok) {
        alert("✅ Merci ! Votre inscription a été envoyée.");
        reset();
      } else {
        const error = await res.json();
        console.error("❌ HubSpot Error:", error);
        alert("❌ Une erreur s'est produite.");
      }
    } catch (err) {
      console.error("❌ Network error:", err);
      alert("❌ Une erreur réseau s'est produite.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <p>
          Nom <span className="text-red-600">*</span>{" "}
        </p>
        <Input
          {...register("lastname", { required: true })}
          type="name"
          placeholder="Nom"
          className="flex-1"
        />
        {errors.lastname && <p className="text-red-600">Champs Nom requis</p>}
      </div>
      <div>
        <p>
          Prénom <span className="text-red-600">*</span>
        </p>
        <Input
          {...register("firstname", { required: true })}
          type="search"
          placeholder="Prénom"
          className="flex-1"
        />
        {errors.firstname && (
          <p className="text-red-600">Champs Prénom requis</p>
        )}
      </div>

      <div>
        <p>
          Email <span className="text-red-600">*</span>
        </p>
        <Input
          {...register("email", { required: true })}
          type="email"
          placeholder="Email"
          className="flex-1"
        />
        {errors.email && <p className="text-red-600">Champs Email requis</p>}
      </div>

      <div>
        <p>
          Entreprise <span className="text-red-600">*</span>
        </p>
        <Input
          {...register("company", { required: true })}
          type="name"
          placeholder="Entreprise"
          className="flex-1"
        />
        {errors.company && (
          <p className="text-red-600">Champs Entreprise requise</p>
        )}
      </div>

      <div>
        <p>
          Contact <span className="text-red-600">*</span>
        </p>
        <Input
          {...register("contact", { required: true })}
          type="phone"
          placeholder="Téléphone"
          className="flex-1"
        />
        {errors.contact && (
          <p className="text-red-600">Champs Contact requis</p>
        )}
      </div>

      <div>
        <p>
          Adresse <span className="text-red-600">*</span>
        </p>
         <Input
          {...register("address", { required: true })}
          type="name"
          placeholder="Adresse"
          className="flex-1"
        />  
        {/* <Controller
          name="address"
          control={control}
          rules={{ required: "Champs Adresse requis" }}
          render={({ field }) => (
            <AddressAutocomplete
              value={field.value}
              onSelect={(value) => field.onChange(value)} // <-- ici la magie
            />
          )}
        /> */}
        {errors.address && (
          <p className="text-red-600">Champs Adresse requise</p>
        )}
      </div>

      {/* <div className="grid grid-cols-1 gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            value="Texte administration"
            {...register("interests")}
          />
          Textes législatifs et règlementaires des administrations publiques
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" value="Texte PME" {...register("interests")} />
          Textes législatifs et règlementaires pour les PME
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            value="Texte Internationaux"
            {...register("interests")}
          />
          textes juridiques régionaux et internationaux
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            value="Institution Financière"
            {...register("interests")}
          />
          Institution Financière
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" value="SEA" {...register("interests")} />
          SEA
        </label>
      </div> */}

      <div className="grid grid-cols-1 gap-4">
        {[
          "Texte administration",
          "Texte PME",
          "Texte Internationaux",
          "Institution Financière",
          "SEA",
        ].map((interest) => (
          <label key={interest} className="flex items-center gap-2">
            <input
              type="checkbox"
              value={interest}
              {...register("interests")}
            />
            {interest}
          </label>
        ))}
      </div>

      <div>
        <label className="flex text-green-900 font-semibold items-center gap-2">
          <input type="checkbox" {...register("consent", { required: true })} />
          J'accepte de recevoir des emails.
        </label>
        {errors.consent && <p>Consentement requis</p>}
      </div>
      <div className="flex justify-center">
        <Button
          type="submit"
          variant="secondary"
          disabled={loading}
          size="lg"
          className=" bg-[#063a1e] relative hover:bg-white"
        >
          <span className="absolute inset-0 w-full h-full bg-[#dcdaa4] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0"></span>
          <span className="relative mr-3 z-10 transition-colors duration-500 ease-in-out group-hover:text-[#063a1e]">
            <p>{loading ? "Envoi en cours..." : "S'abonner à la newsletter"}</p>
          </span>
        </Button>
      </div>
    </form>
  );
}
