import {LuWallet} from "react-icons/lu";
import {BankingDetails} from "@/types/user/banking-details";
import {FormCard} from "@/components/forms/FormCard";
import {BankingDetailsForm} from "@/components/forms/banking/BankingDetailsForm";
import {BankingFormRef} from "@/types/form/banking";
import {forwardRef, useImperativeHandle, useRef} from "react";

interface BankingSectionProps {
  bankingDetails: BankingDetails | null;
  setBankingDetails: (bankingDetails: BankingDetails) => void;
  isEditing: boolean;
  onDelete: () => void;
}

export interface BankingSectionRef {
  validateForm: () => Promise<boolean>;
}

export const BankingSection = forwardRef<BankingSectionRef, BankingSectionProps>(
  ({bankingDetails, setBankingDetails, isEditing, onDelete}, ref) => {
    const formRef = useRef<BankingFormRef>(null);

    useImperativeHandle(ref, () => ({
      async validateForm() {
        return formRef.current?.validateForm() ?? false;
      },
    }));

    return (
      <FormCard title="Informations bancaires" icon={LuWallet}>
        <div className="space-y-4">
          <BankingDetailsForm
            ref={formRef}
            bankingDetails={bankingDetails}
            onUpdate={setBankingDetails}
            isEditing={isEditing}
            onDelete={onDelete}
          />
        </div>
      </FormCard>
    );
  },
);
