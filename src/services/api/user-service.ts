import { AxiosInstance } from "axios";
import { BaseApiService } from "./core/base-api-service";
import { ApiResponse } from "./core/http-client";
import { User, CreateUserDto, UpdateUserDto } from "@/types/user/user";

export class UserService extends BaseApiService<User, CreateUserDto, UpdateUserDto> {
  constructor(axios: AxiosInstance) {
    super(axios, "/api/v1/users");
  }

  async getById(id: number | string): Promise<ApiResponse<User>> {
    return super.getById(id);
  }

  async getByEmail(email: string): Promise<ApiResponse<User>> {
    return super.get<User>(`${this.basePath}/email/${email}`);
  }

  async create(user: CreateUserDto): Promise<ApiResponse<User>> {
    return super.create(user);
  }

  async update(user: UpdateUserDto): Promise<ApiResponse<User>> {
    throw new Error("Method not implemented.");
  }

  async updateById(id: number | string, user: UpdateUserDto): Promise<ApiResponse<User>> {
    return super.updateById(id, user);
  }

  async delete(): Promise<ApiResponse<void>> {
    throw new Error("Method not implemented.");
  }

  async deleteById(id: number | string): Promise<ApiResponse<void>> {
    return super.deleteById(id);
  }
}