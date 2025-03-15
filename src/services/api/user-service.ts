import {AxiosInstance} from "axios";
import {BaseApiService} from "./core/base-api-service";
import {ApiResponse} from "./core/http-client";
import {User, CreateUserDto, UpdateUserDto} from "@/types/user/user";
import {Address} from "@/types/user/address";

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
}
