import { create } from 'zustand';
import { useNavigate } from 'react-router-dom';
import { AuthState } from '../types/auth.types';
import { authService } from '../services/auth.service';

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (credentials) => {
    set({ isLoading: true });
    try {
      const user = await authService.login(credentials);
      set({ user, isAuthenticated: true });
    } catch (error) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  }
}));