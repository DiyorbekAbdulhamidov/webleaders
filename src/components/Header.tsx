export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <span className="text-xl font-bold text-blue-600">Webleaders</span>
        <nav className="space-x-6 text-sm">
          <a href="#" className="hover:text-blue-500">Xizmatlar</a>
          <a href="#" className="hover:text-blue-500">Portfolio</a>
          <a href="#" className="hover:text-blue-500">Aloqa</a>
        </nav>
      </div>
    </header>
  )
}
