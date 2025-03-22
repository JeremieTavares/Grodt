import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {toast} from "sonner";
import {Toaster} from "@/components/ui/sonner";
import {LuUser, LuBriefcase, LuMapPin, LuGraduationCap, LuWallet} from "react-icons/lu";
import {Address} from "@/types/user/address";
import {User, UpdateUserDto} from "@/types/user/user";
import {AddressForm} from "@/components/forms/address/AddressForm";
import {SchoolDetailsForm} from "@/components/forms/school/SchoolDetailsForm";
import {BankingDetailsForm} from "@/components/forms/banking/BankingDetailsForm";
import {FormCard} from "@/components/forms/FormCard";
import {Province} from "@/enums/address/province";
import {Country} from "@/enums/address/country";
import {AddressType} from "@/enums/address/address";
import {useApi} from "@/hooks/useApi";
import {SchoolDetails} from "@/types/user/school-details";
import {BankingDetails} from "@/types/user/banking-details";
import {ProfileHeader} from "@/components/profile/ProfileHeader";
import {ProfileCard} from "@/components/profile/ProfileCard";
import {PersonalInfoForm} from "@/components/forms/personal/PersonalInfoForm";
import {useAuth} from "@/hooks/useAuth";

export default function Profile() {
  const [profile, setProfile] = useState<User | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [schoolDetails, setSchoolDetails] = useState<SchoolDetails | null>(null);
  const [bankingDetails, setBankingDetails] = useState<BankingDetails | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const {user} = useAuth();
  const api = useApi(Number(user?.id));

  const userId = user?.id;

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
          const [schoolResponse, bankingResponse] = await Promise.all([api.school?.getAll(), api.banking?.getAll()]);

          let bankingDetails: BankingDetails | null = null;
          if (bankingResponse?.data && typeof bankingResponse?.data === "object") {
            bankingDetails = bankingResponse?.data as unknown as BankingDetails;
          }

          let schoolDetails: SchoolDetails | null = null;
          if (schoolResponse?.data && typeof schoolResponse?.data === "object") {
            schoolDetails = schoolResponse?.data as unknown as SchoolDetails;
          }

          setBankingDetails(bankingDetails);
          setSchoolDetails(schoolDetails);
        } catch (error) {
          console.log("Pas de détails scolaires ou bancaires trouvés");
          setSchoolDetails(null);
          setBankingDetails(null);
        }
      } catch (err) {
        console.error("Erreur:", err);
        toast.error("Erreur lors du chargement du profil");
      }
    };

    fetchData();
  }, [userId, api.users, api.school, api.banking]);

  const handleSchoolDetailsUpdate = async (updatedSchoolDetails: SchoolDetails) => {
    if (!schoolDetails) {
      // Création d'un nouveau détail scolaire
      try {
        const response = await api.school?.create({
          schoolName: updatedSchoolDetails.schoolName,
          fieldOfStudy: updatedSchoolDetails.fieldOfStudy,
          startDate: updatedSchoolDetails.startDate,
          projectedEndDate: updatedSchoolDetails.projectedEndDate,
        });
        if (response?.data) {
          setSchoolDetails(response.data);
          toast.success("Détails scolaires créés avec succès!");
        }
      } catch (error) {
        console.error("Erreur lors de la création:", error);
        toast.error("Erreur lors de la création des détails scolaires");
      }
    } else {
      setSchoolDetails(updatedSchoolDetails);
    }
  };

  const handleDeleteSchoolDetails = async () => {
    if (!userId) return;

    try {
      await api.school?.deleteById(Number(userId));
      setSchoolDetails(null);
      toast.success("Détails scolaires supprimés avec succès!");
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      toast.error("Erreur lors de la suppression des détails scolaires");
    }
  };

  const handleBankingDetailsUpdate = async (updatedBankingDetails: BankingDetails) => {
    if (!bankingDetails) {
      // Création d'un nouveau détail bancaire
      try {
        const response = await api.banking?.create({
          institutionName: updatedBankingDetails.institutionName,
          accountInfo: updatedBankingDetails.accountInfo,
        });
        if (response?.data) {
          setBankingDetails(response.data);
          toast.success("Détails bancaires créés avec succès!");
        }
      } catch (error) {
        console.error("Erreur lors de la création:", error);
        toast.error("Erreur lors de la création des détails bancaires");
      }
    } else {
      setBankingDetails(updatedBankingDetails);
    }
  };

  const handleDeleteBankingDetails = async () => {
    if (!userId) return;

    try {
      await api.banking?.deleteById(Number(userId));
      setBankingDetails(null);
      toast.success("Détails bancaires supprimés avec succès!");
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      toast.error("Erreur lors de la suppression des détails bancaires");
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

        await Promise.all([
          api.users.update(Number(userId), formattedProfile),
          ...addresses.map((address) => api.users.updateUserAddress(userId, address)),
          schoolDetails
            ? api.school?.update(Number(userId), {
                schoolName: schoolDetails.schoolName,
                fieldOfStudy: schoolDetails.fieldOfStudy,
                startDate: schoolDetails.startDate,
                projectedEndDate: schoolDetails.projectedEndDate,
              })
            : Promise.resolve(),
          bankingDetails
            ? api.banking?.update(Number(userId), {
                institutionName: bankingDetails.institutionName,
                accountInfo: bankingDetails.accountInfo,
                loanInfo: bankingDetails.loanInfo,
                other: bankingDetails.other,
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
            <PersonalInfoForm
              profile={profile}
              isEditing={isEditing}
              onUpdate={(field, value) => {
                if (profile) {
                  setProfile({
                    ...profile,
                    [field]: field === "birthDate" ? new Date(value) : value,
                  });
                }
              }}
            />
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

          {/* School and Banking Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* School Information */}
            <FormCard title="Information Scolaire" icon={LuGraduationCap}>
              <div className="space-y-4">
                <SchoolDetailsForm
                  schoolDetails={schoolDetails}
                  isEditing={isEditing}
                  onDelete={handleDeleteSchoolDetails}
                  onUpdate={handleSchoolDetailsUpdate}
                />
              </div>
            </FormCard>

            {/* Banking Information */}
            <FormCard title="Information Bancaire" icon={LuWallet}>
              <div className="space-y-4">
                <BankingDetailsForm
                  bankingDetails={bankingDetails}
                  isEditing={isEditing}
                  onDelete={handleDeleteBankingDetails}
                  onUpdate={handleBankingDetailsUpdate}
                />
              </div>
            </FormCard>
          </div>
        </div>
      </div>
    </div>
  );
}
