import { useState } from 'react'
import ShopifyConfiguration from './ShopifyTokenSetting'
import ThemeSelector from './ThemeSelector'
import DatabaseConfiguration from './DatabaseConfiguration'
import TabBar, { Tab } from './Tabs'

const tabs: Tab[] = [
  { id: 'shopify', label: 'Shopify' },
  { id: 'database', label: 'Database' },
  { id: 'theme', label: 'Theme' }
]

const Settings = () => {
  const [activeTab, setActiveTab] = useState<'shopify' | 'database' | 'theme'>('shopify')

  return (
    <div className="bg-background w-full pt-10 flex flex-col gap-10 h-full mx-auto max-w-[800px]">
      <div className="px-10 flex flex-wrap gap-5">
        <h1 className="pr-5">Settings</h1>
        <TabBar tabs={tabs} value={activeTab} onChange={setActiveTab} />
      </div>
      {activeTab === 'shopify' && <ShopifyConfiguration />}
      {activeTab === 'database' && <DatabaseConfiguration />}
      {activeTab === 'theme' && <ThemeSelector />}
    </div>
  )
}
export default Settings
