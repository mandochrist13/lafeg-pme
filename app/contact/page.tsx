import Link from "next/link"
import Image from "next/image"
import { ChevronRight, MapPin, Phone, Mail, Clock, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Contact() {
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
            <span>Contact</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-3 text-[#063a1e]">Contactez-nous</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Notre équipe est à votre disposition pour répondre à vos questions concernant les textes juridiques et
              leur application pour votre PME.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader className="pb-3 text-center">
                <div className="mx-auto bg-[#063a1e]/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-[#063a1e]" />
                </div>
                <CardTitle className="text-[#063a1e]">Adresse</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Boulevard du Bord de Mer
                  <br />
                  Immeuble FEG, 3ème étage
                  <br />
                  Libreville, Gabon
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3 text-center">
                <div className="mx-auto bg-[#063a1e]/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-[#063a1e]" />
                </div>
                <CardTitle className="text-[#063a1e]">Téléphone</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  +241 XX XX XX XX
                  <br />
                  +241 XX XX XX XX
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3 text-center">
                <div className="mx-auto bg-[#063a1e]/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-[#063a1e]" />
                </div>
                <CardTitle className="text-[#063a1e]">Email</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  contact@pme-gabon.ga
                  <br />
                  info@pme-gabon.ga
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#063a1e]">Envoyez-nous un message</CardTitle>
                  <CardDescription>Remplissez le formulaire ci-dessous pour nous contacter</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="firstname" className="text-sm font-medium">
                          Prénom
                        </label>
                        <Input id="firstname" placeholder="Votre prénom" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="lastname" className="text-sm font-medium">
                          Nom
                        </label>
                        <Input id="lastname" placeholder="Votre nom" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input id="email" type="email" placeholder="votre.email@exemple.com" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Sujet
                      </label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un sujet" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="info">Demande d'information</SelectItem>
                          <SelectItem value="support">Support technique</SelectItem>
                          <SelectItem value="legal">Question juridique</SelectItem>
                          <SelectItem value="other">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <Textarea id="message" placeholder="Votre message" rows={5} />
                    </div>
                    <Button type="submit" className="w-full gap-2 bg-[#063a1e] hover:bg-[#063a1e]/90">
                      <Send className="h-4 w-4" />
                      Envoyer le message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#063a1e]">Horaires d'ouverture</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">Lundi - Vendredi</p>
                        <p className="text-sm text-muted-foreground">8h00 - 16h00</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">Samedi</p>
                        <p className="text-sm text-muted-foreground">9h00 - 12h00</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">Dimanche</p>
                        <p className="text-sm text-muted-foreground">Fermé</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-[#063a1e]">Localisation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-muted rounded-md overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=300&width=500"
                      alt="Carte de localisation"
                      width={500}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    Nous sommes situés au centre-ville de Libreville, à proximité du Ministère des PME et de
                    l'Artisanat.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-[#063a1e]">Assistance téléphonique</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Pour une assistance immédiate, contactez notre service d'assistance téléphonique.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full gap-2 border-[#063a1e] text-[#063a1e] hover:bg-[#063a1e]/10"
                  >
                    <Phone className="h-4 w-4" />
                    +241 XX XX XX XX
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

