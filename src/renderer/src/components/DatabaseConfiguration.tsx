import Button from './Button'
import { FiDownload, FiFolder, FiSave } from 'react-icons/fi'
import { useExportToFile, useImportFromFile } from '@renderer/mutations'
import { useState } from 'react'
import Modal from './Modal'

const modalContents = {
  import: {
    title: 'Import Successful',
    content: 'Your database has been successfully imported from a .json file.'
  },
  export: {
    title: 'Export Successful',
    content: 'Your database has been successfully exported to a .json file.'
  }
}

const ShopifyConfiguration = () => {
  const useImportFromFileMutation = useImportFromFile()
  const useExportToFileMutation = useExportToFile()

  const [modalContent, setModalContent] = useState<null | { title: string; content: string }>(null)

  const handleOpenDatabaseLocation = async () => {
    // open database location
    await window.api.database.openDatabaseLocation()
  }

  const handleImportFromFile = async () => {
    if (
      //TODO: implement this behaviour in Modal component
      window.confirm(
        'WARNING: Importing a new database will replace all existing data. ' +
          'We recommend creating a backup before proceeding. ' +
          'Do you want to continue?'
      )
    ) {
      useImportFromFileMutation.mutate(undefined, {
        onSuccess: (res) => {
          res.success && setModalContent(modalContents.import)
        }
      })
    }
  }

  const handleExportToFile = async () => {
    useExportToFileMutation.mutate(undefined, {
      onSuccess: (res) => {
        res.success && setModalContent(modalContents.export)
      }
    })
  }
  return (
    <>
      <div className="px-10 flex flex-col gap-5">
        <h2>Database Configuration</h2>
        <div className="flex flex-col flex-wrap gap-5">
          <div className="flex flex-col gap-3">
            <Button className="max-w-max" onClick={handleImportFromFile}>
              <FiDownload />
              Import Database
            </Button>
            <p className="pl-1 text-xs text-gray">
              Import a database from a <span className="bg-primary p-1 px-2 rounded-md">.json</span>{' '}
              file. This will replace your current database.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Button className="max-w-max" onClick={handleExportToFile}>
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
      {modalContent && (
        <Modal onClose={() => setModalContent(null)} title={modalContent?.title || ''}>
          {modalContent?.content || ''}
        </Modal>
      )}
    </>
  )
}

export default ShopifyConfiguration
