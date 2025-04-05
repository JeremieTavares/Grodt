import {useState, useEffect, memo, useMemo} from "react";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {cn} from "@/lib/utils";
import debounce from "lodash/debounce";

interface EditableCellProps {
  value: string | number;
  onUpdate: (value: string | number) => void;
  className?: string;
  type?: "text" | "number" | "category";
  categories?: readonly string[];
  placeholder?: string;
  onBlur?: () => void;
}

export const EditableCell = memo(
  ({value, onUpdate, className, type = "text", categories, placeholder, onBlur}: EditableCellProps) => {
    const [localValue, setLocalValue] = useState(value);
    const debouncedUpdate = useMemo(() => debounce((newValue: string | number) => onUpdate(newValue), 500), [onUpdate]);

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
      if (onBlur) onBlur();
    };

    if (type === "category") {
      return (
        <Select
          value={localValue as string}
          onValueChange={(newValue) => {
            setLocalValue(newValue);
            onUpdate(newValue);
            if (onBlur) onBlur();
          }}
        >
          <SelectTrigger className={cn("h-9 w-full", className)}>
            <SelectValue placeholder={placeholder || "Choisir une catégorie"} />
          </SelectTrigger>
          <SelectContent>
            {categories?.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }

    return (
      <Input
        type={type}
        value={localValue}
        onChange={(e) => handleChange(type === "number" ? parseFloat(e.target.value) : e.target.value)}
        onBlur={handleInputBlur}
        className={className}
        placeholder={placeholder}
      />
    );
  },
);

EditableCell.displayName = "EditableCell";
