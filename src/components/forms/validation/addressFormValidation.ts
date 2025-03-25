import {AddressFormFields} from "@/types/form/address";
import {ValidationRules} from "@/types/form/validation";

export const addressFormValidation: ValidationRules<AddressFormFields> = {
  streetNumber: {
    required: "Le numéro civique est requis",
    pattern: {
      value: /^[0-9]+$/,
      message: "Le numéro civique doit être un nombre",
    },
  },
  streetName: {
    required: "Le nom de la rue est requis",
    minLength: {
      value: 2,
      message: "Le nom de la rue doit contenir au moins 2 caractères",
    },
  },
  city: {
    required: "La ville est requise",
    minLength: {
      value: 2,
      message: "Le nom de la ville doit contenir au moins 2 caractères",
    },
  },
  province: {
    required: "La province est requise",
  },
  country: {
    required: "Le pays est requis",
  },
};
