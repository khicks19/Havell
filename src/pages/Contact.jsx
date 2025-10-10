// src/pages/Contact.jsx
import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    website: "", // honeypot
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // "ok" | "err" | null

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("ok");
      setForm({ name: "", email: "", company: "", message: "", website: "" });
    } catch (err) {
      setStatus("err");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mx-auto max-w-3xl px-6 sm:px-8 py-12">
      <h1 className="text-2xl font-semibold mb-2">Contact</h1>
      <p className="text-gray-600 mb-8">
        For questions and inquiries please don’t hesitate to reach out. We
        typically reply within 24 hours.
      </p>

      <form
        onSubmit={onSubmit}
        className="rounded-2xl border p-6 space-y-5 bg-white"
      >
        {/* Honeypot (hidden) */}
        <input
          type="text"
          name="website"
          value={form.website}
          onChange={onChange}
          className="hidden"
          tabIndex="-1"
          autoComplete="off"
        />

        <Field label="Name">
          <input
            required
            name="name"
            value={form.name}
            onChange={onChange}
            className="input"
            placeholder="Jane Doe"
          />
        </Field>

        <Field label="Email">
          <input
            required
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            className="input"
            placeholder="you@company.com"
          />
        </Field>

        <Field label="Company (optional)">
          <input
            name="company"
            value={form.company}
            onChange={onChange}
            className="input"
            placeholder="ACME Corp"
          />
        </Field>

        <Field label="Message">
          <textarea
            required
            name="message"
            value={form.message}
            onChange={onChange}
            className="input min-h-[140px]"
            placeholder="Tell us about your part(s), material, and timeline…"
          />
        </Field>

        <div className="flex items-center gap-3">
          <button
            className="btn btn-primary disabled:opacity-60"
            disabled={submitting}
            type="submit"
          >
            {submitting ? "Sending…" : "Send"}
          </button>

          {status === "ok" && (
            <span className="text-green-600 text-sm">Message sent ✓</span>
          )}
          {status === "err" && (
            <span className="text-red-600 text-sm">
              Something went wrong. Please try again.
            </span>
          )}
        </div>
      </form>
    </section>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <div className="text-sm font-medium text-gray-700 mb-1">{label}</div>
      {children}
    </label>
  );
}

/* Tailwind helpers (you already use them; if not, add these classes to your CSS) */
// In globals.css or tailwind layer, define:
// .input { @apply w-full rounded-xl border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black/10; }
// .btn { @apply inline-flex items-center justify-center rounded-full px-4 py-2 border; }
// .btn-primary { @apply bg-black text-white border-black hover:brightness-110; }
