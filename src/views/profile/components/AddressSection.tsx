import {LuMapPin} from "react-icons/lu";
import {Address} from "@/types/user/address";
import {FormCard} from "@/components/forms/FormCard";
import {Province} from "@/enums/address/province";
import {Country} from "@/enums/address/country";
import {AddressType} from "@/enums/address/address";
import {AddressContent, AddressContentRef} from "./AddressContent";
import {forwardRef, useImperativeHandle, useRef} from "react";

interface AddressSectionProps {
  addresses: Address[];
  setAddresses: (addresses: Address[]) => void;
  isEditing: boolean;
  onDeleteWork: () => Promise<void>;
}

export interface AddressSectionRef {
  validateForms: () => Promise<boolean>;
}

export const AddressSection = forwardRef<AddressSectionRef, AddressSectionProps>(
  ({addresses, setAddresses, isEditing, onDeleteWork}, ref) => {
    const addressContentRef = useRef<AddressContentRef>(null);

    useImperativeHandle(ref, () => ({
      async validateForms() {
        return (await addressContentRef.current?.validateForms()) ?? true;
      },
    }));

    const hasWorkAddress = addresses.some((addr) => addr.type === AddressType.WORK);

    const addWorkAddress = () => {
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
    };

    return (
      <FormCard
        title="Adresses"
        icon={LuMapPin}
        headerAction={
          isEditing &&
          !hasWorkAddress && (
            <button
              onClick={addWorkAddress}
              className="px-4 py-2 text-[#433BFF] dark:text-[#7A75FF] border border-[#433BFF] dark:border-[#7A75FF] rounded-full hover:bg-[#433BFF]/5 dark:hover:bg-[#7A75FF]/10 transition-all duration-200 text-sm font-medium inline-flex items-center gap-2"
            >
              + Ajouter une adresse de travail
            </button>
          )
        }
      >
        <div className={`grid gap-6 ${hasWorkAddress ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}>
          <AddressContent
            ref={addressContentRef}
            addresses={addresses}
            setAddresses={setAddresses}
            isEditing={isEditing}
            onDeleteWork={onDeleteWork}
          />
        </div>
      </FormCard>
    );
  },
);
