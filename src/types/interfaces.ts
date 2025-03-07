// Interface pour une adresse page Profile
export interface Address {
  id: number;
  streetNumber: string;
  streetName: string;
  city: string;
  province: string;
  country: string;
  type: "PERSONAL" | "WORK";
}

// Interface pour profil utilisateur page Profile
export interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  birthDate: string;
  isActive: boolean;
}
