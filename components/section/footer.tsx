"use client";

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

// import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-[#dcdaa4] font-bold text-lg mb-4">FEG</h3>
            <p className="text-sm">
              Le Guide Numérique des PME est une initiative de la Fédération des
              Entreprises du Gabon visant à faciliter l'accès à l'information
              par rapport aux normes juridiques.
            </p>
            <ul className="space-y-2 mt-5 text-sm">
              <li>
                <Link
                  href="/#"
                  className="text-[#b0b08b] underline underline-offset-8 hover:text-white flex items-center"
                >
                  <ChevronLeft /> A propos de nous
                </Link>
              </li>
              <li>
                <Link
                  href="/#"
                  className="text-[#b0b08b] underline underline-offset-8 hover:text-white flex items-center"
                >
                  <ChevronLeft /> Mot du président
                </Link>
              </li>
              <li>
                <Link
                  href="/#"
                  className="text-[#b0b08b] underline underline-offset-8 hover:text-white flex items-center"
                >
                  <ChevronLeft /> Gouvernance
                </Link>
              </li>
            </ul>
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
                <Link className="hover:underline" href="https://www.lafeg.ga/">
                  www.lafeg.ga
                </Link>
              </li>
              <li className="flex flex-col items-center">
                <p className="my-2 text-lg font-bold">Suivez-nous</p>
                <div className="flex justify-center space-x-5">
                  <Link href="https://www.facebook.com/feggabon?locale=fr_FR">
                    <Facebook className="hover:scale-125 duration-200 hover:text-[#dcdaa4] transition animate-in " />
                  </Link>
                  <Link href="https://www.linkedin.com/company/lafeg/">
                    {" "}
                    <Linkedin className="hover:scale-125 duration-200 hover:text-[#dcdaa4] transition animate-in " />
                  </Link>
                  <Link href="https://x.com/la_feg">
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
                  <Link href="https://www.youtube.com/@lafeg">
                    <Youtube className="hover:scale-125 duration-200 hover:text-[#dcdaa4] transition animate-in " />
                  </Link>
                </div>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-[#dcdaa4] font-bold text-center text-lg mb-4">
              Liens Utiles
            </h3>
            <ul className="gap-2 grid grid-cols-1 lg:grid-cols-2 text-sm">
              <li>
                <Link
                  href="https://www.gni-anpigabon.com/"
                  className="text-[#b0b08b] underline underline-offset-8 hover:text-white flex items-center"
                >
                  <ChevronLeft /> ANPI
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.facebook.com/ccaimagabon/?locale=fr_FR"
                  className="text-[#b0b08b] underline underline-offset-8 hover:text-white flex items-center"
                >
                  <ChevronLeft /> Chambre de Commerce
                </Link>
              </li>

              <li>
                <Link
                  href="https://www.cnamgs.ga/"
                  className="text-[#b0b08b] underline underline-offset-8 hover:text-white flex items-center"
                >
                  <ChevronLeft /> CNAMGS
                </Link>
              </li>
              <li>
                <Link
                  href="https://cnss.ga/"
                  className="text-[#b0b08b] underline underline-offset-8 hover:text-white flex items-center"
                >
                  <ChevronLeft /> CNSS
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.dgi.ga"
                  className="text-[#b0b08b] underline underline-offset-8 hover:text-white flex items-center"
                >
                  <ChevronLeft /> DGI
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.industries.gouv.ga"
                  className="text-[#b0b08b] underline underline-offset-8 hover:text-white flex items-center"
                >
                  <ChevronLeft /> Ministère de l'Industrie
                </Link>
              </li>

              <li>
                <Link
                  href="https://www.pme.gouv.ga/"
                  className="text-[#b0b08b] underline underline-offset-8 hover:text-white flex items-center"
                >
                  <ChevronLeft /> Ministère des PME
                </Link>
              </li>
              <li>
                <Link
                  href="/#"
                  className="text-[#b0b08b] underline underline-offset-8 hover:text-white flex items-center"
                >
                  <ChevronLeft /> OAPI
                </Link>
              </li>
            </ul>
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
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>© 2025 GUIDE NUMÉRIQUE DES PME. Tous droits réservés la FEG.</p>
        </div>
      </div>
    </footer>
  );
}
