import {Input} from "@/components/ui/input";
import {LuGraduationCap, LuCalendar} from "react-icons/lu";
import {SchoolDetails} from "@/types/user/school-details";
import {useForm} from "react-hook-form";
import {SchoolFormFields, SchoolFormRef} from "@/types/form/school";
import {schoolFormValidation} from "@/views/profile/components/validation/schoolFormValidation";
import {forwardRef, useEffect, useImperativeHandle} from "react";

interface SchoolDetailsFormProps {
  schoolDetails: SchoolDetails | null;
  isEditing: boolean;
  onDelete?: () => void;
  onUpdate: (updatedSchoolDetails: SchoolDetails) => void;
}

export const SchoolDetailsForm = forwardRef<SchoolFormRef, SchoolDetailsFormProps>(
  ({schoolDetails, isEditing, onDelete, onUpdate}, ref) => {
    const {
      register,
      formState: {errors},
      reset,
      getValues,
      trigger,
      setValue,
    } = useForm<SchoolFormFields>({
      defaultValues: {
        schoolName: "",
        fieldOfStudy: "",
        startDate: "",
        projectedEndDate: "",
      },
      mode: "onChange",
    });

    useImperativeHandle(ref, () => ({
      async validateForm() {
        const isValid = await trigger();
        if (isValid) {
          const values = getValues();
          onUpdate({
            ...schoolDetails!,
            ...values,
          });
        }
        return isValid;
      },
    }));

    const handleChange = (field: keyof SchoolFormFields) => async (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setValue(field, value, {shouldValidate: true});
      const isFieldValid = await trigger(field);
      if (isFieldValid) {
        onUpdate({
          id: schoolDetails?.id || 0,
          schoolName: field === "schoolName" ? value : schoolDetails?.schoolName || "",
          fieldOfStudy: field === "fieldOfStudy" ? value : schoolDetails?.fieldOfStudy || "",
          startDate: field === "startDate" ? value : schoolDetails?.startDate || "",
          projectedEndDate: field === "projectedEndDate" ? value : schoolDetails?.projectedEndDate || "",
          user: schoolDetails?.user,
        });
      }
    };

    useEffect(() => {
      if (schoolDetails) {
        reset({
          schoolName: schoolDetails.schoolName || "",
          fieldOfStudy: schoolDetails.fieldOfStudy || "",
          startDate: schoolDetails.startDate ? schoolDetails.startDate.split("T")[0] : "",
          projectedEndDate: schoolDetails.projectedEndDate ? schoolDetails.projectedEndDate.split("T")[0] : "",
        });
      }
    }, [schoolDetails, reset]);

    return (
      <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg space-y-4 bg-white/50 dark:bg-slate-800/50">
        <div className="flex justify-between items-center">
          <h4 className="font-semibold text-slate-700 dark:text-slate-200">Détails scolaires</h4>
          {isEditing && onDelete && (
            <button
              onClick={onDelete}
              className="px-3 py-1 text-red-600 dark:text-red-400 text-sm border border-red-200 dark:border-red-900 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              Supprimer
            </button>
          )}
        </div>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            return false;
          }}
        >
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Nom de l'établissement scolaire <span className="text-red-500">*</span>
            </label>
            <div className="space-y-1">
              <div className="relative flex items-center">
                <div className="absolute left-0 top-0 bottom-0 w-10 z-10 bg-gradient-to-r from-[#433BFF]/5 to-transparent flex items-center justify-center pointer-events-none">
                  <LuGraduationCap className="w-4 h-4 text-[#433BFF]" />
                </div>
                <Input
                  {...register("schoolName", {
                    ...schoolFormValidation.schoolName,
                    onChange: handleChange("schoolName"),
                  })}
                  type="text"
                  placeholder="Nom de l'école"
                  disabled={!isEditing}
                  className={`w-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 disabled:opacity-70 disabled:cursor-not-allowed font-medium pl-10 rounded-lg focus:ring-[#433BFF] focus:border-[#433BFF] transition-shadow group-hover:shadow-md dark:text-white ${
                    errors.schoolName ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                  }`}
                />
              </div>
              {errors.schoolName && <p className="text-sm text-red-500">{errors.schoolName.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Programme d'études <span className="text-red-500">*</span>
            </label>
            <div className="space-y-1">
              <div className="relative flex items-center">
                <div className="absolute left-0 top-0 bottom-0 w-10 z-10 bg-gradient-to-r from-[#433BFF]/5 to-transparent flex items-center justify-center pointer-events-none">
                  <LuGraduationCap className="w-4 h-4 text-[#433BFF]" />
                </div>
                <Input
                  {...register("fieldOfStudy", {
                    ...schoolFormValidation.fieldOfStudy,
                    onChange: handleChange("fieldOfStudy"),
                  })}
                  type="text"
                  placeholder="Domaine d'études"
                  disabled={!isEditing}
                  className={`w-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 disabled:opacity-70 disabled:cursor-not-allowed font-medium pl-10 rounded-lg focus:ring-[#433BFF] focus:border-[#433BFF] transition-shadow group-hover:shadow-md dark:text-white ${
                    errors.fieldOfStudy ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                  }`}
                />
              </div>
              {errors.fieldOfStudy && <p className="text-sm text-red-500">{errors.fieldOfStudy.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Date de début des études <span className="text-red-500">*</span>
            </label>
            <div className="space-y-1">
              <div className="relative flex items-center">
                <div className="absolute left-0 top-0 bottom-0 w-10 z-10 bg-gradient-to-r from-[#433BFF]/5 to-transparent flex items-center justify-center pointer-events-none">
                  <LuCalendar className="w-4 h-4 text-[#433BFF]" />
                </div>
                <Input
                  {...register("startDate", {
                    ...schoolFormValidation.startDate,
                    onChange: handleChange("startDate"),
                  })}
                  type="date"
                  placeholder="Date de début"
                  disabled={!isEditing}
                  className={`w-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 disabled:opacity-70 disabled:cursor-not-allowed font-medium pl-10 rounded-lg focus:ring-[#433BFF] focus:border-[#433BFF] transition-shadow group-hover:shadow-md dark:text-white ${
                    errors.startDate ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                  }`}
                />
              </div>
              {errors.startDate && <p className="text-sm text-red-500">{errors.startDate.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Date de fin prévue des études <span className="text-red-500">*</span>
            </label>
            <div className="space-y-1">
              <div className="relative flex items-center">
                <div className="absolute left-0 top-0 bottom-0 w-10 z-10 bg-gradient-to-r from-[#433BFF]/5 to-transparent flex items-center justify-center pointer-events-none">
                  <LuCalendar className="w-4 h-4 text-[#433BFF]" />
                </div>
                <Input
                  {...register("projectedEndDate", {
                    ...schoolFormValidation.projectedEndDate,
                    onChange: handleChange("projectedEndDate"),
                  })}
                  type="date"
                  placeholder="Date de fin prévue"
                  disabled={!isEditing}
                  className={`w-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 disabled:opacity-70 disabled:cursor-not-allowed font-medium pl-10 rounded-lg focus:ring-[#433BFF] focus:border-[#433BFF] transition-shadow group-hover:shadow-md dark:text-white ${
                    errors.projectedEndDate ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                  }`}
                />
              </div>
              {errors.projectedEndDate && <p className="text-sm text-red-500">{errors.projectedEndDate.message}</p>}
            </div>
          </div>
        </form>
      </div>
    );
  },
);
