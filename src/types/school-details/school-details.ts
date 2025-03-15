import { User } from "../user/user";

export interface SchoolDetails {
    id: number;
    schoolName: string;
    fieldOfStudy: string;
    startDate: Date;
    projectedEndDate?: Date;
    user: User;
}

export type CreateSchoolDetailsDto = Omit<SchoolDetails, 'id' | 'user'>;
export type UpdateSchoolDetailsDto = Partial<CreateSchoolDetailsDto>; 