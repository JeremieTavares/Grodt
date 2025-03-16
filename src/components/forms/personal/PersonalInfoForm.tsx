import {Input} from "@/components/ui/input";
import {User, UpdateUserDto} from "@/types/user/user";

interface PersonalInfoFormProps {
  profile: User | null;
  isEditing: boolean;
  onUpdate: (field: keyof UpdateUserDto, value: string) => void;
}

export const PersonalInfoForm = ({profile, isEditing, onUpdate}: PersonalInfoFormProps) => {
  const handleChange = (field: keyof UpdateUserDto) => (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate(field, field === "birthDate" ? e.target.value : e.target.value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Prénom</label>
        <Input
          type="text"
          value={profile?.firstName || ""}
          onChange={handleChange("firstName")}
          disabled={!isEditing}
          className="w-full bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 rounded-xl focus:ring-[#433BFF] focus:border-[#433BFF]"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Nom</label>
        <Input
          type="text"
          value={profile?.lastName || ""}
          onChange={handleChange("lastName")}
          disabled={!isEditing}
          className="w-full bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 rounded-xl focus:ring-[#433BFF] focus:border-[#433BFF]"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Email</label>
        <Input
          type="email"
          value={profile?.email || ""}
          onChange={handleChange("email")}
          disabled={!isEditing}
          className="w-full bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 rounded-xl focus:ring-[#433BFF] focus:border-[#433BFF]"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Téléphone</label>
        <Input
          type="tel"
          value={profile?.phone || ""}
          onChange={handleChange("phone")}
          disabled={!isEditing}
          className="w-full bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 rounded-xl focus:ring-[#433BFF] focus:border-[#433BFF]"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Mot de passe</label>
        <Input
          type="password"
          value={profile?.password || ""}
          onChange={handleChange("password")}
          disabled={!isEditing}
          className="w-full bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 rounded-xl focus:ring-[#433BFF] focus:border-[#433BFF]"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Date de naissance</label>
        <Input
          type="date"
          value={profile?.birthDate ? new Date(profile.birthDate).toISOString().split("T")[0] : ""}
          onChange={handleChange("birthDate")}
          disabled={!isEditing}
          className="w-full bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 rounded-xl focus:ring-[#433BFF] focus:border-[#433BFF]"
        />
      </div>
    </div>
  );
};
