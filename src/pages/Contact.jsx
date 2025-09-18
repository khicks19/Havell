import React from "react";

export default function Contact() {
  return (
    <section className="mx-auto max-w-7xl px-6 sm:px-8 py-10">
      <h1 className="text-3xl font-semibold text-center">Contact</h1>
      <p className="mt-2 text-gray-600 text-center">We’ll reply within 1–2 business days.</p>

      <form className="mt-8 mx-auto max-w-xl space-y-5">
        <div className="text-left">
          <label className="block text-sm mb-1">Name</label>
          <input
            type="text"
            name="name"
            className="w-full rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/80"
            required
          />
        </div>

        <div className="text-left">
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            name="email"
            className="w-full rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/80"
            required
          />
        </div>

        <div className="text-left">
          <label className="block text-sm mb-1">Company</label>
          <input
            type="text"
            name="company"
            className="w-full rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/80"
          />
        </div>

        <div className="text-left">
          <label className="block text-sm mb-1">Message</label>
          <textarea
            name="message"
            rows="5"
            className="w-full rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/80"
            required
          />
        </div>

        <div className="pt-2 text-center">
          <button type="submit" className="btn btn-primary">
            Send
          </button>
        </div>
      </form>
    </section>
  );
}
