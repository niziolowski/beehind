import { nativeTheme } from 'electron'
import { databaseService } from './database'

export const initializeTheme = async () => {
  //TODO: move to initializeTheme (in index)
  // Set initial nativeTheme value
  const theme = nativeTheme.shouldUseDarkColors ? 'dark' : 'light'
  databaseService.settings.setNativeTheme(theme)
  // Set initial theme source
  nativeTheme.themeSource = await databaseService.settings.getThemeMode()
}
