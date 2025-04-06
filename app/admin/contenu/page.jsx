"use client"

import { useState } from "react"
import { Edit, Save, Trash2, Plus, FileText, Home, Info, Phone, Building, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

export default function ContenuSiteAdmin() {
  const [activeTab, setActiveTab] = useState("accueil")

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Contenu du site</h1>
        <Button className="bg-[#063a1e] hover:bg-[#063a1e]/90">
          <Save className="mr-2 h-4 w-4" /> Enregistrer les modifications
        </Button>
      </div>

      <Tabs defaultValue="accueil" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
          <TabsTrigger value="accueil" className="flex items-center gap-1">
            <Home className="h-4 w-4" /> Accueil
          </TabsTrigger>
          <TabsTrigger value="textes" className="flex items-center gap-1">
            <FileText className="h-4 w-4" /> Textes juridiques
          </TabsTrigger>
          <TabsTrigger value="institutions" className="flex items-center gap-1">
            <Building className="h-4 w-4" /> Institutions
          </TabsTrigger>
          <TabsTrigger value="structures" className="flex items-center gap-1">
            <Briefcase className="h-4 w-4" /> Structures
          </TabsTrigger>
          {/* <TabsTrigger value="categories" className="flex items-center gap-1">
            <FileText className="h-4 w-4" /> Catégories
          </TabsTrigger> */}
        </TabsList>

        {/* Page d'accueil */}
        <TabsContent value="accueil" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Section héro</CardTitle>
              <CardDescription>Modifiez le contenu de la section principale de la page d'accueil</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hero-title">Titre</Label>
                <Input id="hero-title" defaultValue="Tous les textes juridiques pour votre PME au Gabon" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hero-description">Description</Label>
                <Textarea
                  id="hero-description"
                  defaultValue="Accédez facilement à l'ensemble des textes juridiques, lois et règlements concernant les PME gabonaises."
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hero-button1">Texte du bouton principal</Label>
                  <Input id="hero-button1" defaultValue="Consulter les textes" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hero-button2">Texte du bouton secondaire</Label>
                  <Input id="hero-button2" defaultValue="En savoir plus" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="hero-image">Image (URL)</Label>
                <Input id="hero-image" defaultValue="/images/business-meeting.jpeg" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline" className="mr-2">
                <Edit className="mr-2 h-4 w-4" /> Modifier
              </Button>
              <Button className="bg-[#063a1e] hover:bg-[#063a1e]/90">
                <Save className="mr-2 h-4 w-4" /> Enregistrer
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actualités défilantes</CardTitle>
              <CardDescription>Gérez les actualités qui défilent en haut de la page d'accueil</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">Mise à jour des textes relatifs à la fiscalité des PME - Mai 2025</p>
                    <p className="text-sm text-muted-foreground">Ajouté le 10/05/2025</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">Nouveau décret sur les avantages fiscaux pour les startups gabonaises</p>
                    <p className="text-sm text-muted-foreground">Ajouté le 05/05/2025</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">Séminaire sur le droit OHADA le 15 juin 2025 à Libreville</p>
                    <p className="text-sm text-muted-foreground">Ajouté le 01/05/2025</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <Button className="mt-4 w-full" variant="outline">
                <Plus className="mr-2 h-4 w-4" /> Ajouter une actualité défilante
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Catégories principales</CardTitle>
              <CardDescription>Gérez les catégories affichées sur la page d'accueil</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">Création d'entreprise</p>
                    <p className="text-sm text-muted-foreground">
                      Textes relatifs à la création et l'immatriculation des PME
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">Fiscalité</p>
                    <p className="text-sm text-muted-foreground">Textes relatifs aux impôts et taxes pour les PME</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">Droit du travail</p>
                    <p className="text-sm text-muted-foreground">Textes relatifs aux relations employeur-employés</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between pb-4">
                  <div>
                    <p className="font-medium">Commerce</p>
                    <p className="text-sm text-muted-foreground">Textes relatifs aux activités commerciales</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <Button className="mt-4 w-full" variant="outline">
                <Plus className="mr-2 h-4 w-4" /> Ajouter une catégorie
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Textes juridiques */}
        <TabsContent value="textes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Page des textes juridiques</CardTitle>
              <CardDescription>Modifiez le contenu de la page des textes juridiques</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="textes-title">Titre de la page</Label>
                <Input id="textes-title" defaultValue="Textes Juridiques pour les PME Gabonaises" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="textes-description">Description</Label>
                <Textarea
                  id="textes-description"
                  defaultValue="Consultez l'ensemble des textes juridiques pertinents pour les PME gabonaises, classés par catégories et types."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="textes-filters">Filtres disponibles</Label>
                  <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" /> Ajouter un filtre
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 p-4 border rounded-md">
                  <Badge variant="outline">Création d'entreprise</Badge>
                  <Badge variant="outline">Fiscalité</Badge>
                  <Badge variant="outline">Droit du travail</Badge>
                  <Badge variant="outline">Commerce</Badge>
                  <Badge variant="outline">Propriété intellectuelle</Badge>
                  <Badge variant="outline">Loi</Badge>
                  <Badge variant="outline">Décret</Badge>
                  <Badge variant="outline">Arrêté</Badge>
                  <Badge variant="outline">Code</Badge>
                  <Badge variant="outline">Acte uniforme OHADA</Badge>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="bg-[#063a1e] hover:bg-[#063a1e]/90">
                <Save className="mr-2 h-4 w-4" /> Enregistrer
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Institutions financières */}
        <TabsContent value="institutions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Page des institutions financières</CardTitle>
              <CardDescription>Modifiez le contenu de la page des institutions financières</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="institutions-title">Titre de la page</Label>
                <Input id="institutions-title" defaultValue="Institutions Financières pour les PME Gabonaises" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="institutions-description">Description</Label>
                <Textarea
                  id="institutions-description"
                  defaultValue="Découvrez les banques, établissements de microfinance et fonds d'investissement qui peuvent financer votre entreprise au Gabon."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Catégories d'institutions</Label>
                  <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" /> Ajouter une catégorie
                  </Button>
                </div>
                <div className="space-y-2 p-4 border rounded-md">
                  <div className="flex items-center justify-between border-b pb-2">
                    <p className="font-medium">Banques</p>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2">
                    <p className="font-medium">Microfinance</p>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2">
                    <p className="font-medium">Fonds d'investissement</p>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pb-2">
                    <p className="font-medium">Institutions publiques</p>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="bg-[#063a1e] hover:bg-[#063a1e]/90">
                <Save className="mr-2 h-4 w-4" /> Enregistrer
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Structures d'accompagnement */}
        <TabsContent value="structures" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Page des structures d'accompagnement</CardTitle>
              <CardDescription>Modifiez le contenu de la page des structures d'accompagnement</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="structures-title">Titre de la page</Label>
                <Input id="structures-title" defaultValue="Structures d'Accompagnement des PME Gabonaises" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="structures-description">Description</Label>
                <Textarea
                  id="structures-description"
                  defaultValue="Découvrez les organismes qui peuvent vous aider à créer, développer et pérenniser votre entreprise au Gabon."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Types de structures</Label>
                  <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" /> Ajouter un type
                  </Button>
                </div>
                <div className="space-y-2 p-4 border rounded-md">
                  <div className="flex items-center justify-between border-b pb-2">
                    <p className="font-medium">Incubateurs</p>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2">
                    <p className="font-medium">Centres de formation</p>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2">
                    <p className="font-medium">Cabinets conseil</p>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pb-2">
                    <p className="font-medium">Structures publiques</p>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="bg-[#063a1e] hover:bg-[#063a1e]/90">
                <Save className="mr-2 h-4 w-4" /> Enregistrer
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Catégories
        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Catégories de textes juridiques</CardTitle>
              <CardDescription>Gérez les différentes catégories de textes juridiques</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Catégories principales</Label>
                  <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" /> Ajouter une catégorie
                  </Button>
                </div>
                <div className="space-y-2 p-4 border rounded-md">
                  <div className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">Textes juridiques des administrations publiques</p>
                      <p className="text-sm text-muted-foreground">
                        Textes émis par les administrations publiques gabonaises
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">Textes juridiques des PME</p>
                      <p className="text-sm text-muted-foreground">
                        Textes spécifiques aux petites et moyennes entreprises
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pb-2">
                    <div>
                      <p className="font-medium">Textes juridiques internationaux</p>
                      <p className="text-sm text-muted-foreground">Textes internationaux applicables au Gabon</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Sous-catégories</Label>
                  <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" /> Ajouter une sous-catégorie
                  </Button>
                </div>
                <div className="space-y-2 p-4 border rounded-md">
                  <div className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">Création d'entreprise</p>
                      <p className="text-sm text-muted-foreground">Parent: Textes juridiques des PME</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">Fiscalité</p>
                      <p className="text-sm text-muted-foreground">Parent: Textes juridiques des PME</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pb-2">
                    <div>
                      <p className="font-medium">OHADA</p>
                      <p className="text-sm text-muted-foreground">Parent: Textes juridiques internationaux</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="bg-[#063a1e] hover:bg-[#063a1e]/90">
                <Save className="mr-2 h-4 w-4" /> Enregistrer
              </Button>
            </CardFooter>
          </Card>
        </TabsContent> */}
      </Tabs>
    </div>
  )
}

