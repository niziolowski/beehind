import { useState } from 'react'
import Button from './Button'
import { useSearchComponents } from '@renderer/hooks/index'
import Input from './Input'
import { FiSearch } from 'react-icons/fi'
import ComponentDetails from './ComponentDetails'
import { Component } from '@main/types/index'

const Components = () => {
  const [isDetails, setIsDetails] = useState(false)
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const searchedComponents = useSearchComponents(searchTerm)

  return (
    <>
      <div className="p-10 flex flex-col gap-5 w-full h-full overflow-y-scroll max-w-[1000px] mx-auto">
        <div className="flex gap-5 justify-between">
          <h1 className="text-products font-bold italic">Components</h1>
          <Button onClick={() => setIsDetails(true)}>Add test Component</Button>
        </div>
        <div className="flex w-full gap-3">
          <Input
            className="flex-1"
            placeholder="Search..."
            icon={<FiSearch />}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          {searchedComponents.map((component) => (
            <div
              key={component.id}
              onClick={() => {
                setSelectedComponent(component)
                setIsDetails(true)
              }}
            >
              {component.name}
            </div>
          ))}
        </div>
      </div>
      {isDetails && (
        <ComponentDetails data={selectedComponent} onClose={() => setIsDetails(false)} />
      )}
    </>
  )
}

export default Components
