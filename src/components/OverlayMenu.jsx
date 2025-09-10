// src/components/OverlayMenu.jsx
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function OverlayMenu({ open, onClose }) {
  // Keep mounted during close animation, then unmount.
  const [show, setShow] = useState(open)

  useEffect(() => {
    if (open) setShow(true)
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    if (!open && show) {
      const t = setTimeout(() => setShow(false), 300) // match duration-300
      return () => clearTimeout(t)
    }
  }, [open, show])

  if (!show) return null

  const items = [
    { to:'/solutions', title:'Solutions', desc:'Explore manufacturing solutions & services' },
    { to:'/materials', title:'Materials', desc:'See materials and common use cases' },
    { to:'/quote', title:'Instant Quote', desc:'Upload CAD and get pricing' },
    { to:'/about', title:'About', desc:'Our approach and story' },
    { to:'/contact', title:'Contact', desc:'Get in touch' },
    { to:'/faq', title:'FAQ', desc:'Common questions' },
  ]

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <button
        aria-label="Close"
        onClick={onClose}
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ease-out ${open ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Sliding panel */}
      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-xl bg-white shadow-2xl overflow-y-auto
                    transition-transform duration-300 ease-out ${open ? 'translate-x-0' : 'translate-x-full'}`}
        role="dialog"
        aria-modal="true"
      >
        {/* Top bar: just the close button */}
        <div className="flex items-center justify-end p-6 border-b">
          <button onClick={onClose} aria-label="Close" className="text-2xl leading-none">×</button>
        </div>

        {/* Menu items */}
        <div className="p-6 space-y-6">
          {items.map((it) => (
            <Link key={it.to} to={it.to} onClick={onClose} className="group block relative">
              <div className="flex items-center justify-between py-4">
                <div>
                  <div className="text-sm font-semibold tracking-wide">{it.title.toUpperCase()}</div>
                  <div className="mt-1 text-sm text-gray-600">{it.desc}</div>
                </div>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition
                                 group-hover:bg-[color:var(--brand-red,#E3362C)]">→</span>
              </div>
              {/* Animated red underline */}
              <span className="pointer-events-none absolute left-0 bottom-0 h-0.5 w-full origin-left
                                scale-x-0 bg-[color:var(--brand-red,#E3362C)]
                                transition-transform duration-200 group-hover:scale-x-100"></span>
              <div className="border-b" />
            </Link>
          ))}
          <div className="pt-2 text-xs text-gray-500">© {new Date().getFullYear()} Havell LLC</div>
        </div>
      </aside>
    </div>
  )
}
