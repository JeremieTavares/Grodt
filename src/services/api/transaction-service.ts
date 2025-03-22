import { AxiosInstance } from 'axios';
import { BaseApiService } from './core/base-api-service';
import { ApiResponse } from './core/http-client';
import { Transaction, CreateTransactionDto, UpdateTransactionDto } from '@/types/transaction/transaction';

export class TransactionService extends BaseApiService<Transaction, CreateTransactionDto, UpdateTransactionDto> {
    constructor(axios: AxiosInstance, userId: number) {
        super(axios, `/api/v1/users/${userId}/transactions`);
    }

    async getAll(): Promise<ApiResponse<Transaction[]>> {
        return super.getAll();
    }

    async getById(transactionId: number): Promise<ApiResponse<Transaction>> {
        return super.getById(transactionId);
    }

    async create(data: CreateTransactionDto): Promise<ApiResponse<Transaction>> {
        return super.create(data);
    }

    async update(data: UpdateTransactionDto): Promise<ApiResponse<Transaction>> {
        return super.update(data);
    }

    async updateById(transactionId: number, data: UpdateTransactionDto): Promise<ApiResponse<Transaction>> {
        return super.updateById(transactionId, data);
    }

    async deleteById(transactionId: number): Promise<ApiResponse<void>> {
        return super.deleteById(transactionId);
    }
} 