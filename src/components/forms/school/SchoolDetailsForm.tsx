import {Input} from "@/components/ui/input";
import {LuGraduationCap, LuCalendar} from "react-icons/lu";
import {SchoolDetails} from "@/types/user/school-details";

interface SchoolDetailsFormProps {
  schoolDetails: SchoolDetails | null;
  isEditing: boolean;
  onDelete?: () => void;
  onUpdate: (updatedSchoolDetails: SchoolDetails) => void;
}

export const SchoolDetailsForm = ({schoolDetails, isEditing, onDelete, onUpdate}: SchoolDetailsFormProps) => {
  const handleChange = (field: keyof SchoolDetails) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSchoolDetails = schoolDetails || {
      id: 0,
      schoolName: "",
      fieldOfStudy: "",
      startDate: new Date().toISOString().split("T")[0],
      projectedEndDate: undefined,
    };

    onUpdate({
      ...newSchoolDetails,
      [field]: e.target.value,
    });
  };

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

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300">
            Nom de l'établissement scolaire
          </label>
          <div className="relative">
            <div className="absolute left-0 top-0 w-10 h-full bg-gradient-to-r from-[#433BFF]/5 to-transparent rounded-l-lg flex items-center justify-center">
              <LuGraduationCap className="w-4 h-4 text-[#433BFF]" />
            </div>
            <Input
              type="text"
              placeholder="Nom de l'école"
              value={schoolDetails?.schoolName || ""}
              onChange={handleChange("schoolName")}
              disabled={!isEditing}
              className="w-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 disabled:opacity-70 disabled:cursor-not-allowed font-medium pl-10 rounded-lg focus:ring-[#433BFF] focus:border-[#433BFF] transition-shadow group-hover:shadow-md dark:text-white"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Programme d'études</label>
          <div className="relative">
            <div className="absolute left-0 top-0 w-10 h-full bg-gradient-to-r from-[#433BFF]/5 to-transparent rounded-l-lg flex items-center justify-center">
              <LuGraduationCap className="w-4 h-4 text-[#433BFF]" />
            </div>
            <Input
              type="text"
              placeholder="Domaine d'études"
              value={schoolDetails?.fieldOfStudy || ""}
              onChange={handleChange("fieldOfStudy")}
              disabled={!isEditing}
              className="w-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 disabled:opacity-70 disabled:cursor-not-allowed font-medium pl-10 rounded-lg focus:ring-[#433BFF] focus:border-[#433BFF] transition-shadow group-hover:shadow-md dark:text-white"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Date de début des études</label>
          <div className="relative">
            <div className="absolute left-0 top-0 w-10 h-full bg-gradient-to-r from-[#433BFF]/5 to-transparent rounded-l-lg flex items-center justify-center">
              <LuCalendar className="w-4 h-4 text-[#433BFF]" />
            </div>
            <Input
              type="date"
              placeholder="Date de début"
              value={schoolDetails?.startDate ? schoolDetails.startDate.split("T")[0] : ""}
              onChange={handleChange("startDate")}
              disabled={!isEditing}
              className="w-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 disabled:opacity-70 disabled:cursor-not-allowed font-medium pl-10 rounded-lg focus:ring-[#433BFF] focus:border-[#433BFF] transition-shadow group-hover:shadow-md dark:text-white"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300">
            Date de fin prévue des études
          </label>
          <div className="relative">
            <div className="absolute left-0 top-0 w-10 h-full bg-gradient-to-r from-[#433BFF]/5 to-transparent rounded-l-lg flex items-center justify-center">
              <LuCalendar className="w-4 h-4 text-[#433BFF]" />
            </div>
            <Input
              type="date"
              placeholder="Date de fin prévue"
              value={schoolDetails?.projectedEndDate ? schoolDetails.projectedEndDate.split("T")[0] : ""}
              onChange={handleChange("projectedEndDate")}
              disabled={!isEditing}
              className="w-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 disabled:opacity-70 disabled:cursor-not-allowed font-medium pl-10 rounded-lg focus:ring-[#433BFF] focus:border-[#433BFF] transition-shadow group-hover:shadow-md dark:text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
