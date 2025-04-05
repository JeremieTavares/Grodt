import {ValidationRules} from "@/types/form/validation";
import {BankingFormFields} from "@/types/form/banking";
import {REGEX_INSTITUTION} from "@/utils/regex";

export const bankingFormValidation: ValidationRules<BankingFormFields> = {
  institutionName: {
    validate: (value, formValues) => {
      // Si aucun champ n'est rempli, pas besoin de validation
      if (!value && !formValues.accountInfo) {
        return true;
      }

      // Si au moins un champ est rempli, tous les champs sont requis
      if (!value) {
        return "Le nom de l'institution est requis";
      }

      // Validation de la longueur
      if (value.length < 2) {
        return "Le nom de l'institution doit contenir au moins 2 caractères";
      }

      // Validation du format
      if (!REGEX_INSTITUTION.test(value)) {
        return "Le nom de l'institution ne peut contenir que des lettres, espaces et tirets";
      }

      return true;
    },
  },
  accountInfo: {
    validate: (value, formValues) => {
      // Si aucun champ n'est rempli, pas besoin de validation
      if (!value && !formValues.institutionName) {
        return true;
      }

      // Si au moins un champ est rempli, tous les champs sont requis
      if (!value) {
        return "Les informations du compte sont requises";
      }

      // Validation de la longueur
      if (value.length < 2) {
        return "Les informations du compte doivent contenir au moins 2 caractères";
      }

      return true;
    },
  },
};
