import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      isFetching: false,
      error: false,
      token: null,

      // Actions
      loginStart: () =>
        set({
          isFetching: true,
          error: false,
        }),

      loginSuccess: (user, token) =>
        set({
          user,
          token,
          isFetching: false,
          error: false,
        }),

      loginFailure: () =>
        set({
          isFetching: false,
          error: true,
          user: null,
        }),

      logout: () =>
        set({
          user: null,
          token: null,
          isFetching: false,
          error: false,
        }),

      updateUser: (userData) =>
        set((state) => ({
          user: { ...state.user, ...userData },
        })),

      setError: (error) =>
        set({
          error,
        }),

      clearError: () =>
        set({
          error: false,
        }),
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
    }
  )
);
