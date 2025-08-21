import { forwardRef, JSX, PropsWithChildren } from 'react'
interface InputProps extends PropsWithChildren {
  className?: string
  icon?: JSX.Element
  placeholder?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, icon, ...rest }, ref) => {
  const classes = `flex w-full h-10 ${icon ? 'pl-9' : ''} px-3 py-2 text-sm text-font bg-primary border rounded-xl border-border ring-offset-background placeholder:text-secondary focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 ${className}`
  return (
    <div className="flex items-center w-full">
      {icon && <div className="absolute px-3 pointer-events-none">{icon}</div>}
      <input type="text" {...rest} className={classes} ref={ref} />
    </div>
  )
})
export default Input
