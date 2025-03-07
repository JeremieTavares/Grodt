import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {toast, Toaster} from "sonner";
import {
  LuUser,
  LuMail,
  LuPhone,
  LuLock,
  LuSave,
  LuX,
  LuPencil,
  LuCircleUser,
  LuCalendar,
  LuMapPin,
} from "react-icons/lu";
import {Address, UserProfile} from "@/types/interfaces";

// Constante pour les provinces
const PROVINCES = [
  {value: "QC", label: "Québec (QC)"},
  {value: "ON", label: "Ontario (ON)"},
  {value: "NL", label: "Terre-Neuve-et-Labrador (NL)"},
  {value: "NS", label: "Nouvelle-Écosse (NS)"},
  {value: "PE", label: "Île-du-Prince-Édouard (PE)"},
  {value: "NB", label: "Nouveau-Brunswick (NB)"},
  {value: "MB", label: "Manitoba (MB)"},
  {value: "SK", label: "Saskatchewan (SK)"},
  {value: "AB", label: "Alberta (AB)"},
  {value: "BC", label: "Colombie-Britannique (BC)"},
  {value: "YT", label: "Yukon (YT)"},
  {value: "NT", label: "Territoires du Nord-Ouest (NT)"},
  {value: "NU", label: "Nunavut (NU)"},
] as const;

// Composant réutilisable pour le sélecteur de province
interface ProvinceSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
}

