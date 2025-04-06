"use client"

import {

    Phone,
    Mail,
    MapPin,
  } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Footer(){
 

 return(
   
     <footer className="bg-gray-900 text-gray-300 py-12">
     <div className="container">
       <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
         <div>
           <h3 className="text-white font-bold text-lg mb-4">À propos</h3>
           <p className="text-sm">
             Le Répertoire des Textes Juridiques pour les PME Gabonaises est
             une initiative de la Fédération des Entreprises du Gabon visant
             à faciliter l'accès à l'information juridique.
           </p>
         </div>
         <div>
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
         </div>
         <div>
           <h3 className="text-white font-bold text-lg mb-4">Contact</h3>
           <ul className="space-y-2 text-sm">
             <li className="flex items-center gap-2">
               <MapPin className="h-4 w-4" />
               <span>Libreville, Gabon</span>
             </li>
             <li className="flex items-center gap-2">
               <Phone className="h-4 w-4" />
               <span>+241 XX XX XX XX</span>
             </li>
             <li className="flex items-center gap-2">
               <Mail className="h-4 w-4" />
               <span>contact@pme-gabon.ga</span>
             </li>
           </ul>
         </div>
         <div>
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
         </div>
       </div>
       <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
         <p>
           © 2025 Répertoire des Textes Juridiques pour les PME Gabonaises.
           Tous droits réservés.
         </p>
       </div>
     </div>
   </footer>
 )
          
}