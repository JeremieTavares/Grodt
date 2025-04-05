import { toast } from "sonner";
import { TransactionType } from "@/types/transaction/transaction";

type ToastActionType = "create" | "update" | "delete" | "error";

interface TransactionToastOptions {
    type: TransactionType;
    description?: string;
    amount?: number;
    errorMessage?: string;
}

interface ToastParams {
    action: ToastActionType;
    options: TransactionToastOptions;
}

interface TransactionToastReturn {
    showTransactionToast: (params: ToastParams) => string | void;
    createLoadingToast: (options: TransactionToastOptions) => string;
    updateLoadingToast: (options: TransactionToastOptions) => string;
    deleteLoadingToast: (options: TransactionToastOptions) => string;
    createToast: (id: string, options: TransactionToastOptions) => void;
    updateToast: (id: string, options: TransactionToastOptions) => void;
    deleteToast: (id: string, options: TransactionToastOptions) => void;
    errorToast: (id: string, error: unknown, options?: Partial<TransactionToastOptions>) => void;
}

export function useTransactionToast(): TransactionToastReturn {
    const formatAmount = (amount?: number) => {
        if (!amount && amount !== 0) return "";
        return Number(amount).toLocaleString("fr-CA", { style: "currency", currency: "CAD" });
    };

    const getTransactionTypeLabel = (type: TransactionType, capitalize = true) => {
        const label = type === "Expense" ? "dépense" : "revenu";
        return capitalize ? label.charAt(0).toUpperCase() + label.slice(1) : label;
    };

    const getActionLabel = (action: ToastActionType, type: TransactionType, capitalize = true) => {
        const typeLabel = getTransactionTypeLabel(type, capitalize);
        const genrePrefix = type === "Expense" ? "une " : "un ";

        switch (action) {
            case "create":
                return capitalize
                    ? `${typeLabel} ajouté${type === "Expense" ? "e" : ""}`
                    : `ajout d'${genrePrefix}${getTransactionTypeLabel(type, false)}`;
            case "update":
                return capitalize
                    ? `${typeLabel} mis${type === "Expense" ? "e" : ""} à jour`
                    : `mise à jour d'${genrePrefix}${getTransactionTypeLabel(type, false)}`;
            case "delete":
                return capitalize
                    ? `${typeLabel} supprimé${type === "Expense" ? "e" : ""}`
                    : `suppression d'${genrePrefix}${getTransactionTypeLabel(type, false)}`;
            case "error":
                return capitalize ? "Erreur" : "erreur";
            default:
                return typeLabel;
        }
    };

    const createDescriptionText = (description?: string, amount?: number) => {
        const amountText = amount !== undefined ? ` (${formatAmount(amount)})` : '';
        return `${description}${amountText}`;
    };

    // Fonction principale pour afficher un toast selon l'action
    const showTransactionToast = (params: ToastParams): string | void => {
        const { action, options } = params;
        const { type, description, amount, errorMessage } = options;

        // Générer un ID unique pour les toasts de chargement
        const id = `toast-${Date.now()}-${Math.random().toString(36)}`;

        // Pour les toasts d'erreur
        if (action === "error") {
            toast.error(errorMessage || "Une erreur est survenue", {
                description: createDescriptionText(description, amount)
            });
            return;
        }

        // Pour les actions en cours (loading)
        const loadingMessage = `${getActionLabel(action, type, false)} en cours...`;
        toast.loading(loadingMessage, {
            id,
            description: description ? createDescriptionText(description, amount) : undefined
        });

        return id;
    };

    // Fonctions spécifiques par type d'action
    const createLoadingToast = (options: TransactionToastOptions): string => {
        return showTransactionToast({ action: "create", options }) as string;
    };

    const updateLoadingToast = (options: TransactionToastOptions): string => {
        return showTransactionToast({ action: "update", options }) as string;
    };

    const deleteLoadingToast = (options: TransactionToastOptions): string => {
        return showTransactionToast({ action: "delete", options }) as string;
    };

    // Toast de succès qui remplace un toast de chargement
    const completeToast = (id: string, action: ToastActionType, options: TransactionToastOptions) => {
        const { type, description, amount } = options;

        toast.success(getActionLabel(action, type, true), {
            id,
            description: createDescriptionText(description, amount)
        });
    };

    // Fonctions pour compléter les toasts par type d'action
    const createToast = (id: string, options: TransactionToastOptions) => {
        completeToast(id, "create", options);
    };

    const updateToast = (id: string, options: TransactionToastOptions) => {
        completeToast(id, "update", options);
    };

    const deleteToast = (id: string, options: TransactionToastOptions) => {
        completeToast(id, "delete", options);
    };

    // Toast d'erreur qui remplace un toast de chargement
    const showErrorToast = (id: string, error: unknown, options?: Partial<TransactionToastOptions>) => {
        const errorMessage = error instanceof Error ? error.message : "Une erreur est survenue";

        toast.error(options?.errorMessage || "Échec de l'opération", {
            id,
            description: options?.description || errorMessage
        });
    };

    return {
        showTransactionToast,
        createLoadingToast,
        updateLoadingToast,
        deleteLoadingToast,
        createToast,
        updateToast,
        deleteToast,
        errorToast: showErrorToast
    };
} 