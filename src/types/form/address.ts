import {Address} from "@/types/user/address";
import {AddressType} from "@/enums/address/address";
import {Province} from "@/enums/address/province";
import {Country} from "@/enums/address/country";

export interface AddressFormFields {
  streetNumber: string;
  streetName: string;
  city: string;
  province: Province;
  country: Country;
}

export interface AddressFormProps {
  address: Address;
  type: AddressType;
  isEditing: boolean;
  onDelete?: () => void;
  onUpdate: (updatedAddress: Address) => void;
}

export interface AddressFormRef {
  validateForm: () => Promise<boolean>;
}
