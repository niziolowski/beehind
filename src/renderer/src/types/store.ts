export interface ErrorState {
  error: Error | string | null
  showError: (error: Error | string) => void
  clearError: () => void
}
