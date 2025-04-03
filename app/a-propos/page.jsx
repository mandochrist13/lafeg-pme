import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function APropos() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-[#063a1e]">
              Accueil
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span>À propos</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-3 text-[#063a1e]">À propos de notre plateforme</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Découvrez notre mission et comment nous aidons les PME gabonaises à naviguer dans l'environnement
              juridique et numérique.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-[#063a1e]">Notre mission</h2>
              <p className="mb-4 text-muted-foreground">
                Le Répertoire des Textes Juridiques pour les PME Gabonaises est une initiative de la Fédération des
                Entreprises du Gabon (FEG) visant à faciliter l'accès à l'information juridique pour les petites et
                moyennes entreprises.
              </p>
              <p className="mb-4 text-muted-foreground">
                Notre plateforme a été conçue pour répondre aux besoins spécifiques des entrepreneurs gabonais qui font
                face à des défis constants pour rester informés des évolutions législatives et réglementaires qui
                impactent leurs activités.
              </p>
              <p className="text-muted-foreground">
                Nous nous engageons à fournir un accès simplifié, centralisé et à jour aux textes juridiques, ainsi qu'à
                des ressources pratiques pour aider les PME à se conformer aux exigences légales et à prospérer dans
                l'économie gabonaise.
              </p>
            </div>
            <div className="flex justify-center">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Mission de la plateforme"
                width={400}
                height={400}
                className="rounded-lg shadow-md"
              />
            </div>
          </div>

          <div className="bg-[#063a1e]/5 p-8 rounded-lg mb-12">
            <h2 className="text-2xl font-bold mb-6 text-[#063a1e] text-center">
              Le Numérique des PME : Une Transformation Nécessaire
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-[#063a1e]">Qu'est-ce que le numérique des PME ?</h3>
                <p className="mb-4 text-muted-foreground">
                  Le "numérique des PME" désigne l'ensemble des technologies, outils et pratiques digitales que les
                  petites et moyennes entreprises peuvent adopter pour moderniser leurs activités, améliorer leur
                  efficacité et accroître leur compétitivité.
                </p>
                <p className="text-muted-foreground">
                  Cette transformation numérique touche tous les aspects de l'entreprise : gestion administrative,
                  relation client, marketing, production, ressources humaines, et bien sûr, la conformité juridique et
                  réglementaire.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-[#063a1e]">Pourquoi est-ce important ?</h3>
                <p className="mb-4 text-muted-foreground">
                  Dans un monde de plus en plus connecté, la digitalisation n'est plus une option mais une nécessité
                  pour les PME gabonaises. Elle permet de :
                </p>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>Accéder plus facilement aux informations juridiques et réglementaires</li>
                  <li>Simplifier les démarches administratives</li>
                  <li>Élargir sa clientèle et ses marchés</li>
                  <li>Optimiser ses processus internes</li>
                  <li>Réduire certains coûts opérationnels</li>
                  <li>S'adapter rapidement aux évolutions du marché</li>
                </ul>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-6 text-[#063a1e]">Nos services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-[#063a1e]">Accès aux textes juridiques</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Une base de données complète et à jour des lois, décrets, arrêtés et autres textes juridiques
                  pertinents pour les PME gabonaises, organisée par thématiques et facilement consultable.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-[#063a1e]">Ressources pratiques</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Des guides explicatifs, modèles de documents, fiches pratiques et autres outils pour aider les
                  entrepreneurs à comprendre et appliquer les textes juridiques dans leur activité quotidienne.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-[#063a1e]">Accompagnement</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Information sur les structures d'accompagnement, les institutions financières et les experts qui
                  peuvent aider les PME dans leurs démarches juridiques, administratives et de développement.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-gradient-to-r from-[#dcdaa4] to-[#bdbd95] p-8 rounded-lg mb-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold text-[#063a1e] mb-2">Rejoignez notre communauté</h2>
                <p className="text-[#063a1e]/80">
                  Inscrivez-vous à notre newsletter pour rester informé des dernières actualités juridiques et des
                  événements à venir pour les PME gabonaises.
                </p>
              </div>
              <Button className="bg-[#063a1e] hover:bg-[#063a1e]/90 whitespace-nowrap">S'inscrire maintenant</Button>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-6 text-[#063a1e]">Notre équipe</h2>
          <p className="mb-8 text-muted-foreground">
            Le Répertoire des Textes Juridiques pour les PME Gabonaises est porté par une équipe pluridisciplinaire
            composée de juristes, d'experts en développement des PME et de spécialistes du numérique, tous engagés pour
            la promotion de l'entrepreneuriat au Gabon.
          </p>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Pour toute question ou suggestion concernant notre plateforme, n'hésitez pas à nous contacter.
            </p>
            <Button className="bg-[#063a1e] hover:bg-[#063a1e]/90">Contactez-nous</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

