import { useState } from "react";
import { toast } from "sonner";
import { User } from "@/types/user/user";
import { Address } from "@/types/user/address";
import { SchoolDetails } from "@/types/user/school-details";
import { BankingDetails } from "@/types/user/banking-details";
import { useApi } from "@/hooks/useApi";

export const useProfileUpdates = (userId: number) => {
    const [isEditing, setIsEditing] = useState(false);
    const { users, address, school, banking } = useApi(userId);

    const handleSave = async (
        user: User,
        addresses: Address[],
        schoolDetails: SchoolDetails | null,
        bankingDetails: BankingDetails | null
    ) => {
        try {
            await users.updateById(userId, user);

            const personalAddress = addresses.find((addr) => addr.type === "PERSONAL");
            const workAddress = addresses.find((addr) => addr.type === "WORK");

            if (personalAddress)
                await address?.update(personalAddress);

            if (workAddress)
                await address?.update(workAddress);

            if (schoolDetails)
                await school?.update(schoolDetails);

            if (bankingDetails)
                await banking?.update(bankingDetails);

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