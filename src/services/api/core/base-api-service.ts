import { AxiosInstance } from 'axios';
import { HttpClient, ApiResponse } from './http-client';

export abstract class BaseApiService<T, CreateDto, UpdateDto> extends HttpClient {
    constructor(
        axios: AxiosInstance,
        protected readonly basePath: string
    ) {
        super(axios);
    }

    async getAll(): Promise<ApiResponse<T[]>> {
        return this.get<T[]>(this.basePath);
    }

    async getById(id: number | string): Promise<ApiResponse<T>> {
        return this.get<T>(`${this.basePath}/${id}`);
    }

    async create(data: CreateDto): Promise<ApiResponse<T>> {
        return this.post<T, CreateDto>(this.basePath, data);
    }

    async updateById(id: number | string, data: UpdateDto): Promise<ApiResponse<T>> {
        return this.put<T, UpdateDto>(`${this.basePath}/${id}`, data);
    }

    async update(data: UpdateDto): Promise<ApiResponse<T>> {
        return this.put<T, UpdateDto>(`${this.basePath}`, data);
    }

    async delete(): Promise<ApiResponse<void>> {
        return super.destroy(this.basePath);
    }

    async deleteById(id: number | string): Promise<ApiResponse<void>> {
        return super.destroy(`${this.basePath}/${id}`);
    }
} 