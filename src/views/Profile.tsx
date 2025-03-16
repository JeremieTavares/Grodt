import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {Input} from "@/components/ui/input";
import {toast} from "sonner";
import {Toaster} from "@/components/ui/sonner";
import {LuUser, LuBriefcase, LuMapPin, LuGraduationCap} from "react-icons/lu";
import {Address} from "@/types/user/address";
import {User, UpdateUserDto} from "@/types/user/user";
import {AddressForm} from "@/components/forms/address/AddressForm";
import {SchoolDetailsForm} from "@/components/forms/school/SchoolDetailsForm";
import {FormCard} from "@/components/forms/FormCard";
import {Province} from "@/enums/address/province";
import {Country} from "@/enums/address/country";
import {AddressType} from "@/enums/address/address";
import {useApi} from "@/hooks/useApi";
import {SchoolDetails} from "@/types/user/school-details";
import {ProfileHeader} from "@/components/profile/ProfileHeader";
import {ProfileCard} from "@/components/profile/ProfileCard";

export default function Profile() {
  const [profile, setProfile] = useState<User | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [schoolDetails, setSchoolDetails] = useState<SchoolDetails | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const {userId} = useParams();
  const api = useApi(Number(userId));

  // Fonction pour supprimer l'adresse de travail
  const deleteWorkAddress = async () => {
    if (!userId) return;

    try {
      await api.users.deleteUserAddress(userId, "WORK");
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
    const fetchData = async () => {
      if (!userId) return;

      try {
        const [profileResponse, addressesResponse] = await Promise.all([
          api.users.getById(Number(userId)),
          api.users.getUserAddresses(userId),
        ]);

        setProfile(profileResponse.data);
        setAddresses(addressesResponse.data);

        try {
          const schoolResponse = await api.users.getUserSchoolDetails(userId);
          setSchoolDetails(schoolResponse.data);
        } catch (error) {
          console.log("Pas de détails scolaires trouvés");
          setSchoolDetails(null);
        }
      } catch (err) {
        console.error("Erreur:", err);
        toast.error("Erreur lors du chargement du profil");
      }
    };

    fetchData();
  }, [userId, api.users]);

  // Gestion de changement pour les champs du profil
  const handleChange = (field: keyof UpdateUserDto) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (profile) {
      setProfile({
        ...profile,
        [field]: field === "birthDate" ? new Date(e.target.value) : e.target.value,
      });
    }
  };

  const handleSchoolDetailsUpdate = (updatedSchoolDetails: SchoolDetails) => {
    setSchoolDetails(updatedSchoolDetails);
  };

  const handleDeleteSchoolDetails = async () => {
    if (!userId) return;

    try {
      await api.users.deleteUserSchoolDetails(userId);
      setSchoolDetails(null);
      toast.success("Détails scolaires supprimés avec succès!");
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      toast.error("Erreur lors de la suppression des détails scolaires");
    }
  };

  // Fonction pour sauvegarder les modifications du profil et de l'adresse
  const handleSave = async () => {
    if (profile && userId) {
      try {
        const formattedProfile: UpdateUserDto = {
          ...profile,
          birthDate: profile.birthDate ? new Date(profile.birthDate) : undefined,
        };

        console.log("Données du profil envoyées:", JSON.stringify(formattedProfile, null, 2));

        await Promise.all([
          api.users.update(Number(userId), formattedProfile),
          ...addresses.map((address) => api.users.updateUserAddress(userId, address)),
          schoolDetails
            ? api.users.updateUserSchoolDetails(userId, {
                schoolName: schoolDetails.schoolName,
                fieldOfStudy: schoolDetails.fieldOfStudy,
                startDate: schoolDetails.startDate,
                projectedEndDate: schoolDetails.projectedEndDate,
              })
            : Promise.resolve(),
        ]);

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

      <ProfileHeader
        isEditing={isEditing}
        onEdit={() => setIsEditing(true)}
        onSave={handleSave}
        onCancel={() => setIsEditing(false)}
      />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <ProfileCard profile={profile} />
        </div>

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
                  value={profile?.birthDate ? new Date(profile.birthDate).toISOString().split("T")[0] : ""}
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

          {/* School Information */}
          <FormCard title="Informations scolaires" icon={LuGraduationCap}>
            <div className="space-y-4">
              <SchoolDetailsForm
                schoolDetails={schoolDetails}
                isEditing={isEditing}
                onDelete={handleDeleteSchoolDetails}
                onUpdate={handleSchoolDetailsUpdate}
              />
            </div>
          </FormCard>
        </div>
      </div>
    </div>
  );
}
