import {Province} from "@/enums/province";
import {Country, AddressType} from "@/enums/address";

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
