import React from 'react'
export default function Solutions(){
  const items = [
    { title: 'Rapid Prototyping', desc: 'Quick-turn parts to validate fit, form, and function.' },
    { title: 'End-Use Components', desc: 'Low-volume production with engineering resins.' },
    { title: 'Tooling & Fixtures', desc: 'Jigs, fixtures, and production aids.' },
    { title: 'Electronics', desc: 'Enclosures and precise brackets.' },
    { title: 'Medical & R&D', desc: 'Fine-detail models and components.' },
    { title: 'Aerospace/Automotive', desc: 'Lightweight brackets and ducts.' },
  ]
  return (
    <section className="mx-auto max-w-7xl px-6 sm:px-8 py-12">
      <h1 className="text-3xl font-bold">What We Do</h1>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it,i)=>(
          <div key={i} className="rounded-2xl border p-5">
            <div className="text-lg font-semibold">{it.title}</div>
            <p className="mt-2 text-sm text-gray-600">{it.desc}</p>
            <img className="mt-3 rounded-xl h-36 w-full object-cover filter grayscale" src={`https://source.unsplash.com/featured/600x400?factory,${i}`} alt="" />
          </div>
        ))}
      </div>
    </section>
  )
}
