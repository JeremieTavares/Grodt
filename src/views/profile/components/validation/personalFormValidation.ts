import {ValidationRules} from "@/types/form/validation";
import {PersonalFormFields} from "@/types/form/personal";
import {REGEX_EMAIL, REGEX_PHONE, REGEX_PASSWORD, REGEX_NAME} from "@/utils/regex";

export const personalFormValidation: ValidationRules<PersonalFormFields> = {
  firstName: {
    required: "Le prénom est requis",
    minLength: {value: 2, message: "Le prénom doit contenir au moins 2 caractères"},
    pattern: {
      value: REGEX_NAME,
      message: "Le prénom ne peut contenir que des lettres, espaces et tirets",
    },
  },
  lastName: {
    minLength: {value: 2, message: "Le nom doit contenir au moins 2 caractères"},
    pattern: {
      value: REGEX_NAME,
      message: "Le nom ne peut contenir que des lettres, espaces et tirets",
    },
  },
  email: {
    required: "L'email est requis",
    pattern: {
      value: REGEX_EMAIL,
      message: "Adresse email invalide",
    },
  },
  phone: {
    pattern: {
      value: REGEX_PHONE,
      message: "Format invalide. Exemples: 514 990 3222, 514-990-3222 ou (514)-990-3222",
    },
  },
  password: {
    required: "Le mot de passe est requis",
    minLength: {value: 8, message: "Le mot de passe doit contenir au moins 8 caractères"},
    pattern: {
      value: REGEX_PASSWORD,
      message:
        "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial",
    },
  },
  birthDate: {
    validate: (value) => {
      if (!value) return true;
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        return "La date de naissance est invalide";
      }
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset time to midnight for accurate date comparison
      if (date > today) {
        return "La date de naissance ne peut pas être dans le futur";
      }
      return true;
    },
  },
};
