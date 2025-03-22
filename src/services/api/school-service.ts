import { AxiosInstance } from "axios";
import { BaseApiService } from "./core/base-api-service";
import { ApiResponse } from "./core/http-client";
import { SchoolDetails, CreateSchoolDetailsDto, UpdateSchoolDetailsDto } from "@/types/user/school-details";

export class SchoolService extends BaseApiService<SchoolDetails, CreateSchoolDetailsDto, UpdateSchoolDetailsDto> {
  constructor(axios: AxiosInstance, userId: number) {
    super(axios, `/api/v1/users/${userId}/school-details`);
  }

  async getAll(): Promise<ApiResponse<SchoolDetails[]>> {
    return super.getAll();
  }

  async getById(id: number): Promise<ApiResponse<SchoolDetails>> {
    return super.getById(id);
  }

  async create(data: CreateSchoolDetailsDto): Promise<ApiResponse<SchoolDetails>> {
    return super.create(data);
  }

  async update(data: UpdateSchoolDetailsDto): Promise<ApiResponse<SchoolDetails>> {
    return super.update(data);
  }

  async updateById(id: number | string, data: UpdateSchoolDetailsDto): Promise<ApiResponse<SchoolDetails>> {
    return super.updateById(id, data);
  }

  async delete(): Promise<ApiResponse<void>> {
    return super.delete();
  }

  async deleteById(id: number): Promise<ApiResponse<void>> {
    return super.deleteById(id);
  }
}