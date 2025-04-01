import {ValidationRules} from "@/types/form/validation";
import {BankingFormFields} from "@/types/form/banking";
import {REGEX_INSTITUTION} from "@/utils/regex";

export const bankingFormValidation: ValidationRules<BankingFormFields> = {
  institutionName: {
    required: "Le nom de l'institution est requis",
    minLength: {
      value: 2,
      message: "Le nom de l'institution doit contenir au moins 2 caractères",
    },
    pattern: {
      value: REGEX_INSTITUTION,
      message: "Le nom de l'institution ne peut contenir que des lettres, espaces et tirets",
    },
  },
  accountInfo: {
    required: "Les informations du compte sont requises",
    minLength: {
      value: 2,
      message: "Les informations du compte doivent contenir au moins 2 caractères",
    },
  },
};
