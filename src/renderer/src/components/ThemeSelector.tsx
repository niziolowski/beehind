import { useThemeStore } from '@renderer/stores/themeStore'
import { useSetIsColors, useSetThemeMode } from '@renderer/mutations'
import ThemeCard from './ThemeCard'

const ThemeSelector = () => {
  const { themeMode, isColors } = useThemeStore()
  const { mutate: setThemeModeMutation } = useSetThemeMode()
  const { mutate: setIsColorsMutation } = useSetIsColors()

  return (
    <div className="flex flex-col px-10 gap-5">
      <h2>Theme</h2>
      <div className="flex w-full flex-wrap h-full bg-background gap-5">
        <ThemeCard
          type="light"
          active={themeMode === 'light'}
          onClick={() => setThemeModeMutation('light')}
        />
        <ThemeCard
          type="dark"
          active={themeMode === 'dark'}
          onClick={() => setThemeModeMutation('dark')}
        />
        <ThemeCard
          type="system"
          active={themeMode === 'system'}
          onClick={() => setThemeModeMutation('system')}
        />
      </div>
      <h2>Mood</h2>
      <div className="flex w-full flex-wrap h-full bg-background gap-5">
        <ThemeCard
          type="mono"
          active={isColors === false}
          onClick={() => setIsColorsMutation(false)}
        />
        <ThemeCard
          type="colorful"
          active={isColors === true}
          onClick={() => setIsColorsMutation(true)}
        />
      </div>
    </div>
  )
}
export default ThemeSelector
