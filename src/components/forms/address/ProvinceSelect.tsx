import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Province, PROVINCE_LABELS} from "@/enums/address/province";

interface ProvinceSelectProps {
  value: Province;
  onValueChange: (value: Province) => void;
  disabled?: boolean;
}

export const ProvinceSelect = ({value, onValueChange, disabled}: ProvinceSelectProps) => {
  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger className="w-full disabled:opacity-70 disabled:cursor-not-allowed font-medium rounded-lg focus-visible:ring-primary focus-visible:border-primary transition-shadow">
        <SelectValue placeholder="Province" />
      </SelectTrigger>
      <SelectContent>
        {Object.values(Province).map((province) => (
          <SelectItem key={province} value={province}>
            {PROVINCE_LABELS[province]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};