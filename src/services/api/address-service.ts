import {AxiosInstance} from "axios";
import {BaseApiService} from "./core/base-api-service";
import {ApiResponse} from "./core/http-client";
import {Address, CreateAddressDto, UpdateAddressDto} from "@/types/user/address";
import {AddressType} from "@/enums/address/address";

export class AddressService extends BaseApiService<Address, CreateAddressDto, UpdateAddressDto> {
  constructor(axios: AxiosInstance, userId: number) {
    super(axios, `/api/v1/users/${userId}/addresses`);
  }

  async getAll(): Promise<ApiResponse<Address[]>> {
    return super.getAll();
  }

  async getById(addressId: number | string): Promise<ApiResponse<Address>> {
    return super.getById(addressId);
  }

  async getByType(type: AddressType): Promise<ApiResponse<Address>> {
    return super.get<Address>(`${this.basePath}/${type}`);
  }

  async create(address: CreateAddressDto): Promise<ApiResponse<Address>> {
    return super.create(address);
  }

  async update(address: Address): Promise<ApiResponse<Address>> {
    return super.update(address);
  }

  async updateById(addressId: number | string, address: Address): Promise<ApiResponse<Address>> {
    return super.updateById(addressId, address);
  }

  async delete(): Promise<ApiResponse<void>> {
    return super.delete();
  }

  async deleteById(addressId: number | string): Promise<ApiResponse<void>> {
    return super.deleteById(addressId);
  }

  async deleteByType(type: AddressType): Promise<ApiResponse<void>> {
    return super.deleteById(type);
  }
}
