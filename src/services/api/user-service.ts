import { AxiosInstance } from 'axios';
import { BaseApiService } from './core/base-api-service';
import { ApiResponse } from './core/http-client';
import { User, CreateUserDto, UpdateUserDto } from '@/types/user/user';

export class UserService extends BaseApiService<User, CreateUserDto, UpdateUserDto> {
    constructor(axios: AxiosInstance) {
        super(axios, '/api/v1/users');
    }

    async getByEmail(email: string): Promise<ApiResponse<User>> {
        return this.get<User>(`${this.basePath}/email/${email}`);
    }
} 