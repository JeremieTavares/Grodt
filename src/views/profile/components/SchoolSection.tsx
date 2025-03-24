import {LuGraduationCap} from "react-icons/lu";
import {SchoolDetails} from "@/types/user/school-details";
import {FormCard} from "@/components/forms/FormCard";
import {SchoolDetailsForm} from "@/components/forms/school/SchoolDetailsForm";

interface SchoolSectionProps {
  schoolDetails: SchoolDetails | null;
  setSchoolDetails: (schoolDetails: SchoolDetails) => void;
  isEditing: boolean;
  onDelete: () => void;
}

export const SchoolSection = ({schoolDetails, setSchoolDetails, isEditing, onDelete}: SchoolSectionProps) => (
  <FormCard title="Informations scolaires" icon={LuGraduationCap}>
    <div className="space-y-4">
      <SchoolDetailsForm
        schoolDetails={schoolDetails}
        onUpdate={setSchoolDetails}
        isEditing={isEditing}
        onDelete={onDelete}
      />
    </div>
  </FormCard>
);
