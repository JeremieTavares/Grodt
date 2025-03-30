import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, PieChart, Wallet, BellRing } from "lucide-react";
import GrodtBlackLogo from "../../public/images/black-grodt-logo.svg";
import GrodtWhiteLogo from "../../public/images/white-grodt-logo.svg";
import Grodt from "../../public/images/grodt.svg";
import BgVideo from "../../public/images/bg-video.mp4"

export default function Landing() {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen">
      <section>
        <div className="relative">
          {/* Background video */}
          <video
            className="absolute w-full h-full object-cover opacity-70"
            src={BgVideo}
            autoPlay
            loop
            muted
          ></video>

          <div className="absolute inset-0 w-full h-full gradient-overlay"></div>

          {/* Overlay content */}
          <div className="relative z-10">
            <div className="flex items-center justify-between container mx-auto px-4 sm:px-6 lg:px-8 py-6">
              {/* Render logo based on theme */}
              {theme === "dark" ? (
                <img
                  src={GrodtWhiteLogo}
                  height={210}
                  width={210}
                  alt="Grodt logo"
                />
              ) : (
                <img
                  src={GrodtBlackLogo}
                  height={210}
                  width={210}
                  alt="Grodt logo"
                />
              )}
              <div className="flex gap-4 justify-center">
                <Button
                  size="lg"
                  className="px-6 py-3 text-white bg-[#433BFF] hover:bg-[#3530CC] transition-all duration-200 font-medium inline-flex items-center gap-2 shadow-lg hover:shadow-[#433BFF]/25"
                >
                  Inscription
                </Button>
                <Button variant="outline" size="lg">
                  Connexion
                </Button>
              </div>
            </div>
            <div className="text-center space-y-8 py-12 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter ">
                Gérez vos dépenses avec{" "}
                <span className="bg-gradient-to-r from-primary to-primary/65 bg-clip-text text-transparent">
                  simplicité
                </span>
              </h2>
              <p className="text-xl max-w-2xl font-medium mx-auto">
                Prenez le contrôle de vos finances personnelles. Suivez, analysez et optimisez vos dépenses efficacement.
              </p>
              <div className="flex gap-4 justify-center">
                <Button
                  size="lg"
                  className="px-6 py-3 text-white bg-[#433BFF] hover:bg-[#3530CC] transition-all duration-200 font-medium inline-flex items-center gap-2 shadow-lg hover:shadow-[#433BFF]/25 group"
                >
                 Inscription
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-360" />
                </Button>
             
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center flex-col lg:flex-row bg-muted/50 w-full py-12  md:px-6 lg:px-8">
          <div className="text-center py-6 md:py-12 max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold tracking-tighter pb-4 md:pb-8">
              Suivez vos dépenses <br />
              mensuelles et bien plus encore.
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Optimisez la gestion de votre budget en suivant vos dépenses mensuelles et en analysant vos transactions pour mieux comprendre vos habitudes financières.
            </p>
          </div>
          <div>
            <img src={Grodt} height={500} width={600} alt="Grodt logo" />
          </div>
        </div>
      </section>

      <section className="py-20 px-4 md:px-6 lg:px-8 container mx-auto">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Fonctionnalités Principales
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg hover:shadow-[#433BFF]/25 transition-shadow duration-300 p-6">
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

            <Card className="hover:shadow-lg hover:shadow-[#433BFF]/25 transition-shadow duration-300 p-6">
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

            <Card className="hover:shadow-lg hover:shadow-[#433BFF]/25 transition-shadow duration-300 p-6">
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
      <section className="relative overflow-hidden py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-r from-[#433BFF] to-[#222222]">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-white"> Plongez dans l'expérience GRODT </h2>
          <p className="text-xl mb-8 text-white"> Découvrez une nouvelle manière de gérer vos finances grâce à une interface moderne et des animations
            captivantes qui rendent chaque interaction unique. </p>
          <Button variant="outline" size="lg">En savoir plus</Button>
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
      </section>

      <footer className="bg-gradient-to-r from-[#433BFF] to-[#222222] text-white py-4 text-center font-light">
    <p>&copy; 2025 GRODT Finances. Tous droits réservés</p>
    </footer> 
    </div>
  );
}
