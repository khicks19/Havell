import React from "react";
import { SITE_EMAIL } from "../config";

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = fd.get("name") || "";
    const email = fd.get("email") || "";
    const company = fd.get("company") || "";
    const message = fd.get("message") || "";

    const subject = encodeURIComponent(`Website inquiry from ${name}${company ? ` (${company})` : ""}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nCompany: ${company}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:${SITE_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <section className="mx-auto max-w-7xl px-6 sm:px-8 py-10">
      <h1 className="text-3xl font-semibold text-center">Contact</h1>
      <p className="mt-2 text-gray-600 text-center">
        For questions and inquries please do not hesitate to reach out! We will get to you within 24-hours!

{" "}
        <a className="hover:underline" href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 mx-auto max-w-xl space-y-5">
        <div className="text-left">
          <label className="block text-sm mb-1">Name</label>
          <input name="name" type="text" required
                 className="w-full rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/80"/>
        </div>
        <div className="text-left">
          <label className="block text-sm mb-1">Email</label>
          <input name="email" type="email" required
                 className="w-full rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/80"/>
        </div>
        <div className="text-left">
          <label className="block text-sm mb-1">Company (Put n/a if not applicable)</label>
          <input name="company" type="text"
                 className="w-full rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/80"/>
        </div>
        <div className="text-left">
          <label className="block text-sm mb-1">Message</label>
          <textarea name="message" rows="5" required
                    className="w-full rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/80"/>
        </div>
        <div className="pt-2 text-center">
          <button type="submit" className="btn btn-primary">Send</button>
        </div>
      </form>
    </section>
  );
}