const ProvinceSelect = ({value, onValueChange, disabled}: ProvinceSelectProps) => (
  <Select value={value} onValueChange={onValueChange} disabled={disabled}>
    <SelectTrigger className="w-full bg-white border-slate-200 disabled:opacity-70 disabled:cursor-not-allowed font-medium rounded-lg focus:ring-[#433BFF] focus:border-[#433BFF] transition-shadow group-hover:shadow-md">
      <SelectValue placeholder="Province" />
    </SelectTrigger>
    <SelectContent>
      {PROVINCES.map((province) => (
        <SelectItem key={province.value} value={province.value}>
          {province.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

export default function Profile() {
  // États pour gérer les données et l'état d'édition du profil
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [, setError] = useState<string | null>(null);
  const {userId} = useParams();

  // Fonction pour supprimer l'adresse de travail
  const deleteWorkAddress = async () => {
    try {
      const response = await fetch(`https://money-pie-2.fly.dev/api/v1/users/${userId}/addresses/WORK`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de l'adresse");
      }

      const newAddresses = addresses.filter((a) => a.type === "PERSONAL");
      setAddresses(newAddresses);

      toast.success("Adresse de travail supprimée avec succès!", {
        style: {
          backgroundColor: "white",
          border: "1px solid #e2e8f0",
          borderRadius: "0.5rem",
        },
      });
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      toast.error("Erreur lors de la suppression de l'adresse", {
        style: {
          backgroundColor: "white",
          border: "1px solid #e2e8f0",
          borderRadius: "0.5rem",
        },
      });
    }
  };

  // Effet pour charger les données du profil et des adresses au chargement
  useEffect(() => {
    // Fonction pour récupérer les données du profil depuis l'API
    const fetchProfile = async () => {
      try {
        const response = await fetch(`https://money-pie-2.fly.dev/api/v1/users/${userId}`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(`HTTP erreur status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Données reçues du serveur:", data);
        setProfile(data);
      } catch (err) {
        console.error("Erreur:", err);
        setError(err instanceof Error ? err.message : "Une erreur est survenue");
      }
    };

    // Fonction pour récupérer les adresses depuis l'API
    const fetchAddresses = async () => {
      try {
        const response = await fetch(`https://money-pie-2.fly.dev/api/v1/users/${userId}/addresses`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(`HTTP erreur status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Adresses reçues:", data);
        setAddresses(data);
      } catch (err) {
        console.error("Erreur lors de la récupération des adresses:", err);
      }
    };

    if (userId) {
      fetchProfile();
      fetchAddresses();
    }
  }, [userId]);

  // Gestion de changement pour les champs du profil
  const handleChange = (field: keyof UserProfile) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (profile) {
      setProfile({
        ...profile,
        [field]: e.target.value,
      });
    }
  };

  // Fonction pour sauvegarder les modifications du profil et de l'adresse
  const handleSave = async () => {
    if (profile && userId) {
      try {
        // Formatage et envoi des données du profil
        const formattedProfile = {
          ...profile,
          birthDate: profile.birthDate ? new Date(profile.birthDate).toISOString() : null,
        };

        console.log("Données du profil envoyées:", JSON.stringify(formattedProfile, null, 2));

        const profileResponse = await fetch(`https://money-pie-2.fly.dev/api/v1/users/${userId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formattedProfile),
        });

        if (!profileResponse.ok) {
          throw new Error("Erreur lors de la sauvegarde du profil");
        }

        // Sauvegarde des adresses
        for (const address of addresses) {
          const addressResponse = await fetch(`https://money-pie-2.fly.dev/api/v1/users/${userId}/addresses`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              ...address,
              id: address.id || 0, // Assurez-vous d'avoir toujours un ID, même si c'est 0
            }),
          });

          if (!addressResponse.ok) {
            throw new Error(`Erreur lors de la sauvegarde de l'adresse ${address.type}`);
          }
        }

        // Désactivation du mode édition et affichage du message de succès
        setIsEditing(false);
        toast.success("Profil mis à jour avec succès!", {
          style: {
            backgroundColor: "white",
            border: "1px solid #e2e8f0",
            borderRadius: "0.5rem",
          },
        });
      } catch (error) {
        console.error("Erreur complète:", error);
        toast.error("Erreur lors de la sauvegarde", {
          style: {
            backgroundColor: "white",
            border: "1px solid #e2e8f0",
            borderRadius: "0.5rem",
          },
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      {/* Configuration du système de notifications toast */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {background: "white"},
          classNames: {
            toast:
              "group toast group-[.toaster]:bg-white group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
            success: "group-[.toaster]:border-l-4 group-[.toaster]:border-l-[#433BFF]",
            error: "group-[.toaster]:border-l-4 group-[.toaster]:border-l-red-500",
          },
        }}
      />
      {/* Conteneur de la carte principale avec largeur maximale */}
      <div className="mx-auto max-w-3xl">
        <Card className="shadow-lg">
          {/* En-tête de la carte avec titre et boutons d'action */}
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 pb-7 border-b">
            {/* Titre avec icône */}
            <div className="flex items-center gap-3">
              <LuCircleUser className="w-8 h-8 text-[#433BFF]" />
              <CardTitle className="text-2xl font-bold text-slate-800 tracking-tight">Détail du profil</CardTitle>
            </div>
            {/* Boutons d'action (édition/sauvegarde) */}
            <div className="flex gap-2 w-full sm:w-auto">
              {isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex-1 sm:flex-none px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium inline-flex items-center gap-2"
                  >
                    <LuX className="w-4 h-4" />
                    Annuler
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex-1 sm:flex-none px-4 py-2 text-white rounded-lg bg-[#433BFF] hover:bg-[#3530CC] transition-colors font-medium inline-flex items-center gap-2"
                  >
                    <LuSave className="w-4 h-4" />
                    Sauvegarder
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full sm:w-auto px-4 py-2 text-white rounded-lg bg-[#433BFF] hover:bg-[#3530CC] transition-colors font-medium inline-flex items-center gap-2"
                >
                  <LuPencil className="w-4 h-4" />
                  Mettre à jour
                </button>
              )}
            </div>
          </CardHeader>

          {/* Section de la carte de profil avec photo */}
          <CardContent className="pt-6">
            <Card className="border-none overflow-hidden bg-gradient-to-br from-white to-slate-50 shadow-[0_2px_8px_0px_rgba(67,59,255,0.08)] hover:shadow-[0_4px_12px_0px_rgba(67,59,255,0.12)] transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center gap-6">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#433BFF] to-[#7A75FF] rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="h-24 w-24 rounded-full bg-gradient-to-br from-[#433BFF] to-[#7A75FF] flex items-center justify-center relative shadow-[0_2px_8px_0px_rgba(67,59,255,0.25)] group-hover:shadow-[0_4px_12px_0px_rgba(67,59,255,0.35)] transition-all duration-300">
                      <LuUser className="h-12 w-12 text-white" />
                    </div>
                  </div>
                  {/* Informations principales (nom et contacts) */}
                  <div className="flex-1 space-y-3">
                    <div className="space-y-1">
                      <h3 className="text-2xl font-bold text-slate-900">
                        {profile?.firstName} {profile?.lastName}
                      </h3>
                      <div className="h-px w-24 bg-gradient-to-r from-[#433BFF] to-transparent"></div>
                    </div>
                    {/* Badges d'information (email et téléphone) */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 text-sm text-slate-600 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-slate-100 shadow-sm hover:shadow transition-shadow duration-200">
                        <LuMail className="h-4 w-4 text-[#433BFF]" />
                        <span className="font-medium">{profile?.email}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-slate-600 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-slate-100 shadow-sm hover:shadow transition-shadow duration-200">
                        <LuPhone className="h-4 w-4 text-[#433BFF]" />
                        <span className="font-medium">{profile?.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CardContent>

          {/* Section des informations détaillées */}
          <CardContent className="pt-6">
            <Card className="border-none overflow-hidden bg-gradient-to-br from-white to-slate-50 shadow-[0_2px_8px_0px_rgba(67,59,255,0.08)] hover:shadow-[0_4px_12px_0px_rgba(67,59,255,0.12)] transition-all duration-300">
              <CardHeader className="border-b bg-white/50 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <CardTitle className="text-xl font-bold text-slate-900 tracking-tight">
                    Renseignements personnels
                  </CardTitle>
                </div>
              </CardHeader>
              {/* Formulaire des informations personnelles */}
              <CardContent className="pt-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-2 group">
                    <label className="text-sm font-semibold text-slate-700 block tracking-tight flex items-center gap-2">
                      <span>Nom</span>
                      <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent"></div>
                    </label>
                    <div className="relative">
                      <div className="absolute left-0 top-0 w-10 h-full bg-gradient-to-r from-[#433BFF]/5 to-transparent rounded-l-lg flex items-center justify-center">
                        <LuUser className="w-4 h-4 text-[#433BFF]" />
                      </div>
                      <Input
                        type="text"
                        value={profile?.lastName || ""}
                        onChange={handleChange("lastName")}
                        disabled={!isEditing}
                        className="w-full bg-white border-slate-200 disabled:opacity-70 disabled:cursor-not-allowed font-medium pl-10 rounded-lg focus:ring-[#433BFF] focus:border-[#433BFF] transition-shadow group-hover:shadow-md"
                      />
                    </div>
                  </div>
                  <div className="space-y-2 group">
                    <label className="text-sm font-semibold text-slate-700 block tracking-tight flex items-center gap-2">
                      <span>Prénom</span>
                      <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent"></div>
                    </label>
                    <div className="relative">
                      <div className="absolute left-0 top-0 w-10 h-full bg-gradient-to-r from-[#433BFF]/5 to-transparent rounded-l-lg flex items-center justify-center">
                        <LuUser className="w-4 h-4 text-[#433BFF]" />
                      </div>
                      <Input
                        type="text"
                        value={profile?.firstName || ""}
                        onChange={handleChange("firstName")}
                        disabled={!isEditing}
                        className="w-full bg-white border-slate-200 disabled:opacity-70 disabled:cursor-not-allowed font-medium pl-10 rounded-lg focus:ring-[#433BFF] focus:border-[#433BFF] transition-shadow group-hover:shadow-md"
                      />
                    </div>
                  </div>
                  <div className="space-y-2 group">
                    <label className="text-sm font-semibold text-slate-700 block tracking-tight flex items-center gap-2">
                      <span>Mot de passe</span>
                      <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent"></div>
                    </label>
                    <div className="relative">
                      <div className="absolute left-0 top-0 w-10 h-full bg-gradient-to-r from-[#433BFF]/5 to-transparent rounded-l-lg flex items-center justify-center">
                        <LuLock className="w-4 h-4 text-[#433BFF]" />
                      </div>
                      <Input
                        type="password"
                        value={profile?.password || ""}
                        onChange={handleChange("password")}
                        disabled={!isEditing}
                        className="w-full bg-white border-slate-200 disabled:opacity-70 disabled:cursor-not-allowed font-medium pl-10 rounded-lg focus:ring-[#433BFF] focus:border-[#433BFF] transition-shadow group-hover:shadow-md"
                      />
                    </div>
                  </div>
                  <div className="space-y-2 group">
                    <label className="text-sm font-semibold text-slate-700 block tracking-tight flex items-center gap-2">
                      <span>Courriel</span>
                      <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent"></div>
                    </label>
                    <div className="relative">
                      <div className="absolute left-0 top-0 w-10 h-full bg-gradient-to-r from-[#433BFF]/5 to-transparent rounded-l-lg flex items-center justify-center">
                        <LuMail className="w-4 h-4 text-[#433BFF]" />
                      </div>
                      <Input
                        type="email"
                        value={profile?.email || ""}
                        onChange={handleChange("email")}
                        disabled={!isEditing}
                        className="w-full bg-white border-slate-200 disabled:opacity-70 disabled:cursor-not-allowed font-medium pl-10 rounded-lg focus:ring-[#433BFF] focus:border-[#433BFF] transition-shadow group-hover:shadow-md"
                      />
                    </div>
                  </div>
                  <div className="space-y-2 group">
                    <label className="text-sm font-semibold text-slate-700 block tracking-tight flex items-center gap-2">
                      <span>Date de naissance</span>
                      <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent"></div>
                    </label>
                    <div className="relative">
                      <div className="absolute left-0 top-0 w-10 h-full bg-gradient-to-r from-[#433BFF]/5 to-transparent rounded-l-lg flex items-center justify-center">
                        <LuCalendar className="w-4 h-4 text-[#433BFF]" />
                      </div>
                      <Input
                        type="date"
                        value={profile?.birthDate ? profile.birthDate.split("T")[0] : ""}
                        onChange={handleChange("birthDate")}
                        disabled={!isEditing}
                        className="w-full bg-white border-slate-200 disabled:opacity-70 disabled:cursor-not-allowed font-medium pl-10 rounded-lg focus:ring-[#433BFF] focus:border-[#433BFF] transition-shadow group-hover:shadow-md"
                      />
                    </div>
                  </div>
                  <div className="space-y-2 lg:col-span-2 group">
                    <label className="text-sm font-semibold text-slate-700 block tracking-tight flex items-center gap-2">
                      <span>Téléphone</span>
                      <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent"></div>
                    </label>
                    <div className="relative">
                      <div className="absolute left-0 top-0 w-10 h-full bg-gradient-to-r from-[#433BFF]/5 to-transparent rounded-l-lg flex items-center justify-center">
                        <LuPhone className="w-4 h-4 text-[#433BFF]" />
                      </div>
                      <Input
                        type="tel"
                        value={profile?.phone || ""}
                        onChange={handleChange("phone")}
                        disabled={!isEditing}
                        className="w-full bg-white border-slate-200 disabled:opacity-70 disabled:cursor-not-allowed font-medium pl-10 rounded-lg focus:ring-[#433BFF] focus:border-[#433BFF] transition-shadow group-hover:shadow-md"
                      />
                    </div>
                  </div>
                  {/* Section des adresses */}
                  <div className="space-y-2 lg:col-span-2 group">
                    <label className="text-sm font-semibold text-slate-700 block tracking-tight flex items-center gap-2">
                      <span>Adresses</span>
                      <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent"></div>
                    </label>
                    <div className="space-y-4">
                      {/* Adresse personnelle */}
                      {addresses
                        .filter((addr) => addr.type === "PERSONAL")
                        .map((address, index) => (
                          <div
                            key={`personal-${index}`}
                            className="p-4 border border-slate-200 rounded-lg space-y-4 bg-white/50"
                          >
                            <div className="flex justify-between items-center">
                              <h4 className="font-semibold text-slate-700">Adresse personnelle</h4>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="relative">
                                <div className="absolute left-0 top-0 w-10 h-full bg-gradient-to-r from-[#433BFF]/5 to-transparent rounded-l-lg flex items-center justify-center">
                                  <LuMapPin className="w-4 h-4 text-[#433BFF]" />
                                </div>
                                <Input
                                  type="text"
                                  placeholder="Numéro civique"
                                  value={address.streetNumber}
                                  onChange={(e) => {
                                    const newAddresses = [...addresses];
                                    const addrIndex = addresses.findIndex((a) => a.type === "PERSONAL");
                                    newAddresses[addrIndex] = {
                                      ...newAddresses[addrIndex],
                                      streetNumber: e.target.value,
                                    };
                                    setAddresses(newAddresses);
                                  }}
                                  disabled={!isEditing}
                                  className="w-full bg-white border-slate-200 disabled:opacity-70 disabled:cursor-not-allowed font-medium pl-10 rounded-lg focus:ring-[#433BFF] focus:border-[#433BFF] transition-shadow group-hover:shadow-md"
                                />
                              </div>
                              <div className="relative">
                                <Input
                                  type="text"
                                  placeholder="Nom de rue"
                                  value={address.streetName}
                                  onChange={(e) => {
                                    const newAddresses = [...addresses];
                                    const addrIndex = addresses.findIndex((a) => a.type === "PERSONAL");
                                    newAddresses[addrIndex] = {
                                      ...newAddresses[addrIndex],
                                      streetName: e.target.value,
                                    };
                                    setAddresses(newAddresses);
                                  }}
                                  disabled={!isEditing}
                                  className="w-full bg-white border-slate-200 disabled:opacity-70 disabled:cursor-not-allowed font-medium rounded-lg focus:ring-[#433BFF] focus:border-[#433BFF] transition-shadow group-hover:shadow-md"
                                />
                              </div>
                              <div className="relative">
                                <Input
                                  type="text"
                                  placeholder="Ville"
                                  value={address.city}
                                  onChange={(e) => {
                                    const newAddresses = [...addresses];
                                    const addrIndex = addresses.findIndex((a) => a.type === "PERSONAL");
                                    newAddresses[addrIndex] = {
                                      ...newAddresses[addrIndex],
                                      city: e.target.value,
                                    };
                                    setAddresses(newAddresses);
                                  }}
                                  disabled={!isEditing}
                                  className="w-full bg-white border-slate-200 disabled:opacity-70 disabled:cursor-not-allowed font-medium rounded-lg focus:ring-[#433BFF] focus:border-[#433BFF] transition-shadow group-hover:shadow-md"
                                />
                              </div>
                              <div className="relative">
                                <ProvinceSelect
                                  value={address.province}
                                  onValueChange={(value: string) => {
                                    const newAddresses = [...addresses];
                                    const addrIndex = addresses.findIndex((a) => a.type === "PERSONAL");
                                    newAddresses[addrIndex] = {
                                      ...newAddresses[addrIndex],
                                      province: value,
                                    };
                                    setAddresses(newAddresses);
                                  }}
                                  disabled={!isEditing}
                                />
                              </div>
                            </div>
                          </div>
                        ))}

                      {/* Adresse de travail */}
                      {addresses
                        .filter((addr) => addr.type === "WORK")
                        .map((address, index) => (
                          <div
                            key={`work-${index}`}
                            className="p-4 border border-slate-200 rounded-lg space-y-4 bg-white/50"
                          >
                            <div className="flex justify-between items-center">
                              <h4 className="font-semibold text-slate-700">Adresse de travail</h4>
                              {isEditing && (
                                <button
                                  onClick={deleteWorkAddress}
                                  className="px-3 py-1 text-red-600 text-sm border border-red-200 rounded hover:bg-red-50 transition-colors"
                                >
                                  Supprimer
                                </button>
                              )}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="relative">
                                <div className="absolute left-0 top-0 w-10 h-full bg-gradient-to-r from-[#433BFF]/5 to-transparent rounded-l-lg flex items-center justify-center">
                                  <LuMapPin className="w-4 h-4 text-[#433BFF]" />
                                </div>
                                <Input
                                  type="text"
                                  placeholder="Numéro civique"
                                  value={address.streetNumber}
                                  onChange={(e) => {
                                    const newAddresses = [...addresses];
                                    const addrIndex = addresses.findIndex((a) => a.type === "WORK");
                                    newAddresses[addrIndex] = {
                                      ...newAddresses[addrIndex],
                                      streetNumber: e.target.value,
                                    };
                                    setAddresses(newAddresses);
                                  }}
                                  disabled={!isEditing}
                                  className="w-full bg-white border-slate-200 disabled:opacity-70 disabled:cursor-not-allowed font-medium pl-10 rounded-lg focus:ring-[#433BFF] focus:border-[#433BFF] transition-shadow group-hover:shadow-md"
                                />
                              </div>
                              <div className="relative">
                                <Input
                                  type="text"
                                  placeholder="Nom de rue"
                                  value={address.streetName}
                                  onChange={(e) => {
                                    const newAddresses = [...addresses];
                                    const addrIndex = addresses.findIndex((a) => a.type === "WORK");
                                    newAddresses[addrIndex] = {
                                      ...newAddresses[addrIndex],
                                      streetName: e.target.value,
                                    };
                                    setAddresses(newAddresses);
                                  }}
                                  disabled={!isEditing}
                                  className="w-full bg-white border-slate-200 disabled:opacity-70 disabled:cursor-not-allowed font-medium rounded-lg focus:ring-[#433BFF] focus:border-[#433BFF] transition-shadow group-hover:shadow-md"
                                />
                              </div>
                              <div className="relative">
                                <Input
                                  type="text"
                                  placeholder="Ville"
                                  value={address.city}
                                  onChange={(e) => {
                                    const newAddresses = [...addresses];
                                    const addrIndex = addresses.findIndex((a) => a.type === "WORK");
                                    newAddresses[addrIndex] = {
                                      ...newAddresses[addrIndex],
                                      city: e.target.value,
                                    };
                                    setAddresses(newAddresses);
                                  }}
                                  disabled={!isEditing}
                                  className="w-full bg-white border-slate-200 disabled:opacity-70 disabled:cursor-not-allowed font-medium rounded-lg focus:ring-[#433BFF] focus:border-[#433BFF] transition-shadow group-hover:shadow-md"
                                />
                              </div>
                              <div className="relative">
                                <ProvinceSelect
                                  value={address.province}
                                  onValueChange={(value: string) => {
                                    const newAddresses = [...addresses];
                                    const addrIndex = addresses.findIndex((a) => a.type === "WORK");
                                    newAddresses[addrIndex] = {
                                      ...newAddresses[addrIndex],
                                      province: value,
                                    };
                                    setAddresses(newAddresses);
                                  }}
                                  disabled={!isEditing}
                                />
                              </div>
                            </div>
                          </div>
                        ))}

                      {/* Bouton d'ajout d'adresse de travail */}
                      {isEditing && !addresses.some((addr) => addr.type === "WORK") && (
                        <button
                          onClick={() => {
                            setAddresses([
                              ...addresses,
                              {
                                id: 0,
                                streetNumber: "",
                                streetName: "",
                                city: "",
                                province: "QC",
                                country: "CA",
                                type: "WORK",
                              },
                            ]);
                          }}
                          className="w-full px-4 py-2 text-[#433BFF] border border-[#433BFF] rounded-lg hover:bg-[#433BFF]/5 transition-colors font-medium"
                        >
                          Ajouter une adresse de travail
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
