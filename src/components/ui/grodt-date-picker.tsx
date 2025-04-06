import {cn} from "@/lib/utils";
import {endOfMonth, format, parseISO, startOfMonth} from "date-fns";
import {frCA} from "date-fns/locale";
import {LuCalendar} from "react-icons/lu";
import {useState} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "./popover";
import {Button} from "./button";
import {Calendar} from "./calendar";

interface DatePickerProps {
  date: Date | string | null;
  placeholder?: string;
  className?: string;
  onSelect: (date: Date) => void;
  closeOnSelect?: boolean;
  autoFocus?: boolean;
}

export const DatePicker = ({
  date,
  placeholder,
  className,
  onSelect,
  closeOnSelect = true,
  autoFocus = false,
}: DatePickerProps) => {
  const [open, setOpen] = useState(false);
  const currentMonth = new Date();
  const fromDate = startOfMonth(currentMonth);
  const toDate = endOfMonth(currentMonth);
  let hadAnInitialDate = date !== null && date !== "";
  let initialDate: Date;

  if (typeof date === "string" && date !== "") {
    initialDate = parseISO(date);
  } else if (date instanceof Date) {
    initialDate = date;
  } else {
    initialDate = new Date();
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          autoFocus={autoFocus}
          variant="ghost"
          className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground", className)}
        >
          <LuCalendar className="h-4 w-4" />
          {hadAnInitialDate ? format(initialDate, "d MMM yyyy", {locale: frCA}) : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          locale={frCA}
          mode="single"
          selected={hadAnInitialDate ? initialDate : undefined}
          onSelect={(date) => {
            if (date) {
              onSelect(date);
              if (closeOnSelect) setOpen(false);
            }
          }}
          fromDate={fromDate}
          toDate={toDate}
        />
      </PopoverContent>
    </Popover>
  );
};
