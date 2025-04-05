import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PiStudentFill } from "react-icons/pi";
import { ArrowRight, PieChart, Wallet, BellRing, Check } from "lucide-react";
import GrodtBlackLogo from "../../public/medias/black-grodt-logo.svg";
import GrodtWhiteLogo from "../../public/medias/white-grodt-logo.svg";
import BlackLogo from "../../public/medias/black-logo.svg";
import WhiteLogo from "../../public/medias/white-logo.svg";
import Grodt from "../../public/medias/grodt.svg";
import BgVideo from "../../public/medias/bg-video.mp4"
import TwoPhones from "../../public/medias/2phones.svg";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import LoginForm from "@/components/forms/login/LoginForm";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";


export default function Landing() {
  const { theme } = useTheme();
  const [isLoginDialogOpen, setLoginDialogOpen] = useState(false);
  const { user, setUser } = useAuth();

  const handleLogout = () => {
    setUser(null);
    toast.success("Vous êtes maintenant déconnecté");
  };
  return (
    <div className="min-h-screen">
      <section>
        <div className="relative">
          <video
            className="absolute w-full h-full object-cover opacity-70"
            src={BgVideo}
            autoPlay
            loop
            muted
          ></video>
          <div className="absolute inset-0 gradient-overlay"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between container mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="max-[500px]:block hidden">
                <Link to="/">
                  {theme === "dark" ? (
                    <img src={WhiteLogo} height={100} width={100} alt="Grodt logo" />
                  ) : (
                    <img src={BlackLogo} height={100} width={100} alt="Grodt logo" />
                  )}
                </Link>
              </div>
              <div className="hidden min-[500px]:block">
                <Link to="/">
                  {theme === "dark" ? (
                    <img src={GrodtWhiteLogo} height={240} width={240} alt="Grodt logo" />
                  ) : (
                    <img src={GrodtBlackLogo} height={240} width={240} alt="Grodt logo" />
                  )}
                </Link>
              </div>

              <div className="flex gap-4 items-center justify-end max-[450px]:justify-between w-full max-[450px]:px-4">
                {user ? (
                  <>
                    <span className="text-xl font-medium flex items-center text-white bg-gradient-to-r from-[#433BFF] via-transparent to-[#433BFF] p-1 rounded-lg shadow-md">
                      <PiStudentFill className="mr-2 text-2xl" />
                      Bonjour, {user.firstName}
                    </span>

                    <Button
                      variant="outline"
                      size="lg"
                      onClick={handleLogout}
                    >
                      Déconnexion
                    </Button>
                  </>
                ) : (
                  <>
                    <Dialog open={isLoginDialogOpen} onOpenChange={setLoginDialogOpen}>
                      <DialogTrigger asChild>
                        <Button
                          className="text-white bg-[#433BFF] hover:bg-[#3530CC] transition-all duration-200 font-medium inline-flex items-center gap-2 shadow-lg hover:shadow-[#433BFF]/25"
                          size="lg"
                          onClick={() => setLoginDialogOpen(true)}
                        >
                          Inscription
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-h-none h-fit overflow-visible">
                        <DialogHeader>
                          <DialogTitle>Connexion</DialogTitle>
                          <DialogDescription>Connecte-toi à ton compte ou inscris-toi</DialogDescription>
                        </DialogHeader>

                        <LoginForm
                          onSuccess={() => {
                            setLoginDialogOpen(false);
                            toast.success("Vous êtes maintenant connecté");
                          }}
                        />
                      </DialogContent>
                    </Dialog>

                    <Dialog open={isLoginDialogOpen} onOpenChange={setLoginDialogOpen}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="lg"
                          onClick={() => setLoginDialogOpen(true)}
                        >
                          Connexion
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-h-none h-fit overflow-visible">
                        <DialogHeader>
                          <DialogTitle>Connexion</DialogTitle>
                          <DialogDescription>Connecte-toi à ton compte ou inscris-toi</DialogDescription>
                        </DialogHeader>

                        <LoginForm
                          onSuccess={() => {
                            setLoginDialogOpen(false);
                            toast.success("Vous êtes maintenant connecté");
                          }}
                        />
                      </DialogContent>
                    </Dialog>
                  </>
                )}
              </div>
            </div>
            <div className="text-center space-y-8 py-12 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto max-[450px]:p-4">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter ">
                Gérez vos dépenses avec{" "}
                <span className="bg-gradient-to-r from-primary to-primary/65 bg-clip-text text-transparent">
                  simplicité
                </span>
              </h2>
              <p className="text-xl max-w-2xl font-medium mx-auto">
                Prenez le contrôle de vos finances personnelles. Suivez, analysez et optimisez vos dépenses efficacement.
              </p>
              <div className="flex gap-4 pb-12 justify-center">
                {!user && (
                  <Dialog open={isLoginDialogOpen} onOpenChange={setLoginDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        className="px-6 py-3 text-white bg-[#433BFF] hover:bg-[#3530CC] transition-all duration-200 font-medium inline-flex items-center gap-2 shadow-lg hover:shadow-[#433BFF]/25 group"
                        size="lg"
                        onClick={() => setLoginDialogOpen(true)}
                      >
                        Inscription
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-360" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-h-none h-fit overflow-visible">
                      <DialogHeader>
                        <DialogTitle>Connexion</DialogTitle>
                        <DialogDescription>Connecte-toi à ton compte ou inscris-toi</DialogDescription>
                      </DialogHeader>

                      <LoginForm
                        onSuccess={() => {
                          setLoginDialogOpen(false);
                          toast.success("Vous êtes maintenant connecté");
                        }}
                      />
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-center flex-col lg:flex-row w-full py-12  md:px-6 lg:px-8">
          <div className="flex items-center justify-center flex-col lg:flex-row w-full py-8  md:px-6 lg:px-8">
            <div className="text-center py-6 md:py-12 max-w-7xl mx-auto">
              <h2 className="text-4xl font-bold tracking-tighter pb-4 md:pb-8 neon-text">
                Suivez vos dépenses <br />
                mensuelles et bien plus encore
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Optimisez la gestion de votre budget en suivant vos dépenses mensuelles et en analysant vos transactions pour mieux comprendre vos habitudes financières.
              </p>
            </div>
            <div>
              <img src={Grodt} height={500} width={600} alt="Grodt logo" />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="bg-[#433bff] text-white p-6 text-center">
          <h2 className="text-2xl mb-4">
            Rejoignez notre communauté de plus de{' '}
            <span className="font-extrabold">10 M</span> d'utilisateurs
          </h2>
          <span className="text-yellow-400 text-xl mb-4">★★★★★</span>
          <h3 className="text-xl mb-2">59 000+ avis cinq étoiles</h3>
        </div>
      </section>

      <section className="pt-32 px-4 md:px-6 lg:px-8 container mx-auto">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 neon-text">
            Fonctionnalités Principales
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg hover:shadow-[#433BFF]/25  hover:-translate-y-2 transition-all duration-300 p-6">
              <CardHeader>
                <Wallet className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Suivi des Dépenses</CardTitle>
                <CardDescription>
                  Enregistrez et catégorisez facilement toutes vos dépenses quotidiennes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Interface intuitif pour saisir vos dépenses et les organiser selon vos besoins
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg hover:shadow-[#433BFF]/25  hover:-translate-y-2 transition-all duration-300 p-6">
              <CardHeader>
                <PieChart className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Analyses Détaillées</CardTitle>
                <CardDescription>
                  Visualisez vos habitudes de dépenses facilement.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Identifiez en un clin d'œil où va votre argent, fixez des objectifs financiers clairs et optimisez votre budget.
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg hover:shadow-[#433BFF]/25  hover:-translate-y-2 transition-all duration-300 p-6">
              <CardHeader>
                <BellRing className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Alertes Personnalisées</CardTitle>
                <CardDescription>
                  Recevez des notifications pour vos objectifs et limites de dépenses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Restez informé et gardez le contrôle de votre budget en temps réel
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section>
        <div className="flex flex-col items-center justify-center px-4 md:px-10">
          <div className="px-4 py-8 md:py-30 sm:py-8 xl:pb-0 md:pb-0 w-full text-center">
            <h2 className="text-4xl font-bold tracking-tighter pb-4 md:pb-8 neon-text">
              Gérez vos dépenses mensuelles tout <br /> en explorant d'autres aspects de votre budget
            </h2>
            <ul className="mt-4 space-y-2 text-lg">
              <li className="flex items-center justify-center">
                <Check className="mr-2 text-green-400" /> Identifiez vos habitudes pour une gestion budgétaire optimale.
              </li>
              <li className="flex items-center justify-center">
                <Check className="mr-2 text-green-400" /> Simplifiez le suivi de vos dépenses et revenus.
              </li>
              <li className="flex items-center justify-center">
                <Check className="mr-2 text-green-400" /> Recevez des rapports clairs et des analyses utiles.
              </li>
              <li className="flex items-center justify-center">
                <Check className="mr-2 text-green-400" /> Atteignez vos objectifs financiers avec des outils personnalisés.
              </li>
            </ul>
          </div>
          <div className="pt-10 text-center">
            {!user && (
              <Dialog open={isLoginDialogOpen} onOpenChange={setLoginDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    className="px-6 py-3 text-white bg-[#433BFF] hover:bg-[#3530CC] transition-all duration-200 font-medium inline-flex items-center gap-2 shadow-lg hover:shadow-[#433BFF]/25 group"
                    size="lg"
                    onClick={() => setLoginDialogOpen(true)}
                  >
                    Démarrer maintenant
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-360" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-none h-fit overflow-visible">
                  <DialogHeader>
                    <DialogTitle>Connexion</DialogTitle>
                    <DialogDescription>Connecte-toi à ton compte ou inscris-toi</DialogDescription>
                  </DialogHeader>

                  <LoginForm
                    onSuccess={() => {
                      setLoginDialogOpen(false);
                      toast.success("Vous êtes maintenant connecté");
                    }}
                  />
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
        <img
          src={TwoPhones}
          className="w-full"
          alt="Image Grodt"
        />
      </section>

      <footer className="relative overflow-hidden pt-20 px-4 md:px-6 lg:px-8 bg-gradient-to-r from-[#433BFF] to-[#131313]">
        <div className="max-w-7xl mx-auto text-center relative z-10 text-white">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 neon-text"> Plongez dans l'expérience GRODT </h2>
          <p className="text-xl mb-8 text-white"> Découvrez une nouvelle manière de gérer vos finances grâce à une interface moderne et des animations
            captivantes qui rendent chaque interaction unique. </p>
          <p className="pt-15">&copy; 2025 GRODT. Tous droits réservés</p>
        </div>
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 20 }).map((_, index) =>
          (<div key={index} className="absolute falling-dollar text-white opacity-20 font-bold"
            style={{
              fontSize: `${Math.random() * 2.5 + 0.5}rem`,
              top: `-${Math.random() * 100}px`,
              left: `${Math.random() * 100}%`,
            }} > $
          </div>))}
        </div>
      </footer>
    </div>
  );
}