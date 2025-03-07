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

// Interface pour une adresse
interface Address {
  id: number;
  streetNumber: string;
  streetName: string;
  city: string;
  province: string;
  country: string;
  type: string;
}

// Interface pour profil utilisateur
interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  birthDate: string;
  isActive: boolean;
}

export default function Profile() {
  // États pour gérer les données et l'état d'édition du profil
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [, setError] = useState<string | null>(null);
  const {userId} = useParams();

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

  // Gestion de changement pour les champs d'adresse
  const handleAddressChange = (field: keyof Address) => (e: React.ChangeEvent<HTMLInputElement> | string) => {
    if (addresses.length > 0) {
      const newAddresses = [...addresses];
      newAddresses[0] = {
        ...newAddresses[0],
        [field]: typeof e === "string" ? e : e.target.value,
      };
      setAddresses(newAddresses);
    } else {
      // Création d'une nouvelle adresse si aucune n'existe
      setAddresses([
        {
          id: 0,
          streetNumber: "",
          streetName: "",
          city: "",
          province: typeof e === "string" ? e : "QC",
          country: "CA",
          type: "PERSONAL",
          [field]: typeof e === "string" ? e : e.target.value,
        },
      ]);
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

        // Sauvegarde de l'adresse si elle existe
        if (addresses.length > 0) {
          const addressResponse = await fetch(`https://money-pie-2.fly.dev/api/v1/users/${userId}/addresses`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(addresses[0]),
          });

          if (!addressResponse.ok) {
            throw new Error("Erreur lors de la sauvegarde de l'adresse");
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
      <div className="mx-auto max-w-3xl">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 pb-7 border-b">
            <div className="flex items-center gap-3">
              <LuCircleUser className="w-8 h-8 text-[#433BFF]" />
              <CardTitle className="text-2xl font-bold text-slate-800 tracking-tight">Détail du profil</CardTitle>
            </div>
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
                  <div className="flex-1 space-y-3">
                    <div className="space-y-1">
                      <h3 className="text-2xl font-bold text-slate-900">
                        {profile?.firstName} {profile?.lastName}
                      </h3>
                      <div className="h-px w-24 bg-gradient-to-r from-[#433BFF] to-transparent"></div>
                    </div>
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

          <CardContent className="pt-6">
            <Card className="border-none overflow-hidden bg-gradient-to-br from-white to-slate-50 shadow-[0_2px_8px_0px_rgba(67,59,255,0.08)] hover:shadow-[0_4px_12px_0px_rgba(67,59,255,0.12)] transition-all duration-300">
              <CardHeader className="border-b bg-white/50 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <CardTitle className="text-xl font-bold text-slate-900 tracking-tight">
                    Renseignements personnels
                  </CardTitle>
                </div>
              </CardHeader>
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
                  <div className="space-y-2 lg:col-span-2 group">
                    <label className="text-sm font-semibold text-slate-700 block tracking-tight flex items-center gap-2">
                      <span>Adresse</span>
                      <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent"></div>
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="relative">
                        <div className="absolute left-0 top-0 w-10 h-full bg-gradient-to-r from-[#433BFF]/5 to-transparent rounded-l-lg flex items-center justify-center">
                          <LuMapPin className="w-4 h-4 text-[#433BFF]" />
                        </div>
                        <Input
                          type="text"
                          placeholder="Numéro civique"
                          value={addresses[0]?.streetNumber || ""}
                          onChange={handleAddressChange("streetNumber")}
                          disabled={!isEditing}
                          className="w-full bg-white border-slate-200 disabled:opacity-70 disabled:cursor-not-allowed font-medium pl-10 rounded-lg focus:ring-[#433BFF] focus:border-[#433BFF] transition-shadow group-hover:shadow-md"
                        />
                      </div>
                      <div className="relative">
                        <Input
                          type="text"
                          placeholder="Nom de rue"
                          value={addresses[0]?.streetName || ""}
                          onChange={handleAddressChange("streetName")}
                          disabled={!isEditing}
                          className="w-full bg-white border-slate-200 disabled:opacity-70 disabled:cursor-not-allowed font-medium rounded-lg focus:ring-[#433BFF] focus:border-[#433BFF] transition-shadow group-hover:shadow-md"
                        />
                      </div>
                      <div className="relative">
                        <Input
                          type="text"
                          placeholder="Ville"
                          value={addresses[0]?.city || ""}
                          onChange={handleAddressChange("city")}
                          disabled={!isEditing}
                          className="w-full bg-white border-slate-200 disabled:opacity-70 disabled:cursor-not-allowed font-medium rounded-lg focus:ring-[#433BFF] focus:border-[#433BFF] transition-shadow group-hover:shadow-md"
                        />
                      </div>
                      <div className="relative">
                        <Select
                          value={addresses[0]?.province || "QC"}
                          onValueChange={(value: string) => handleAddressChange("province")(value)}
                          disabled={!isEditing}
                        >
                          <SelectTrigger className="w-full bg-white border-slate-200 disabled:opacity-70 disabled:cursor-not-allowed font-medium rounded-lg focus:ring-[#433BFF] focus:border-[#433BFF] transition-shadow group-hover:shadow-md">
                            <SelectValue placeholder="Province" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="QC">Québec (QC)</SelectItem>
                            <SelectItem value="ON">Ontario (ON)</SelectItem>
                            <SelectItem value="NL">Terre-Neuve-et-Labrador (NL)</SelectItem>
                            <SelectItem value="NS">Nouvelle-Écosse (NS)</SelectItem>
                            <SelectItem value="PE">Île-du-Prince-Édouard (PE)</SelectItem>
                            <SelectItem value="NB">Nouveau-Brunswick (NB)</SelectItem>
                            <SelectItem value="MB">Manitoba (MB)</SelectItem>
                            <SelectItem value="SK">Saskatchewan (SK)</SelectItem>
                            <SelectItem value="AB">Alberta (AB)</SelectItem>
                            <SelectItem value="BC">Colombie-Britannique (BC)</SelectItem>
                            <SelectItem value="YT">Yukon (YT)</SelectItem>
                            <SelectItem value="NT">Territoires du Nord-Ouest (NT)</SelectItem>
                            <SelectItem value="NU">Nunavut (NU)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
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
