import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {CalendarPlus, AlertCircle} from "lucide-react";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Transaction} from "@/types/transaction/transaction";
import {useTransactionCalculations} from "../hooks/useTransactionCalculations";

interface DialogNewMonthProps {
  onConfirm: () => void;
  transactions: Transaction[];
}

const DialogNewMonth = ({onConfirm, transactions}: DialogNewMonthProps) => {
  const nonRecurringTransactions = transactions.filter((t) => t.frequency === -1);
  const hasTransactions = nonRecurringTransactions.length > 0;
  const {totalRevenues, totalExpenses} = useTransactionCalculations(nonRecurringTransactions);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className={cn(
            "ml-auto mb-0 flex justify-center md:justify-start items-center p-2 rounded hover:bg-[#372fbf] cursor-pointer text-white bg-[#433BFF] transition-all",
          )}
        >
          <CalendarPlus className="w-4 h-4 mr-1" /> Nouveau mois
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Nouveau mois</DialogTitle>
          <DialogDescription className="text-base pt-2">
            {hasTransactions
              ? "Les transactions non récurrentes suivantes seront supprimées :"
              : "Aucune transaction non récurrente ne sera supprimée."}
          </DialogDescription>
        </DialogHeader>

        {hasTransactions && (
          <>
            <ScrollArea className="max-h-[300px]">
              <div className="space-y-3">
                {nonRecurringTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-900"
                  >
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p
                        className={cn(
                          "text-sm",
                          transaction.type === "Expense"
                            ? "text-red-600 dark:text-red-400"
                            : "text-green-600 dark:text-green-400",
                        )}
                      >
                        {transaction.type === "Expense" ? "-" : "+"}
                        {transaction.amount}$
                      </p>
                    </div>
                    <AlertCircle className="w-4 h-4 text-amber-500" />
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="grid grid-cols-2 gap-4 mt-4 mb-2">
              <p className="text-sm text-slate-500 dark:text-slate-400 col-span-2">
                Totaux des transactions non récurrentes qui seront supprimées:
              </p>
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900">
                <p className="text-sm text-slate-500 dark:text-slate-400">Total des revenus</p>
                <p className="text-lg font-semibold text-green-600 dark:text-green-400">{totalRevenues.toFixed(2)}$</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900">
                <p className="text-sm text-slate-500 dark:text-slate-400">Total des dépenses</p>
                <p className="text-lg font-semibold text-red-600 dark:text-red-400">{totalExpenses.toFixed(2)}$</p>
              </div>
            </div>
          </>
        )}

        <DialogFooter className="flex gap-2 justify-end mt-6">
          <DialogTrigger asChild>
            <Button variant="outline">Annuler</Button>
          </DialogTrigger>
          <DialogTrigger asChild>
            <Button onClick={onConfirm} variant="destructive">
              Confirmer
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogNewMonth;
