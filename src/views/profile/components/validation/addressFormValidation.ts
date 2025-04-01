import {AddressFormFields} from "@/types/form/address";
import {ValidationRules} from "@/types/form/validation";
import {REGEX_STREET_NUMBER, REGEX_CITY, REGEX_STREET_NAME} from "@/utils/regex";

export const addressFormValidation: ValidationRules<AddressFormFields> = {
  streetNumber: {
    required: "Le numéro civique est requis",
    pattern: {
      value: REGEX_STREET_NUMBER,
      message: "Le numéro civique doit être un nombre",
    },
  },
  streetName: {
    required: "Le nom de la rue est requis",
    minLength: {
      value: 2,
      message: "Le nom de la rue doit contenir au moins 2 caractères",
    },
    pattern: {
      value: REGEX_STREET_NAME,
      message: "Le nom de la rue ne peut contenir que des lettres, espaces et tirets",
    },
  },
  city: {
    required: "La ville est requise",
    minLength: {
      value: 2,
      message: "Le nom de la ville doit contenir au moins 2 caractères",
    },
    pattern: {
      value: REGEX_CITY,
      message: "La ville ne peut pas contenir de chiffres",
    },
  },
  province: {
    required: "La province est requise",
  },
  country: {
    required: "Le pays est requis",
  },
};
