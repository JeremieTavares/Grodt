import {useEffect, useState, useMemo, memo} from "react";
import {useApi} from "@/hooks/useApi";
import {Transaction, CreateTransactionDto} from "@/types/transaction/transaction";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {useAuth} from "@/hooks/useAuth";
import {TransactionTable} from "./components/TransactionTable";
import {cn} from "@/lib/utils";
import {Toaster} from "@/components/ui/sonner";
import {useTransactionToast} from "@/hooks/useTransactionToast";

interface TotalsCardsProps {
  totalRevenues: number;
  totalExpenses: number;
  balance: number;
}

const TotalsCards = memo(({totalRevenues, totalExpenses, balance}: TotalsCardsProps) => (
  <section className="grid grid-cols-1 md:grid-cols-3 gap-3">
    <Card className="bg-green-500/5 dark:bg-green-500/10 py-0 gap-0">
      <CardHeader className="pb-0 pt-4 px-4">
        <CardTitle className="text-sm font-medium text-green-600 dark:text-green-400">Revenus totaux</CardTitle>
      </CardHeader>
      <CardContent className="pb-4 px-4">
        <p className="text-xl font-bold text-green-600 dark:text-green-400">
          {totalRevenues.toLocaleString("fr-CA", {style: "currency", currency: "CAD"})}
        </p>
      </CardContent>
    </Card>

    <Card className="bg-red-500/5 dark:bg-red-500/10 py-0 gap-0">
      <CardHeader className="pb-0 pt-4 px-4">
        <CardTitle className="text-sm font-medium text-red-600 dark:text-red-400">Dépenses totales</CardTitle>
      </CardHeader>
      <CardContent className="pb-4 px-4">
        <p className="text-xl font-bold text-red-600 dark:text-red-400">
          {totalExpenses.toLocaleString("fr-CA", {style: "currency", currency: "CAD"})}
        </p>
      </CardContent>
    </Card>

    <Card
      className={cn(
        balance >= 0 ? "bg-green-500/5 dark:bg-green-500/10" : "bg-red-500/5 dark:bg-red-500/10",
        "py-0 gap-0",
      )}
    >
      <CardHeader className="pb-0 pt-4 px-4">
        <CardTitle className="text-sm font-medium">Solde</CardTitle>
      </CardHeader>
      <CardContent className="pb-4 px-4">
        <p
          className={cn(
            "text-xl font-bold",
            balance >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400",
          )}
        >
          {balance.toLocaleString("fr-CA", {style: "currency", currency: "CAD"})}
        </p>
      </CardContent>
    </Card>
  </section>
));

TotalsCards.displayName = "TotalsCards";

export default function BudgetTracking() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {user} = useAuth();
  const api = useApi(user?.id);
  const transactionToast = useTransactionToast();

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!api.transactions || !user?.id) return false;

      try {
        const response = await api.transactions.getAll();
        if (response.data) {
          setTransactions(response.data);
        }
      } catch (err) {
        setError("Échec du chargement des transactions");
        console.error("Erreur lors du chargement des transactions:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [api.transactions, user?.id]);

  const handleUpdateTransaction = async (transaction: Transaction): Promise<Transaction | false> => {
    if (!api.transactions || !user?.id) return false;

    try {
      const toastId = transactionToast.updateLoadingToast({
        type: transaction.type,
        description: transaction.description,
        amount: Number(transaction.amount),
      });

      await api.transactions.updateById(transaction.id, transaction);
      setTransactions((prev) => prev.map((t) => (t.id === transaction.id ? transaction : t)));

      transactionToast.updateToast(toastId, {
        type: transaction.type,
        description: transaction.description,
        amount: Number(transaction.amount),
      });

      return transaction;
    } catch (err) {
      console.error("Erreur lors de la mise à jour:", err);
      transactionToast.errorToast("", err, {
        errorMessage: "Échec de la mise à jour",
        description: transaction.description,
      });

      return false;
    }
  };

  const handleDeleteTransaction = async (transaction: Transaction): Promise<boolean> => {
    if (!api.transactions || !user?.id) return false;

    try {
      const toastId = transactionToast.deleteLoadingToast({
        type: transaction.type,
        description: transaction.description,
        amount: Number(transaction.amount),
      });

      await api.transactions.deleteById(transaction.id);
      setTransactions((prev) => prev.filter((t) => t.id !== transaction.id));

      transactionToast.deleteToast(toastId, {
        type: transaction.type,
        description: transaction.description,
        amount: Number(transaction.amount),
      });

      return true;
    } catch (err) {
      console.error("Erreur lors de la suppression:", err);
      transactionToast.errorToast("", err, {
        errorMessage: "Échec de la suppression",
        description: transaction.description,
      });

      return false;
    }
  };

  const handleCreateTransaction = async (data: CreateTransactionDto): Promise<Transaction | false> => {
    if (!api.transactions || !user?.id) return false;

    try {
      const toastId = transactionToast.createLoadingToast({
        type: data.type,
        description: data.description,
        amount: Number(data.amount),
      });

      const response = await api.transactions.create(data);
      if (response.data) {
        setTransactions((prev) => [...prev, response.data]);

        transactionToast.createToast(toastId, {
          type: data.type,
          description: data.description,
          amount: Number(data.amount),
        });

        return response.data;
      }
      throw new Error("Échec de la création");
    } catch (err) {
      console.error("Erreur lors de la création:", err);
      transactionToast.errorToast("", err, {
        errorMessage: "Échec de la création",
        description: data.description,
      });
      return false;
    }
  };

  const {totalRevenues, totalExpenses, balance} = useMemo(() => {
    const totalRevenues = transactions
      .filter((t) => t.type === "Revenue")
      .reduce((acc, t) => acc + Number(t.amount), 0);

    const totalExpenses = transactions
      .filter((t) => t.type === "Expense")
      .reduce((acc, t) => acc + Number(t.amount), 0);

    return {
      totalRevenues,
      totalExpenses,
      balance: totalRevenues - totalExpenses,
    };
  }, [transactions]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#433BFF]" />
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
        <TotalsCards totalRevenues={totalRevenues} totalExpenses={totalExpenses} balance={balance} />

        <section className="space-y-6">
          <section>
            <h2 className="text-sm font-medium text-green-600 dark:text-green-400 mb-2">Revenus</h2>
            <TransactionTable
              type="Revenue"
              transactions={transactions.filter((t) => t.type === "Revenue")}
              onUpdate={handleUpdateTransaction}
              onDelete={handleDeleteTransaction}
              onCreate={handleCreateTransaction}
            />
          </section>

          <section>
            <h2 className="text-sm font-medium text-red-600 dark:text-red-400 mb-2">Dépenses</h2>
            <TransactionTable
              type="Expense"
              transactions={transactions.filter((t) => t.type === "Expense")}
              onUpdate={handleUpdateTransaction}
              onDelete={handleDeleteTransaction}
              onCreate={handleCreateTransaction}
            />
          </section>
        </section>
      </div>
    </section>
  );
}
