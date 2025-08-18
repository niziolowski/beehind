import { useThemeStore } from '@renderer/stores/themeStore'
import Button from './Button'

const ThemeSelector = () => {
  const { mode, palette, setMode, setPalette } = useThemeStore()

  return (
    <div className="flex flex-col px-10 gap-3">
      <div className="flex w-full h-full bg-background gap-3">
        <Button
          className={mode === 'light' ? 'bg-red text-background' : ''}
          onClick={() => {
            setMode('light')
          }}
        >
          Light
        </Button>
        <Button
          className={mode === 'dark' ? 'bg-red text-background' : ''}
          onClick={() => {
            setMode('dark')
          }}
        >
          Dark
        </Button>
        <Button
          className={mode === 'system' ? 'bg-red text-background' : ''}
          onClick={() => {
            setMode('system')
          }}
        >
          System Appearance
        </Button>
      </div>
      <div className="flex w-full h-full bg-background gap-3">
        <Button
          className={palette === 'mono' ? 'bg-red text-background' : ''}
          onClick={() => {
            setPalette('mono')
          }}
        >
          Mono
        </Button>
        <Button
          className={palette === 'colorful' ? 'bg-red text-background' : ''}
          onClick={() => {
            setPalette('colorful')
          }}
        >
          Colorful
        </Button>
      </div>
    </div>
  )
}
export default ThemeSelector
