import {AxiosInstance} from "axios";
import {BaseApiService} from "./core/base-api-service";
import {ApiResponse} from "./core/http-client";
import {BankingDetails, CreateBankingDetailsDto, UpdateBankingDetailsDto} from "@/types/user/banking-details";

export class BankingService extends BaseApiService<BankingDetails, CreateBankingDetailsDto, UpdateBankingDetailsDto> {
  constructor(axios: AxiosInstance, userId: number) {
    super(axios, `/api/v1/users/${userId}/banking-details`);
  }

  async getById(_id: number): Promise<ApiResponse<BankingDetails>> {
    return this.get<BankingDetails>(`${this.basePath}`);
  }

  async create(data: CreateBankingDetailsDto): Promise<ApiResponse<BankingDetails>> {
    return this.post<BankingDetails, CreateBankingDetailsDto>(this.basePath, data);
  }

  async update(_id: number, data: UpdateBankingDetailsDto): Promise<ApiResponse<BankingDetails>> {
    return this.put<BankingDetails, UpdateBankingDetailsDto>(this.basePath, data);
  }

  async deleteById(_id: number): Promise<ApiResponse<void>> {
    return this.delete(this.basePath);
  }
}
