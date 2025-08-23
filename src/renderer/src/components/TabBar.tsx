import { useRef, useEffect } from 'react'

export type Tab = {
  id: 'shopify' | 'database' | 'theme'
  label: string
}

interface TabBarProps {
  tabs: Tab[]
  value: 'shopify' | 'database' | 'theme'
  onChange: (id: 'shopify' | 'database' | 'theme') => void
}

export default function TabBar({ tabs, value, onChange }: TabBarProps) {
  const markerRef = useRef<HTMLDivElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)

  const reposition = (btn: HTMLButtonElement | null) => {
    if (markerRef.current && btn) {
      markerRef.current.style.width = btn.offsetWidth + 'px'
      markerRef.current.style.left = btn.offsetLeft + 'px'
    }
  }

  useEffect(() => {
    if (buttonsRef.current) {
      reposition(
        buttonsRef.current.children[
          tabs.findIndex((t) => t.id === value)
        ] as HTMLButtonElement | null
      )
    }
  }, [value, buttonsRef.current])

  return (
    <div ref={buttonsRef} className="relative flex p-1 bg-primary rounded-xl select-none">
      {tabs.map((tab, i) => (
        <button
          key={i}
          onClick={(e) => {
            onChange(tab.id)
            reposition(e.currentTarget)
          }}
          className={`relative z-10 flex-1 text-font px-3 py-1 text-sm font-medium rounded-xl cursor-pointer hover:opacity-80 transition ${
            value === tab.id ? '' : 'opacity-50'
          }`}
        >
          {tab.label}
        </button>
      ))}
      <div
        ref={markerRef}
        className="absolute top-1 bottom-1 left-0 z-0 transition-all duration-300"
      >
        <div className="w-full h-full bg-background rounded-lg shadow-sm" />
      </div>
    </div>
  )
}
