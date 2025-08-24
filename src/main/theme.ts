import { nativeTheme } from 'electron'
import { databaseService } from './database'

export const initializeTheme = async () => {
  try {
    //TODO: move to initializeTheme (in index)
    // Set initial nativeTheme value
    const theme = nativeTheme.shouldUseDarkColors ? 'dark' : 'light'
    databaseService.theme.setNativeTheme(theme)
    // Set initial theme source
    nativeTheme.themeSource = await databaseService.theme.getThemeMode()
  } catch (error) {
    console.error('Failed to initialize theme:', error)
  }
}
