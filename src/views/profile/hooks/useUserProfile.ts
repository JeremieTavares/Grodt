import { useEffect, useState } from "react";
import { toast } from "sonner";
import { User } from "@/types/user/user";
import { useApi } from "@/hooks/useApi";

export const useUserProfile = (userId: number) => {
    const [user, setUser] = useState<User | null>(null);
    const { users } = useApi();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await users.getById(userId);
                if (response?.data) {
                    setUser(response.data);
                }
            } catch (error) {
                toast.error("Une erreur est survenue lors de la récupération du profil");
            }
        };

        if (userId) {
            fetchUser();
        }
    }, [userId, users]);

    return {
        user,
        setUser,
    };
}; 