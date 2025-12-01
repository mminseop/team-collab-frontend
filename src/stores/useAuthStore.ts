import { create } from 'zustand';

interface User {
  id: number;
  email: string;
  name: string;
  role: 'ADMIN' | 'MEMBER';
  departmentId: number | null;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  
  setLoading: (isLoading) => set({ isLoading }),
  login: (user) => set({ user, isLoading: false }),
  logout: () => set({ user: null, isLoading: false }),
}));
