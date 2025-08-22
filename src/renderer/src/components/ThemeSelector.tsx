import { useThemeStore } from '@renderer/stores/themeStore'
import { FaCheck } from 'react-icons/fa'
import { JSX, useMemo } from 'react'

interface ThemeCard {
  type: 'light' | 'dark' | 'system' | 'mono' | 'colorful'
  active: boolean
  onClick: () => void
}

const ThemeCard = ({ type, active, onClick }: ThemeCard): JSX.Element => {
  const { theme } = useThemeStore()

  const colors = useMemo(() => {
    let sidebar: string = 'bg-primary',
      background: string = 'bg-background'

    if (type === 'light') {
      sidebar = 'bg-stone-200'
      background = 'bg-stone-100'
    }
    if (type === 'dark' || type === 'system') {
      sidebar = 'bg-stone-700'
      background = 'bg-stone-500'
    }
    if ((type === 'mono' && theme === 'light') || (type === 'colorful' && theme === 'light')) {
      sidebar = 'bg-stone-200'
      background = 'bg-stone-100'
    }
    if ((type === 'mono' && theme === 'dark') || (type === 'colorful' && theme === 'dark')) {
      sidebar = 'bg-stone-700'
      background = 'bg-stone-500'
    }

    return { sidebar, background }
  }, [type, theme])

  const label = useMemo(() => {
    switch (type) {
      case 'light':
        return 'Light'
      case 'dark':
        return 'Dark'
      case 'system':
        return 'Automatic'
      case 'mono':
        return 'Mono'
      case 'colorful':
        return 'Colorful'
      default:
        return null
    }
  }, [type])

  const itemsSkeleton = useMemo(() => {
    if (type !== 'mono' && type !== 'colorful') return null

    return (
      <div className="flex flex-col gap-1">
        <div className={`h-1.5 rounded-full ${type === 'mono' ? 'bg-border' : 'bg-red-400'}`}></div>
        <div
          className={`h-1.5 rounded-full ${type === 'mono' ? 'bg-border' : 'bg-yellow-400'}`}
        ></div>
        <div
          className={`h-1.5 rounded-full ${type === 'mono' ? 'bg-border' : 'bg-lime-500'}`}
        ></div>
      </div>
    )
  }, [type])

  return (
    <div className="flex flex-col items-center gap-1">
      <button
        onClick={onClick}
        className={`relative flex-none w-30 h-20 rounded-xl overflow-hidden hover border  ${active ? ' border-border pointer-events-none opacity-70' : 'border-border'}`}
      >
        {active && (
          <div className="absolute z-1 w-full h-full bg-background/40 border-2 border-font rounded-xl flex items-center justify-center">
            <FaCheck />
          </div>
        )}
        <div className="w-full h-full flex">
          <div className="w-30 h-20 flex">
            <div className={`flex flex-col w-12 h-full p-2 gap-3 ${colors.sidebar}`}>
              <div className="flex gap-1">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${type == 'mono' ? 'bg-border' : 'bg-red-400'}`}
                ></div>
                <div
                  className={`w-1.5 h-1.5 rounded-full ${type === 'mono' ? 'bg-border' : 'bg-yellow-400'}`}
                ></div>
                <div
                  className={`w-1.5 h-1.5 rounded-full ${type === 'mono' ? 'bg-border' : 'bg-lime-500'}`}
                ></div>
              </div>
              {itemsSkeleton}
            </div>
            <div className={`flex w-full h-full ${colors.background}`}></div>
          </div>
          {type === 'system' && (
            <div className=" absolute overflow-hidden w-32 h-20 flex -rotate-10 top-10">
              <div className="absolute rotate-10 -top-8 left-1 flex w-30 h-20">
                <div className="flex w-[58px] h-full bg-stone-200 p-2 gap-1"></div>
                <div className="flex w-full h-full bg-stone-100"></div>
              </div>
            </div>
          )}
        </div>
      </button>
      <div className={`filter drop-shadow-md transition-all italic ${active ? 'font-bold' : ''}`}>
        {label}
      </div>
    </div>
  )
}

const ThemeSelector = () => {
  const { themeMode, isColors, setThemeMode: setMode, setIsColors } = useThemeStore()

  return (
    <div className="flex flex-col px-10 gap-5">
      <h2>Theme</h2>
      <div className="flex w-full flex-wrap h-full bg-background gap-5">
        <ThemeCard type="light" active={themeMode === 'light'} onClick={() => setMode('light')} />
        <ThemeCard type="dark" active={themeMode === 'dark'} onClick={() => setMode('dark')} />
        <ThemeCard
          type="system"
          active={themeMode === 'system'}
          onClick={() => setMode('system')}
        />
      </div>
      <h2>Mood</h2>
      <div className="flex w-full flex-wrap h-full bg-background gap-5">
        <ThemeCard type="mono" active={isColors === false} onClick={() => setIsColors(false)} />
        <ThemeCard type="colorful" active={isColors === true} onClick={() => setIsColors(true)} />
      </div>
    </div>
  )
}
export default ThemeSelector
