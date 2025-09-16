import React from 'react'
import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <section className="mx-auto max-w-7xl px-6 sm:px-8 py-10">
     {/* HERO — local MP4 */}
<div className="relative overflow-hidden rounded-2xl border aspect-[21/9] sm:aspect-[16/9]">
  <video
    className="absolute inset-0 h-full w-full object-cover object-center"
    src="/hero.mp4"
    poster="/hero-poster.jpg"
    autoPlay
    muted
    loop
    playsInline
    preload="metadata"
    aria-hidden="true"
  />
  {/* overlay content (keep yours) */}
  <div className="absolute inset-0 flex flex-col items-start justify-center p-8 sm:p-12">
    <h1 className="text-4xl font-bold sm:text-5xl text-white drop-shadow">
      Engineered for your success.
    </h1>
    <div className="mt-6 flex gap-3">
      <Link to="/quote" className="btn btn-primary">Instant Quote</Link>
      <Link to="/solutions" className="btn btn-outline">What We Do</Link>
    </div>
  </div>
</div>

      <div className="mt-10 grid gap-10 lg:grid-cols-2 items-start">
        <div>
          <h2 className="text-2xl font-semibold">Leaders in quality for high‑end solutions in additive manufacturing</h2>
          <p className="mt-3 text-gray-600 max-w-xl">Using state of the art technology, Havell has the capabilities to create the finest products in the industry, with incredible detail and complexity. Using Formlabs supeior proprietary resins, anything is possible.</p>
          <div className="mt-6">
            <Link to="/materials" className="btn btn-outline">Explore Materials</Link>
          </div>
        </div>
        <div className="rounded-2xl overflow-hidden border">
         <img
  className="w-full h-[260px] object-cover"
  src="/parts.jpg"                // <-- starts with a single slash
  alt="Parts"
  loading="lazy" decoding="async"
/>
        </div>
      </div>

{/* --- Staggered section (image LEFT, text RIGHT) — ABOUT --- */}
<div className="mt-16 grid gap-10 lg:grid-cols-2 items-start">
  {/* Image (left) */}
  <div className="rounded-2xl overflow-hidden border order-1 lg:order-1">
   <img className="w-full h-[260px] object-cover"
     src="/production.png"
     alt="Production" loading="lazy" decoding="async" 
 />
  </div>

  {/* Copy (right) */}
  <div className="order-2 lg:order-2 lg:pl-4">
    <h2 className="text-2xl font-semibold">The game has changed</h2>
    <p className="mt-3 text-gray-600 max-w-xl">
      We understand that the past is the past. America will never become that manufacturing powerhouse 
      all those decades ago, atleast not in the old ways. Learn how Havell is 
      evolving the manufacturing industry.
    </p>
    <div className="mt-6">
      <Link to="/about" className="btn btn-outline">About</Link>
    </div>
  </div>
</div>

      {/* --- Staggered section (text LEFT, image RIGHT) — FAQ --- */}
<div className="mt-16 grid gap-10 lg:grid-cols-2 items-start">
  {/* Copy (left) */}
  <div>
    <h2 className="text-2xl font-semibold">New to additive manufacturing?</h2>
    <p className="mt-3 text-gray-600 max-w-xl">
      Our FAQ explains the basics—file types, materials, finishes, pricing, and lead times—
      so you can move from idea to part with confidence.
    </p>
    <ul className="mt-3 list-disc list-inside text-sm text-gray-600">
      <li>What files do we accept?</li>
      <li>How pricing is calculated</li>
      <li>Material/finish recommendations</li>
    </ul>
    <div className="mt-6">
      <Link to="/faq" className="btn btn-outline">FAQ</Link>
    </div>
  </div>

  {/* Image (right) */}
  <div className="rounded-2xl overflow-hidden border">
    <img
      className="w-full h-[260px] object-cover filter grayscale"
      src="/faq.jpg"               /* replace with your own image */
      alt="FAQ and getting started guides"
    />
  </div>
</div>

      {/* --- Commitment / CTA (centered) --- */}
<section className="mt-16">
  <div className="mx-auto max-w-3xl rounded-2xl border p-8 sm:p-10 text-center">
    <h2 className="text-2xl font-semibold">Excellence, built here</h2>
    <p className="mt-3 text-gray-600">
      At Havell, we strive for excellence on every part. We care about our clients—clear
      communication, dependable lead times, and results that stand up to scrutiny. We deliver
      the highest quality in the industry, and we do it right here on American soil.
    </p>
    <div className="mt-6">
      <Link to="/contact" className="btn btn-primary">Contact Us</Link>
    </div>
  </div>
</section>

      <figure className="mt-16">
        <blockquote className="text-center text-xl italic">
          “Risk has always been an inescapable part in the pursuit of tomorrow.”
        </blockquote>
        <figcaption className="mt-2 text-center text-sm text-gray-600">— Kaleb L. Hicks, Founder and CEO</figcaption>
      </figure>
    </section>
  )
}
