// src/pages/Contact.jsx
import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null); // "ok" | "err" | null

  async function onSubmit(e) {
    e.preventDefault();
    setStatus(null);
    if (!form.name || !form.email || !form.message) {
      setStatus("err");
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("ok");
      setForm({ name: "", email: "", company: "", message: "" });
    } catch {
      setStatus("err");
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="px-4 sm:px-6">
      <section className="mx-auto max-w-4xl py-12 sm:py-16">
        {/* Page title + subtitle (same as before) */}
        <h1 className="text-2xl font-semibold">Contact</h1>
        <p className="mt-2 text-sm text-gray-600">
          For questions and inquiries please don’t hesitate to reach out. We typically
          reply within 24 hours. You can also email us at{" "}
          <span className="font-medium">inquiries.havell@gmail.com</span>.
        </p>

        {/* Card */}
        <form
          onSubmit={onSubmit}
          className="mt-6 rounded-2xl border bg-white p-6 sm:p-8 shadow-sm"
        >
          {/* Name */}
          <label className="block">
            <span className="text-sm text-gray-600">Name</span>
            <input
              type="text"
              autoComplete="name"
              placeholder="Jane Doe"
              className="mt-1 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-black/10"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </label>

          {/* Email */}
          <label className="mt-4 block">
            <span className="text-sm text-gray-600">Email</span>
            <input
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              className="mt-1 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-black/10"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </label>

          {/* Company (optional) */}
          <label className="mt-4 block">
            <span className="text-sm text-gray-600">Company (optional)</span>
            <input
              type="text"
              placeholder="ACME Corp"
              className="mt-1 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-black/10"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
            />
          </label>

          {/* Message */}
          <label className="mt-4 block">
            <span className="text-sm text-gray-600">Message</span>
            <textarea
              rows={5}
              placeholder="Tell us about your part(s), material, and timeline…"
              className="mt-1 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-black/10"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </label>

          {/* Footer row: button + status */}
          <div className="mt-6 flex items-center gap-4">
            <button
              type="submit"
              disabled={sending}
              className="btn btn-primary disabled:opacity-60"
            >
              {sending ? "Sending…" : "Send"}
            </button>

            {status === "ok" && (
              <span className="text-sm text-emerald-600">
                Thanks! Your message has been sent.
              </span>
            )}
            {status === "err" && (
              <span className="text-sm text-rose-600">
                Something went wrong. Please check your info and try again.
              </span>
            )}
          </div>
        </form>
      </section>
    </main>
  );
}
