import {Province} from "@/enums/address/province";
import {Country} from "@/enums/address/country";
import {AddressType} from "@/enums/address/address";

export interface Address {
  id: number;
  streetNumber: string;
  streetName: string;
  city: string;
  province: Province;
  country: Country;
  type: AddressType;
  user?: string;
}
