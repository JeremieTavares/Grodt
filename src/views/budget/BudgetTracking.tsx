import {Toaster} from "@/components/ui/sonner";
import {TransactionTable} from "./components/TransactionTable";
import {useTransactions} from "./hooks/useTransactions";
import {BudgetSummaryCard} from "./components/BudgetSummaryCard";
import {useTransactionCalculations} from "./hooks/useTransactionCalculations";
import {useAuth} from "@/hooks/useAuth";

export default function BudgetTracking() {
  const {user} = useAuth();
  const {transactions, isLoading, error, handleCreate, handleUpdate, handleDelete} = useTransactions(user?.id!);
  const {totalRevenues, totalExpenses, balance} = useTransactionCalculations(transactions);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-t-transparent border-[#433BFF]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <section className="container mx-auto">
      <Toaster position="top-right" richColors />
      <div className="mx-2 py-6 space-y-6">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <BudgetSummaryCard title="Revenus totaux" amount={totalRevenues} variant="revenue" />
          <BudgetSummaryCard title="Dépenses totales" amount={totalExpenses} variant="expense" />
          <BudgetSummaryCard title="Solde" amount={balance} variant="balance" />
        </section>

        <section className="space-y-6">
          <section>
            <h2 className="text-sm font-medium text-green-600 dark:text-green-400 mb-2">Revenus</h2>
            <TransactionTable
              type="Revenue"
              transactions={transactions.filter((t) => t.type === "Revenue")}
              onCreate={handleCreate}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          </section>

          <section>
            <h2 className="text-sm font-medium text-red-600 dark:text-red-400 mb-2">Dépenses</h2>
            <TransactionTable
              type="Expense"
              transactions={transactions.filter((t) => t.type === "Expense")}
              onCreate={handleCreate}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          </section>
        </section>
      </div>
    </section>
  );
}
