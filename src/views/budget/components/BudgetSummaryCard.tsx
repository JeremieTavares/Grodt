import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {cn} from "@/lib/utils";
import {memo} from "react";

export interface BudgetSummaryCardProps {
  title: string;
  amount: number;
  variant: "revenue" | "expense" | "balance";
}

const BudgetSummaryCard = memo(({title, amount, variant}: BudgetSummaryCardProps) => {
  const isPositive = amount >= 0;

  const getVariantStyles = () => {
    switch (variant) {
      case "revenue":
        return {
          card: "bg-green-500/5 dark:bg-green-500/10",
          text: "text-green-600 dark:text-green-400",
        };
      case "expense":
        return {
          card: "bg-red-500/5 dark:bg-red-500/10",
          text: "text-red-600 dark:text-red-400",
        };
      case "balance":
        return {
          card: isPositive ? "bg-green-500/5 dark:bg-green-500/10" : "bg-red-500/5 dark:bg-red-500/10",
          text: isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400",
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <Card className={cn(styles.card, "py-0 gap-0")}>
      <CardHeader className="pb-0 pt-4 px-4">
        <CardTitle className={cn("text-sm font-medium", variant !== "balance" ? styles.text : "")}>{title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-4 px-4">
        <p className={cn("text-xl font-bold", styles.text)}>
          {amount.toLocaleString("fr-CA", {style: "currency", currency: "CAD"})}
        </p>
      </CardContent>
    </Card>
  );
});

export default BudgetSummaryCard;
