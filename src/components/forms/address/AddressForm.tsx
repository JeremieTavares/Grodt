import {Input} from "@/components/ui/input";
import {LuMapPin, LuGlobe} from "react-icons/lu";
import {ProvinceSelect} from "./ProvinceSelect";
import {CountrySelect} from "./CountrySelect";
import {AddressType, ADDRESS_TYPE_LABELS} from "@/enums/address/address";
import {Province} from "@/enums/address/province";
import {Country} from "@/enums/address/country";
import {useForm} from "react-hook-form";
import {AddressFormFields, AddressFormProps, AddressFormRef} from "@/types/form/address";
import {addressFormValidation} from "@/views/profile/components/validation/addressFormValidation";
import {forwardRef, useEffect, useImperativeHandle} from "react";

export const AddressForm = forwardRef<AddressFormRef, AddressFormProps>(
  ({address, type, isEditing, onDelete, onUpdate}, ref) => {
    const {
      register,
      formState: {errors},
      reset,
      getValues,
      trigger,
      setValue,
    } = useForm<AddressFormFields>({
      defaultValues: {
        streetNumber: "",
        streetName: "",
        city: "",
        province: Province.QC,
        country: Country.CA,
      },
      mode: "all",
    });

    useImperativeHandle(ref, () => ({
      async validateForm() {
        const isValid = await trigger(undefined, {shouldFocus: true});
        if (isValid) {
          const values = getValues();
          onUpdate({
            ...address,
            ...values,
          });
        }
        return isValid;
      },
    }));

    useEffect(() => {
      if (address) {
        reset({
          streetNumber: address.streetNumber || "",
          streetName: address.streetName || "",
          city: address.city || "",
          province: address.province || Province.QC,
          country: address.country || Country.CA,
        });
      }
    }, [address, reset]);

    const handleChange = (field: keyof AddressFormFields) => async (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setValue(field, value, {shouldValidate: true});
      const isFieldValid = await trigger(field);
      if (isFieldValid) {
        onUpdate({...address, [field]: value});
      }
    };

    const handleProvinceChange = async (value: Province) => {
      setValue("province", value, {shouldValidate: true});
      const isFieldValid = await trigger("province");
      if (isFieldValid) {
        onUpdate({
          ...address,
          province: value,
        });
      }
    };

    const handleCountryChange = async (value: Country) => {
      setValue("country", value, {shouldValidate: true});
      const isFieldValid = await trigger("country");
      if (isFieldValid) {
        onUpdate({
          ...address,
          country: value,
        });
      }
    };

    const showDeleteButton = type === AddressType.WORK && isEditing && onDelete;

    return (
      <form
        className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg space-y-4 bg-white/50 dark:bg-slate-800/50"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex justify-between items-center">
          <h4 className="font-semibold text-slate-700 dark:text-slate-200">{ADDRESS_TYPE_LABELS[type]}</h4>
          {showDeleteButton && (
            <button
              type="button"
              onClick={onDelete}
              className="px-3 py-1 text-red-600 dark:text-red-400 text-sm border border-red-200 dark:border-red-900 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              Supprimer
            </button>
          )}
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Numéro civique <span className="text-red-500">*</span>
            </label>
            <div className="space-y-1">
              <div className="relative flex items-center">
                <div className="absolute left-0 top-0 bottom-0 w-10 z-10 bg-gradient-to-r from-[#433BFF]/5 to-transparent flex items-center justify-center pointer-events-none">
                  <LuMapPin className="w-4 h-4 text-[#433BFF]" />
                </div>
                <Input
                  {...register("streetNumber", {
                    ...addressFormValidation.streetNumber,
                    onChange: handleChange("streetNumber"),
                  })}
                  type="text"
                  placeholder="Numéro civique"
                  disabled={!isEditing}
                  className={`w-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 disabled:opacity-70 disabled:cursor-not-allowed font-medium pl-10 rounded-lg focus:ring-[#433BFF] focus:border-[#433BFF] transition-shadow group-hover:shadow-md dark:text-white ${
                    errors.streetNumber ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                  }`}
                />
              </div>
              {errors.streetNumber && <p className="text-sm text-red-500">{errors.streetNumber.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Nom de la rue <span className="text-red-500">*</span>
            </label>
            <div className="space-y-1">
              <div className="relative flex items-center">
                <div className="absolute left-0 top-0 bottom-0 w-10 z-10 bg-gradient-to-r from-[#433BFF]/5 to-transparent flex items-center justify-center pointer-events-none">
                  <LuMapPin className="w-4 h-4 text-[#433BFF]" />
                </div>
                <Input
                  {...register("streetName", {
                    ...addressFormValidation.streetName,
                    onChange: handleChange("streetName"),
                  })}
                  type="text"
                  placeholder="Nom de rue"
                  disabled={!isEditing}
                  className={`w-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 disabled:opacity-70 disabled:cursor-not-allowed font-medium pl-10 rounded-lg focus:ring-[#433BFF] focus:border-[#433BFF] transition-shadow group-hover:shadow-md dark:text-white ${
                    errors.streetName ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                  }`}
                />
              </div>
              {errors.streetName && <p className="text-sm text-red-500">{errors.streetName.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Ville <span className="text-red-500">*</span>
            </label>
            <div className="space-y-1">
              <div className="relative flex items-center">
                <div className="absolute left-0 top-0 bottom-0 w-10 z-10 bg-gradient-to-r from-[#433BFF]/5 to-transparent flex items-center justify-center pointer-events-none">
                  <LuMapPin className="w-4 h-4 text-[#433BFF]" />
                </div>
                <Input
                  {...register("city", {
                    ...addressFormValidation.city,
                    onChange: handleChange("city"),
                  })}
                  type="text"
                  placeholder="Ville"
                  disabled={!isEditing}
                  className={`w-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 disabled:opacity-70 disabled:cursor-not-allowed font-medium pl-10 rounded-lg focus:ring-[#433BFF] focus:border-[#433BFF] transition-shadow group-hover:shadow-md dark:text-white ${
                    errors.city ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                  }`}
                />
              </div>
              {errors.city && <p className="text-sm text-red-500">{errors.city.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Province <span className="text-red-500">*</span>
            </label>
            <div className="space-y-1">
              <div className="relative flex items-center">
                <div className="absolute left-0 top-0 bottom-0 w-10 z-10 bg-gradient-to-r from-[#433BFF]/5 to-transparent flex items-center justify-center pointer-events-none">
                  <LuGlobe className="w-4 h-4 text-[#433BFF]" />
                </div>
                <div className="w-full pl-10">
                  <ProvinceSelect value={address.province} onValueChange={handleProvinceChange} disabled={!isEditing} />
                </div>
              </div>
              {errors.province && <p className="text-sm text-red-500">{errors.province.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Pays <span className="text-red-500">*</span>
            </label>
            <div className="space-y-1">
              <div className="relative flex items-center">
                <div className="absolute left-0 top-0 bottom-0 w-10 z-10 bg-gradient-to-r from-[#433BFF]/5 to-transparent flex items-center justify-center pointer-events-none">
                  <LuGlobe className="w-4 h-4 text-[#433BFF]" />
                </div>
                <div className="w-full pl-10">
                  <CountrySelect value={address.country} onValueChange={handleCountryChange} disabled={!isEditing} />
                </div>
              </div>
              {errors.country && <p className="text-sm text-red-500">{errors.country.message}</p>}
            </div>
          </div>
        </div>
      </form>
    );
  },
);

AddressForm.displayName = "AddressForm";
