import {useState, useEffect, memo, useMemo} from "react";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {DatePicker} from "@/components/ui/grodt-date-picker";
import {cn} from "@/lib/utils";
import debounce from "lodash/debounce";

export type SelectOption = {
  value: string;
  label: string;
};

interface EditableCellProps {
  value: string | number | null;
  onUpdate: (value: string | number) => void;
  className?: string;
  type?: "text" | "number" | "select" | "date";
  options?: readonly SelectOption[];
  placeholder?: string;
  onBlur?: (value: string | number | null) => void;
  autoFocus?: boolean;
  debounceTime?: number;
}

const EditableCell = memo(
  ({
    value,
    onUpdate,
    className,
    type = "text",
    options,
    placeholder,
    onBlur,
    autoFocus = false,
    debounceTime = 1000,
  }: EditableCellProps) => {
    const [localValue, setLocalValue] = useState(value);
    const debouncedUpdate = useMemo(
      () => debounce((newValue: string | number) => onUpdate(newValue), debounceTime),
      [onUpdate, debounceTime],
    );

    useEffect(() => {
      setLocalValue(value);
    }, [value]);

    useEffect(() => {
      return () => {
        debouncedUpdate.cancel();
      };
    }, [debouncedUpdate]);

    const handleChange = (newValue: string | number) => {
      setLocalValue(newValue);
      debouncedUpdate(newValue);
    };

    const handleInputBlur = () => {
      debouncedUpdate.flush();
      if (onBlur) onBlur(localValue);
    };

    if (type === "select") {
      return (
        <Select
          value={localValue as string}
          onValueChange={(newValue) => {
            handleChange(newValue);
          }}
        >
          <SelectTrigger className={cn("h-9 w-full", className)} autoFocus={autoFocus}>
            <SelectValue placeholder={placeholder || "Choisir une option"} />
          </SelectTrigger>
          <SelectContent>
            {options?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }

    if (type === "date") {
      return (
        <DatePicker
          className={className}
          date={localValue?.toString() ?? ""}
          onSelect={(date) => handleChange(date?.toISOString() ?? "")}
          placeholder={placeholder}
          autoFocus={autoFocus}
        />
      );
    }
    return (
      <Input
        type={type}
        value={type === "number" ? localValue?.toString() ?? "" : (localValue ?? "").toString()}
        onChange={(e) => {
          if (type === "number" && e.target.value === "") {
            setLocalValue("");
          } else {
            handleChange(e.target.value);
          }
        }}
        onBlur={handleInputBlur}
        className={className}
        placeholder={placeholder}
        autoFocus={autoFocus}
      />
    );
  },
);

export default EditableCell;
