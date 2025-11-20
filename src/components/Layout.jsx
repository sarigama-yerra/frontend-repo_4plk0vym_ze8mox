import GalaxyBackground from './GalaxyBackground'

export default function Layout({ children }) {
  return (
    <div className="relative min-h-screen text-white">
      <GalaxyBackground />
      <div className="relative z-10">
        <nav className="sticky top-0 z-20 backdrop-blur-xl bg-slate-900/40 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <a href="/" className="font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-sky-300 to-violet-300 text-xl">NebulaSEO</a>
            <div className="flex items-center gap-3 text-sm text-indigo-200/80">
              <a href="#features" className="hover:text-white">Features</a>
              <a href="#pricing" className="hover:text-white">Pricing</a>
              <a href="/test" className="hover:text-white">Status</a>
            </div>
          </div>
        </nav>
        {children}
        <footer className="py-12 text-center text-indigo-300/70">© {new Date().getFullYear()} NebulaSEO — AI SEO Audits</footer>
      </div>
    </div>
  )
}
