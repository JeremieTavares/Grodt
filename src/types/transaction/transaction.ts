import { User } from "../user/user";

export interface Transaction {
    id: number;
    description?: string;
    category?: string;
    amount: number;
    type: TransactionType;
    isDone: boolean;
    startDate: Date;
    endDate?: Date;
    frequency: TransactionFrequency;
    user?: User;
}

export type TransactionType = 'Revenue' | 'Expense';
export type TransactionFrequency = 1 | 7 | 14 | 30 | -1;
export const TRANSACTION_FREQUENCIES: TransactionFrequency[] = [1, 7, 14, 30, -1];

export type CreateTransactionDto = Omit<Transaction, 'id' | 'user'>;
export type UpdateTransactionDto = Omit<Transaction, 'id' | 'user'>;