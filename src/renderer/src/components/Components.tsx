import { useState } from 'react'
import Button from './Button'
import { useAddComponent, useSearchComponents } from '@renderer/hooks/componentsMutation'
import Input from './Input'
import { FiSearch } from 'react-icons/fi'

const Components = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const { mutate: addComponent } = useAddComponent()

  const searchedComponents = useSearchComponents(searchTerm)

  const handleAddComponent = () => {
    addComponent({ name: 'test', quantity: 1 })
  }

  return (
    <div className="p-10 flex flex-col gap-5 w-full h-full overflow-y-scroll max-w-[1000px] mx-auto">
      <div className="flex gap-5 justify-between">
        <h1 className="text-products font-bold italic">Components</h1>
        <Button onClick={handleAddComponent}>Add test Component</Button>
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
          <div key={component.id}>{component.name}</div>
        ))}
      </div>
    </div>
  )
}

export default Components
