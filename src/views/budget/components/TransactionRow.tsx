import {memo} from "react";
import {TableCell, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {LuMinus} from "react-icons/lu";
import {cn} from "@/lib/utils";
import {Transaction} from "@/types/transaction/transaction";
import EditableCell from "./EditableCell";

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

const TransactionRow = memo(
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
      {/* Description */}
      <TableCell className={cn(tableClasses.cell, "min-w-52")}>
        <EditableCell
          value={transaction.description || ""}
          onUpdate={(value) => onUpdate("description", value)}
          className={inputStyles}
        />
      </TableCell>

      {/* Category */}
      <TableCell className={tableClasses.cell}>
        <EditableCell
          value={transaction.category || ""}
          onUpdate={(value) => onUpdate("category", value)}
          className={selectTriggerStyles}
          type="select"
          options={categories.map((category) => ({value: category, label: category}))}
        />
      </TableCell>

      {/* Frequency */}
      <TableCell className={tableClasses.cell}>
        <EditableCell
          value={transaction.frequency.toString()}
          onUpdate={(value) => onUpdate("frequency", value)}
          className={selectTriggerStyles}
          type="select"
          options={[
            {value: "1", label: "Jour"},
            {value: "7", label: "Semaine"},
            {value: "14", label: "Deux semaines"},
            {value: "30", label: "Mois"},
            {value: "-1", label: "Aucune récurrence"},
          ]}
        />
      </TableCell>

      {/* Amount */}
      <TableCell className={cn(tableClasses.cell, tableClasses.amount, "min-w-32")}>
        <EditableCell
          value={transaction.amount}
          onUpdate={(value) => onUpdate("amount", value)}
          className={cn(inputStyles, "text-right")}
          type="number"
          debounceTime={2000}
        />
      </TableCell>

      {/* Start Date */}
      <TableCell className={tableClasses.cell}>
        <EditableCell
          value={transaction.startDate.toString()}
          onUpdate={(value) => onUpdate("startDate", value)}
          className={selectTriggerStyles}
          type="date"
        />
      </TableCell>

      {/* Delete Button */}
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

export default TransactionRow;
