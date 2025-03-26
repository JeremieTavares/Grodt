import {SchoolDetails} from "@/types/user/school-details";

export type SchoolFormFields = {
  schoolName: string;
  fieldOfStudy: string;
  startDate: string;
  projectedEndDate?: string;
};

export interface SchoolFormProps {
  schoolDetails: SchoolDetails | null;
  isEditing: boolean;
  onDelete?: () => void;
  onUpdate: (updatedSchoolDetails: SchoolDetails) => void;
}

export type SchoolFormRef = {
  validateForm: () => Promise<boolean>;
};
