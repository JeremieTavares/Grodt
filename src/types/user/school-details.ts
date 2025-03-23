import { User } from "./user";

export interface SchoolDetails {
  id: number;
  schoolName: string;
  fieldOfStudy: string;
  startDate: string;
  projectedEndDate?: string;
  user?: User;
}

export type CreateSchoolDetailsDto = Omit<SchoolDetails, "id" | "user">;
export type UpdateSchoolDetailsDto = Partial<CreateSchoolDetailsDto>;
