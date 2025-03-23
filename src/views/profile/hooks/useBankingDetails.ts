import { useEffect, useState } from "react";
import { toast } from "sonner";
import { BankingDetails } from "@/types/user/banking-details";
import { useApi } from "@/hooks/useApi";

export const useBankingDetails = (userId: number) => {
    const [bankingDetails, setBankingDetails] = useState<BankingDetails | null>(null);
    const { banking } = useApi(userId);

    useEffect(() => {
        const fetchBankingDetails = async () => {
            try {
                const response = await banking?.getAll();
                if (response?.data) {
                    const bankingData = Array.isArray(response.data) ? response.data[0] : response.data;

                    // Remove the user property from the school data because it's not soppused to be in the response
                    // Its causing errors on the backend when updating the school details if it's not removed
                    delete bankingData.user;
                    setBankingDetails(bankingData as unknown as BankingDetails);
                }
            } catch (error) {
                toast.error("Une erreur est survenue lors de la récupération des informations bancaires");
            }
        };

        if (userId) {
            fetchBankingDetails();
        }
    }, [userId, banking]);

    const deleteBankingDetails = async () => {
        try {
            await banking?.delete();
            setBankingDetails(null);
            toast.success("Les informations bancaires ont été supprimées avec succès");
        } catch (error) {
            toast.error("Une erreur est survenue lors de la suppression des informations bancaires");
        }
    };

    return {
        bankingDetails,
        setBankingDetails,
        deleteBankingDetails,
    };
}; 