import {AxiosInstance} from "axios";
import {BaseApiService} from "./core/base-api-service";
import {ApiResponse} from "./core/http-client";
import {SchoolDetails, CreateSchoolDetailsDto, UpdateSchoolDetailsDto} from "@/types/user/school-details";

export class SchoolService extends BaseApiService<SchoolDetails, CreateSchoolDetailsDto, UpdateSchoolDetailsDto> {
  constructor(axios: AxiosInstance, userId: number) {
    super(axios, `/api/v1/users/${userId}/school-details`);
  }

  async getById(_id: number): Promise<ApiResponse<SchoolDetails>> {
    return this.get<SchoolDetails>(`${this.basePath}`);
  }

  async create(data: CreateSchoolDetailsDto): Promise<ApiResponse<SchoolDetails>> {
    return this.post<SchoolDetails, CreateSchoolDetailsDto>(this.basePath, data);
  }

  async update(_id: number, data: UpdateSchoolDetailsDto): Promise<ApiResponse<SchoolDetails>> {
    return this.put<SchoolDetails, UpdateSchoolDetailsDto>(this.basePath, data);
  }

  async deleteById(_id: number): Promise<ApiResponse<void>> {
    return this.delete(this.basePath);
  }
}
