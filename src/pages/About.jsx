import React from "react";

export default function About() {
  return (
    <section className="mx-auto max-w-7xl px-6 sm:px-8 py-10">
      <h1 className="text-3xl font-semibold">About Havell</h1>

      {/* Biography */}
      <div className="mt-4 max-w-3xl space-y-4 text-gray-700">
        <p>
          Havell, founded in 2025 by Kaleb L. Hicks, is an advanced manufacturing company
          specializing in the use of <em>Additive Manufacturing</em>; combining precision,
          innovation, and integrity to create solutions that meet the highest standards. Using
          state of the art technology, Havell has the capabilities to create the finest products in
          the industry, with incredible detail and complexity. Havell is rooted in loyalty to our
          customers — ensuring every part we produce is defined by quality, reliability, and trust.
        </p>
        <p>
          By embracing new technologies and refining our processes, we are shaping the future of
          manufacturing — faster, smarter, and stronger. Havell is more than a supplier; we are a
          partner dedicated to excellence, helping industries bring their boldest ideas to life.
        </p>
      </div>

      {/* Mission */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold">Mission</h2>
        <div className="mt-3 max-w-3xl rounded-2xl border bg-white p-5 text-gray-700">
          <p>
            We understand that the past is the past. America will never become that manufacturing
            powerhouse all those decades ago, though not in the ways of old. It is time to
            understand that those days were just stepping stones for what the future had in store.
            Over the years manufacturing has evolved, pushing the boundaries of hardware and
            software. Today, new ways on how to create complex parts are now being reimagined and
            more easier than ever with additive manufacturing. Higher degrees of automation and AI
            are now enabling us to rethink and evolve the manufacturing industry in ways we never
            thought was possible.The United States is currently high volume and low mix (mass
            production). The key thing we are missing is low volume and high mix (customs jobs / job
            shops). Havell’s future is to bridge this gap and become high volume and high mix,
            enabling the United States to have more security, readiness, and quality within its own
            borders. We don't just offer parts.. we offer SOLUTIONS
          </p>
        </div>
      </div>

      {/* Quote at bottom, centered */}
      <figure className="mt-12">
        <blockquote className="text-center text-xl italic">
          “Risk has always been an inescapable part in the pursuit of tomorrow.”
        </blockquote>
        <figcaption className="mt-2 text-center text-sm text-gray-600">
          — Kaleb L. Hicks, Founder
        </figcaption>
      </figure>
    </section>
  );
}
