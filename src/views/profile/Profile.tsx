import {useUserProfile} from "./hooks/useUserProfile";
import {useAddresses} from "./hooks/useAddresses";
import {useSchoolDetails} from "./hooks/useSchoolDetails";
import {useBankingDetails} from "./hooks/useBankingDetails";
import {useProfileUpdates} from "./hooks/useProfileUpdates";
import {AddressSection, AddressSectionRef} from "./components/AddressSection";
import {SchoolSection} from "./components/SchoolSection";
import {BankingSection} from "./components/BankingSection";
import {LuUser} from "react-icons/lu";
import {FormCard} from "@/components/forms/FormCard";
import {PersonalInfoForm} from "@/components/forms/personal/PersonalInfoForm";
import {PersonalInfoFormRef} from "@/types/form/personal";
import {ProfileHeader} from "./components/ProfileHeader";
import {ProfileCard} from "./components/ProfileCard";
import {useAuth} from "@/hooks/useAuth";
import {Toaster, toast} from "sonner";
import {useRef} from "react";

export const Profile = () => {
  const {user: authUser} = useAuth();
  const personalInfoFormRef = useRef<PersonalInfoFormRef>(null);
  const addressSectionRef = useRef<AddressSectionRef>(null);

  const {user, setUser} = useUserProfile(authUser?.id!);
  const {addresses, setAddresses, deleteWorkAddress} = useAddresses(authUser?.id!);
  const {schoolDetails, setSchoolDetails, deleteSchoolDetails} = useSchoolDetails(authUser?.id!);
  const {bankingDetails, setBankingDetails, deleteBankingDetails} = useBankingDetails(authUser?.id!);
  const {isEditing, setIsEditing, handleSave} = useProfileUpdates(authUser?.id!);

  const handleSaveClick = async () => {
    const personalInfoValid = await personalInfoFormRef.current?.validateForm();
    const addressesValid = await addressSectionRef.current?.validateForms();

    if (!personalInfoValid || !addressesValid) {
      toast.error("Veuillez remplir tous les champs obligatoires avant de sauvegarder", {
        description: "Certains champs sont manquants ou invalides dans vos informations personnelles ou vos adresses.",
      });
      return;
    }

    handleSave(user!, addresses, schoolDetails, bankingDetails);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-right" />

      <ProfileHeader
        isEditing={isEditing}
        onEdit={() => setIsEditing(true)}
        onSave={handleSaveClick}
        onCancel={() => setIsEditing(false)}
      />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <ProfileCard profile={user} />
        </div>

        <div className="lg:col-span-2 space-y-8">
          <FormCard title="Informations personnelles" icon={LuUser}>
            <PersonalInfoForm ref={personalInfoFormRef} profile={user} isEditing={isEditing} onUpdate={setUser} />
          </FormCard>

          <AddressSection
            ref={addressSectionRef}
            addresses={addresses}
            setAddresses={setAddresses}
            isEditing={isEditing}
            onDeleteWork={deleteWorkAddress}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <SchoolSection
              schoolDetails={schoolDetails}
              setSchoolDetails={setSchoolDetails}
              isEditing={isEditing}
              onDelete={deleteSchoolDetails}
            />
            <BankingSection
              bankingDetails={bankingDetails}
              setBankingDetails={setBankingDetails}
              isEditing={isEditing}
              onDelete={deleteBankingDetails}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
