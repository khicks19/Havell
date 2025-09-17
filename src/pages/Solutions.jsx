import React from "react";
import { Link } from "react-router-dom";

export default function Solutions() {
  return (
    <section className="mx-auto max-w-7xl px-6 sm:px-8 py-10">
      <h1 className="text-3xl font-semibold">What We Do</h1>

      {/* Intro text under the title */}
      <p className="mt-3 text-gray-600 max-w-3xl">
        From rapid prototyping to end-use production, Havell delivers precision parts with
        exceptional surface finish, strength, and dimensional accuracy. We help you validate designs, reduce
        risk, and ship reliable components—fast.
      </p>

      {/* Cards */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Rapid Prototyping */}
        <div className="group rounded-2xl border p-5">
          <h3 className="font-semibold">Rapid Prototyping</h3>
          <p className="text-sm text-gray-600">Quick-turn parts to validate fit, form, and function.</p>
          <img
            className="mt-3 w-full aspect-[16/10] object-cover rounded-xl border"
            src="/solutions/rapid.jpg"
            alt="Rapid prototyping"
            loading="lazy" decoding="async"
          />
        </div>

        {/* End-Use Components */}
        <div className="group rounded-2xl border p-5">
          <h3 className="font-semibold">End-Use Components</h3>
          <p className="text-sm text-gray-600">Low/medium-volume production parts.</p>
          <img
            className="mt-3 w-full aspect-[16/10] object-cover rounded-xl border"
            src="/solutions/enduse.jpg"
            alt="End-use components"
            loading="lazy" decoding="async"
          />
        </div>

        {/* Tooling & Fixtures */}
        <div className="group rounded-2xl border p-5">
          <h3 className="font-semibold">Tooling &amp; Fixtures</h3>
          <p className="text-sm text-gray-600">Jigs, fixtures, molds, and production aids.</p>
          <img
            className="mt-3 w-full aspect-[16/10] object-cover rounded-xl border"
            src="/solutions/tooling.jpg"
            alt="Tooling and fixtures"
            loading="lazy" decoding="async"
          />
        </div>

        {/* Electronics */}
        <div className="group rounded-2xl border p-5">
          <h3 className="font-semibold">Electronics</h3>
          <p className="text-sm text-gray-600">Enclosures and precise brackets.</p>
          <img
            className="mt-3 w-full aspect-[16/10] object-cover rounded-xl border"
            src="/solutions/electronics.jpg"
            alt="Electronics enclosures and brackets"
            loading="lazy" decoding="async"
          />
        </div>

        {/* Medical & R&D */}
        <div className="group rounded-2xl border p-5">
          <h3 className="font-semibold">Medical &amp; R&amp;D</h3>
          <p className="text-sm text-gray-600">Fine-detail models and components.</p>
          <img
            className="mt-3 w-full aspect-[16/10] object-cover rounded-xl border"
            src="/solutions/medical.jpg"
            alt="Medical and R&D prints"
            loading="lazy" decoding="async"
          />
        </div>

        {/* Aerospace/Automotive */}
        <div className="group rounded-2xl border p-5">
          <h3 className="font-semibold">Aerospace/Automotive</h3>
          <p className="text-sm text-gray-600">Lightweight brackets, ducts, panels, etc. Non-critical parts.</p>
          <img
            className="mt-3 w-full aspect-[16/10] object-cover rounded-xl border"
            src="/solutions/aerospace.jpg"
            alt="Aerospace and automotive components"
            loading="lazy" decoding="async"
          />
        </div>
      </div>

{/* Note + CTA — stacked & centered */}
<div className="mt-10 flex flex-col items-center gap-6">
  {/* Note card (full-ish width) */}
  <div className="w-full max-w-4xl rounded-2xl border p-5 bg-white">
    <p className="text-sm text-gray-600">
      <strong>Note:</strong> As Havell is a new company, some solutions like SLS, DMLS, and laser cutting are very limted. As time goes on we will begin to role out these improvemnts as quickly as possible. Thank you for your understanding!
    </p>
  </div>

  {/* Contact/CTA card (narrower) */}
  <div className="w-full max-w-md rounded-2xl border p-6 text-center">
    <h3 className="text-lg font-semibold">Start a project</h3>
    <p className="mt-2 text-sm text-gray-600">
      Questions or concerns? Tell us about your part, and we’ll help you choose a solution
      and get you a fast quote.
    </p>
    <div className="mt-4">
      <Link to="/contact" className="btn btn-primary">Contact</Link>
    </div>
  </div>
</div>
</section>
  );
}

