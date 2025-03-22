import {useMemo} from "react";
import {apiClient} from "@/services/api/core/config";
import {UserService} from "@/services/api/user-service";
import {TransactionService} from "@/services/api/transaction-service";
import {BankingService} from "@/services/api/banking-service";
import {SchoolService} from "@/services/api/school-service";

/**
 * useApi is a hook that provides a set of services for the current user.
 * @param userId - The ID of the current user.
 * @returns A set of services for the current user.
 *
 * @example
 * // Example usage:
 * const Profile = () => {
 *   const userId = 123; // Get from auth context or props
 *   const api = useApi(userId);
 *
 *   const fetchUserData = async () => {
 *     try {
 *       const response = await api.users.getById(userId);
 *       console.log(response.data);
 *     } catch (error) {
 *       console.error(error);
 *     }
 *   };
 *
 *   const createTransaction = async (data) => {
 *     try {
 *       if (!api.transactions) {
 *         console.error('User ID is required for transaction operations');
 *       }
 *       const response = await api.transactions.createForUser(userId, data);
 *       console.log(response.data);
 *     } catch (error) {
 *       console.error(error);
 *     }
 *   };
 *
 *   return <div>...</div>;
 * };
 */
export const useApi = (userId?: number) => {
  const services = useMemo(() => {
    return {
      users: new UserService(apiClient),
      transactions: userId ? new TransactionService(apiClient, userId) : null,
      banking: userId ? new BankingService(apiClient, userId) : null,
      school: userId ? new SchoolService(apiClient, userId) : null,
    };
  }, [userId]);

  return services;
};
