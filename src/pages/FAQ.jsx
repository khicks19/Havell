import React from 'react'
export default function FAQ(){
  const faqs = [
    { q: 'What file types do you accept?', a: 'MVP supports STL (ASCII or binary). STEP/IGES can be added later.' },
    { q: 'How is pricing calculated?', a: 'Material volume + print time + finishing labor, plus overhead and margin. Lead-time multipliers apply.' },
    { q: 'Do you offer rush service?', a: 'Yes—select Rush or Expedite on the quote tool.' },
  ]
  return (
    <section className="mx-auto max-w-7xl px-6 sm:px-8 py-12">
      <h1 className="text-3xl font-bold">FAQ</h1>
      <div className="mt-6 grid gap-4">
        {faqs.map((f,i)=>(
          <div key={i} className="rounded-2xl border p-5">
            <div className="font-semibold">{f.q}</div>
            <p className="mt-2 text-sm text-gray-600">{f.a}</p>
          </div>
        ))}
      </div>
    </section>
  )
}