import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function OverlayMenu({ open, onClose }){
  useEffect(()=>{
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if(!open) return null;
  const items = [
    { to:'/solutions', title:'Solutions', desc:'Explore manufacturing solutions & services' },
    { to:'/materials', title:'Materials', desc:'See materials and common use cases' },
    { to:'/quote', title:'Instant Quote', desc:'Upload CAD and get pricing' },
    { to:'/about', title:'About', desc:'Our approach and story' },
    { to:'/contact', title:'Contact', desc:'Get in touch' },
    { to:'/faq', title:'FAQ', desc:'Common questions' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* dim area to close */}
      <div className="w-1/2 bg-black/50" onClick={onClose} />
      {/* panel */}
      <div className="ml-auto h-full w-full max-w-xl bg-white shadow-2xl overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="text-lg font-semibold">Menu</div>
          <button onClick={onClose} aria-label="Close" className="text-2xl leading-none">×</button>
        </div>

        <div className="p-6 space-y-6">
          {items.map((it)=> (
            <Link key={it.to} to={it.to} onClick={onClose} className="group block relative">
              <div className="flex items-center justify-between py-4">
                <div>
                  <div className="text-sm font-semibold tracking-wide">{it.title.toUpperCase()}</div>
                  <div className="mt-1 text-sm text-gray-600">{it.desc}</div>
                </div>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-black text-white group-hover:bg-[color:var(--brand-red,#E3362C)] transition">→</span>
              </div>
              {/* animated underline */}
              <span className="pointer-events-none absolute left-0 bottom-0 h-0.5 w-full origin-left scale-x-0 bg-[color:var(--brand-red,#E3362C)] transition-transform duration-200 group-hover:scale-x-100"></span>
              <div className="border-b" />
            </Link>
          ))}
          <div className="pt-2 text-xs text-gray-500">© {new Date().getFullYear()} Havell LLC</div>
        </div>
      </div>
    </div>
  )
}