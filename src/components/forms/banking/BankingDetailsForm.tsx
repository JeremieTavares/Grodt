import {Input} from "@/components/ui/input";
import {LuWallet} from "react-icons/lu";
import {BankingDetails} from "@/types/user/banking-details";
import {useForm} from "react-hook-form";
import {BankingFormFields, BankingFormRef} from "@/types/form/banking";
import {bankingFormValidation} from "@/views/profile/components/validation/bankingFormValidation";
import {forwardRef, useEffect, useImperativeHandle} from "react";

interface BankingDetailsFormProps {
  bankingDetails: BankingDetails | null;
  isEditing: boolean;
  onDelete?: () => void;
  onUpdate: (updatedBankingDetails: BankingDetails) => void;
}

export const BankingDetailsForm = forwardRef<BankingFormRef, BankingDetailsFormProps>(
  ({bankingDetails, isEditing, onDelete, onUpdate}, ref) => {
    const {
      register,
      formState: {errors},
      reset,
      getValues,
      trigger,
    } = useForm<BankingFormFields>({
      defaultValues: {
        institutionName: "",
        accountInfo: "",
      },
      mode: "onChange",
    });

    useImperativeHandle(ref, () => ({
      async validateForm() {
        const isValid = await trigger();
        if (isValid) {
          const values = getValues();
          onUpdate({
            ...bankingDetails!,
            ...values,
          });
        }
        return isValid;
      },
    }));

    const handleChange = (field: keyof BankingFormFields) => async (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      onUpdate({
        id: bankingDetails?.id || 0,
        institutionName: field === "institutionName" ? value : bankingDetails?.institutionName || "",
        accountInfo: field === "accountInfo" ? value : bankingDetails?.accountInfo || "",
        loanInfo: bankingDetails?.loanInfo || "",
        other: bankingDetails?.other || "",
        user: bankingDetails?.user,
      });
    };

    useEffect(() => {
      if (bankingDetails) {
        reset({
          institutionName: bankingDetails.institutionName || "",
          accountInfo: bankingDetails.accountInfo || "",
        });
      }
    }, [bankingDetails, reset]);

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

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Nom de l'institution <span className="text-red-500">*</span>
            </label>
            <div className="space-y-1">
              <div className="relative flex items-center">
                <div className="absolute left-0 top-0 bottom-0 w-10 z-10 bg-gradient-to-r from-[#433BFF]/5 to-transparent flex items-center justify-center pointer-events-none">
                  <LuWallet className="w-4 h-4 text-[#433BFF]" />
                </div>
                <Input
                  {...register("institutionName", {
                    ...bankingFormValidation.institutionName,
                    onChange: handleChange("institutionName"),
                  })}
                  type="text"
                  placeholder="Ex: Desjardins, RBC, BMO..."
                  disabled={!isEditing}
                  className={`w-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 disabled:opacity-70 disabled:cursor-not-allowed font-medium pl-10 rounded-lg focus:ring-[#433BFF] focus:border-[#433BFF] transition-shadow group-hover:shadow-md dark:text-white ${
                    errors.institutionName ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                  }`}
                />
              </div>
              {errors.institutionName && <p className="text-sm text-red-500">{errors.institutionName.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Informations du compte <span className="text-red-500">*</span>
            </label>
            <div className="space-y-1">
              <div className="relative flex items-center">
                <div className="absolute left-0 top-0 bottom-0 w-10 z-10 bg-gradient-to-r from-[#433BFF]/5 to-transparent flex items-center justify-center pointer-events-none">
                  <LuWallet className="w-4 h-4 text-[#433BFF]" />
                </div>
                <Input
                  {...register("accountInfo", {
                    ...bankingFormValidation.accountInfo,
                    onChange: handleChange("accountInfo"),
                  })}
                  type="text"
                  placeholder="Numéro de compte, transit..."
                  disabled={!isEditing}
                  className={`w-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 disabled:opacity-70 disabled:cursor-not-allowed font-medium pl-10 rounded-lg focus:ring-[#433BFF] focus:border-[#433BFF] transition-shadow group-hover:shadow-md dark:text-white ${
                    errors.accountInfo ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                  }`}
                />
              </div>
              {errors.accountInfo && <p className="text-sm text-red-500">{errors.accountInfo.message}</p>}
            </div>
          </div>
        </form>

        <div className="mt-6 flex justify-center items-center">
          <div className="w-64 h-24">
            <img src="/images/black-grodt-logo.svg" alt="Grodt Logo" className="w-full h-full object-contain" />
          </div>
        </div>
      </div>
    );
  },
);
