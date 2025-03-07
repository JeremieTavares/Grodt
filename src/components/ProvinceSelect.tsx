import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

// Constante pour les provinces
export const PROVINCES = [
  {value: "QC", label: "Québec (QC)"},
  {value: "ON", label: "Ontario (ON)"},
  {value: "NL", label: "Terre-Neuve-et-Labrador (NL)"},
  {value: "NS", label: "Nouvelle-Écosse (NS)"},
  {value: "PE", label: "Île-du-Prince-Édouard (PE)"},
  {value: "NB", label: "Nouveau-Brunswick (NB)"},
  {value: "MB", label: "Manitoba (MB)"},
  {value: "SK", label: "Saskatchewan (SK)"},
  {value: "AB", label: "Alberta (AB)"},
  {value: "BC", label: "Colombie-Britannique (BC)"},
  {value: "YT", label: "Yukon (YT)"},
  {value: "NT", label: "Territoires du Nord-Ouest (NT)"},
  {value: "NU", label: "Nunavut (NU)"},
] as const;

export interface ProvinceSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
}

export const ProvinceSelect = ({value, onValueChange, disabled}: ProvinceSelectProps) => (
  <Select value={value} onValueChange={onValueChange} disabled={disabled}>
    <SelectTrigger className="w-full bg-white border-slate-200 disabled:opacity-70 disabled:cursor-not-allowed font-medium rounded-lg focus:ring-[#433BFF] focus:border-[#433BFF] transition-shadow group-hover:shadow-md">
      <SelectValue placeholder="Province" />
    </SelectTrigger>
    <SelectContent>
      {PROVINCES.map((province) => (
        <SelectItem key={province.value} value={province.value}>
          {province.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);
