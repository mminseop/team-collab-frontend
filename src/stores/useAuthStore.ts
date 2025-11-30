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
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  login: (user) => set({ 
    user, 
    isAuthenticated: true, 
    isLoading: false 
  }),

  logout: () => set({ 
    user: null, 
    isAuthenticated: false, 
    isLoading: false 
  }),

  setLoading: (isLoading) => set({ isLoading }),

  checkAuth: () => {
    const { user } = get();
    if (!user) set({ isAuthenticated: false });
  },
}));