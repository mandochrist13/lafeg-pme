"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";

import Link from "next/link";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  
    const pathname = usePathname();
  
    const isActive = (path: string): boolean => pathname === path;

  return (
    <div className="flex lg:hidden">
      {/* Checkbox pour activer/désactiver le menu */}
      <input
        type="checkbox"
        id="hamburger"
        className="absolute -left-full"
        checked={isOpen}
        onChange={() => setIsOpen(!isOpen)}
      />

      {/* Label pour afficher l'icône hamburger */}
      <label
        htmlFor="hamburger"
        className="fixed top-4 right-4 z-20 flex items-center justify-center w-16 h-16 bg-[#bdbd95] rounded-full shadow-xl cursor-pointer"
        aria-label="Menu"
      >
        <span
          className={`block w-8 h-1 bg-[#063a1e] relative transition-all duration-300 ${
            isOpen ? " top-[-1px] rotate-45" : ""
          }`}
        >
          <span
            className={`absolute w-full h-full bg-[#063a1e] top-[-10px] transition-transform duration-300 ${
              isOpen ? "top-[-1px] hidden" : ""
            }`}
          ></span>
          <span
            className={`absolute w-full h-full bg-[#063a1e] top-[10px] transition-transform duration-300 ${
              isOpen ? "top-[-3px] rotate-90" : ""
            }`}
          ></span>
        </span>
      </label>

      {/* Menu de navigation */}
      <nav
        className={`fixed z-10 top-0 right-0  w-3/4 max-w-xs bg-[#063a1e] text-[#fff] font-semibold transform ${
          isOpen ? "translate-x-0 flex" : "translate-x-full hidden"
        } transition-transform duration-500`}
      >
       
        <ul className="mt-24 space-y-6 px-6 block md:hidden text-sm font-medium flex-col p-4  rounded-lg rtl:space-x-reverse">
              {[
                { name: "Accueil", path: "/" },
                { name: "Textes Juridiques", path: "/textes-juridiques" },
                { name: "Institutions Financières", path: "/institutions-financieres" },
                { name: "SEA", path: "/structures-accompagnement" },
                { name: "À propos", path: "/a-propos" },
                { name: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className={`pb-1 text-lg block   font-bold  ${
                isActive(link.path)
                  ? "text-white border-b border-white "
                  : "text-gray-400"
              }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
      </nav>
    </div>
  );
};

export default HamburgerMenu;
