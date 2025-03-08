import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Province, PROVINCE_LABELS} from "@/enums/province";

interface ProvinceSelectProps {
  value: Province;
  onValueChange: (value: Province) => void;
  disabled?: boolean;
}

export const ProvinceSelect = ({value, onValueChange, disabled}: ProvinceSelectProps) => {
  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger className="w-full bg-white border-slate-200 disabled:opacity-70 disabled:cursor-not-allowed font-medium rounded-lg focus:ring-[#433BFF] focus:border-[#433BFF] transition-shadow group-hover:shadow-md">
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
