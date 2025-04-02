import {LuMapPin, LuTrash2} from "react-icons/lu";
import {Address} from "@/types/user/address";
import {AddressForm} from "@/components/forms/address/AddressForm";
import {AddressType} from "@/enums/address/address";
import {AddressFormRef} from "@/types/form/address";
import {Province} from "@/enums/address/province";
import {Country} from "@/enums/address/country";
import {forwardRef, useImperativeHandle, useRef} from "react";

interface AddressContentProps {
  addresses: Address[];
  setAddresses: (addresses: Address[]) => void;
  isEditing: boolean;
  onDeleteWork: () => Promise<void>;
}

export interface AddressContentRef {
  validateForms: () => Promise<boolean>;
}

export const AddressContent = forwardRef<AddressContentRef, AddressContentProps>(
  ({addresses, setAddresses, isEditing, onDeleteWork}, ref) => {
    const personalAddressRef = useRef<AddressFormRef>(null);
    const workAddressRef = useRef<AddressFormRef>(null);

    useImperativeHandle(ref, () => ({
      async validateForms() {
        const personalValid = (await personalAddressRef.current?.validateForm()) ?? true;
        const workValid = (await workAddressRef.current?.validateForm()) ?? true;
        return personalValid && workValid;
      },
    }));

    const personalAddress = addresses.find((addr) => addr.type === AddressType.PERSONAL);
    const workAddress = addresses.find((addr) => addr.type === AddressType.WORK);

    const emptyPersonalAddress = {
      id: 0,
      streetNumber: "",
      streetName: "",
      city: "",
      province: Province.QC,
      country: Country.CA,
      type: AddressType.PERSONAL,
    };

    return (
      <>
        <div className="flex flex-col h-full">
          <div className="flex items-center h-[42px] mb-6">
            <div className="flex items-center gap-2">
              <LuMapPin className="w-5 h-5 text-[#433BFF] dark:text-[#7A75FF]" />
              <h3 className="text-lg font-medium">Adresse personnelle</h3>
            </div>
          </div>
          <div className="flex-1">
            <AddressForm
              ref={personalAddressRef}
              address={personalAddress || emptyPersonalAddress}
              type={AddressType.PERSONAL}
              isEditing={isEditing}
              onUpdate={(updatedAddress) => {
                if (personalAddress) {
                  setAddresses(addresses.map((addr) => (addr.type === AddressType.PERSONAL ? updatedAddress : addr)));
                } else {
                  setAddresses([...addresses, updatedAddress]);
                }
              }}
            />
          </div>
        </div>
        {workAddress && (
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between h-[42px] mb-6">
              <div className="flex items-center gap-2">
                <LuMapPin className="w-5 h-5 text-[#433BFF] dark:text-[#7A75FF]" />
                <h3 className="text-lg font-medium">Adresse de travail</h3>
              </div>
              {isEditing && (
                <button
                  onClick={onDeleteWork}
                  className="p-1.5 text-red-500 hover:bg-red-500/10 rounded-full transition-all duration-200"
                >
                  <LuTrash2 className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="flex-1">
              <AddressForm
                ref={workAddressRef}
                address={workAddress}
                type={AddressType.WORK}
                isEditing={isEditing}
                onDelete={onDeleteWork}
                onUpdate={(updatedAddress) => {
                  setAddresses(addresses.map((addr) => (addr.type === AddressType.WORK ? updatedAddress : addr)));
                }}
              />
            </div>
          </div>
        )}
      </>
    );
  },
);
