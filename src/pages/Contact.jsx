import React, { useState } from 'react'
export default function Contact(){
  const [status, setStatus] = useState(null)
  async function submit(e){
    e.preventDefault()
    setStatus('loading')
    const form = new FormData(e.target)
    const payload = Object.fromEntries(form.entries())
    try{
      const res = await fetch('/api/contact', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) })
      const data = await res.json()
      if(!res.ok) throw new Error(data?.error || 'Failed')
      setStatus('ok'); e.target.reset()
    }catch(err){ setStatus('error') }
  }
  return (
    <section className="mx-auto max-w-7xl px-6 sm:px-8 py-12">
      <h1 className="text-3xl font-bold">Contact</h1>
      <p className="mt-3 text-gray-600">We’ll reply within 1–2 business days.</p>
      <form onSubmit={submit} className="mt-6 max-w-xl space-y-4">
        <Field label="Name" name="name" />
        <Field label="Email" name="email" type="email" />
        <Field label="Company" name="company" />
        <Field label="Message" name="message" textarea />
        <button className="btn btn-primary">Send</button>
        {status==='ok' && <div className="text-emerald-600 text-sm">Thanks! We received your message.</div>}
        {status==='error' && <div className="text-red-600 text-sm">Something went wrong. Try again.</div>}
      </form>
    </section>
  )
}
function Field({label, name, type='text', textarea}){
  return (
    <label className="block">
      <div className="text-sm text-gray-700">{label}</div>
      {textarea ? (
        <textarea name={name} required rows={5} className="mt-1 w-full rounded-xl border px-3 py-2"></textarea>
      ) : (
        <input name={name} required type={type} className="mt-1 w-full rounded-xl border px-3 py-2" />
      )}
    </label>
  )
}