import ShopifyConfiguration from './ShopifyTokenSetting'
import ThemeSelector from './ThemeSelector'

const Settings = () => {
  return (
    <div className="bg-background w-full pt-10 flex flex-col gap-10 h-full">
      <div className="flex flex-col gap-5">
        <h1 className="px-10">Settings</h1>
        <ShopifyConfiguration />
      </div>
      <div className="flex flex-col gap-5">
        <ThemeSelector />
      </div>
    </div>
  )
}
export default Settings
