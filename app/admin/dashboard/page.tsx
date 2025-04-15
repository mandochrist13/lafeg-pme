import Link from "next/link"
import { FileText, Building, Briefcase } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"


type ProgressProps = {
  value: number
  className?: string
  indicatorClassName?: string
}

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Tableau de bord</h1>
      </div>

      {/* Statistiques */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Textes juridiques</CardTitle>
            <FileText className="h-8 w-8 text-[#063a1e]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">248</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Institutions financières</CardTitle>
            <Building className="h-8 w-8 text-[#063a1e]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Structures d'accompagnement</CardTitle>
            <Briefcase className="h-8 w-8 text-[#063a1e]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">36</div>
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
              <Progress value={40} className="h-2 bg-gray-200"  />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#dcdaa4]"></div>
                  <span className="text-sm">Textes des PME</span>
                </div>
                <span className="text-sm font-medium">112</span>
              </div>
              <Progress value={45} className="h-2 bg-gray-200"  />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#bdbd95]"></div>
                  <span className="text-sm">Textes internationaux</span>
                </div>
                <span className="text-sm font-medium">38</span>
              </div>
              <Progress value={15} className="h-2 bg-gray-200"  />
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
              <Progress value={33} className="h-2 bg-gray-200"  />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#dcdaa4]"></div>
                  <span className="text-sm">Microfinance</span>
                </div>
                <span className="text-sm font-medium">12</span>
              </div>
              <Progress value={29} className="h-2 bg-gray-200" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#bdbd95]"></div>
                  <span className="text-sm">Fonds d'investissement</span>
                </div>
                <span className="text-sm font-medium">8</span>
              </div>
              <Progress value={19} className="h-2 bg-gray-200"  />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                  <span className="text-sm">Institutions publiques</span>
                </div>
                <span className="text-sm font-medium">8</span>
              </div>
              <Progress value={19} className="h-2 bg-gray-200"  />
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
              <Progress value={25} className="h-2 bg-gray-200"  />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#dcdaa4]"></div>
                  <span className="text-sm">Centres de formation</span>
                </div>
                <span className="text-sm font-medium">12</span>
              </div>
              <Progress value={33} className="h-2 bg-gray-200"  />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#bdbd95]"></div>
                  <span className="text-sm">Cabinets conseil</span>
                </div>
                <span className="text-sm font-medium">10</span>
              </div>
              <Progress value={28} className="h-2 bg-gray-200" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                  <span className="text-sm">Structures publiques</span>
                </div>
                <span className="text-sm font-medium">5</span>
              </div>
              <Progress value={14} className="h-2 bg-gray-200"/>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/admin/contenu?tab=structures">Gérer les structures</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
