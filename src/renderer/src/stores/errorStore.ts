import { ErrorState } from '@renderer/types/store'
import { create } from 'zustand'

export const useErrorStore = create<ErrorState>()((set) => ({
  error: null,
  showError: (error) => set({ error }),
  clearError: () => set({ error: null })
}))
