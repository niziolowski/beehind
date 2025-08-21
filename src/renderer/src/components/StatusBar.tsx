import { FiActivity } from 'react-icons/fi'

const StatusBar = () => {
  return (
    <div className="flex items-center w-full h-10 flex-none bg-background border-t border-border">
      <button className="px-5 h-full flex items-center gap-2 text-secondary italic hover:bg-primary">
        <FiActivity />
        <div>Last synced: </div>
      </button>
    </div>
  )
}
export default StatusBar
