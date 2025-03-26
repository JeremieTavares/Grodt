import {ValidationRules} from "@/types/form/validation";
import {SchoolFormFields} from "@/types/form/school";

export const schoolFormValidation: ValidationRules<SchoolFormFields> = {
  schoolName: {
    required: "Le nom de l'établissement est requis",
    minLength: {
      value: 2,
      message: "Le nom de l'établissement doit contenir au moins 2 caractères",
    },
  },
  fieldOfStudy: {
    required: "Le programme d'études est requis",
    minLength: {
      value: 2,
      message: "Le programme d'études doit contenir au moins 2 caractères",
    },
  },
  startDate: {
    required: "La date de début des études est requise",
    validate: (value) => {
      if (!value) return true;
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
      if (!value) return true;
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        return "La date de fin prévue des études est invalide";
      }
      const startDate = new Date(formValues.startDate);
      if (date < startDate) {
        return "La date de fin prévue doit être après la date de début";
      }
      return true;
    },
  },
};
