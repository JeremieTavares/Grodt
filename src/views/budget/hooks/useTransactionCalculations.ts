import { useMemo } from "react";
import { Transaction } from "@/types/transaction/transaction";

export const useTransactionCalculations = (transactions: Transaction[]) => {
    return useMemo(() => {
        const totalRevenues = transactions
            .filter((t) => t.type === "Revenue")
            .reduce((acc, t) => acc + Number(t.amount), 0);

        const totalExpenses = transactions
            .filter((t) => t.type === "Expense")
            .reduce((acc, t) => acc + Number(t.amount), 0);

        const balance = totalRevenues - totalExpenses;

        return {
            totalRevenues,
            totalExpenses,
            balance,
        };
    }, [transactions]);
}; 