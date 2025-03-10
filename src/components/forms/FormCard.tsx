import {Card, CardContent} from "@/components/ui/card";
import {IconType} from "react-icons";

interface FormCardProps {
  title: string;
  icon?: IconType;
  children: React.ReactNode;
  className?: string;
}

export const FormCard = ({title, icon: Icon, children, className}: FormCardProps) => {
  return (
    <Card className={className}>
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center gap-3">
          {Icon && <Icon className="w-4 h-4 text-[#433BFF]" />}
          <h4 className="font-semibold text-slate-700">{title}</h4>
        </div>
        {children}
      </CardContent>
    </Card>
  );
};