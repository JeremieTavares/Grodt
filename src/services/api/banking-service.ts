import {AxiosInstance} from "axios";
import {BaseApiService} from "./core/base-api-service";
import {ApiResponse} from "./core/http-client";
import {BankingDetails, CreateBankingDetailsDto, UpdateBankingDetailsDto} from "@/types/user/banking-details";

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

  async update(data: UpdateBankingDetailsDto): Promise<ApiResponse<BankingDetails>> {
    return super.update(data);
  }

  async updateById(id: number | string, data: UpdateBankingDetailsDto): Promise<ApiResponse<BankingDetails>> {
    return super.updateById(id, data);
  }

  async delete(): Promise<ApiResponse<void>> {
    return super.delete();
  }

  async deleteById(id: number): Promise<ApiResponse<void>> {
    return super.deleteById(id);
  }
}
