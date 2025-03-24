import {LuWallet} from "react-icons/lu";
import {BankingDetails} from "@/types/user/banking-details";
import {FormCard} from "@/components/forms/FormCard";
import {BankingDetailsForm} from "@/components/forms/banking/BankingDetailsForm";

interface BankingSectionProps {
  bankingDetails: BankingDetails | null;
  setBankingDetails: (bankingDetails: BankingDetails) => void;
  isEditing: boolean;
  onDelete: () => void;
}

export const BankingSection = ({bankingDetails, setBankingDetails, isEditing, onDelete}: BankingSectionProps) => (
  <FormCard title="Informations bancaires" icon={LuWallet}>
    <div className="space-y-4">
      <BankingDetailsForm
        bankingDetails={bankingDetails}
        onUpdate={setBankingDetails}
        isEditing={isEditing}
        onDelete={onDelete}
      />
    </div>
  </FormCard>
);
