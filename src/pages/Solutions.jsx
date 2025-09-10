import React from 'react'

export default function Solutions(){
  const items = [
    { title: 'Rapid Prototyping', desc: 'Validate fit, form, and function with quick-turn parts.' },
    { title: 'End-Use Components', desc: 'Low-volume production with engineering resins.' },
    { title: 'Tooling & Fixtures', desc: 'Assembly jigs, inspection fixtures, and production aids.' },
    { title: 'Electronics', desc: 'Enclosures and precise brackets for small features.' },
    { title: 'Medical & R&D', desc: 'Fine-detail models and research components.' },
    { title: 'Aerospace/Automotive', desc: 'Lightweight brackets and complex ducting geometries.' },
  ]
  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-8 py-12">
      <h1 className="text-3xl font-bold">Solutions</h1>
      <p className="mt-3 text-gray-300 max-w-2xl">Demo applications where Havell shines. Replace with your case studies later.</p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it,i)=>(
          <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="text-lg font-semibold">{it.title}</div>
            <p className="mt-2 text-sm text-gray-300">{it.desc}</p>
            <img className="mt-3 rounded-xl border border-white/10 h-36 w-full object-cover" src={`https://source.unsplash.com/featured/600x400?manufacturing,${i}`} alt="" />
          </div>
        ))}
      </div>
    </section>
  )
}
