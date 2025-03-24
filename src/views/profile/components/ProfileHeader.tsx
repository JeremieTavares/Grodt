import {LuPencil, LuSave, LuX} from "react-icons/lu";

interface ProfileHeaderProps {
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}

export const ProfileHeader = ({isEditing, onEdit, onSave, onCancel}: ProfileHeaderProps) => {
  return (
    <div className="max-w-7xl mx-auto mb-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Mon profil</h1>
        {isEditing ? (
          <div className="flex gap-2">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200 font-medium inline-flex items-center gap-2 shadow-sm"
            >
              <LuX className="w-4 h-4" />
              Annuler
            </button>
            <button
              onClick={onSave}
              className="px-4 py-2 text-white rounded-full bg-[#433BFF] hover:bg-[#3530CC] transition-all duration-200 font-medium inline-flex items-center gap-2 shadow-lg hover:shadow-[#433BFF]/25"
            >
              <LuSave className="w-4 h-4" />
              Sauvegarder
            </button>
          </div>
        ) : (
          <button
            onClick={onEdit}
            className="px-4 py-2 text-white rounded-full bg-[#433BFF] hover:bg-[#3530CC] transition-all duration-200 font-medium inline-flex items-center gap-2 shadow-lg hover:shadow-[#433BFF]/25"
          >
            <LuPencil className="w-4 h-4" />
            Modifier
          </button>
        )}
      </div>
    </div>
  );
};
