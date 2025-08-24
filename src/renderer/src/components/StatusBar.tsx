import { FiActivity, FiAlertTriangle, FiDownload } from 'react-icons/fi'

const StatusBar = () => {
  return (
    <div className="flex flex-wrap items-center w-full h-10 p-1 flex-none bg-background border-t border-border text-sm overflow-hidden">
      <button className="rounded-xl px-5 h-full flex items-center gap-2 text-secondary italic hover:bg-lime-300 hover:text-font">
        <FiDownload />
        <div>Sync</div>
      </button>
      <button className="rounded-xl px-5 h-full flex items-center gap-2 text-secondary italic hover:bg-primary">
        <FiActivity />
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
