import { Component } from '@main/types/index'
import Modal from './Modal'

interface ComponentDetailsProps {
  onClose?: () => void
  data: Component | null
}

const ComponentDetails = ({ onClose, data }: ComponentDetailsProps) => {
  return (
    <Modal onClose={onClose}>
      <div>Component Details</div>
      {data && (
        <div>
          <h2>{data.name}</h2>
          <p>{data.quantity}</p>
        </div>
      )}
    </Modal>
  )
}
export default ComponentDetails
