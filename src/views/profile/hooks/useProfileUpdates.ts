import {useState} from "react";
import {toast} from "sonner";
import {User} from "@/types/user/user";
import {Address} from "@/types/user/address";
import {SchoolDetails} from "@/types/user/school-details";
import {BankingDetails} from "@/types/user/banking-details";
import {useApi} from "@/hooks/useApi";
import {AddressType} from "@/enums/address/address";

export const useProfileUpdates = (userId: number) => {
  const [isEditing, setIsEditing] = useState(false);
  const {users, address, school, banking} = useApi(userId);

  const handleSave = async (
    user: User,
    addresses: Address[],
    schoolDetails: SchoolDetails | null,
    bankingDetails: BankingDetails | null,
  ) => {
    try {
      if (!user) {
        toast.error("Les informations personnelles sont invalides");
        return;
      }

      await users.updateById(userId, user);

      const personalAddress = addresses.find((addr) => addr.type === AddressType.PERSONAL);
      const workAddress = addresses.find((addr) => addr.type === AddressType.WORK);

      if (personalAddress) await address?.update(personalAddress);

      // Gestion de l'adresse de travail
      if (workAddress) {
        // Utiliser update pour toutes les adresses de travail, qu'elles soient nouvelles ou existantes
        await address?.update(workAddress);
      }
      // Si l'adresse de travail n'est pas dans la liste mais existe peut-être dans la base de données
      else {
        try {
          const existingWorkAddress = await address?.getByType(AddressType.WORK);
          // Si elle existe, on la supprime
          if (existingWorkAddress?.data) {
            await address?.deleteByType(AddressType.WORK);
          }
        } catch (error) {
          // Si l'adresse n'existe pas, on ignore l'erreur
        }
      }

      if (schoolDetails) await school?.update(schoolDetails);

      if (bankingDetails) await banking?.update(bankingDetails);

      toast.success("Les modifications ont été enregistrées avec succès");
      setIsEditing(false);
    } catch (error) {
      toast.error("Une erreur est survenue lors de l'enregistrement des modifications");
    }
  };

  return {
    isEditing,
    setIsEditing,
    handleSave,
  };
};
