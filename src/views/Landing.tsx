import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, PieChart, Wallet, BellRing } from "lucide-react";
import GrodtBlackLogo from "../../public/images/black-grodt-logo.svg";
import MobileApp from "../../public/images/mobile-app.svg";

export default function Landing() {
  return (

    <div className="min-h-screen">
      <section>
        <div>
          <div className="flex items-center justify-between container mx-auto">
            <img src={GrodtBlackLogo} height={210} width={210} alt="Grodt logo" />
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="px-4 py-2 text-white bg-[#433BFF] hover:bg-[#3530CC] transition-all duration-200 font-medium inline-flex items-center gap-2 shadow-lg hover:shadow-[#433BFF]/25">
                Inscription
              </Button>
              <Button variant="outline" size="lg">
                Connexion
              </Button>
            </div>

          </div>
          <div className="text-center space-y-8 pt-35 pb-38 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
              Gérez vos dépenses avec{" "}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                simplicité
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Prenez le contrôle de vos finances personnelles. Suivez, analysez et optimisez vos dépenses efficacement.
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                size="lg"
                className="px-4 py-2 text-white bg-[#433BFF] hover:bg-[#3530CC] transition-all duration-200 font-medium inline-flex items-center gap-2 shadow-lg hover:shadow-[#433BFF]/25 group">
                Inscription
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-360" />
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center flex-col lg:flex-row bg-muted/50 w-full">
            <div className="text-center py-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
              <h2 className="text-4xl font-bold tracking-tighter pb-0 lg:pb-0 md:pb-4">Suivez vos dépenses <br />mensuelles et bien plus encore.</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto pb-0 lg:pb-0 md:pb-4">Optimisez la gestion de votre budget en suivant vos dépenses mensuelles et en analysant vos transactions pour mieux comprendre vos habitudes financières.</p>
            </div>
            <img src={MobileApp} height={500} width={600} alt="Grodt logo" />
          </div>
        </div>
      </section>

      <section className="py-20 px-4 md:px-6 lg:px-8 container mx-auto">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Fonctionnalités Principales</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow duration-300 p-6">
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

            <Card className="hover:shadow-lg transition-shadow duration-300 p-6">
              <CardHeader>
                <PieChart className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Analyses Détaillées</CardTitle>
                <CardDescription>Visualisez vos habitudes de dépenses facilement.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Graphiques et statistiques pour mieux comprendre où va votre argent
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300 p-6">
              <CardHeader>
                <BellRing className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Alertes Personnalisées</CardTitle>
                <CardDescription>Recevez des notifications pour vos objectifs et limites de dépenses</CardDescription>
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
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">
            Plongez dans l'expérience GRODT
          </h2>
          <p className="text-xl mb-8 text-white">
            Découvrez une nouvelle manière de gérer vos finances grâce à une interface moderne et des animations captivantes qui rendent chaque interaction unique.
          </p>
          <Button variant="outline" size="lg">En savoir plus</Button>
        </div>

        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 20 }).map((_, index) => (
            <div
              key={index}
              className="absolute falling-dollar text-white opacity-20 font-bold"
              style={{
                fontSize: `${Math.random() * 1.5 + 0.5}rem`, 
                top: `-${Math.random() * 100}px`,
                left: `${Math.random() * 100}%`,
              }}
            >
              $
            </div>
          ))}
        </div>
      </section>

      
    </div>
  );
};