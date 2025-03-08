import {Province} from "@/enums/province";

export interface Address {
  id: number;
  streetNumber: string;
  streetName: string;
  city: string;
  province: Province;
  country: string;
  type: "PERSONAL" | "WORK";
}
