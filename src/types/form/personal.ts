import {User} from "../user/user";

// Utilise Pick pour sélectionner les champs nécessaires et Omit pour exclure le champ birthDate
export type PersonalFormFields = Omit<
  Pick<User, "firstName" | "lastName" | "email" | "phone" | "password" | "birthDate">,
  "birthDate"
> & {
  birthDate: string;
};

export type PersonalInfoFormProps = {
  profile: User | null;
  isEditing: boolean;
  onUpdate: (user: User) => void;
};

export type PersonalInfoFormRef = {
  validateForm: () => Promise<boolean>;
};
