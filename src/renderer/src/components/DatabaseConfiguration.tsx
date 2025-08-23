import { useErrorStore } from '@renderer/stores'
import Button from './Button'
import { FiDownload, FiFolder, FiSave } from 'react-icons/fi'

const ShopifyConfiguration = () => {
  const { showError } = useErrorStore()
  const handleOpenDatabaseLocation = async () => {
    // open database location
    await window.api.database.openDatabaseLocation()
  }
  return (
    <div className="px-10 flex flex-col gap-5">
      <h2>Database Configuration</h2>
      <div className="flex flex-col flex-wrap gap-5">
        <div className="flex flex-col gap-3">
          <Button className="max-w-max" onClick={() => showError('Not implemented yet')}>
            <FiDownload />
            Import Database
          </Button>
          <p className="pl-1 text-xs text-gray">
            Import a database from a <span className="bg-primary p-1 px-2 rounded-md">.json</span>{' '}
            file. This will replace your current database.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Button className="max-w-max" onClick={() => showError('Not implemented yet')}>
            <FiSave />
            Export Database
          </Button>
          <p className="pl-1 text-xs text-gray">
            Export your current database to a{' '}
            <span className="bg-primary p-1 px-2 rounded-md">.json</span> file.
          </p>
        </div>
        <Button className="max-w-max" onClick={handleOpenDatabaseLocation}>
          <FiFolder />
          Open Database Location
        </Button>
      </div>
    </div>
  )
}

export default ShopifyConfiguration
