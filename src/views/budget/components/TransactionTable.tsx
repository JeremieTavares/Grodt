import {useState} from "react";
import {Table, TableBody, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Transaction,
  TransactionType,
  CreateTransactionDto,
  UpdateTransactionDto,
  TRANSACTION_FREQUENCIES,
} from "@/types/transaction/transaction";
import {EXPENSE_CATEGORIES, ExpenseCategory, REVENUE_CATEGORIES, RevenueCategory} from "@/types/transaction/categories";
import {cn} from "@/lib/utils";
import TransactionRow from "./TransactionRow";
import NewTransactionRow from "./NewTransactionRow";
import {toast} from "sonner";
import {TransactionFrequency} from "../../../types/transaction/transaction";
interface TransactionTableProps {
  type: TransactionType;
  transactions: Transaction[];
  onUpdate: (transactionId: number, transaction: UpdateTransactionDto) => Promise<Transaction | false>;
  onDelete: (transaction: Transaction) => Promise<boolean>;
  onCreate: (data: CreateTransactionDto) => Promise<Transaction | false>;
}

const TransactionTable = ({type, transactions, onUpdate, onDelete, onCreate}: TransactionTableProps) => {
  const [deleteConfirm, setDeleteConfirm] = useState<Transaction | null>(null);

  const categories = type === "Expense" ? EXPENSE_CATEGORIES : REVENUE_CATEGORIES;

  const handleTransactionUpdate = (transaction: Transaction, field: keyof Transaction, value: string | number) => {
    // Amount validation
    if (
      field === "amount" &&
      (value === "" || value === null || value === undefined || parseFloat(value.toString()) <= 0)
    ) {
      toast.error("Le montant doit être un nombre positif");
      return;
    }

    // Start date validation
    if (field === "startDate" && (value === "" || value === null || value === undefined)) {
      toast.error("La date de début est obligatoire et doit être une valeur valide");
      return;
    }

    // Frequency validation
    if (
      field === "frequency" &&
      (value === "" ||
        value === null ||
        value === undefined ||
        !TRANSACTION_FREQUENCIES.includes(parseInt(value.toString()) as TransactionFrequency))
    ) {
      toast.error("La fréquence est obligatoire et doit être un nombre valide");
      return;
    }

    // Category validation
    if (
      field === "category" &&
      type === "Expense" &&
      !EXPENSE_CATEGORIES.includes(value.toString() as ExpenseCategory)
    ) {
      toast.error("La catégorie est obligatoire et doit être une valeur valide");
      return;
    }

    // Revenue category validation
    if (
      field === "category" &&
      type === "Revenue" &&
      !REVENUE_CATEGORIES.includes(value.toString() as RevenueCategory)
    ) {
      toast.error("La catégorie est obligatoire et doit être une valeur valide");
      return;
    }

    // Remove the user and id from the transaction body to avoid sending them to the server
    const {id, user, ...updateData} = {
      ...transaction,
      [field]: value,
    };
    onUpdate(transaction.id, updateData);
  };

  const tableClasses = {
    header: cn(
      "p-2 text-sm font-medium",
      type === "Revenue" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400",
    ),
    cell: "p-2 align-middle [&:has([role=checkbox])]:pr-0",
    amount: cn(
      "font-medium",
      type === "Revenue" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400",
    ),
  };

  const inputStyles = "h-8 pl-2 focus:pl-2 border-0 focus:border-input shadow-none";
  const selectTriggerStyles =
    "h-8 pl-2 focus:pl-2 border-0 shadow-none focus-visible:ring-1 focus:ring-1 focus:ring-slate-400 focus-visible:ring-slate-400 bg-white dark:bg-background";

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-muted/50">
              <TableHead className={tableClasses.header}>Description</TableHead>
              <TableHead className={tableClasses.header}>Catégorie</TableHead>
              <TableHead className={tableClasses.header}>Fréquence</TableHead>
              <TableHead className={cn(tableClasses.header, "text-right")}>Montant</TableHead>
              <TableHead className={tableClasses.header}>Date</TableHead>
              <TableHead className={tableClasses.header}></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TransactionRow
                key={transaction.id}
                transaction={transaction}
                onUpdate={(field, value) => handleTransactionUpdate(transaction, field, value)}
                onDelete={() => setDeleteConfirm(transaction)}
                categories={categories}
                tableClasses={tableClasses}
                inputStyles={inputStyles}
                selectTriggerStyles={selectTriggerStyles}
              />
            ))}

            <NewTransactionRow
              type={type}
              categories={categories}
              onCreate={onCreate}
              tableClasses={tableClasses}
              inputStyles={inputStyles}
              selectTriggerStyles={selectTriggerStyles}
            />
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. La transaction sera définitivement supprimée.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                if (deleteConfirm) {
                  await onDelete(deleteConfirm);
                  setDeleteConfirm(null);
                }
              }}
              className="bg-destructive hover:bg-destructive/90 text-white cursor-pointer"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default TransactionTable;
