import {create} from "zustand";
import {LoggedInUser} from "@/types/user/user";

interface AuthState {
  user: LoggedInUser | null;
  setUser: (user: LoggedInUser | null) => void;
}

// Default user until login is implemented
const defaultUser: LoggedInUser = {
  id: 11,
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
};

const useAuthStore = create<AuthState>()((set) => ({
  user: defaultUser,
  setUser: (user: LoggedInUser | null) => set({user}),
}));

export const useAuth = () => {
  const {user, setUser} = useAuthStore();
  return {user, setUser};
};
