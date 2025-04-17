"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import textesJuridiques from "@/components/data/text/text"; 

export default function NewText() {
  return (
    <section className="py-12 bg-[#EAEEEB]">
      <div className="container">
        <h2 className="text-2xl font-bold mb-8">Mises à jour récentes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {textesJuridiques.slice(0, 4).map((text) => ( // Afficher les 4 premiers objets
            <Card key={text.id} className="hover:shadow-md transition-shadow"> {/* Assurez-vous que 'id' est une propriété unique */}
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Badge className="bg-gradient-to-r from-[#dcdaa4] to-[#bdbd95] text-[#063a1e] font-medium">
                    Nouveau
                  </Badge>
                  <span className="text-sm text-muted-foreground">{text.date}</span> {/* Utilisez la date de l'objet */}
                </div>
                <CardTitle className="mt-2">{text.titre}</CardTitle> {/* Utilisez le titre de l'objet */}
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{text.description}</p> {/* Utilisez la description de l'objet */}
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full gap-1">
                  Lire le texte complet <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/textes-juridiques">
            <Button
              size="lg"
              className="hover:text-[#063a1e] duration-300 ease-in-out hover:bg-white border hover:border-[#063a1e] font-medium"
            >
              Voir plus de mise à jour
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
