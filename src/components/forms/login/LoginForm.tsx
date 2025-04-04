import { useState, useRef, useEffect } from "react"
import { User, UserPlus, AtSign, KeyRound, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { useApi } from "@/hooks/useApi";
import { CreateUserDto } from "@/types/user/user"
import { useAuth } from "@/hooks/useAuth"
import { create } from "domain"
import { REGEX_PASSWORD,REGEX_EMAIL,REGEX_NAME } from "@/utils/regex"

export default function LoginForm({ onSuccess }: { onSuccess?: () => void }) {
  const [activeTab, setActiveTab] = useState("login")
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("")
  const [registerFirstName, setRegisterFirstName] = useState("")
  const [registerLastName, setRegisterLastName] = useState("")
  const [sliderPosition, setSliderPosition] = useState(0)
  const [contentHeight, setContentHeight] = useState("auto")
  const {setUser} = useAuth()

  const loginContentRef = useRef<HTMLDivElement>(null)
  const registerContentRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const api = useApi();

  // Update slider position based on active tab
  useEffect(() => {
    setSliderPosition(activeTab === "login" ? 0 : 1)

    // Update content height with animation
    const targetRef = activeTab === "login" ? loginContentRef : registerContentRef
    if (targetRef.current) {
      updateContentHeight()
    }
  }, [activeTab])

  const updateContentHeight = () => {
    requestAnimationFrame(() => {
      const targetRef = activeTab === "login" ? loginContentRef : registerContentRef
      if (targetRef.current) {
        setContentHeight(`${targetRef.current.scrollHeight}px`)
      }
    })
  }

  // Initial height setup
  useEffect(() => {
    if (loginContentRef.current) {
      setContentHeight(`${loginContentRef.current.scrollHeight}px`)
    }
  }, [])

  const isValidEmail = (email: string) => REGEX_EMAIL.test(email)

  const isValidPassword = (password: string) => REGEX_PASSWORD.test(password)

  const isValidName = (name: string) => REGEX_NAME.test(name)

  const [loginErrors, setLoginErrors] = useState<{ email?: string; password?: string }>({})
  const [registerErrors, setRegisterErrors] = useState<{
    firstName?: string
    lastName?: string
    email?: string
    password?: string
    confirmPassword?: string
  }>({})

  const handleLogin = async () => {
    const errors: typeof loginErrors = {}

    if (!isValidEmail(loginEmail)) {
      errors.email = "Invalid email format"
    }

    if (!isValidPassword(loginPassword)) {
      errors.password = "Password must be at least 8 characters, with upper, lower, number, and special char"
    }

    setLoginErrors(errors)
    updateContentHeight()

    if (Object.keys(errors).length > 0) return

    console.log("Login avec", loginEmail, loginPassword)

    try {
      const response = await api.users.getByEmail(loginEmail)
  
      if (!response.data) {
        alert("Aucun utilisateur trouvé!")
        return
      }
  
      const user = response.data
  
      if (user.password !== loginPassword) {
        alert("Mot de passe incorrect!")
        return
      }
  
      // Convert to LoggedInUser shape
      const loggedInUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        birthDate: user.birthDate,
        phone: user.phone,
        addresses: user.addresses,
      }
  
      setUser(loggedInUser)
      onSuccess?.()
  
    } catch (err: any) {
      console.error(err.message)
      alert("Impossible de se connecter: " + err.message)
    }
  }

  const handleRegister = async () => {
    const errors: typeof registerErrors = {}

    if (!registerFirstName.trim() || !isValidName(registerFirstName)) {
      errors.firstName = "Prénom invalide"
    }
    if (!registerLastName.trim() || !isValidName(registerLastName)) {
      errors.lastName = "Nom de famille invalide"
    }

    if (!isValidEmail(registerEmail)) {
      errors.email = "L'email doit être au format : exemple@domaine.com"
    }
    

    if (!isValidPassword(registerPassword)) {
      errors.password =
        "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial (@$!%*?&)"
    }
    

    if (registerPassword !== registerConfirmPassword) {
      errors.confirmPassword = "Les mots de passe ne correspondent pas."
    }


    setRegisterErrors(errors)
    updateContentHeight()

    if (Object.keys(errors).length > 0) return

    const newUser: CreateUserDto = {
      isActive : true,
      firstName : registerFirstName,
      lastName : registerLastName,
      password : registerPassword,
      email : registerEmail
    }
    try{
      const response = await api.users.create(newUser)
      const user = response.data
      setUser(user)
      onSuccess?.()


    }catch(e:any){
      console.error(e.message)
      alert(e.message)
    }



  }

  return (
    <div className="p-6 w-full h-fit">
      <style scoped>{`
        @keyframes pulse-error-border {
          0% {
            border-color: rgba(239, 68, 68, 0.8); /* red-500 with opacity */
            box-shadow: 0 0 0 1px rgba(239, 68, 68, 0.2);
          }
          50% {
            border-color: rgba(239, 68, 68, 1); /* full opacity red-500 */
            box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.4);
          }
          100% {
            border-color: rgba(239, 68, 68, 0.8); /* red-500 with opacity */
            box-shadow: 0 0 0 1px rgba(239, 68, 68, 0.2);
          }
        }
        
        @keyframes pulse-error-text {
          0% {
            opacity: 0.7;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.7;
          }
        }
        
        .animate-pulse-error-border {
          animation: pulse-error-border 2s ease-in-out infinite;
        }
        
        .animate-pulse-error-text {
          animation: pulse-error-text 2s ease-in-out infinite;
        }
      `}</style>

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
                className={cn("pl-10 w-full", loginErrors.email && "border-destructive animate-pulse-error-border")}
                value={loginEmail}
                onChange={(e) => {
                  setLoginEmail(e.target.value)
                  if (loginErrors.email) {
                    setLoginErrors({ ...loginErrors, email: undefined })
                  }
                }}
              />
              {loginErrors.email && (
                <p className=" text-destructive mt-1 animate-pulse-error-text">{loginErrors.email}</p>
              )}
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
                className={cn("pl-10 w-full", loginErrors.password && "border-destructive animate-pulse-error-border")}
                value={loginPassword}
                onChange={(e) => {
                  setLoginPassword(e.target.value)
                  if (loginErrors.password) {
                    setLoginErrors({ ...loginErrors, password: undefined })
                  }
                }}
              />
              {loginErrors.password && (
                <p className=" text-destructive mt-1 animate-pulse-error-text">{loginErrors.password}</p>
              )}
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
          <div className=" flex flex-row gap-3">
            <div className="space-y-2">
              <Label htmlFor="firstName">Prénom</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                <Input
                  id="firstName"
                  placeholder="Jean"
                  className={cn("pl-10 w-full", registerErrors.firstName && "border-destructive animate-pulse-error-border")}
                  value={registerFirstName}
                  onChange={(e) => {
                    setRegisterFirstName(e.target.value)
                    if (registerErrors.firstName) {
                      setRegisterErrors({ ...registerErrors, firstName: undefined })
                    }
                  }}
                />
                {registerErrors.firstName && (
                  <p className="text-destructive mt-1 animate-pulse-error-text">{registerErrors.firstName}</p>
                )}
              </div>

            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Nom de famille</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                <Input
                  id="lastName"
                  placeholder="Dupont"
                  className={cn("pl-10 w-full", registerErrors.lastName && "border-destructive animate-pulse-error-border")}
                  value={registerLastName}
                  onChange={(e) => {
                    setRegisterLastName(e.target.value)
                    if (registerErrors.lastName) {
                      setRegisterErrors({ ...registerErrors, lastName: undefined })
                    }
                  }}
                />
                {registerErrors.lastName && (
                  <p className="text-destructive mt-1 animate-pulse-error-text">{registerErrors.lastName}</p>
                )}
              </div>

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
                className={cn("pl-10 w-full", registerErrors.email && "border-destructive animate-pulse-error-border")}
                value={registerEmail}
                onChange={(e) => {
                  setRegisterEmail(e.target.value)
                  if (registerErrors.email) {
                    setRegisterErrors({ ...registerErrors, email: undefined })
                  }
                }}
              />
              {registerErrors.email && (
                <p className="text-destructive mt-1 animate-pulse-error-text">{registerErrors.email}</p>
              )}
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
                className={cn(
                  "pl-10 w-full",
                  registerErrors.password && "border-destructive animate-pulse-error-border",
                )}
                value={registerPassword}
                onChange={(e) => {
                  setRegisterPassword(e.target.value)
                  if (registerErrors.password) {
                    setRegisterErrors({ ...registerErrors, password: undefined })
                  }
                }}
              />
              {registerErrors.password && (
                <p className="text-destructive mt-1 animate-pulse-error-text">{registerErrors.password}</p>
              )}
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
                className={cn(
                  "pl-10 w-full",
                  registerErrors.confirmPassword && "border-destructive animate-pulse-error-border",
                )}
                value={registerConfirmPassword}
                onChange={(e) => {
                  setRegisterConfirmPassword(e.target.value)
                  if (registerErrors.confirmPassword) {
                    setRegisterErrors({ ...registerErrors, confirmPassword: undefined })
                  }
                }}
              />
              {registerErrors.confirmPassword && (
                <p className="text-destructive mt-1 animate-pulse-error-text">
                  {registerErrors.confirmPassword}
                </p>
              )}
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

