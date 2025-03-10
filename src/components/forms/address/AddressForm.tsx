import {Input} from "@/components/ui/input";
import {LuMapPin, LuGlobe} from "react-icons/lu";
import {Address} from "@/types/user/address";
import {ProvinceSelect} from "./ProvinceSelect";
import {CountrySelect} from "./CountrySelect";
import {AddressType, ADDRESS_TYPE_LABELS} from "@/enums/address/address";
import {Province} from "@/enums/address/province";
import {Country} from "@/enums/address/country";

interface AddressFormProps {
  address: Address;
  type: AddressType;
  isEditing: boolean;
  onDelete?: () => void;
  onUpdate: (updatedAddress: Address) => void;
}

export const AddressForm = ({address, type, isEditing, onDelete, onUpdate}: AddressFormProps) => {
  const handleChange = (field: keyof Address) => (value: string | Province | Country) => {
    onUpdate({
      ...address,
      [field]: value,
    });
  };

  const handleInputChange = (field: keyof Address) => (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(field)(e.target.value);
  };

  const showDeleteButton = type === AddressType.WORK && isEditing && onDelete;

  return (
    <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg space-y-4 bg-white/50 dark:bg-slate-800/50">
      <div className="flex justify-between items-center">
        <h4 className="font-semibold text-slate-700 dark:text-slate-200">{ADDRESS_TYPE_LABELS[type]}</h4>
        {showDeleteButton && (
          <button
            onClick={onDelete}
            className="px-3 py-1 text-red-600 dark:text-red-400 text-sm border border-red-200 dark:border-red-900 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            Supprimer
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div className="relative">
          <div className="absolute left-0 top-0 w-10 h-full bg-gradient-to-r from-[#433BFF]/5 to-transparent rounded-l-lg flex items-center justify-center">
            <LuMapPin className="w-4 h-4 text-[#433BFF]" />
          </div>
          <Input
            type="text"
            placeholder="Numéro civique"
            value={address.streetNumber}
            onChange={handleInputChange("streetNumber")}
            disabled={!isEditing}
            className="w-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 disabled:opacity-70 disabled:cursor-not-allowed font-medium pl-10 rounded-lg focus:ring-[#433BFF] focus:border-[#433BFF] transition-shadow group-hover:shadow-md dark:text-white"
          />
        </div>

        <div className="relative">
          <Input
            type="text"
            placeholder="Nom de rue"
            value={address.streetName}
            onChange={handleInputChange("streetName")}
            disabled={!isEditing}
            className="w-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 disabled:opacity-70 disabled:cursor-not-allowed font-medium rounded-lg focus:ring-[#433BFF] focus:border-[#433BFF] transition-shadow group-hover:shadow-md dark:text-white"
          />
        </div>

        <div className="relative">
          <Input
            type="text"
            placeholder="Ville"
            value={address.city}
            onChange={handleInputChange("city")}
            disabled={!isEditing}
            className="w-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 disabled:opacity-70 disabled:cursor-not-allowed font-medium rounded-lg focus:ring-[#433BFF] focus:border-[#433BFF] transition-shadow group-hover:shadow-md dark:text-white"
          />
        </div>

        <div className="relative">
          <ProvinceSelect value={address.province} onValueChange={handleChange("province")} disabled={!isEditing} />
        </div>

        <div className="relative">
          <div className="absolute left-0 top-0 w-10 h-full bg-gradient-to-r from-[#433BFF]/5 to-transparent rounded-l-lg flex items-center justify-center">
            <LuGlobe className="w-4 h-4 text-[#433BFF]" />
          </div>
          <div className="pl-10">
            <CountrySelect value={address.country} onValueChange={handleChange("country")} disabled={!isEditing} />
          </div>
        </div>
      </div>
    </div>
  );
};
