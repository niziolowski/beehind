import { ThemeMode } from '@main/types/database'
import { useThemeStore } from '@renderer/stores/themeStore'
import { useMutation } from '@tanstack/react-query'

// Set Theme Mode
export const useSetThemeMode = () => {
  const setThemeMode = useThemeStore((state) => state.setThemeMode)

  return useMutation({
    mutationFn: async (themeMode: ThemeMode): Promise<ThemeMode> => {
      await window.api.theme.setThemeMode(themeMode)

      return themeMode
    },
    onSuccess: (themeMode) => {
      setThemeMode(themeMode)
    }
  })
}

// Set Is Colors
export const useSetIsColors = () => {
  const setIsColors = useThemeStore((state) => state.setIsColors)

  return useMutation({
    mutationFn: async (isColors: boolean): Promise<boolean> => {
      await window.api.theme.setThemeIsColors(isColors)
      return isColors
    },
    onSuccess: (isColors) => {
      setIsColors(isColors)
    }
  })
}
