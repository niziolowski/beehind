import { useEffect } from 'react'

const Components = () => {
  useEffect(() => {
    const handler = async () => {
      const components = await window.api.components.getComponents()
      console.log(components)
    }

    handler()
  }, [])
  return (
    <div className="p-10 flex flex-col gap-5 h-full overflow-y-scroll">
      <h1 className="text-components font-bold italic">Components</h1>
    </div>
  )
}

export default Components
