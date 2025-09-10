import React, { useMemo, useState } from 'react'
import { MATERIALS as QUOTE_MATS } from '../quote/PricingConfig'
import { MATERIALS, MATERIAL_CATEGORIES } from '../quote/materialsData'

export default function Materials(){
  const [filter, setFilter] = useState('all')
  const visible = useMemo(()=>{
    if(filter==='all') return MATERIALS
    return MATERIALS.filter(m => (m.uses||[]).includes(filter))
  }, [filter])

  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-8 py-12">
      <h1 className="text-3xl font-bold">Materials & Uses</h1>
      <p className="mt-3 text-gray-300 max-w-2xl">Explore common resins and where they shine. (Demo content—tailor to your exact library.)</p>

      <div className="mt-6 flex flex-wrap gap-2">
        <FilterTag id="all" name="All" active={filter==='all'} onClick={()=>setFilter('all')} />
        {MATERIAL_CATEGORIES.map(c => (
          <FilterTag key={c.id} id={c.id} name={c.name} active={filter===c.id} onClick={()=>setFilter(c.id)} />
        ))}
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map(m => <Card key={m.id} mat={m} />)}
      </div>

      <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-5">
        <div className="font-semibold">Pricing engine materials</div>
        <p className="mt-1 text-sm text-gray-300">These are currently wired into the Instant Quote MVP:</p>
        <ul className="mt-2 grid grid-cols-2 gap-2 text-sm text-gray-300 sm:grid-cols-4">
          {QUOTE_MATS.map(m => <li key={m.id} className="rounded-md bg-white/5 px-3 py-2">{m.name}</li>)}
        </ul>
      </div>
    </section>
  )
}

function FilterTag({id, name, active, onClick}){
  return (
    <button onClick={onClick} className={`rounded-full border px-3 py-1 text-sm ${active?'border-white/30 bg-white/10':'border-white/10 bg-white/5 hover:bg-white/10'}`}>{name}</button>
  )
}

function Card({mat}){
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="text-lg font-semibold">{mat.name}</div>
      <p className="mt-2 text-sm text-gray-300">{mat.desc}</p>
      <div className="mt-3 text-sm">
        <div className="text-gray-400">Properties</div>
        <ul className="mt-1 list-disc list-inside text-gray-200">
          {(mat.props||[]).map((p,i)=><li key={i}>{p}</li>)}
        </ul>
      </div>
      <div className="mt-3 text-sm">
        <div className="text-gray-400">Use cases</div>
        <ul className="mt-1 list-disc list-inside text-gray-200">
          {(mat.uses||[]).map((u,i)=><li key={i}>{u}</li>)}
        </ul>
      </div>
    </div>
  )
}
