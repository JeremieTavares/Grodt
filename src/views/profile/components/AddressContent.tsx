import {LuMapPin, LuTrash2} from "react-icons/lu";
import {Address} from "@/types/user/address";
import {AddressForm} from "@/components/forms/address/AddressForm";
import {AddressType} from "@/enums/address/address";
import {AddressFormRef} from "@/types/form/address";
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

    return (
      <>
        <div>
          <div className="flex items-center gap-2 mb-4">
            <LuMapPin className="w-5 h-5 text-[#433BFF] dark:text-[#7A75FF]" />
            <h3 className="text-lg font-medium">Adresse personnelle</h3>
          </div>
          {personalAddress && (
            <AddressForm
              ref={personalAddressRef}
              address={personalAddress}
              type={AddressType.PERSONAL}
              isEditing={isEditing}
              onUpdate={(updatedAddress) => {
                setAddresses(addresses.map((addr) => (addr.type === AddressType.PERSONAL ? updatedAddress : addr)));
              }}
            />
          )}
        </div>
        {workAddress && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <LuMapPin className="w-5 h-5 text-[#433BFF] dark:text-[#7A75FF]" />
                <h3 className="text-lg font-medium">Adresse de travail</h3>
              </div>
              {isEditing && (
                <button
                  onClick={onDeleteWork}
                  className="p-2 text-red-500 hover:bg-red-500/10 rounded-full transition-all duration-200"
                >
                  <LuTrash2 className="w-5 h-5" />
                </button>
              )}
            </div>
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
        )}
      </>
    );
  },
);
