import React from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import LogoHL from '../components/LogoHL'

export default function Layout(){
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-950 via-gray-950 to-gray-900 text-white">
      <Header />
      <main className="min-h-[70vh]">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

function Header(){
  const nav = [
    ['solutions','Solutions'],
    ['materials','Materials'],
    ['quote','Instant Quote'],
    ['about','About'],
    ['contact','Contact'],
    ['faq','FAQ'],
  ]
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-gray-950/70 backdrop-blur">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6 sm:px-8">
        <Link to="/" className="flex items-center gap-3">
          <LogoHL className="h-10 w-10" />
          <span className="text-xl font-semibold tracking-tight">Havell</span>
        </Link>
        <nav className="hidden gap-1 sm:flex">
          {nav.map(([href,label]) => (
            <NavLink key={href} to={`/${href}`} className={({isActive})=>`px-3 py-2 rounded-lg text-sm ${isActive?'bg-white/10 text-white':'text-gray-300 hover:text-white'}`}>{label}</NavLink>
          ))}
        </nav>
        <Link to="/quote" className="rounded-xl bg-[color:var(--brand-red,#E3362C)] px-4 py-2 text-sm font-medium text-gray-950 hover:opacity-90">Get a Quote</Link>
      </div>
    </header>
  )
}

function Footer(){
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 grid gap-6 sm:grid-cols-3 text-sm text-gray-400">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <LogoHL className="h-6 w-6" />
            <span>Havell LLC</span>
          </div>
          <p>Precision 3D printing & finishing.</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Link className="hover:text-white" to="/solutions">Solutions</Link>
          <Link className="hover:text-white" to="/materials">Materials</Link>
          <Link className="hover:text-white" to="/quote">Instant Quote</Link>
          <Link className="hover:text-white" to="/about">About</Link>
          <Link className="hover:text-white" to="/contact">Contact</Link>
          <Link className="hover:text-white" to="/faq">FAQ</Link>
        </div>
        <div className="space-y-2">
          <div>Email: <a className="hover:text-white" href="mailto:info@havell.co">info@havell.co</a></div>
          <div>© {new Date().getFullYear()} Havell LLC. All rights reserved.</div>
        </div>
      </div>
    </footer>
  )
}