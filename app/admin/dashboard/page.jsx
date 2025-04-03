import Link from "next/link"
import { FileText, Users, ArrowUpRight, Eye, MessageSquare, Clock, Newspaper, Building, Briefcase } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Tableau de bord</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Dernière mise à jour:</span>
          <span className="text-sm font-medium">Aujourd'hui, 15:30</span>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Textes juridiques</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">248</div>
            <p className="text-xs text-muted-foreground">+12 depuis le mois dernier</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Institutions financières</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <div className="flex items-center pt-1">
              <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-xs text-green-500">+3.5%</span>
              <span className="text-xs text-muted-foreground ml-1">depuis le mois dernier</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Structures d'accompagnement</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">36</div>
            <div className="flex items-center pt-1">
              <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-xs text-green-500">+2.1%</span>
              <span className="text-xs text-muted-foreground ml-1">depuis le mois dernier</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilisateurs</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <div className="flex items-center pt-1">
              <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-xs text-green-500">+8.2%</span>
              <span className="text-xs text-muted-foreground ml-1">depuis la semaine dernière</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Statistiques par catégorie */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Textes par catégorie</CardTitle>
            <CardDescription>Répartition des textes juridiques par catégorie</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#063a1e]"></div>
                  <span className="text-sm">Textes des administrations publiques</span>
                </div>
                <span className="text-sm font-medium">98</span>
              </div>
              <Progress value={40} className="h-2 bg-gray-200" indicatorClassName="bg-[#063a1e]" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#dcdaa4]"></div>
                  <span className="text-sm">Textes des PME</span>
                </div>
                <span className="text-sm font-medium">112</span>
              </div>
              <Progress value={45} className="h-2 bg-gray-200" indicatorClassName="bg-[#dcdaa4]" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#bdbd95]"></div>
                  <span className="text-sm">Textes internationaux</span>
                </div>
                <span className="text-sm font-medium">38</span>
              </div>
              <Progress value={15} className="h-2 bg-gray-200" indicatorClassName="bg-[#bdbd95]" />
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/admin/textes">Voir tous les textes</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Institutions financières</CardTitle>
            <CardDescription>Répartition par type d'institution</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#063a1e]"></div>
                  <span className="text-sm">Banques</span>
                </div>
                <span className="text-sm font-medium">14</span>
              </div>
              <Progress value={33} className="h-2 bg-gray-200" indicatorClassName="bg-[#063a1e]" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#dcdaa4]"></div>
                  <span className="text-sm">Microfinance</span>
                </div>
                <span className="text-sm font-medium">12</span>
              </div>
              <Progress value={29} className="h-2 bg-gray-200" indicatorClassName="bg-[#dcdaa4]" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#bdbd95]"></div>
                  <span className="text-sm">Fonds d'investissement</span>
                </div>
                <span className="text-sm font-medium">8</span>
              </div>
              <Progress value={19} className="h-2 bg-gray-200" indicatorClassName="bg-[#bdbd95]" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                  <span className="text-sm">Institutions publiques</span>
                </div>
                <span className="text-sm font-medium">8</span>
              </div>
              <Progress value={19} className="h-2 bg-gray-200" indicatorClassName="bg-gray-400" />
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/admin/contenu?tab=institutions">Gérer les institutions</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Structures d'accompagnement</CardTitle>
            <CardDescription>Répartition par type de structure</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#063a1e]"></div>
                  <span className="text-sm">Incubateurs</span>
                </div>
                <span className="text-sm font-medium">9</span>
              </div>
              <Progress value={25} className="h-2 bg-gray-200" indicatorClassName="bg-[#063a1e]" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#dcdaa4]"></div>
                  <span className="text-sm">Centres de formation</span>
                </div>
                <span className="text-sm font-medium">12</span>
              </div>
              <Progress value={33} className="h-2 bg-gray-200" indicatorClassName="bg-[#dcdaa4]" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#bdbd95]"></div>
                  <span className="text-sm">Cabinets conseil</span>
                </div>
                <span className="text-sm font-medium">10</span>
              </div>
              <Progress value={28} className="h-2 bg-gray-200" indicatorClassName="bg-[#bdbd95]" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                  <span className="text-sm">Structures publiques</span>
                </div>
                <span className="text-sm font-medium">5</span>
              </div>
              <Progress value={14} className="h-2 bg-gray-200" indicatorClassName="bg-gray-400" />
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/admin/contenu?tab=structures">Gérer les structures</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Activité récente */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Activité récente</CardTitle>
            <CardDescription>Les dernières actions effectuées sur la plateforme</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  action: "Nouveau texte juridique ajouté",
                  description: "Décret n°2025-123 relatif à la fiscalité des PME",
                  time: "Il y a 2 heures",
                  user: "Admin",
                },
                {
                  action: "Texte juridique modifié",
                  description: "Loi n°2024-45 sur les avantages fiscaux pour les startups",
                  time: "Il y a 5 heures",
                  user: "Modérateur",
                },
                {
                  action: "Nouvelle actualité publiée",
                  description: "Séminaire sur le droit OHADA le 15 juin 2025",
                  time: "Hier, 14:30",
                  user: "Admin",
                },
                {
                  action: "Nouvelle institution financière ajoutée",
                  description: "Fonds Gabonais d'Investissements Stratégiques (FGIS)",
                  time: "Hier, 11:45",
                  user: "Admin",
                },
                {
                  action: "Nouvelle structure d'accompagnement ajoutée",
                  description: "Gabon Incubateur",
                  time: "Avant-hier, 16:20",
                  user: "Modérateur",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="bg-[#063a1e]/10 rounded-full p-2">
                    <Clock className="h-4 w-4 text-[#063a1e]" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{item.action}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                    <div className="flex items-center pt-1">
                      <span className="text-xs text-muted-foreground">{item.time}</span>
                      <span className="text-xs text-muted-foreground mx-1">•</span>
                      <span className="text-xs font-medium">{item.user}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Voir toutes les activités
            </Button>
          </CardFooter>
        </Card>

        {/* Messages récents */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Messages récents</CardTitle>
            <CardDescription>Les derniers messages reçus via le formulaire de contact</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  name: "Marie Diop",
                  email: "marie.diop@example.com",
                  subject: "Question sur la fiscalité",
                  message:
                    "Bonjour, je souhaiterais obtenir plus d'informations sur les avantages fiscaux pour les PME dans le secteur agricole...",
                  time: "Il y a 3 heures",
                  status: "Non lu",
                },
                {
                  name: "Pierre Ndong",
                  email: "pierre.ndong@example.com",
                  subject: "Demande de rendez-vous",
                  message:
                    "Je souhaiterais prendre rendez-vous avec un expert pour discuter des textes juridiques relatifs à l'exportation de produits...",
                  time: "Hier, 16:45",
                  status: "Lu",
                },
                {
                  name: "Sophie Mbarga",
                  email: "sophie.mbarga@example.com",
                  subject: "Problème d'accès aux documents",
                  message:
                    "Bonjour, je n'arrive pas à télécharger certains documents sur votre plateforme. Pouvez-vous m'aider ?",
                  time: "Il y a 2 jours",
                  status: "Répondu",
                },
              ].map((item, index) => (
                <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-sm font-medium">{item.name}</p>
                    <Badge
                      variant={item.status === "Non lu" ? "default" : item.status === "Lu" ? "outline" : "secondary"}
                    >
                      {item.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{item.email}</p>
                  <p className="text-sm font-medium mb-1">{item.subject}</p>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-1">{item.message}</p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Voir tous les messages
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Derniers contenus */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Derniers contenus ajoutés</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge className="bg-[#063a1e]">Texte juridique</Badge>
                <span className="text-xs text-muted-foreground">Ajouté le 15/05/2025</span>
              </div>
              <CardTitle className="mt-2 text-lg">Décret n°2025-123 relatif à la fiscalité des PME</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-3">
                Ce décret établit de nouvelles mesures fiscales pour soutenir les petites et moyennes entreprises
                gabonaises, notamment dans les secteurs prioritaires de l'économie nationale.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                Modifier
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge className="bg-[#063a1e]">Institution financière</Badge>
                <span className="text-xs text-muted-foreground">Ajouté le 14/05/2025</span>
              </div>
              <CardTitle className="mt-2 text-lg">Banque Gabonaise de Développement (BGD)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-3">
                La Banque Gabonaise de Développement (BGD) est une institution financière publique qui accompagne le
                développement des PME/PMI gabonaises à travers des financements adaptés.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                Modifier
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge className="bg-[#063a1e]">Structure d'accompagnement</Badge>
                <span className="text-xs text-muted-foreground">Ajouté le 12/05/2025</span>
              </div>
              <CardTitle className="mt-2 text-lg">Gabon Incubateur</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-3">
                Gabon Incubateur est une structure d'accompagnement qui aide les entrepreneurs à transformer leurs idées
                en entreprises viables, avec un accent sur l'innovation et la technologie.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                Modifier
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Actions rapides */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Actions rapides</h2>
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-[#063a1e]/10 flex items-center justify-center mb-3">
                <FileText className="h-6 w-6 text-[#063a1e]" />
              </div>
              <h3 className="text-sm font-medium mb-1">Ajouter un texte</h3>
              <p className="text-xs text-muted-foreground">Publier un nouveau texte juridique</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-[#063a1e]/10 flex items-center justify-center mb-3">
                <Building className="h-6 w-6 text-[#063a1e]" />
              </div>
              <h3 className="text-sm font-medium mb-1">Ajouter une institution</h3>
              <p className="text-xs text-muted-foreground">Ajouter une institution financière</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-[#063a1e]/10 flex items-center justify-center mb-3">
                <Briefcase className="h-6 w-6 text-[#063a1e]" />
              </div>
              <h3 className="text-sm font-medium mb-1">Ajouter une structure</h3>
              <p className="text-xs text-muted-foreground">Ajouter une structure d'accompagnement</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-[#063a1e]/10 flex items-center justify-center mb-3">
                <Newspaper className="h-6 w-6 text-[#063a1e]" />
              </div>
              <h3 className="text-sm font-medium mb-1">Ajouter une actualité</h3>
              <p className="text-xs text-muted-foreground">Publier une nouvelle actualité</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-[#063a1e]/10 flex items-center justify-center mb-3">
                <MessageSquare className="h-6 w-6 text-[#063a1e]" />
              </div>
              <h3 className="text-sm font-medium mb-1">Messages</h3>
              <p className="text-xs text-muted-foreground">Gérer les messages reçus</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-[#063a1e]/10 flex items-center justify-center mb-3">
                <Eye className="h-6 w-6 text-[#063a1e]" />
              </div>
              <h3 className="text-sm font-medium mb-1">Voir le site</h3>
              <p className="text-xs text-muted-foreground">Visiter le site public</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

