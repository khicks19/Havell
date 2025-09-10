import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import LogoImg from '../components/LogoImg'
import OverlayMenu from '../components/OverlayMenu'

export default function Layout(){
  const [open, setOpen] = useState(false)
  return (
    <div className="min-h-screen w-full bg-white text-black">
      <header className="sticky top-0 z-40 border-b bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8">
          <Link to="/" className="flex items-center gap-3" aria-label="Havell Home">
            <LogoImg className="h-20 w-auto sm:h-24" />
          </Link>

          {/* hamburger shown on all sizes */}
          <button onClick={()=>setOpen(true)} className="rounded-full border border-black p-2" aria-label="Open menu">
            <div className="h-0.5 w-6 bg-black mb-1"></div>
            <div className="h-0.5 w-6 bg-black mb-1"></div>
            <div className="h-0.5 w-6 bg-black"></div>
          </button>
        </div>
      </header>

      <main className="min-h-[70vh]">
        <Outlet />
      </main>

      <footer className="border-t py-10">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 text-sm text-gray-600 sm:px-8 sm:grid-cols-3">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <LogoImg className="h-7 w-7" />
              <span>Havell LLC</span>
            </div>
            <p>Precision 3D printing & finishing.</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Link className="hover:underline" to="/solutions">Solutions</Link>
            <Link className="hover:underline" to="/materials">Materials</Link>
            <Link className="hover:underline" to="/quote">Instant Quote</Link>
            <Link className="hover:underline" to="/about">About</Link>
            <Link className="hover:underline" to="/contact">Contact</Link>
            <Link className="hover:underline" to="/faq">FAQ</Link>
          </div>
          <div className="space-y-2">
            <div>Email: <a className="hover:underline" href="mailto:info@havell.co">info@havell.co</a></div>
            <div>© {new Date().getFullYear()} Havell LLC. All rights reserved.</div>
          </div>
        </div>
      </footer>

      <OverlayMenu open={open} onClose={()=>setOpen(false)} />
    </div>
  )
}
