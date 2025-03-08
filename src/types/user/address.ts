export interface Address {
  id: number;
  streetNumber: string;
  streetName: string;
  city: string;
  province: string;
  country: string;
  type: "PERSONAL" | "WORK";
}
