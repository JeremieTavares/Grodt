import {User} from "../user/user";

// Omit birthDate from User and add it back as string for form handling
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
