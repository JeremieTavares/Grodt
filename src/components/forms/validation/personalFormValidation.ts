import {ValidationRules} from "@/types/form/validation";
import {PersonalFormFields} from "@/types/form/personal";

export const personalFormValidation: ValidationRules<PersonalFormFields> = {
  firstName: {
    required: "Le prénom est requis",
    minLength: {value: 2, message: "Le prénom doit contenir au moins 2 caractères"},
  },
  lastName: {
    required: "Le nom est requis",
    minLength: {value: 2, message: "Le nom doit contenir au moins 2 caractères"},
  },
  email: {
    required: "L'email est requis",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Adresse email invalide",
    },
  },
  phone: {
    required: "Le numéro de téléphone est requis",
    pattern: {
      value: /^(\+?\d{1,3}[-.]?)?\(?\d{3}\)?[-.]?\d{3}[-.]?\d{4}$/,
      message: "Format invalide. Exemple: 438-333-3506",
    },
  },
  password: {
    required: "Le mot de passe est requis",
    minLength: {value: 8, message: "Le mot de passe doit contenir au moins 8 caractères"},
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      message:
        "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial",
    },
  },
  birthDate: {
    required: "La date de naissance est requise",
  },
};
