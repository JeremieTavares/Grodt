import {ValidationRules} from "@/types/form/validation";
import {SchoolFormFields} from "@/types/form/school";
import {REGEX_SCHOOL_NAME, REGEX_FIELD_OF_STUDY} from "@/utils/regex";

export const schoolFormValidation: ValidationRules<SchoolFormFields> = {
  schoolName: {
    required: "Le nom de l'établissement est requis",
    pattern: {
      value: REGEX_SCHOOL_NAME,
      message: "Le nom de l'établissement ne doit contenir que des lettres",
    },
  },
  fieldOfStudy: {
    required: "Le programme d'études est requis",
    pattern: {
      value: REGEX_FIELD_OF_STUDY,
      message: "Le programme d'études ne doit contenir que des lettres",
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
    required: "La date de fin prévue des études est requise",
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
