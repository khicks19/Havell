import React from 'react'
import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-8 py-12">
      <div className="grid gap-10 lg:grid-cols-2 items-center">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <Pill>Advanced Manufacturing</Pill>
            <Pill>SLA • Form 4L</Pill>
            <Pill>Quick Turn</Pill>
          </div>
          <h1 className="mt-6 text-4xl font-bold sm:text-5xl">From CAD to parts—fast.</h1>
          <p className="mt-4 text-gray-300 max-w-xl">
            Upload your model, select material & lead time, and get transparent pricing. Minimalist, production-ready flow.
          </p>
          <div className="mt-6 flex gap-3">
            <Link to="/quote" className="rounded-xl bg-[color:var(--brand-red,#E3362C)] px-5 py-3 font-medium text-gray-950 hover:opacity-90">Instant Quote</Link>
            <Link to="/solutions" className="rounded-xl border border-white/10 px-5 py-3 font-medium hover:bg-white/10">See Solutions</Link>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-4 text-center">
            <Stat k="Lead time" v="< 3 days" />
            <Stat k="Build volume" v="Form 4L" />
            <Stat k="Tolerances" v="Up to ±0.1 mm" />
          </div>
        </div>
        <div className="rounded-2xl overflow-hidden border border-white/10">
          <img className="w-full h-[320px] object-cover" src="https://source.unsplash.com/featured/1200x800?industrial,manufacturing" alt="Manufacturing" />
        </div>
      </div>

      {/* Landing Quote */}
      <figure className="mt-14">
        <blockquote className="text-center text-lg italic text-white/90">
          “Risk has always been an inescapable part in the pursuit of tomorrow.”
        </blockquote>
        <figcaption className="mt-3 text-center text-sm text-gray-400">— Kaleb L. Hicks, Founder</figcaption>
      </figure>

      <div className="mt-16 grid gap-6 sm:grid-cols-3">
        <Card title="SLA printing" desc="High-detail parts with engineering resins—functional, cosmetic, and heat-resistant." />
        <Card title="Finishing" desc="Support removal, sanding, coatings. Paint-ready surfaces available." />
        <Card title="Inspection" desc="Dimensional checks and COC options for critical parts." />
      </div>

      <div className="mt-16 rounded-2xl border border-white/10 p-6 bg-white/5">
        <h2 className="text-xl font-semibold">See it in action</h2>
        <div className="mt-3 aspect-video rounded-xl overflow-hidden border border-white/10">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/Sagg08DrO5U"
            title="Demo video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  )
}

function Pill({ children }){ return <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/90">{children}</span> }
function Stat({k,v}){ return (<div className="rounded-xl border border-white/10 bg-white/5 p-4"><div className="text-sm text-gray-400">{k}</div><div className="text-lg font-semibold mt-1">{v}</div></div>) }
function Card({title,desc}){ return (<div className="rounded-2xl border border-white/10 bg-white/5 p-5"><div className="text-lg font-semibold">{title}</div><p className="mt-2 text-sm text-gray-300">{desc}</p></div>) }
