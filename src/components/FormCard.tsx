import {ReactNode} from "react";
import {IconType} from "react-icons";

interface FormCardProps {
  title: string;
  icon?: IconType;
  children: ReactNode;
  className?: string;
}

export const FormCard = ({title, icon: Icon, children, className = ""}: FormCardProps) => {
  return (
    <div className={`space-y-2 group ${className}`}>
      <label className="text-sm font-semibold text-slate-700 tracking-tight flex items-center gap-2">
        <span>{title}</span>
        <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent"></div>
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-0 top-0 w-10 h-full bg-gradient-to-r from-[#433BFF]/5 to-transparent rounded-l-lg flex items-center justify-center">
            <Icon className="w-4 h-4 text-[#433BFF]" />
          </div>
        )}
        <div className={Icon ? "pl-10" : ""}>{children}</div>
      </div>
    </div>
  );
};
