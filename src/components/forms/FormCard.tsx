import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {IconType} from "react-icons";

interface FormCardProps {
  title: string;
  icon?: IconType;
  children: React.ReactNode;
  className?: string;
  headerAction?: React.ReactNode;
  noPadding?: boolean;
}

export const FormCard = ({title, icon: Icon, children, className, headerAction, noPadding}: FormCardProps) => {
  return (
    <Card
      className={`overflow-hidden bg-white dark:bg-slate-800 shadow-xl hover:shadow-2xl transition-all duration-300 border-0 ${
        className || ""
      }`}
    >
      <CardHeader className="border-b border-slate-100 dark:border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {Icon && (
              <div className="w-8 h-8 rounded-lg bg-[#433BFF]/10 flex items-center justify-center">
                <Icon className="w-4 h-4 text-[#433BFF]" />
              </div>
            )}
            <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">{title}</CardTitle>
          </div>
          {headerAction}
        </div>
      </CardHeader>
      <CardContent className={noPadding ? "p-0" : "p-6"}>{children}</CardContent>
    </Card>
  );
};
