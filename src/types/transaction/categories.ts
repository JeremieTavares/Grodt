export const EXPENSE_CATEGORIES = [
    'Logement',
    'Transport',
    'Alimentation',
    'Santé',
    'Éducation',
    'Loisirs',
    'Vêtements',
    'Assurances',
    'Télécommunications',
    'Autres',
] as const;

export const REVENUE_CATEGORIES = [
    'Salaire',
    'Bourse',
    'Investissements',
    'Remboursements',
    'Cadeaux',
    'Autres',
] as const;

export type ExpenseCategory = typeof EXPENSE_CATEGORIES[number];
export type RevenueCategory = typeof REVENUE_CATEGORIES[number]; 