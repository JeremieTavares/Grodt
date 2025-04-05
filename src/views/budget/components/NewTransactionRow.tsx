import {memo, useRef, useCallback, useState} from "react";
import {TableCell, TableRow} from "@/components/ui/table";
import {
  TransactionType,
  CreateTransactionDto,
  Transaction,
  TransactionFrequency,
} from "@/types/transaction/transaction";
import {cn} from "@/lib/utils";
import {EditableCell} from "./EditableCell";

interface NewTransactionRowProps {
  type: TransactionType;
  categories: readonly string[];
  onCreate: (data: CreateTransactionDto) => Promise<Transaction | false>;
  tableClasses: {
    cell: string;
  };
  inputStyles: string;
  selectTriggerStyles: string;
}

export const NewTransactionRow = memo(
  ({type, categories, onCreate, tableClasses, inputStyles, selectTriggerStyles}: NewTransactionRowProps) => {
    // Refs to avoid re-render if all fields are not filled
    const descriptionRef = useRef("");
    const amountRef = useRef<number | null>(null);
    const categoryRef = useRef("");
    const frequencyRef = useRef<number | null>(null);
    // Reset key to force re-render of the EditableCell when creation or updating a transaction
    const [resetKey, setResetKey] = useState(0);

    // Try to create a transaction if all fields are filled
    const attemptCreate = useCallback(async () => {
      if (descriptionRef.current && categoryRef.current && amountRef.current) {
        try {
          const transaction = await onCreate({
            type,
            isDone: false,
            frequency: -1,
            description: descriptionRef.current,
            category: categoryRef.current,
            amount: amountRef.current,
            startDate: new Date(),
          } as CreateTransactionDto);

          if (transaction) {
            // Reset values
            setResetKey((prev) => prev + 1); // force re-render of the EditableCell
            descriptionRef.current = "";
            categoryRef.current = "";
            amountRef.current = null;
          }
        } catch (error) {
          console.error("Erreur lors de la création:", error);
        }
      }
    }, [onCreate, type]);

    const handleDescriptionUpdate = useCallback((value: string | number) => {
      descriptionRef.current = value as string;
    }, []);

    const handleCategoryUpdate = useCallback(
      (value: string | number) => {
        categoryRef.current = value as string;
        // Attempt to create after category change
        setTimeout(attemptCreate, 0);
      },
      [attemptCreate],
    );

    const handleFrequencyUpdate = useCallback(
      (value: string | number) => {
        frequencyRef.current = parseInt(value as string) as TransactionFrequency;
        // Attempt to create after frequency change
        setTimeout(attemptCreate, 0);
      },
      [attemptCreate],
    );

    const handleAmountUpdate = useCallback((value: string | number) => {
      amountRef.current = value as number;
    }, []);

    return (
      <TableRow className="hover:bg-muted/50">
        <TableCell className={cn(tableClasses.cell, "w-1/3")}>
          <EditableCell
            key={`desc-${resetKey}`}
            value={descriptionRef.current}
            onUpdate={handleDescriptionUpdate}
            className={inputStyles}
            placeholder="Entrer une description"
            onBlur={attemptCreate}
          />
        </TableCell>
        <TableCell className={cn(tableClasses.cell, "w-1/3")}>
          <EditableCell
            key={`cat-${resetKey}`}
            value={categoryRef.current}
            onUpdate={handleCategoryUpdate}
            className={selectTriggerStyles}
            type="select"
            options={categories.map((category) => ({value: category, label: category}))}
            placeholder="Choisir une catégorie"
          />
        </TableCell>

        <TableCell className={tableClasses.cell}>
          <EditableCell
            key={`freq-${resetKey}`}
            value={frequencyRef.current || ""}
            onUpdate={handleFrequencyUpdate}
            className={selectTriggerStyles}
            type="select"
            options={[
              {value: "1", label: "Jour"},
              {value: "7", label: "Semaine"},
              {value: "14", label: "Deux semaines"},
              {value: "30", label: "Mois"},
              {value: "-1", label: "Aucune récurrence"},
            ]}
            placeholder="Choisir une fréquence"
          />
        </TableCell>

        <TableCell className={tableClasses.cell}>
          <EditableCell
            key={`amount-${resetKey}`}
            value={amountRef.current || ""}
            onUpdate={handleAmountUpdate}
            className={cn(inputStyles, "text-right")}
            type="number"
            placeholder="0.00"
            onBlur={attemptCreate}
          />
        </TableCell>
        <TableCell className={tableClasses.cell}></TableCell>
        <TableCell className={tableClasses.cell}></TableCell>
      </TableRow>
    );
  },
);
