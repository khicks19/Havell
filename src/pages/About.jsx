import React from 'react'

export default function About(){
  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-8 py-12">
      <h1 className="text-3xl font-bold">About Havell</h1>
      <p className="mt-3 text-gray-300 max-w-3xl">Havell is a modern manufacturing studio focused on fast, high‑quality SLA prints. Minimalist, clean, and engineered to deliver.</p>
      <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
        <blockquote className="text-lg italic text-white/90">“Risk has always been an inescapable part in the pursuit of tomorrow.”</blockquote>
        <div className="mt-2 text-sm text-gray-400">— Kaleb L. Hicks, Founder</div>
      </div>
    </section>
  )
}
