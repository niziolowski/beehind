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
      <h1 className="text-home font-bold italic">Todo</h1>
      <div>
        <li>add shopify products api (simple, then batch)</li>
        <li>create stores for products, orders, components, rules</li>
        <li>make tests for all apis and stores (wait for AI requests)</li>
      </div>
    </div>
  )
}

export default Components
