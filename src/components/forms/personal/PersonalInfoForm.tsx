import {Input} from "@/components/ui/input";
import {useForm} from "react-hook-form";
import {useEffect, useImperativeHandle, forwardRef} from "react";
import {personalFormValidation} from "@/views/profile/components/validation/personalFormValidation";
import {PersonalInfoFormProps, PersonalInfoFormRef, PersonalFormFields} from "@/types/form/personal";

export const PersonalInfoForm = forwardRef<PersonalInfoFormRef, PersonalInfoFormProps>(
  ({profile, isEditing, onUpdate}, ref) => {
    const {
      register,
      formState: {errors},
      reset,
      getValues,
      trigger,
    } = useForm<PersonalFormFields>({
      defaultValues: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        birthDate: "",
      },
      mode: "onChange",
    });

    // fonction qui permet au composant parent d'accéder à la méthode validateForm
    useImperativeHandle(ref, () => ({
      async validateForm() {
        const isValid = await trigger();
        if (isValid) {
          const values = getValues();
          onUpdate({
            ...profile!,
            ...values,
            birthDate: values.birthDate ? new Date(values.birthDate) : undefined,
          });
        }
        return isValid;
      },
    }));

    const handleInputChange = () => {
      if (profile && isEditing) {
        const values = getValues();
        onUpdate({
          ...profile,
          ...values,
          birthDate: values.birthDate ? new Date(values.birthDate) : undefined,
        });
      }
    };

    // Reset form when profile changes
    useEffect(() => {
      if (profile) {
        reset({
          firstName: profile.firstName || "",
          lastName: profile.lastName || "",
          email: profile.email || "",
          phone: profile.phone || "",
          password: profile.password || "",
          birthDate: profile.birthDate ? new Date(profile.birthDate).toISOString().split("T")[0] : "",
        });
      }
    }, [profile, reset]);

    return (
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300">
            Prénom <span className="text-red-500">*</span>
          </label>
          <Input
            {...register("firstName", {
              ...personalFormValidation.firstName,
              onChange: handleInputChange,
            })}
            type="text"
            disabled={!isEditing}
            className={`w-full bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 rounded-xl focus:ring-[#433BFF] focus:border-[#433BFF] ${
              errors.firstName ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
            }`}
          />
          {errors.firstName && <p className="text-sm text-red-500 mt-1">{errors.firstName.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Nom</label>
          <Input
            {...register("lastName", {
              ...personalFormValidation.lastName,
              onChange: handleInputChange,
            })}
            type="text"
            disabled={!isEditing}
            className={`w-full bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 rounded-xl focus:ring-[#433BFF] focus:border-[#433BFF] ${
              errors.lastName ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
            }`}
          />
          {errors.lastName && <p className="text-sm text-red-500 mt-1">{errors.lastName.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300">
            Email <span className="text-red-500">*</span>
          </label>
          <Input
            {...register("email", {
              ...personalFormValidation.email,
              onChange: handleInputChange,
            })}
            type="email"
            disabled={!isEditing}
            className={`w-full bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 rounded-xl focus:ring-[#433BFF] focus:border-[#433BFF] ${
              errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
            }`}
          />
          {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Téléphone</label>
          <Input
            {...register("phone", {
              ...personalFormValidation.phone,
              onChange: handleInputChange,
            })}
            type="tel"
            placeholder="438-333-3506"
            disabled={!isEditing}
            className={`w-full bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 rounded-xl focus:ring-[#433BFF] focus:border-[#433BFF] ${
              errors.phone ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
            }`}
          />
          {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300">
            Mot de passe <span className="text-red-500">*</span>
          </label>
          <Input
            {...register("password", {
              ...personalFormValidation.password,
              onChange: handleInputChange,
            })}
            type="password"
            disabled={!isEditing}
            className={`w-full bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 rounded-xl focus:ring-[#433BFF] focus:border-[#433BFF] ${
              errors.password ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
            }`}
          />
          {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Date de naissance</label>
          <Input
            {...register("birthDate", {
              ...personalFormValidation.birthDate,
              onChange: handleInputChange,
            })}
            type="date"
            disabled={!isEditing}
            className={`w-full bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 rounded-xl focus:ring-[#433BFF] focus:border-[#433BFF] ${
              errors.birthDate ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
            }`}
          />
          {errors.birthDate && <p className="text-sm text-red-500 mt-1">{errors.birthDate.message}</p>}
        </div>
      </form>
    );
  },
);
