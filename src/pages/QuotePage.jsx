import React from 'react'
import QuoteWidget from '../components/QuoteWidget'

export default function QuotePage() {
  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-8 py-12">
      <h1 className="text-3xl font-bold">Instant Quote</h1>
      <p className="mt-3 text-gray-300 max-w-2xl">
        Upload STL (mm or inches), choose options, and get pricing.
      </p>
      <div className="mt-6">
        <QuoteWidget />
      </div>
    </section>
  )
}
