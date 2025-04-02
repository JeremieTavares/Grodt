import {useEffect, useState} from "react";
import {toast} from "sonner";
import {Address} from "@/types/user/address";
import {useApi} from "@/hooks/useApi";
import {AddressType} from "@/enums/address/address";

export const useAddresses = (userId: number) => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const {address} = useApi(userId);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await address?.getAll();
        if (response?.data) {
          const addressData = Array.isArray(response.data) ? response.data : [response.data];
          setAddresses(addressData as unknown as Address[]);
        }
      } catch (error: any) {
        // Set addresses to empty array in case of any error
        setAddresses([]);
      }
    };

    if (userId) {
      fetchAddresses();
    }
  }, [userId, address]);

  const deleteWorkAddress = async () => {
    try {
      const workAddress = addresses.find((addr) => addr.type === "WORK");
      if (workAddress) {
        await address?.deleteByType(AddressType.WORK);
        setAddresses(addresses.filter((addr) => addr.type !== AddressType.WORK));
        toast.success("L'adresse de travail a été supprimée avec succès");
      }
    } catch (error) {
      toast.error("Une erreur est survenue lors de la suppression de l'adresse de travail");
    }
  };

  return {
    addresses,
    setAddresses,
    deleteWorkAddress,
  };
};
