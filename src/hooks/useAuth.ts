import { create } from "zustand"
import { LoggedInUser } from "@/types/user/user"

interface AuthState {
  user: LoggedInUser | null
  setUser: (user: LoggedInUser | null) => void
}

const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  setUser: (user: LoggedInUser | null) => set({ user }),
}))

export const useAuth = () => {
  const { user, setUser } = useAuthStore()
  return { user, setUser }
}
