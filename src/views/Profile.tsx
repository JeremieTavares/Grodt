import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {Input} from "@/components/ui/input";
import {toast} from "sonner";
import {Toaster} from "@/components/ui/sonner";
import {LuUser, LuPhone, LuSave, LuX, LuPencil, LuCalendar, LuBriefcase, LuMapPin, LuSettings} from "react-icons/lu";
import {Address} from "@/types/user/address";
import {UserProfile} from "@/types/user/user";
import {AddressForm} from "@/components/forms/address/AddressForm";
import {FormCard} from "@/components/forms/FormCard";
import {Province} from "@/enums/address/province";
import {Country} from "@/enums/address/country";
import {AddressType} from "@/enums/address/address";
import {useTheme} from "next-themes";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {Switch} from "@/components/ui/switch";

export default function Profile() {
  // États pour gérer les données et l'état d'édition du profil
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [, setError] = useState<string | null>(null);
  const {userId} = useParams();
  const {theme, setTheme} = useTheme();

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

      const newAddresses = addresses.filter((a) => a.type === AddressType.PERSONAL);
      setAddresses(newAddresses);

      toast.success("Adresse de travail supprimée avec succès!");
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      toast.error("Erreur lors de la suppression de l'adresse");
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
        toast.success("Profil mis à jour avec succès!");
      } catch (error) {
        console.error("Erreur complète:", error);
        toast.error("Erreur lors de la sauvegarde");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-right" />

      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Mon profil</h1>
          {isEditing ? (
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200 font-medium inline-flex items-center gap-2 shadow-sm"
              >
                <LuX className="w-4 h-4" />
                Annuler
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-white rounded-full bg-[#433BFF] hover:bg-[#3530CC] transition-all duration-200 font-medium inline-flex items-center gap-2 shadow-lg hover:shadow-[#433BFF]/25"
              >
                <LuSave className="w-4 h-4" />
                Sauvegarder
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 text-white rounded-full bg-[#433BFF] hover:bg-[#3530CC] transition-all duration-200 font-medium inline-flex items-center gap-2 shadow-lg hover:shadow-[#433BFF]/25"
            >
              <LuPencil className="w-4 h-4" />
              Modifier
            </button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <FormCard noPadding>
            <div className="relative h-32 bg-gradient-to-r from-[#433BFF] to-[#7A75FF]">
              <Dialog>
                <DialogTrigger asChild>
                  <button className="absolute right-4 top-4 p-2 text-white bg-white/10 rounded-full hover:bg-white/20 transition-all duration-200">
                    <LuSettings className="w-5 h-5" />
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Paramètres</DialogTitle>
                    <DialogDescription>Personnalisez votre expérience utilisateur</DialogDescription>
                  </DialogHeader>
                  <div className="flex items-center justify-between py-4">
                    <div className="space-y-0.5">
                      <div className="text-sm font-medium text-slate-900 dark:text-slate-50">Mode sombre</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        Basculer entre le mode clair et sombre
                      </div>
                    </div>
                    <Switch
                      checked={theme === "dark"}
                      onCheckedChange={(checked: boolean) => {
                        setTheme(checked ? "dark" : "light");
                      }}
                    />
                  </div>
                </DialogContent>
              </Dialog>
              <div className="absolute -bottom-12 left-6">
                <div className="relative group">
                  <div className="h-24 w-24 rounded-2xl bg-white dark:bg-slate-700 p-1">
                    <div className="h-full w-full rounded-xl bg-gradient-to-br from-[#433BFF] to-[#7A75FF] flex items-center justify-center relative">
                      <LuUser className="h-12 w-12 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-16 px-6 pb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                {profile?.firstName} {profile?.lastName}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mb-6">{profile?.email}</p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                  <div className="w-10 h-10 rounded-lg bg-[#433BFF]/10 flex items-center justify-center">
                    <LuPhone className="w-5 h-5 text-[#433BFF]" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Téléphone</p>
                    <p className="font-medium text-slate-900 dark:text-white">{profile?.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                  <div className="w-10 h-10 rounded-lg bg-[#433BFF]/10 flex items-center justify-center">
                    <LuCalendar className="w-5 h-5 text-[#433BFF]" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Date de naissance</p>
                    <p className="font-medium text-slate-900 dark:text-white">
                      {profile?.birthDate ? new Date(profile.birthDate).toLocaleDateString() : "-"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FormCard>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Personal Information */}
          <FormCard title="Informations personnelles" icon={LuUser}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Prénom</label>
                <Input
                  type="text"
                  value={profile?.firstName || ""}
                  onChange={handleChange("firstName")}
                  disabled={!isEditing}
                  className="w-full bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 rounded-xl focus:ring-[#433BFF] focus:border-[#433BFF]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Nom</label>
                <Input
                  type="text"
                  value={profile?.lastName || ""}
                  onChange={handleChange("lastName")}
                  disabled={!isEditing}
                  className="w-full bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 rounded-xl focus:ring-[#433BFF] focus:border-[#433BFF]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Email</label>
                <Input
                  type="email"
                  value={profile?.email || ""}
                  onChange={handleChange("email")}
                  disabled={!isEditing}
                  className="w-full bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 rounded-xl focus:ring-[#433BFF] focus:border-[#433BFF]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Téléphone</label>
                <Input
                  type="tel"
                  value={profile?.phone || ""}
                  onChange={handleChange("phone")}
                  disabled={!isEditing}
                  className="w-full bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 rounded-xl focus:ring-[#433BFF] focus:border-[#433BFF]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Mot de passe</label>
                <Input
                  type="password"
                  value={profile?.password || ""}
                  onChange={handleChange("password")}
                  disabled={!isEditing}
                  className="w-full bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 rounded-xl focus:ring-[#433BFF] focus:border-[#433BFF]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Date de naissance</label>
                <Input
                  type="date"
                  value={profile?.birthDate ? profile.birthDate.split("T")[0] : ""}
                  onChange={handleChange("birthDate")}
                  disabled={!isEditing}
                  className="w-full bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 rounded-xl focus:ring-[#433BFF] focus:border-[#433BFF]"
                />
              </div>
            </div>
          </FormCard>

          {/* Addresses */}
          <FormCard
            title="Adresses"
            icon={LuMapPin}
            headerAction={
              isEditing &&
              !addresses.some((addr) => addr.type === AddressType.WORK) && (
                <button
                  onClick={() => {
                    setAddresses([
                      ...addresses,
                      {
                        id: 0,
                        streetNumber: "",
                        streetName: "",
                        city: "",
                        province: Province.QC,
                        country: Country.CA,
                        type: AddressType.WORK,
                      },
                    ]);
                  }}
                  className="px-4 py-2 text-[#433BFF] dark:text-[#7A75FF] border border-[#433BFF] dark:border-[#7A75FF] rounded-full hover:bg-[#433BFF]/5 dark:hover:bg-[#7A75FF]/10 transition-all duration-200 text-sm font-medium inline-flex items-center gap-2"
                >
                  + Ajouter une adresse de travail
                </button>
              )
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Address Column */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-[#433BFF]/10 flex items-center justify-center">
                    <LuUser className="w-4 h-4 text-[#433BFF]" />
                  </div>
                  <h3 className="font-medium text-slate-900 dark:text-white">Adresse personnelle</h3>
                </div>
                {addresses
                  .filter((addr) => addr.type === AddressType.PERSONAL)
                  .map((address) => (
                    <div key={`personal-${address.id}`} className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4">
                      <AddressForm
                        address={address}
                        type={AddressType.PERSONAL}
                        isEditing={isEditing}
                        onUpdate={(updatedAddress) => {
                          const newAddresses = addresses.map((addr) =>
                            addr.type === AddressType.PERSONAL ? updatedAddress : addr,
                          );
                          setAddresses(newAddresses);
                        }}
                      />
                    </div>
                  ))}
              </div>

              {/* Work Address Column */}
              <div className="space-y-4">
                {addresses.some((addr) => addr.type === AddressType.WORK) && (
                  <>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-[#433BFF]/10 flex items-center justify-center">
                        <LuBriefcase className="w-4 h-4 text-[#433BFF]" />
                      </div>
                      <h3 className="font-medium text-slate-900 dark:text-white">Adresse de travail</h3>
                    </div>
                    {addresses
                      .filter((addr) => addr.type === AddressType.WORK)
                      .map((address) => (
                        <div key={`work-${address.id}`} className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4">
                          <AddressForm
                            address={address}
                            type={AddressType.WORK}
                            isEditing={isEditing}
                            onDelete={deleteWorkAddress}
                            onUpdate={(updatedAddress) => {
                              const newAddresses = addresses.map((addr) =>
                                addr.type === AddressType.WORK ? updatedAddress : addr,
                              );
                              setAddresses(newAddresses);
                            }}
                          />
                        </div>
                      ))}
                  </>
                )}
              </div>
            </div>
          </FormCard>
        </div>
      </div>
    </div>
  );
}
