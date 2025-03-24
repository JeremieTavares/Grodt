import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, isAxiosError } from 'axios';

export interface ApiResponse<T> {
    data: T;
    status: number;
    statusText: string;
}

export interface ApiError {
    message: string;
    status: number;
    errors?: Record<string, string[]>;
}

export class HttpClient {
    constructor(private readonly axios: AxiosInstance) { }

    protected async get<T>(path: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        try {
            const response = await this.axios.get<T>(path, config);
            return this.processResponse(response);
        } catch (error) {
            throw this.processError(error);
        }
    }

    protected async post<T, D = unknown>(path: string, data?: D, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        try {
            const response = await this.axios.post<T>(path, data, config);
            return this.processResponse(response);
        } catch (error) {
            throw this.processError(error);
        }
    }

    protected async put<T, D = unknown>(path: string, data?: D, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        try {
            const response = await this.axios.put<T>(path, data, config);
            return this.processResponse(response);
        } catch (error) {
            throw this.processError(error);
        }
    }

    protected async destroy<T>(path: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        try {
            const response = await this.axios.delete<T>(path, config);
            return this.processResponse(response);
        } catch (error) {
            throw this.processError(error);
        }
    }

    private processResponse<T>(response: AxiosResponse<T>): ApiResponse<T> {
        return {
            data: response.data,
            status: response.status,
            statusText: response.statusText,
        };
    }

    private processError(error: unknown): ApiError {
        if (isAxiosError(error)) {
            const axiosError = error as AxiosError<{ message?: string; errors?: Record<string, string[]> }>;
            return {
                message: axiosError.response?.data?.message || axiosError.message,
                status: axiosError.response?.status || 500,
                errors: axiosError.response?.data?.errors,
            };
        }

        return {
            message: error instanceof Error ? error.message : 'An unknown error occurred',
            status: 500,
        };
    }
} 