"use client"

import { useState } from "react"
import { Save, Upload, RefreshCw, Settings, User, Shield, Mail, Palette, Database } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ParametresAdmin() {
  const [activeTab, setActiveTab] = useState("general")

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Paramètres</h1>
        <Button className="bg-[#063a1e] hover:bg-[#063a1e]/90">
          <Save className="mr-2 h-4 w-4" /> Enregistrer les modifications
        </Button>
      </div>

      <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          <TabsTrigger value="general" className="flex items-center gap-1">
            <Settings className="h-4 w-4" /> Général
          </TabsTrigger>
          <TabsTrigger value="apparence" className="flex items-center gap-1">
            <Palette className="h-4 w-4" /> Apparence
          </TabsTrigger>
          <TabsTrigger value="utilisateurs" className="flex items-center gap-1">
            <User className="h-4 w-4" /> Utilisateurs
          </TabsTrigger>
          <TabsTrigger value="securite" className="flex items-center gap-1">
            <Shield className="h-4 w-4" /> Sécurité
          </TabsTrigger>
          <TabsTrigger value="emails" className="flex items-center gap-1">
            <Mail className="h-4 w-4" /> Emails
          </TabsTrigger>
          <TabsTrigger value="systeme" className="flex items-center gap-1">
            <Database className="h-4 w-4" /> Système
          </TabsTrigger>
        </TabsList>

        {/* Paramètres généraux */}
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informations du site</CardTitle>
              <CardDescription>Paramètres généraux du site</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="site-name">Nom du site</Label>
                <Input id="site-name" defaultValue="Répertoire des Textes Juridiques pour les PME Gabonaises" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-description">Description du site</Label>
                <Textarea
                  id="site-description"
                  defaultValue="Accédez facilement à l'ensemble des textes juridiques, lois et règlements concernant les PME gabonaises."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-url">URL du site</Label>
                <Input id="site-url" defaultValue="https://www.pme-gabon.ga" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-email">Email de l'administrateur</Label>
                <Input id="admin-email" defaultValue="admin@pme-gabon.ga" type="email" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="site-language">Langue du site</Label>
                  <p className="text-sm text-muted-foreground">Langue principale du site</p>
                </div>
                <Select defaultValue="fr">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sélectionner une langue" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="en">Anglais</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="timezone">Fuseau horaire</Label>
                  <p className="text-sm text-muted-foreground">Fuseau horaire du site</p>
                </div>
                <Select defaultValue="africa-libreville">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sélectionner un fuseau horaire" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="africa-libreville">Africa/Libreville</SelectItem>
                    <SelectItem value="utc">UTC</SelectItem>
                    <SelectItem value="europe-paris">Europe/Paris</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="bg-[#063a1e] hover:bg-[#063a1e]/90">
                <Save className="mr-2 h-4 w-4" /> Enregistrer
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Paramètres de contenu</CardTitle>
              <CardDescription>Options de gestion du contenu</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Modération des commentaires</Label>
                  <p className="text-sm text-muted-foreground">Activer la modération des commentaires</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notifications de nouveaux contenus</Label>
                  <p className="text-sm text-muted-foreground">Envoyer des notifications pour les nouveaux contenus</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Afficher les dates de publication</Label>
                  <p className="text-sm text-muted-foreground">
                    Afficher les dates de publication des textes juridiques
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Afficher les auteurs</Label>
                  <p className="text-sm text-muted-foreground">Afficher les auteurs des textes juridiques</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Apparence */}
        <TabsContent value="apparence" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Thème et couleurs</CardTitle>
              <CardDescription>Personnalisez l'apparence du site</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Couleur principale</Label>
                <div className="flex items-center gap-2">
                  <Input type="color" defaultValue="#063a1e" className="w-12 h-12 p-1" />
                  <Input defaultValue="#063a1e" className="w-32" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Couleur secondaire (gradient)</Label>
                <div className="flex items-center gap-2">
                  <div className="flex gap-2">
                    <Input type="color" defaultValue="#dcdaa4" className="w-12 h-12 p-1" />
                    <Input defaultValue="#dcdaa4" className="w-32" />
                  </div>
                  <span>à</span>
                  <div className="flex gap-2">
                    <Input type="color" defaultValue="#bdbd95" className="w-12 h-12 p-1" />
                    <Input defaultValue="#bdbd95" className="w-32" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Logo du site</Label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center">
                    <img src="/images/logo-feg.png" alt="Logo" className="max-w-full max-h-full" />
                  </div>
                  <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" /> Changer le logo
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Favicon</Label>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center">
                    <img src="/images/logo-feg.png" alt="Favicon" className="max-w-full max-h-full" />
                  </div>
                  <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" /> Changer le favicon
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Mode sombre</Label>
                  <p className="text-sm text-muted-foreground">Activer le mode sombre</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Police personnalisée</Label>
                  <p className="text-sm text-muted-foreground">Utiliser une police personnalisée</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="space-y-2">
                <Label>Police principale</Label>
                <Select defaultValue="inter">
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une police" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inter">Inter</SelectItem>
                    <SelectItem value="roboto">Roboto</SelectItem>
                    <SelectItem value="open-sans">Open Sans</SelectItem>
                    <SelectItem value="montserrat">Montserrat</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="bg-[#063a1e] hover:bg-[#063a1e]/90">
                <Save className="mr-2 h-4 w-4" /> Enregistrer
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Utilisateurs */}
        <TabsContent value="utilisateurs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres des utilisateurs</CardTitle>
              <CardDescription>Gérez les options liées aux utilisateurs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Inscription des utilisateurs</Label>
                  <p className="text-sm text-muted-foreground">Permettre aux visiteurs de créer un compte</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Validation des comptes par email</Label>
                  <p className="text-sm text-muted-foreground">Exiger une validation par email lors de l'inscription</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Connexion avec réseaux sociaux</Label>
                  <p className="text-sm text-muted-foreground">Permettre la connexion via les réseaux sociaux</p>
                </div>
                <Switch />
              </div>
              <div className="space-y-2">
                <Label>Rôle par défaut pour les nouveaux utilisateurs</Label>
                <Select defaultValue="abonne">
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un rôle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="abonne">Abonné</SelectItem>
                    <SelectItem value="contributeur">Contributeur</SelectItem>
                    <SelectItem value="editeur">Éditeur</SelectItem>
                    <SelectItem value="admin">Administrateur</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Durée de session (en minutes)</Label>
                <Input type="number" defaultValue="60" min="15" max="1440" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="bg-[#063a1e] hover:bg-[#063a1e]/90">
                <Save className="mr-2 h-4 w-4" /> Enregistrer
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Sécurité */}
        <TabsContent value="securite" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de sécurité</CardTitle>
              <CardDescription>Configurez les options de sécurité du site</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Authentification à deux facteurs (2FA)</Label>
                  <p className="text-sm text-muted-foreground">Activer l'authentification à deux facteurs</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Protection contre les attaques par force brute</Label>
                  <p className="text-sm text-muted-foreground">Limiter les tentatives de connexion</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="space-y-2">
                <Label>Nombre maximal de tentatives de connexion</Label>
                <Input type="number" defaultValue="5" min="1" max="10" />
              </div>
              <div className="space-y-2">
                <Label>Durée de verrouillage (en minutes)</Label>
                <Input type="number" defaultValue="30" min="5" max="1440" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>HTTPS obligatoire</Label>
                  <p className="text-sm text-muted-foreground">Forcer l'utilisation de HTTPS</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Protection CSRF</Label>
                  <p className="text-sm text-muted-foreground">Activer la protection contre les attaques CSRF</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Journalisation des connexions</Label>
                  <p className="text-sm text-muted-foreground">Enregistrer les tentatives de connexion</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="bg-[#063a1e] hover:bg-[#063a1e]/90">
                <Save className="mr-2 h-4 w-4" /> Enregistrer
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Emails */}
        <TabsContent value="emails" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres des emails</CardTitle>
              <CardDescription>Configurez les options d'envoi d'emails</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-from">Email expéditeur</Label>
                <Input id="email-from" defaultValue="noreply@pme-gabon.ga" type="email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-name">Nom de l'expéditeur</Label>
                <Input id="email-name" defaultValue="Répertoire des Textes Juridiques PME" />
              </div>
              <div className="space-y-2">
                <Label>Méthode d'envoi</Label>
                <Select defaultValue="smtp">
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une méthode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="smtp">SMTP</SelectItem>
                    <SelectItem value="sendmail">Sendmail</SelectItem>
                    <SelectItem value="mailgun">Mailgun</SelectItem>
                    <SelectItem value="ses">Amazon SES</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtp-host">Serveur SMTP</Label>
                <Input id="smtp-host" defaultValue="smtp.example.com" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtp-port">Port SMTP</Label>
                  <Input id="smtp-port" defaultValue="587" type="number" />
                </div>
                <div className="space-y-2">
                  <Label>Sécurité</Label>
                  <Select defaultValue="tls">
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Aucune</SelectItem>
                      <SelectItem value="ssl">SSL</SelectItem>
                      <SelectItem value="tls">TLS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtp-user">Nom d'utilisateur SMTP</Label>
                <Input id="smtp-user" defaultValue="user@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtp-password">Mot de passe SMTP</Label>
                <Input id="smtp-password" type="password" defaultValue="password" />
              </div>
              <Button variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" /> Tester la configuration
              </Button>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="bg-[#063a1e] hover:bg-[#063a1e]/90">
                <Save className="mr-2 h-4 w-4" /> Enregistrer
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Système */}
        <TabsContent value="systeme" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informations système</CardTitle>
              <CardDescription>Informations techniques sur le système</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium">Version de l'application</h3>
                  <p className="text-sm text-muted-foreground">1.0.0</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Version de Next.js</h3>
                  <p className="text-sm text-muted-foreground">15.0.0</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Version de Node.js</h3>
                  <p className="text-sm text-muted-foreground">20.10.0</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Base de données</h3>
                  <p className="text-sm text-muted-foreground">PostgreSQL 16.0</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Environnement</h3>
                  <p className="text-sm text-muted-foreground">Production</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Serveur</h3>
                  <p className="text-sm text-muted-foreground">Vercel</p>
                </div>
              </div>
              <div className="space-y-2 pt-4">
                <h3 className="text-sm font-medium">Maintenance</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Mode maintenance</Label>
                    <p className="text-sm text-muted-foreground">Activer le mode maintenance</p>
                  </div>
                  <Switch />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maintenance-message">Message de maintenance</Label>
                  <Textarea
                    id="maintenance-message"
                    defaultValue="Le site est actuellement en maintenance. Nous serons de retour très bientôt."
                    rows={3}
                  />
                </div>
              </div>
              <div className="space-y-2 pt-4">
                <h3 className="text-sm font-medium">Cache</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Activer le cache</Label>
                    <p className="text-sm text-muted-foreground">Activer le cache pour améliorer les performances</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Button variant="outline">
                  <RefreshCw className="mr-2 h-4 w-4" /> Vider le cache
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

