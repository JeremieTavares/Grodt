"use client"

import { useState, useRef, useEffect } from "react"
import { User, UserPlus, AtSign, KeyRound, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginForm() {
  const [activeTab, setActiveTab] = useState("login")
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("")
  const [registerName, setRegisterName] = useState("")
  const [sliderPosition, setSliderPosition] = useState(0)
  const [contentHeight, setContentHeight] = useState("auto")

  const loginContentRef = useRef<HTMLDivElement>(null)
  const registerContentRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Update slider position based on active tab
  useEffect(() => {
    setSliderPosition(activeTab === "login" ? 0 : 1)

    // Update content height with animation
    const targetRef = activeTab === "login" ? loginContentRef : registerContentRef
    if (targetRef.current) {
      setContentHeight(`${targetRef.current.scrollHeight}px`)
    }
  }, [activeTab])

  // Initial height setup
  useEffect(() => {
    if (loginContentRef.current) {
      setContentHeight(`${loginContentRef.current.scrollHeight}px`)
    }
  }, [])

  const handleLogin = async () => {
    // TODO: Appel API ici
    console.log("Login avec", loginEmail, loginPassword)
    // TODO: stocker l'ID utilisateur dans Zustand ici
  }

  const handleRegister = async () => {
    // TODO: Appel API ici
    console.log("Register avec", registerName, registerEmail, registerPassword)
    // TODO: stocker l'ID utilisateur dans Zustand ici
  }

  return (
    <div className="p-6 w-full">
      <h2 className="text-xl font-semibold mb-1">{activeTab === "login" ? "Connexion" : "Inscription"}</h2>
      <p className="text-sm mb-4 text-muted-foreground">
        {activeTab === "login"
          ? "Connecte-toi à ton compte ou inscris-toi"
          : "Créez un nouveau compte pour accéder à nos services."}
      </p>

      {/* Custom tabs with sliding background */}
      <div className="relative mb-6 rounded-md overflow-hidden">
        <div className="grid grid-cols-2 relative z-10">
          <button
            onClick={() => setActiveTab("login")}
            className={`flex items-center justify-center gap-2 py-2 transition-colors duration-300 ${activeTab === "login" ? "text-primary-foreground" : ""}`}
          >
            <User className="h-4 w-4" />
            <span>Connexion</span>
          </button>
          <button
            onClick={() => setActiveTab("register")}
            className={`flex items-center justify-center gap-2 py-2 transition-colors duration-300 ${activeTab === "register" ? "text-primary-foreground" : ""}`}
          >
            <UserPlus className="h-4 w-4" />
            <span>Inscription</span>
          </button>
        </div>

        {/* Sliding background */}
        <div
          className="absolute top-0 left-0 bottom-0 w-1/2 bg-primary rounded-md transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(${sliderPosition * 100}%)` }}
        />
      </div>

      {/* Content container with dynamic height */}
      <div
        ref={containerRef}
        className="overflow-hidden transition-all duration-300 ease-in-out relative"
        style={{ height: contentHeight }}
      >
        {/* Login content */}
        <div
          ref={loginContentRef}
          className={`space-y-4 transition-all duration-300 ease-in-out absolute w-full left-0 right-0 ${activeTab === "login" ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"}`}
          style={{ visibility: activeTab === "login" ? "visible" : "hidden" }}
        >
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <AtSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
              <Input
                id="email"
                type="email"
                placeholder="nom@exemple.com"
                className="pl-10 w-full"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Mot de passe</Label>
              <a href="#" className="text-xs hover:underline">
                Mot de passe oublié?
              </a>
            </div>
            <div className="relative">
              <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="pl-10 w-full"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
          </div>

          <Button className="w-full" onClick={handleLogin}>
            Se connecter
          </Button>

          <p className="text-center text-sm text-muted-foreground mt-4">
            Pas encore de compte?{" "}
            <button onClick={() => setActiveTab("register")} className="hover:underline" type="button">
              Créer un compte
            </button>
          </p>
        </div>

        {/* Register content */}
        <div
          ref={registerContentRef}
          className={`space-y-4 transition-all duration-300 ease-in-out absolute w-full left-0 right-0 ${activeTab === "register" ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"}`}
          style={{ visibility: activeTab === "register" ? "visible" : "hidden" }}
        >
          <div className="space-y-2">
            <Label htmlFor="name">Nom complet</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
              <Input
                id="name"
                placeholder="Jean Dupont"
                className="pl-10 w-full"
                value={registerName}
                onChange={(e) => setRegisterName(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="register-email">Email</Label>
            <div className="relative">
              <AtSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
              <Input
                id="register-email"
                type="email"
                placeholder="nom@exemple.com"
                className="pl-10 w-full"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="register-password">Mot de passe</Label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
              <Input
                id="register-password"
                type="password"
                placeholder="••••••••"
                className="pl-10 w-full"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="register-confirm-password">Confirmer le mot de passe</Label>
            <div className="relative">
              <Check className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
              <Input
                id="register-confirm-password"
                type="password"
                placeholder="••••••••"
                className="pl-10 w-full"
                value={registerConfirmPassword}
                onChange={(e) => setRegisterConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <Button className="w-full" onClick={handleRegister}>
            S'inscrire
          </Button>

          <p className="text-center text-sm text-muted-foreground mt-4">
            Déjà un compte?{" "}
            <button onClick={() => setActiveTab("login")} className="hover:underline" type="button">
              Se connecter
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

