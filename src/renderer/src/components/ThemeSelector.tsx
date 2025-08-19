import { useThemeStore } from '@renderer/stores/themeStore'
import Button from './Button'

const ThemeSelector = () => {
  const { mode, palette, setMode, setPalette } = useThemeStore()

  return (
    <div className="flex flex-col px-10 gap-5">
      <div className="flex w-full h-full bg-background gap-5">
        <button onClick={() => setMode('light')} className="flex flex-col items-center gap-1">
          <div className="w-30 h-20 rounded-xl overflow-hidden flex border border-border hover">
            <div className="flex w-12 h-full bg-gray-200 p-2 gap-1">
              <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-lime-500 rounded-full"></div>
            </div>
            <div className="flex w-full h-full bg-gray-100"></div>
          </div>
          <div>Light</div>
        </button>
        <button onClick={() => setMode('dark')} className="flex flex-col items-center gap-1">
          <div className="w-30 h-20 rounded-xl overflow-hidden flex border border-border hover">
            <div className="flex w-12 h-full bg-stone-700 p-2 gap-1">
              <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-lime-500 rounded-full"></div>
            </div>
            <div className="flex w-full h-full bg-stone-500"></div>
          </div>
          <div>Dark</div>
        </button>
        <div className="flex flex-col items-center gap-1">
          <button
            onClick={() => setMode('system')}
            className="relative flex-none w-30 h-20 rounded-xl overflow-hidden border border-border hover"
          >
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
