import React from 'react'
import QuoteWidget from './components/QuoteWidget'

export default function App() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-950 via-gray-950 to-gray-900 text-white">
      <header className="sticky top-0 z-40 border-b border-white/5 bg-gray-950/70 backdrop-blur">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6 sm:px-8">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Havell Logo" className="max-h-10 w-auto" />
            <span className="text-xl font-semibold tracking-tight">Havell</span>
          </div>
          <nav className="hidden gap-6 text-sm sm:flex">
            <a href="#capabilities" className="text-gray-300 hover:text-white">Capabilities</a>
            <a href="#quote" className="text-gray-300 hover:text-white">Instant Quote</a>
            <a href="#contact" className="text-gray-300 hover:text-white">Contact</a>
          </nav>
          <a href="#quote" className="rounded-xl bg-sky-500 px-4 py-2 text-sm font-medium text-gray-950 hover:bg-sky-400">Get a Quote</a>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 sm:px-8 pt-12 pb-6">
        <div className="flex flex-col items-center text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Pill>Advanced Manufacturing</Pill>
            <Pill>Formlabs Form 4L</Pill>
            <Pill>Wash L & Cure</Pill>
          </div>
          <h1 className="mt-6 max-w-3xl text-4xl font-bold sm:text-5xl">Precision 3D Printing for Critical Applications</h1>
          <p className="mt-4 max-w-2xl text-base text-gray-300">
            Upload your CAD, pick materials & lead time, and see live pricing built for real engineering work.
          </p>
        </div>
      </section>

      <section id="quote" className="max-w-7xl mx-auto px-6 sm:px-8 pb-16">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">Instant Quote (MVP)</h2>
          <p className="mt-2 max-w-2xl text-sm text-gray-300">Upload STL (mm or inches), choose options, and get a defensible price with a clear breakdown.</p>
        </div>
        <QuoteWidget />
      </section>

      <footer className="border-t border-white/5 py-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col items-center gap-3 text-center text-sm text-gray-400 sm:flex-row sm:justify-between sm:text-left">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Havell Logo small" className="h-6 w-auto opacity-90" />
            <span>© {new Date().getFullYear()} Havell LLC. All rights reserved.</span>
          </div>
          <div className="flex gap-4">
            <a href="#quote" className="hover:text-white">Instant Quote</a>
            <a href="#contact" className="hover:text-white">Contact</a>
            <a href="#" className="hover:text-white">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/90 backdrop-blur">
      {children}
    </span>
  )
}
