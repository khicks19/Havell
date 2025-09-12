import React from 'react'
import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <section className="mx-auto max-w-7xl px-6 sm:px-8 py-10">
      <div className="relative overflow-hidden rounded-2xl border">
        <img className="h-[360px] w-full object-cover filter grayscale" src="https://source.unsplash.com/featured/1600x900?manufacturing" alt="Hero" />
        <div className="absolute inset-0 flex flex-col items-start justify-center p-8 sm:p-12">
          <h1 className="text-4xl font-bold sm:text-5xl text-white drop-shadow">Engineered for your success.</h1>
          <div className="mt-6 flex gap-3">
            <Link to="/quote" className="btn btn-primary">Instant Quote</Link>
            <Link to="/solutions" className="btn btn-outline">What We Do</Link>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-2 items-start">
        <div>
          <h2 className="text-2xl font-semibold">Leaders in quality for high‑end solutions in additive manufacturing</h2>
          <p className="mt-3 text-gray-600 max-w-xl">Using state of the art technology, Havell has the capabilities to create the finest products in the industry, with incredible detail and complexity.</p>
          <div className="mt-6">
            <Link to="/materials" className="btn btn-outline">Explore Materials</Link>
          </div>
        </div>
        <div className="rounded-2xl overflow-hidden border">
          <img className="w-full h-[260px] object-cover filter grayscale" src="https://source.unsplash.com/featured/800x600?industrial,metal" alt="Parts" />
        </div>
      </div>

{/* --- Staggered section (image LEFT, text RIGHT) --- */}
<div className="mt-16 grid gap-10 lg:grid-cols-2 items-start">
  {/* Image (left on desktop) */}
  <div className="rounded-2xl overflow-hidden border order-1 lg:order-1">
    <img
      className="w-full h-[260px] object-cover filter grayscale"
      src="https://source.unsplash.com/featured/800x600?factory,robot"
      alt="Production"
    />
  </div>

  {/* Copy (right on desktop) */}
  <div className="order-2 lg:order-2 lg:pl-4">
    <h2 className="text-2xl font-semibold">Production-grade quality, on demand</h2>
    <p className="mt-3 text-gray-600 max-w-xl">
      Tight tolerances, consistent finishes, and repeatable results—Havell scales from single prototypes
      to short-run production without compromising detail.
    </p>
    <div className="mt-6">
      <a href="/quote" className="btn btn-primary">Get a Quote</a>
    </div>
  </div>
</div>
      
      <figure className="mt-16">
        <blockquote className="text-center text-xl italic">
          “Risk has always been an inescapable part in the pursuit of tomorrow.”
        </blockquote>
        <figcaption className="mt-2 text-center text-sm text-gray-600">— Kaleb L. Hicks, Founder and CEO</figcaption>
      </figure>
    </section>
  )
}
