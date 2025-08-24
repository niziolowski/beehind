import { createPortal } from 'react-dom'
import Button from './Button'
import { useEffect } from 'react'

interface ModalProps {
  title: string
  onClose: () => void
  children?: React.ReactNode
}

const Modal = ({ title, onClose, children }: ModalProps) => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' || e.key === 'Enter') {
      onClose()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return createPortal(
    <div
      onClick={(e) => e.target == e.currentTarget && onClose()}
      className="fixed inset-0 bg-primary/50 backdrop-blur-xs flex items-center justify-center z-50"
    >
      <div className="bg-background p-8 rounded-lg max-w-md w-full shadow-lg">
        <h3 className="text-lg font-bold text-font">{title}</h3>
        <div className="mt-4 flex flex-col gap-10 ">
          {children}
          <Button className="w-20 self-end" onClick={onClose}>
            OK
          </Button>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default Modal
