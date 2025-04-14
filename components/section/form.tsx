"use client";

import { useForm } from "react-hook-form";
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
        "https://api.hsforms.com/submissions/v3/integration/submit/146022164/c0c8f584-f6bb-4124-b8bd-f9966221a5e2",
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
        {errors.lastname && <p>Nom </p>}
        <Input
          {...register("lastname", { required: true })}
          type="name"
          placeholder="Nom"
          className="flex-1"
        />
        {/* {errors.lastname && <p>Nom requis</p>} */}
      </div>
      <div>
        {errors.firstname && <p>Prénom</p>}
        <Input
          {...register("firstname", { required: true })}
          type="search"
          placeholder="Prénom"
          className="flex-1"
        />
        {/* {errors.firstname && <p>Prénom requis</p>} */}
      </div>

      <div>
        {errors.email && <p>Email </p>}
        <Input
          {...register("email", { required: true })}
          type="email"
          placeholder="Email"
          className="flex-1"
        />
        {/* {errors.email && <p>Email requis</p>} */}
      </div>

      <div>
        {errors.company && <p>Entreprise</p>}
        <Input
          {...register("company", { required: true })}
          type="text"
          placeholder="Entreprise"
          className="flex-1"
        />
        {/* {errors.company && <p>Entreprise requise</p>} */}
      </div>

      <div>
        {errors.contact && <p>Contact</p>}
        <Input
          {...register("contact", { required: true })}
          type="phone"
          placeholder="Téléphone"
          className="flex-1"
        />
        {/* {errors.contact && <p>Contact requis</p>} */}
      </div>

      <div>
        {errors.address && <p>Adresse</p>}
        <Input
          {...register("address", { required: true })}
          type="phone"
          placeholder="Adresse"
          className="flex-1"
        />
        {/* {errors.address && <p>Adresse requise</p>} */}
      </div>

      <div className="grid grid-cols-2 gap-4">
      <label className="flex items-center gap-2">
          <input type="checkbox" value="" {...register("interests")} />
          Textes législatifs et règlementaires des
          administrations publiques
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" value="Marketing" {...register("interests")} />
          Textes législatifs et règlementaires pour les PME
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" value="Vente" {...register("interests")} />
          textes juridiques régionaux et internationaux
        </label>
      </div>

      <div>
        <label className="flex items-center gap-2">
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
      {/* <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="lastname"
                          className="text-sm font-medium"
                        >
                          Nom
                        </label>
                        <Input
                           {...register('lastname', { required: 'Le nom est requis' })}
                          id="lastname"
                          placeholder="Votre nom"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="firstname"
                          className="text-sm font-medium"
                        >
                          Prénom
                        </label>
                        <Input
                       {...register('firstname', { required: 'Le prénom est requis' })}
                          id="firstname"
                          placeholder="Votre prénom"
                        />
                        {errors.firstname && <p className="text-red-500">{errors.firstname.message}</p>}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        {...register('email', {
                          required: 'Email requis',
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Email invalide',
                          },
                        })}
                        placeholder="votre.email@entreprise.com"
                      />
                       {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                    </div>
                    {/* <div className="space-y-2">
                      <label htmlFor="company" className="text-sm font-medium">
                        Entreprise
                      </label>
                      <Input
                        value={formData.company}
                        onChange={handleChange}
                        id="company"
                        placeholder="Nom de votre entreprise"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="contact" className="text-sm font-medium">
                        Contact
                      </label>
                      <Input
                        id="contact"
                        type="tel"
                        value={formData.contact}
                        onChange={handleChange}
                        placeholder="(+241) 74 00 00 00"
                      />
                    </div>
                    <div className="space-y-2 ">
                      <label htmlFor="company" className="text-sm font-medium">
                        Adresse Entreprise
                      </label>
                      <AddressAutocomplete />
                    </div> 
                    <Captcha />

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Centres d'intérêt
                      </label>
                      <div className="grid md:grid-cols-2 gap-2">
                        <div className="flex items-center gap-2">
                          <input
                            value="Marketing" {...register('interests')} type="checkbox"
                            id="interest1"
                            className="rounded text-[#dcdaa4]"
                          />
                          <label htmlFor="interest1" className="text-sm">
                            Textes législatifs et règlementaires des
                            administrations publiques
                          </label>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                           
                            value="Vente" {...register('interests')}type="checkbox"
                            id="interest2"
                            className="rounded text-[#dcdaa4]"
                          />
                          <label htmlFor="interest2" className="text-sm">
                            Textes législatifs et règlementaires pour les PME
                          </label>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            value="Support" {...register('interests')}type="checkbox"
                            id="interest3"
                            className="rounded text-[#dcdaa4]"
                          />
                          <label htmlFor="interest3" className="text-sm">
                            textes juridiques régionaux et internationaux
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 mt-4">
                      <input
                        type="checkbox"
                        id="consent"
                        {...register('consent', { required: true })} className="rounded text-[#dcdaa4] mt-1"
                      />
                      <label
                        htmlFor="consent"
                        className="text-xs text-muted-foreground"
                      >
                        J'accepte de recevoir des informations par email et je
                        comprends que je peux me désabonner à tout moment.
                        Consultez notre{" "}
                        <Link
                          href="#"
                          className="underline hover:text-[#bdbd95]"
                        >
                          politique de confidentialité
                        </Link>
                        .
                      </label>
                      {errors.consent && <p className="text-red-500">Vous devez accepter pour continuer</p>}
                    </div>
                    <div className="flex justify-center">
                      <Button
                        type="submit"
                        variant="secondary"
                        size="lg"
                        className=" bg-[#063a1e] relative hover:bg-white"
                      >
                        <span className="absolute inset-0 w-full h-full bg-[#dcdaa4] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0"></span>
                        <span className="relative mr-3 z-10 transition-colors duration-500 ease-in-out group-hover:text-[#063a1e]">
                          <p>S'abonner à la newsletter</p>
                        </span>
                      </Button>
                    </div>
                  </form> */}
    </form>
  );
}
