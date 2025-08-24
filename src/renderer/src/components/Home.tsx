const Home = () => {
  return (
    <div className="p-10 flex flex-col gap-5 h-full overflow-y-scroll">
      <h1 className="text-home font-bold italic">Todo</h1>
      <div>
        <li>
          change names from SettingsRepo to ThemeRepo (right now only theme functions are there)
        </li>
        <li>create stores for products, orders, components, rules</li>
        <li>make tests for all apis and stores (wait for AI requests)</li>
      </div>
    </div>
  )
}

export default Home
