import { useThemeStore } from '@renderer/stores/themeStore'
import Button from './Button'
import { FaCheck } from 'react-icons/fa'
import { JSX, useMemo } from 'react'

interface ThemeCard {
  type: 'light' | 'dark' | 'system'
  active: boolean
  onClick: (type: ThemeCard['type']) => void
}

const ThemeCard = ({ type, active, onClick }: ThemeCard): JSX.Element => {
  const label = useMemo(() => {
    switch (type) {
      case 'light':
        return 'Light'
      case 'dark':
        return 'Dark'
      case 'system':
        return 'Automatic'
      default:
        return null
    }
  }, [type])

  return (
    <button
      disabled={active}
      onClick={() => onClick(type)}
      className="flex flex-col items-center gap-1"
    >
      <div
        className={`w-30 h-20 relative rounded-xl overflow-hidden flex border hover ${active ? ' border-border pointer-events-none opacity-70' : 'border-border'}`}
      >
        {active && (
          <div className="absolute w-full h-full bg-background/50 flex items-center justify-center">
            <FaCheck />
          </div>
        )}
        <div
          className={`flex w-12 h-full ${type === 'light' ? 'bg-gray-200' : 'bg-stone-700'}  p-2 gap-1`}
        >
          <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-lime-500 rounded-full"></div>
        </div>
        <div
          className={`flex w-full h-full ${type === 'light' ? 'bg-gray-100' : 'bg-stone-500'}`}
        ></div>
      </div>
      <div>{label}</div>
    </button>
  )
}

const ThemeSelector = () => {
  const { mode, isColors, setMode, setIsColors } = useThemeStore()

  return (
    <div className="flex flex-col px-10 gap-5">
      <div className="flex w-full flex-wrap h-full bg-background gap-5">
        <ThemeCard type="light" active={mode === 'light'} onClick={setMode} />
        <ThemeCard type="dark" active={mode === 'dark'} onClick={setMode} />
        <div className="flex flex-col items-center gap-1">
          <button
            onClick={() => setMode('system')}
            className={`relative flex-none w-30 h-20 rounded-xl overflow-hidden hover border  ${mode === 'system' ? ' border-border pointer-events-none opacity-70' : 'border-border'}`}
          >
            {mode === 'system' && (
              <div className="absolute z-1 w-full h-full bg-background/50 flex items-center justify-center">
                <FaCheck />
              </div>
            )}
            <div className="w-full h-full flex">
              <div className="w-30 h-20 flex">
                <div className="flex w-12 h-full bg-stone-700 p-2 gap-1">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-lime-500 rounded-full"></div>
                </div>
                <div className="flex w-full h-full bg-stone-500"></div>
              </div>
              <div className=" absolute overflow-hidden w-32 h-20 flex -rotate-10 top-10">
                <div className="absolute rotate-10 -top-8 left-1 flex w-30 h-20">
                  <div className="flex w-[58px] h-full bg-stone-200 p-2 gap-1"></div>
                  <div className="flex w-full h-full bg-stone-100"></div>
                </div>
              </div>
            </div>
          </button>
          <div>Automatic</div>
        </div>
      </div>
      <div className="flex w-full h-full bg-background gap-3">
        <Button
          className={!isColors ? 'bg-red' : ''}
          onClick={() => {
            setIsColors(false)
          }}
        >
          Mono
        </Button>
        <Button
          className={isColors ? 'bg-red' : ''}
          onClick={() => {
            setIsColors(true)
          }}
        >
          Colorful
        </Button>
      </div>
    </div>
  )
}
export default ThemeSelector
