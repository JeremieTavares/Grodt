import {LuGraduationCap} from "react-icons/lu";
import {SchoolDetails} from "@/types/user/school-details";
import {FormCard} from "@/components/forms/FormCard";
import {SchoolDetailsForm} from "@/components/forms/school/SchoolDetailsForm";
import {SchoolFormRef} from "@/types/form/school";
import {forwardRef, useImperativeHandle, useRef} from "react";

interface SchoolSectionProps {
  schoolDetails: SchoolDetails | null;
  setSchoolDetails: (schoolDetails: SchoolDetails) => void;
  isEditing: boolean;
  onDelete: () => void;
}

export interface SchoolSectionRef {
  validateForm: () => Promise<boolean>;
}

export const SchoolSection = forwardRef<SchoolSectionRef, SchoolSectionProps>(
  ({schoolDetails, setSchoolDetails, isEditing, onDelete}, ref) => {
    const formRef = useRef<SchoolFormRef>(null);

    useImperativeHandle(ref, () => ({
      async validateForm() {
        return formRef.current?.validateForm() ?? false;
      },
    }));

    return (
      <FormCard title="Informations scolaires" icon={LuGraduationCap}>
        <div className="space-y-4">
          <SchoolDetailsForm
            ref={formRef}
            schoolDetails={schoolDetails}
            onUpdate={setSchoolDetails}
            isEditing={isEditing}
            onDelete={onDelete}
          />
        </div>
      </FormCard>
    );
  },
);
