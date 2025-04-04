import {ValidationRules} from "@/types/form/validation";
import {SchoolFormFields} from "@/types/form/school";
import {REGEX_SCHOOL_NAME, REGEX_FIELD_OF_STUDY} from "@/utils/regex";

export const schoolFormValidation: ValidationRules<SchoolFormFields> = {
  schoolName: {
    validate: (value, formValues) => {
      // Si aucun champ n'est rempli, pas besoin de validation
      if (!value && !formValues.fieldOfStudy && !formValues.startDate && !formValues.projectedEndDate) {
        return true;
      }

      // Si au moins un champ est rempli, tous les champs sont requis
      if (!value) {
        return "Le nom de l'établissement est requis";
      }

      // Validation du format
      if (!REGEX_SCHOOL_NAME.test(value)) {
        return "Le nom de l'établissement ne doit contenir que des lettres";
      }

      return true;
    },
  },
  fieldOfStudy: {
    validate: (value, formValues) => {
      // Si aucun champ n'est rempli, pas besoin de validation
      if (!value && !formValues.schoolName && !formValues.startDate && !formValues.projectedEndDate) {
        return true;
      }

      // Si au moins un champ est rempli, tous les champs sont requis
      if (!value) {
        return "Le programme d'études est requis";
      }

      // Validation du format
      if (!REGEX_FIELD_OF_STUDY.test(value)) {
        return "Le programme d'études ne doit contenir que des lettres";
      }

      return true;
    },
  },
  startDate: {
    validate: (value, formValues) => {
      // Si aucun champ n'est rempli, pas besoin de validation
      if (!value && !formValues.schoolName && !formValues.fieldOfStudy && !formValues.projectedEndDate) {
        return true;
      }

      // Si au moins un champ est rempli, tous les champs sont requis
      if (!value) {
        return "La date de début des études est requise";
      }

      // Validation de la date
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        return "La date de début des études est invalide";
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset time to midnight for accurate date comparison
      if (date > today) {
        return "La date de début des études ne peut pas être dans le futur";
      }

      return true;
    },
  },
  projectedEndDate: {
    validate: (value, formValues) => {
      // Si aucun champ n'est rempli, pas besoin de validation
      if (!value && !formValues.schoolName && !formValues.fieldOfStudy && !formValues.startDate) {
        return true;
      }

      // Si la date de fin est vide mais que d'autres champs sont remplis, c'est OK
      if (!value && formValues.schoolName && formValues.fieldOfStudy && formValues.startDate) {
        return true;
      }

      // Si la date de fin est fournie, elle doit être valide
      if (value) {
        const date = new Date(value);
        if (isNaN(date.getTime())) {
          return "La date de fin prévue des études est invalide";
        }

        const startDate = new Date(formValues.startDate);
        if (date < startDate) {
          return "La date de fin prévue doit être après la date de début";
        }
      }

      return true;
    },
  },
};
