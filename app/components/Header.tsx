export default function Header() {
  return (
    <header className="fixed top-0 z-50 w-full backdrop-blur bg-black/40">
      <div className="mx-auto flex h-16 max-w-7xl items-center px-6">
        <div className="text-xl font-bold text-orange-500">VIDBOX</div>

        <div className="mx-auto hidden md:block">
          <input
            className="w-72 rounded-full bg-white/10 px-4 py-2 text-sm outline-none"
            placeholder="Search movies..."
          />
        </div>
      </div>
    </header>
  )
}
