import {memo} from "react";
import {TableCell, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {LuMinus} from "react-icons/lu";
import {format} from "date-fns";
import {fr} from "date-fns/locale";
import {cn} from "@/lib/utils";
import {Transaction} from "@/types/transaction/transaction";
import {EditableCell} from "./EditableCell";

interface TransactionRowProps {
  transaction: Transaction;
  onUpdate: (field: keyof Transaction, value: string | number) => void;
  onDelete: (transaction: Transaction) => void;
  categories: readonly string[];
  tableClasses: {
    cell: string;
    amount: string;
  };
  inputStyles: string;
  selectTriggerStyles: string;
}

export const TransactionRow = memo(
  ({
    transaction,
    onUpdate,
    onDelete,
    categories,
    tableClasses,
    inputStyles,
    selectTriggerStyles,
  }: TransactionRowProps) => (
    <TableRow className="hover:bg-muted/50">
      <TableCell className={tableClasses.cell}>
        <EditableCell
          value={transaction.description || ""}
          onUpdate={(value) => onUpdate("description", value)}
          className={inputStyles}
        />
      </TableCell>
      <TableCell className={tableClasses.cell}>
        <EditableCell
          value={transaction.category || ""}
          onUpdate={(value) => onUpdate("category", value)}
          className={selectTriggerStyles}
          type="category"
          categories={categories}
        />
      </TableCell>
      <TableCell className={cn(tableClasses.cell, tableClasses.amount)}>
        <EditableCell
          value={transaction.amount}
          onUpdate={(value) => onUpdate("amount", value)}
          className={cn(inputStyles, "text-right")}
          type="number"
        />
      </TableCell>
      <TableCell className={tableClasses.cell}>
        {format(new Date(transaction.startDate), "d MMM yyyy", {locale: fr})}
      </TableCell>
      <TableCell className={tableClasses.cell}>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(transaction)}
          className="cursor-pointer h-8 w-8 text-destructive dark:text-red-500 hover:text-red-600 dark:hover:bg-destructive/40 hover:bg-destructive/10"
        >
          <LuMinus className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  ),
);

TransactionRow.displayName = "TransactionRow";
