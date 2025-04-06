import {memo, useRef, useCallback, useState} from "react";
import {TableCell, TableRow} from "@/components/ui/table";
import {
  TransactionType,
  CreateTransactionDto,
  Transaction,
  TransactionFrequency,
} from "@/types/transaction/transaction";
import {cn} from "@/lib/utils";
import {format} from "date-fns";
import {frCA} from "date-fns/locale";
import EditableCell from "./EditableCell";

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

const NewTransactionRow = memo(
  ({type, categories, onCreate, tableClasses, inputStyles, selectTriggerStyles}: NewTransactionRowProps) => {
    // Refs to avoid re-render if all fields are not filled
    const descriptionRef = useRef("");
    const amountRef = useRef<number | null>(null);
    const categoryRef = useRef("");
    const frequencyRef = useRef<number | null>(null);
    const startDateRef = useRef<string | null>(null);
    // Reset key to force re-render of the EditableCell when creation or updating a transaction
    const [resetKey, setResetKey] = useState(0);

    // Try to create a transaction if all fields are filled
    const attemptCreate = useCallback(async () => {
      if (
        descriptionRef.current &&
        categoryRef.current &&
        amountRef.current &&
        frequencyRef.current &&
        startDateRef.current
      ) {
        try {
          const isDone = Date.now() > new Date(startDateRef.current).getTime();
          const transaction = await onCreate({
            type,
            isDone,
            frequency: frequencyRef.current,
            description: descriptionRef.current,
            category: categoryRef.current,
            amount: amountRef.current,
            startDate: new Date(startDateRef.current),
          } as CreateTransactionDto);

          if (transaction) {
            // Reset values
            setResetKey((prev) => prev + 1); // force re-render of the EditableCell
            descriptionRef.current = "";
            categoryRef.current = "";
            frequencyRef.current = null;
            amountRef.current = null;
            startDateRef.current = null;
          }
        } catch (error) {
          console.error("Erreur lors de la création:", error);
        }
      }
    }, [onCreate, type]);

    const handleDescriptionUpdate = useCallback(
      (value: string | number) => {
        descriptionRef.current = value as string;

        // Attempt to create after description change
        setTimeout(attemptCreate, 0);
      },
      [attemptCreate],
    );

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

    const handleAmountUpdate = useCallback(
      (value: string | number) => {
        amountRef.current = value as number;
        // Attempt to create after amount change
        setTimeout(attemptCreate, 0);
      },
      [attemptCreate],
    );

    const handleStartDateUpdate = useCallback(
      (value: string | number) => {
        startDateRef.current = value as string;
        // Attempt to create after start date change
        setTimeout(attemptCreate, 0);
      },
      [attemptCreate],
    );

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
            value={frequencyRef.current?.toString() || ""}
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

        <TableCell className={tableClasses.cell}>
          <EditableCell
            key={`start-${resetKey}`}
            value={startDateRef.current}
            onUpdate={handleStartDateUpdate}
            onBlur={attemptCreate}
            className={selectTriggerStyles}
            type="date"
            placeholder={
              startDateRef.current
                ? format(new Date(startDateRef.current), "d MMM yyyy", {locale: frCA})
                : "Choisir une date"
            }
          />
        </TableCell>

        <TableCell className={cn(tableClasses.cell, "w-12")}></TableCell>
      </TableRow>
    );
  },
);

export default NewTransactionRow;
