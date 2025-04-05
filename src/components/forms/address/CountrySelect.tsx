import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Country, COUNTRY_LABELS} from "@/enums/address/country";

interface CountrySelectProps {
  value: Country;
  onValueChange: (value: Country) => void;
  disabled?: boolean;
}

export const CountrySelect = ({value, onValueChange, disabled}: CountrySelectProps) => {
  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger className="w-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 disabled:opacity-70 disabled:cursor-not-allowed font-medium rounded-lg focus:ring-[#433BFF] focus:border-[#433BFF] transition-shadow group-hover:shadow-md dark:text-white">
        <SelectValue placeholder="Pays" />
      </SelectTrigger>
      <SelectContent>
        {Object.values(Country).map((country) => (
          <SelectItem key={country} value={country}>
            {COUNTRY_LABELS[country]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
