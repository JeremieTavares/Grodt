// Formats de téléphone acceptés:
// 514 990 3222
// 514-990-3222
// (514)-990-3222
export const REGEX_PHONE = /^(\(\d{3}\)|\d{3})[-\s]\d{3}[-\s]\d{4}$/;

// Format d'email standard
export const REGEX_EMAIL = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

// Validation pour les champs alphanumériques
export const REGEX_ALPHANUMERIC = /^[a-zA-Z0-9]+$/;

// Format de code postal canadien: A1A 1A1 ou A1A-1A1
export const REGEX_ZIPCODE_CA = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;

// Validation pour les noms de ville (lettres, espaces, tirets et accents)
export const REGEX_CITY = /^[a-zA-ZÀ-ÿ\s-]+$/;

// Validation pour les noms et prénoms (lettres, espaces, tirets et accents)
export const REGEX_NAME = /^[a-zA-ZÀ-ÿ\s-]+$/;

// Validation pour les numéros civiques
export const REGEX_STREET_NUMBER = /^[0-9]+$/;

// Validation pour les noms d'institutions (lettres, espaces, tirets et accents)
export const REGEX_INSTITUTION = /^[a-zA-ZÀ-ÿ\s-]+$/;

// Validation pour les noms de rue (lettres, espaces, tirets et accents)
export const REGEX_STREET_NAME = /^[a-zA-ZÀ-ÿ\s-]+$/;

// Validation de mot de passe fort
// Au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial
export const REGEX_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Validation pour le nom de l'établissement scolaire
export const REGEX_SCHOOL_NAME = /^[a-zA-ZÀ-ÿ\s'-]+$/;

// Validation pour le programme d'études
export const REGEX_FIELD_OF_STUDY = /^[a-zA-ZÀ-ÿ\s'-]+$/;
