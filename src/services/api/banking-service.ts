import { AxiosInstance } from "axios";
import { BaseApiService } from "./core/base-api-service";
import { ApiResponse } from "./core/http-client";
import { BankingDetails, CreateBankingDetailsDto, UpdateBankingDetailsDto } from "@/types/user/banking-details";

export class BankingService extends BaseApiService<BankingDetails, CreateBankingDetailsDto, UpdateBankingDetailsDto> {
  constructor(axios: AxiosInstance, userId: number) {
    super(axios, `/api/v1/users/${userId}/banking-details`);
  }

  async getAll(): Promise<ApiResponse<BankingDetails[]>> {
    return super.getAll();
  }

  async getById(id: number): Promise<ApiResponse<BankingDetails>> {
    return super.getById(id);
  }

  async create(data: CreateBankingDetailsDto): Promise<ApiResponse<BankingDetails>> {
    return super.create(data);
  }

  async update(id: number | string, data: UpdateBankingDetailsDto): Promise<ApiResponse<BankingDetails>> {
    throw new Error("Not implemented in the backend");
  }

  async updateDetails(data: UpdateBankingDetailsDto): Promise<ApiResponse<BankingDetails>> {
    return super.update('', data);
  }

  async deleteById(id: number): Promise<ApiResponse<void>> {
    return super.deleteById(id);
  }
}