import {Input} from "@/components/ui/input";
import {LuWallet} from "react-icons/lu";
import {BankingDetails} from "@/types/user/banking-details";

interface BankingDetailsFormProps {
  bankingDetails: BankingDetails | null;
  isEditing: boolean;
  onDelete?: () => void;
  onUpdate: (updatedBankingDetails: BankingDetails) => void;
}

export const BankingDetailsForm = ({bankingDetails, isEditing, onDelete, onUpdate}: BankingDetailsFormProps) => {
  const handleChange =
    (field: keyof Omit<BankingDetails, "id" | "user">) => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!bankingDetails) return;

      onUpdate({
        ...bankingDetails,
        [field]: e.target.value,
      });
    };

  return (
    <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg space-y-4 bg-white/50 dark:bg-slate-800/50">
      <div className="flex justify-between items-center">
        <h4 className="font-semibold text-slate-700 dark:text-slate-200">Détails bancaires</h4>
        {isEditing && onDelete && (
          <button
            onClick={onDelete}
            className="px-3 py-1 text-red-600 dark:text-red-400 text-sm border border-red-200 dark:border-red-900 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            Supprimer
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Nom de l'institution</label>
          <div className="relative">
            <div className="absolute left-0 top-0 w-10 h-full bg-gradient-to-r from-[#433BFF]/5 to-transparent rounded-l-lg flex items-center justify-center">
              <LuWallet className="w-4 h-4 text-[#433BFF]" />
            </div>
            <Input
              type="text"
              placeholder="Ex: Desjardins, RBC, BMO..."
              value={bankingDetails?.institutionName || ""}
              onChange={handleChange("institutionName")}
              disabled={!isEditing}
              className="w-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 disabled:opacity-70 disabled:cursor-not-allowed font-medium pl-10 rounded-lg focus:ring-[#433BFF] focus:border-[#433BFF] transition-shadow group-hover:shadow-md dark:text-white"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Informations du compte</label>
          <div className="relative">
            <div className="absolute left-0 top-0 w-10 h-full bg-gradient-to-r from-[#433BFF]/5 to-transparent rounded-l-lg flex items-center justify-center">
              <LuWallet className="w-4 h-4 text-[#433BFF]" />
            </div>
            <Input
              type="text"
              placeholder="Numéro de compte"
              value={bankingDetails?.accountInfo || ""}
              onChange={handleChange("accountInfo")}
              disabled={!isEditing}
              className="w-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 disabled:opacity-70 disabled:cursor-not-allowed font-medium pl-10 rounded-lg focus:ring-[#433BFF] focus:border-[#433BFF] transition-shadow group-hover:shadow-md dark:text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
