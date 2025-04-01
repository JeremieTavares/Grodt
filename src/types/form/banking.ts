import {BankingDetails} from "@/types/user/banking-details";

export type BankingFormFields = {
  institutionName: string;
  accountInfo: string;
};

export interface BankingFormProps {
  bankingDetails: BankingDetails | null;
  isEditing: boolean;
  onDelete?: () => void;
  onUpdate: (updatedBankingDetails: BankingDetails) => void;
}

export type BankingFormRef = {
  validateForm: () => Promise<boolean>;
};
