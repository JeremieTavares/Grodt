import { BankingDetails } from "../banking-details/banking-details";
import { SchoolDetails } from "../school-details/school-details";
import { Address } from "./address";
import { Transaction } from "../transaction/transaction";
export interface User {
  id: number;
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  isActive: boolean;
  birthDate?: Date;
  phone?: string;
  addresses?: Address[];
  transactions?: Transaction[];
  schoolDetails?: SchoolDetails;
  bankingDetails?: BankingDetails;
}

export interface LoginDto extends Pick<User, 'email' | 'password'> { }
export interface LoggedInUser extends Pick<User, 'id' | 'firstName' | 'lastName' | 'email' | 'birthDate' | 'phone' | 'addresses'> { }

export type CreateUserDto = Omit<User, 'id'>;
// export type CreateUserDto = Omit<User, 'id' | 'addresses' | 'transactions' | 'schoolDetails' | 'bankingDetails'>;
export type UpdateUserDto = Partial<CreateUserDto>;
