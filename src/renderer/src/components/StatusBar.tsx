import { useStatusStore } from '@renderer/stores'
import { FiAlertTriangle, FiClock, FiDownload, FiWifi, FiWifiOff } from 'react-icons/fi'

const StatusBar = () => {
  const { isOnline } = useStatusStore()
  return (
    <div className="flex flex-wrap items-center w-full h-10 p-1 flex-none bg-background border-t border-border text-sm overflow-hidden">
      <div className="h-full">
        {isOnline ? (
          <span className="text-sky-300 px-5 rounded-xl h-full flex items-center gap-2">
            <FiWifi /> Online
          </span>
        ) : (
          <span className="text-red-400 px-5 rounded-xl h-full flex items-center gap-2">
            <FiWifiOff /> Offline
          </span>
        )}
      </div>
      <button className="rounded-xl px-5 h-full flex items-center gap-2 text-secondary italic hover:bg-lime-300 hover:text-font">
        <FiDownload />
        <div>Sync</div>
      </button>
      <button className="rounded-xl px-5 h-full flex items-center gap-2 text-secondary italic hover:bg-primary">
        <FiClock />
        <div>synced: 10 min. ago</div>
      </button>
      <button className="rounded-xl px-5 h-full flex items-center gap-2 text-red-400 italic hover:bg-red-300 hover:text-font">
        <FiAlertTriangle />
        <div>Low stock items: 11 </div>
      </button>
    </div>
  )
}
export default StatusBar
