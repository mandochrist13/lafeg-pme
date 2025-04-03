"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import {
  BarChart3,
  FileText,
  Users,
  Settings,
  Bell,
  LogOut,
  Menu,
  Home,
  FileEdit,
  MessageSquare,
  Newspaper,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function AdminLayout({ children }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const auth = sessionStorage.getItem("adminAuthenticated")
    setIsAuthenticated(auth === "true")

    // Si l'utilisateur n'est pas authentifié et n'est pas sur la page de connexion, rediriger
    if (auth !== "true" && pathname !== "/admin/login") {
      router.push("/admin/login")
    }
  }, [pathname, router])

  // Éviter le rendu côté serveur pour les vérifications d'authentification
  if (!isMounted) {
    return null
  }

  // Si l'utilisateur n'est pas authentifié et est sur la page de connexion, afficher seulement la page de connexion
  if (!isAuthenticated && pathname === "/admin/login") {
    return <>{children}</>
  }

  // Si l'utilisateur n'est pas authentifié, ne rien afficher (la redirection se fera dans useEffect)
  if (!isAuthenticated) {
    return null
  }

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuthenticated")
    router.push("/admin/login")
  }

  const navigation = [
    { name: "Tableau de bord", href: "/admin/dashboard", icon: BarChart3 },
    { name: "Textes juridiques", href: "/admin/textes", icon: FileText },
    { name: "Actualités", href: "/admin/actualites", icon: Newspaper },
    { name: "Messages", href: "/admin/messages", icon: MessageSquare },
    { name: "Utilisateurs", href: "/admin/utilisateurs", icon: Users },
    { name: "Contenu du site", href: "/admin/contenu", icon: FileEdit },
    { name: "Paramètres", href: "/admin/parametres", icon: Settings },
  ]

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar pour desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col flex-grow bg-[#063a1e] pt-5 overflow-y-auto">
          <div className="flex items-center justify-center px-4">
            <Image src="/images/logo-feg.png" alt="Logo FEG" width={50} height={50} className="h-12 w-auto" />
            <div className="ml-3">
              <h1 className="text-lg font-bold text-white">ADMIN</h1>
              <p className="text-xs text-white/70">Portail juridique PME</p>
            </div>
          </div>
          <div className="mt-8 flex-1 flex flex-col">
            <nav className="flex-1 px-4 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                      isActive ? "bg-[#063a1e]/80 text-white" : "text-white/70 hover:bg-[#063a1e]/50 hover:text-white"
                    }`}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
          <div className="p-4">
            <Button
              variant="outline"
              className="w-full justify-start text-white border-white/20 hover:bg-[#063a1e]/50 hover:text-white"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Déconnexion
            </Button>
          </div>
        </div>
      </div>

      {/* Sidebar mobile */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden absolute top-4 left-4 z-50">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 bg-[#063a1e] text-white w-64">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center">
                <Image src="/images/logo-feg.png" alt="Logo FEG" width={40} height={40} className="h-10 w-auto" />
                <div className="ml-3">
                  <h1 className="text-lg font-bold">ADMIN</h1>
                  <p className="text-xs text-white/70">Portail juridique PME</p>
                </div>
              </div>
            </div>
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                      isActive ? "bg-[#063a1e]/80 text-white" : "text-white/70 hover:bg-[#063a1e]/50 hover:text-white"
                    }`}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
            <div className="p-4 border-t border-white/10">
              <Button
                variant="outline"
                className="w-full justify-start text-white border-white/20 hover:bg-[#063a1e]/50 hover:text-white"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Déconnexion
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center md:hidden">
              {/* Espace pour le bouton de menu mobile */}
              <div className="w-10"></div>
            </div>
            <div className="flex-1 flex justify-between md:justify-end">
              <div className="flex items-center space-x-4">
                <Link href="/" className="text-gray-500 hover:text-gray-700 flex items-center">
                  <Home className="h-5 w-5 mr-1" />
                  <span className="text-sm">Voir le site</span>
                </Link>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                </Button>
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-[#063a1e] flex items-center justify-center text-white">A</div>
                  <span className="ml-2 text-sm font-medium hidden md:block">Admin</span>
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}

