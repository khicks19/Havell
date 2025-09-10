import React, { useMemo, useState } from 'react'
import { MATERIALS as QUOTE_MATS } from '../quote/PricingConfig'
import { MATERIALS, MATERIAL_CATEGORIES } from '../quote/materialsData'

export default function Materials(){
  const [filter, setFilter] = useState('all')
  const visible = useMemo(()=> filter==='all' ? MATERIALS : MATERIALS.filter(m => (m.uses||[]).includes(filter)), [filter])

  return (
    <section className="mx-auto max-w-7xl px-6 sm:px-8 py-12">
      <h1 className="text-3xl font-bold">Materials & Uses</h1>
      <div className="mt-6 flex flex-wrap gap-2">
        <button onClick={()=>setFilter('all')} className={`btn ${filter==='all'?'btn-primary':'btn-outline'}`}>All</button>
        {MATERIAL_CATEGORIES.map(c => <button key={c.id} onClick={()=>setFilter(c.id)} className={`btn ${filter===c.id?'btn-primary':'btn-outline'}`}>{c.name}</button>)}
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map(m => <Card key={m.id} mat={m} />)}
      </div>

      <div className="mt-12 rounded-2xl border p-5">
        <div className="font-semibold">Pricing engine materials</div>
        <p className="mt-1 text-sm text-gray-600">These are wired into the Instant Quote MVP:</p>
        <ul className="mt-2 grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
          {QUOTE_MATS.map(m => <li key={m.id} className="rounded-md border px-3 py-2">{m.name}</li>)}
        </ul>
      </div>
    </section>
  )
}
function Card({mat}){
  return (
    <div className="rounded-2xl border p-5">
      <div className="text-lg font-semibold">{mat.name}</div>
      <p className="mt-2 text-sm text-gray-600">{mat.desc}</p>
      <div className="mt-3 text-sm">
        <div className="text-gray-500">Properties</div>
        <ul className="mt-1 list-disc list-inside">
          {(mat.props||[]).map((p,i)=><li key={i}>{p}</li>)}
        </ul>
      </div>
      <div className="mt-3 text-sm">
        <div className="text-gray-500">Use cases</div>
        <ul className="mt-1 list-disc list-inside">
          {(mat.uses||[]).map((u,i)=><li key={i}>{u}</li>)}
        </ul>
      </div>
    </div>
  )
}