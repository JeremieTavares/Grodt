import { User } from "../user/user";
export interface BankingDetails {
    id: number;
    institutionName: string;
    accountInfo: string;
    loanInfo?: string;
    other?: string;
    user: User;
}

export type CreateBankingDetailsDto = Omit<BankingDetails, 'id' | 'user'>;
export type UpdateBankingDetailsDto = Partial<CreateBankingDetailsDto>;
