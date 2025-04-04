import {AddressFormFields} from "@/types/form/address";
import {ValidationRules} from "@/types/form/validation";
import {REGEX_STREET_NUMBER, REGEX_CITY, REGEX_STREET_NAME} from "@/utils/regex";

export const addressFormValidation: ValidationRules<AddressFormFields> = {
  streetNumber: {
    validate: (value, formValues) => {
      // Si aucun champ n'est rempli, pas besoin de validation
      if (!value && !formValues.streetName && !formValues.city) {
        return true;
      }

      // Si au moins un champ est rempli, tous les champs sont requis
      if (!value) {
        return "Le numéro civique est requis";
      }

      // Validation du format
      if (!REGEX_STREET_NUMBER.test(value)) {
        return "Le numéro civique doit être un nombre";
      }

      return true;
    },
  },
  streetName: {
    validate: (value, formValues) => {
      // Si aucun champ n'est rempli, pas besoin de validation
      if (!value && !formValues.streetNumber && !formValues.city) {
        return true;
      }

      // Si au moins un champ est rempli, tous les champs sont requis
      if (!value) {
        return "Le nom de la rue est requis";
      }

      // Validation de la longueur
      if (value.length < 2) {
        return "Le nom de la rue doit contenir au moins 2 caractères";
      }

      // Validation du format
      if (!REGEX_STREET_NAME.test(value)) {
        return "Le nom de la rue ne peut contenir que des lettres, espaces et tirets";
      }

      return true;
    },
  },
  city: {
    validate: (value, formValues) => {
      // Si aucun champ n'est rempli, pas besoin de validation
      if (!value && !formValues.streetNumber && !formValues.streetName) {
        return true;
      }

      // Si au moins un champ est rempli, tous les champs sont requis
      if (!value) {
        return "La ville est requise";
      }

      // Validation de la longueur
      if (value.length < 2) {
        return "Le nom de la ville doit contenir au moins 2 caractères";
      }

      // Validation du format
      if (!REGEX_CITY.test(value)) {
        return "La ville ne peut pas contenir de chiffres";
      }

      return true;
    },
  },
  province: {
    validate: (value, formValues) => {
      // Si aucun champ n'est rempli, pas besoin de validation
      if (!formValues.streetNumber && !formValues.streetName && !formValues.city) {
        return true;
      }

      // Si au moins un champ est rempli, tous les champs sont requis
      if (!value) {
        return "La province est requise";
      }

      return true;
    },
  },
  country: {
    validate: (value, formValues) => {
      // Si aucun champ n'est rempli, pas besoin de validation
      if (!formValues.streetNumber && !formValues.streetName && !formValues.city) {
        return true;
      }

      // Si au moins un champ est rempli, tous les champs sont requis
      if (!value) {
        return "Le pays est requis";
      }

      return true;
    },
  },
};
