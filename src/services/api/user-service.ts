import {AxiosInstance} from "axios";
import {BaseApiService} from "./core/base-api-service";
import {ApiResponse} from "./core/http-client";
import {User, CreateUserDto, UpdateUserDto} from "@/types/user/user";
import {Address} from "@/types/user/address";
import {SchoolDetails, CreateSchoolDetailsDto, UpdateSchoolDetailsDto} from "@/types/user/school-details";

export class UserService extends BaseApiService<User, CreateUserDto, UpdateUserDto> {
  constructor(axios: AxiosInstance) {
    super(axios, "/api/v1/users");
  }

  async getByEmail(email: string): Promise<ApiResponse<User>> {
    return this.get<User>(`${this.basePath}/email/${email}`);
  }

  async getUserAddresses(userId: number | string): Promise<ApiResponse<Address[]>> {
    return this.get<Address[]>(`${this.basePath}/${userId}/addresses`);
  }

  async updateUserAddress(userId: number | string, address: Address): Promise<ApiResponse<Address>> {
    return this.put<Address, Address>(`${this.basePath}/${userId}/addresses`, address);
  }

  async deleteUserAddress(userId: number | string, type: string): Promise<ApiResponse<void>> {
    return this.delete(`${this.basePath}/${userId}/addresses/${type}`);
  }

  async getUserSchoolDetails(userId: number | string): Promise<ApiResponse<SchoolDetails>> {
    return this.get<SchoolDetails>(`${this.basePath}/${userId}/school-details`);
  }

  async updateUserSchoolDetails(
    userId: number | string,
    schoolDetails: CreateSchoolDetailsDto,
  ): Promise<ApiResponse<SchoolDetails>> {
    return this.put<SchoolDetails, CreateSchoolDetailsDto>(`${this.basePath}/${userId}/school-details`, schoolDetails);
  }

  async deleteUserSchoolDetails(userId: number | string): Promise<ApiResponse<void>> {
    return this.delete(`${this.basePath}/${userId}/school-details`);
  }
}
