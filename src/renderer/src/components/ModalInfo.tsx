import Button from './Button'
import Modal from './Modal'

interface ModalProps {
  title: string
  onClose: () => void
  children?: React.ReactNode
}

const ModalInfo = ({ title, onClose, children }: ModalProps) => {
  return (
    <Modal onClose={onClose}>
      <h3 className="text-lg font-bold text-font">{title}</h3>
      <div className="mt-4 flex flex-col gap-10 ">
        {children}
        <Button className="w-20 self-end" onClick={onClose}>
          OK
        </Button>
      </div>
    </Modal>
  )
}

export default ModalInfo
