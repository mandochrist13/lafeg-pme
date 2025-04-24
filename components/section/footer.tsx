"use client";
import Image from "next/image";
import { useEffect } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Globe,
  ChevronLeft,
  Facebook,
  Linkedin,
  Youtube,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  useEffect(() => {
    // Quand la page est complètement chargée
    const hash = window.location.hash;
    if (hash) {
      // Attendre un petit moment pour être sûr que le DOM est prêt
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100); // Délais de 100ms avant de scroll
    }
  }, []);

  return (
    <footer className="bg-[#063a1e] text-gray-300 py-5">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
           
            <div className="flex flex-col md:flex-row gap-10 items-center">
              <Image
                src="/images/logo_FEG_blanc.png"
                alt="Logo FEG"
                width={80}
                height={80}
                className="h-24 md:h-20 w-auto"
              />
              <div className="flex flex-col justify-center ">
              <h3 className="text-[#dcdaa4] font-bold text-lg mb-4">
              FEG
            </h3>
                <p className="text-sm w-full ">
                  Le Guide Numérique des PME est une initiative de la Fédération
                  des Entreprises du Gabon visant à faciliter l'accès à
                  l'information par rapport aux normes juridiques.
                </p>
                <ul className="space-y-2 mt-5 text-sm">
                  <li>
                    <Link
                      target="_blank"
                      href="https://www.lafeg.ga/home"
                      className="text-[#b0b08b] underline underline-offset-8 hover:text-white flex items-center"
                    >
                      <ChevronLeft /> A propos de nous
                    </Link>
                  </li>
                  <li>
                    <Link
                      target="_blank"
                      href="https://www.lafeg.ga/about-us/president"
                      className="text-[#b0b08b] underline underline-offset-8 hover:text-white flex items-center"
                    >
                      <ChevronLeft /> Mot du président
                    </Link>
                  </li>
                  <li>
                    <Link
                      target="_blank"
                      href="https://www.lafeg.ga/activities/news"
                      className="text-[#b0b08b] underline underline-offset-8 hover:text-white flex items-center"
                    >
                      <ChevronLeft /> Activité
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* <div>
           <h3 className="text-white font-bold text-lg mb-4">
             Liens rapides
           </h3>
           <ul className="space-y-2 text-sm">
             <li>
               <Link href="/" className="hover:text-white">
                 Accueil
               </Link>
             </li>
             <li>
               <Link href="/textes-juridiques" className="hover:text-white">
                 Textes juridiques
               </Link>
             </li>
             <li>
               <Link
                 href="/institutions-financieres"
                 className="hover:text-white"
               >
                 Institutions financières
               </Link>
             </li>
             <li>
               <Link
                 href="/structures-accompagnement"
                 className="hover:text-white"
               >
                 Structures d'accompagnement
               </Link>
             </li>
             <li>
               <Link href="/a-propos" className="hover:text-white">
                 À propos
               </Link>
             </li>
             <li>
               <Link href="/contact" className="hover:text-white">
                 Contact
               </Link>
             </li>
           </ul>
         </div> */}
          <div>
            <h3 className="text-[#dcdaa4] font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <a
                  target="_blank"
                  className="hover:underline"
                  href="https://maps.app.goo.gl/bq9pVUeLkzM8pCb59"
                >
                  Immeuble ODYSSÉE, Boulevard de l&apos;Indépendance, BP: 410,
                  Libreville GABON
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a className="hover:underline" href="tel:062054282">
                  (+241) 062 05 42 82
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <div className="flex flex-col">
                  <a className="hover:underline" href="mailto:info@lafeg.ga">
                    info@lafeg.ga
                  </a>
                  <a className="hover:underline" href="mailto:support@lafeg.ga">
                    support@lafeg.ga
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <Link
                  target="_blank"
                  className="hover:underline"
                  href="https://www.lafeg.ga/"
                >
                  www.lafeg.ga
                </Link>
              </li>
              <li className="hidden md:flex flex-col items-center">
                <p className="my-2 text-lg font-bold">Suivez-nous</p>
                <div className="flex justify-center space-x-5">
                  <Link
                    target="_blank"
                    href="https://www.facebook.com/feggabon?locale=fr_FR"
                  >
                    <Facebook className="hover:scale-125 duration-200 hover:text-[#dcdaa4] transition animate-in " />
                  </Link>
                  <Link
                    target="_blank"
                    href="https://www.linkedin.com/company/lafeg/"
                  >
                    {" "}
                    <Linkedin className="hover:scale-125 duration-200 hover:text-[#dcdaa4] transition animate-in " />
                  </Link>
                  {/* <Link target="_blank" href="https://x.com/la_feg">
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 15 31"
                      version="1.1"
                      height="30"
                      width="37"
                      className="hover:scale-125 hover:fill-[#dcdaa4] duration-200 transition animate-in "
                    >
                      <path
                        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </Link> */}
                  {/* <Link target="_blank" href="https://www.youtube.com/@lafeg">
                    <Youtube className="hover:scale-125 duration-200 hover:text-[#dcdaa4] transition animate-in " />
                  </Link> */}
                </div>
              </li>
            </ul>
          </div>
          <div>
            <h3
              id="lien"
              className="text-[#dcdaa4] font-bold text-lg mb-4"
            >
              Liens Utiles
            </h3>
            <ul className="gap-5 flex justify-between text-sm">
              <div className="flex flex-col gap-2">
                <li>
                  <Link
                    target="_blank"
                    href="https://www.gni-anpigabon.com/"
                    className="text-[#b0b08b] underline underline-offset-8 hover:text-white flex items-center"
                  >
                    <ChevronLeft /> ANPI
                  </Link>
                </li>
                <li>
                  <Link
                    target="_blank"
                    href="https://www.facebook.com/ccaimagabon/?locale=fr_FR"
                    className="text-[#b0b08b] underline underline-offset-8 hover:text-white flex items-center"
                  >
                    <ChevronLeft /> Chambre de Commerce
                  </Link>
                </li>
                <li>
                  <Link
                    target="_blank"
                    href="https://journal-officiel.ga/"
                    className="text-[#b0b08b] underline underline-offset-8 hover:text-white flex items-center"
                  >
                    <ChevronLeft /> Le journal officiel
                  </Link>
                </li>
                <li>
                  {/* <Link
                    target="_blank"
                    href="https://cnss.ga/"
                    className="text-[#b0b08b] underline underline-offset-8 hover:text-white flex items-center"
                  >
                    <ChevronLeft /> CNSS
                  </Link> */}
                </li>
              </div>
              <div className="flex flex-col gap-2">
                {/* <li>
                  <Link
                    target="_blank"
                    href="https://www.dgi.ga"
                    className="text-[#b0b08b] underline underline-offset-8 hover:text-white flex items-center"
                  >
                    <ChevronLeft /> DGI
                  </Link>
                </li> */}
                <li>
                  <Link
                    target="_blank"
                    href="https://www.industries.gouv.ga"
                    className="text-[#b0b08b] underline underline-offset-8 hover:text-white flex items-center"
                  >
                    <ChevronLeft /> Ministère de l'Industrie
                  </Link>
                </li>
                <li>
                  <Link
                    target="_blank"
                    href="https://www.pme.gouv.ga/"
                    className="text-[#b0b08b] underline underline-offset-8 hover:text-white flex items-center"
                  >
                    <ChevronLeft /> Ministère des PME
                  </Link>
                </li>
                {/* <li>
                  <Link
                    target="_blank"
                    href="http://www.oapi.int/index.php/fr/"
                    className="text-[#b0b08b] underline underline-offset-8 hover:text-white flex items-center"
                  >
                    <ChevronLeft /> OAPI
                  </Link>
                </li> */}
              </div>
            </ul>
            <li className="md:hidden flex flex-col items-center">
              <p className="my-2 text-lg font-bold">Suivez-nous</p>
              <div className="flex justify-center space-x-5">
                <Link
                  target="_blank"
                  href="https://www.facebook.com/feggabon?locale=fr_FR"
                >
                  <Facebook className="hover:scale-125 duration-200 hover:text-[#dcdaa4] transition animate-in " />
                </Link>
                <Link
                  target="_blank"
                  href="https://www.linkedin.com/company/lafeg/"
                >
                  {" "}
                  <Linkedin className="hover:scale-125 duration-200 hover:text-[#dcdaa4] transition animate-in " />
                </Link>
                <Link target="_blank" href="https://x.com/la_feg">
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 15 31"
                    version="1.1"
                    height="30"
                    width="37"
                    className="hover:scale-125 hover:fill-[#dcdaa4] duration-200 transition animate-in "
                  >
                    <path
                      d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </Link>
                {/* <Link target="_blank" href="https://www.youtube.com/@lafeg">
                  <Youtube className="hover:scale-125 duration-200 hover:text-[#dcdaa4] transition animate-in " />
                </Link> */}
              </div>
            </li>
          </div>
          {/* <div>
           <h3 className="text-white font-bold text-lg mb-4">Newsletter</h3>
           <p className="text-sm mb-4">
             Recevez nos dernières mises à jour juridiques et actualités
             directement dans votre boîte mail.
           </p>
          
           <Button
                      type="submit"
                      variant="secondary"
                      size="lg"
                      className="w-full bg-[#063a1e] relative hover:bg-white"
                    >
                      <span className="absolute inset-0 w-full h-full bg-[#dcdaa4] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0"></span>
                      <span className="relative mr-3 z-10 transition-colors duration-500 ease-in-out group-hover:text-[#063a1e]">
                        <p>S'abonner à la newsletter</p>
                      </span>
                    </Button>
         </div> */}
        </div>
        <div className="border-t border-white mt-6 pt-5 text-center text-sm">
          <p>© 2025 GUIDE NUMÉRIQUE DES PME. Tous droits réservés la FEG.</p>
        </div>
      </div>
    </footer>
  );
}
