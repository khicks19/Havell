import React from "react";
import { Link } from "react-router-dom";

const CATEGORIES = [
  {
    id: "getting-started",
    title: "Getting started",
    faqs: [
      {
        q: "What file types do you accept?",
        a: "STL (ASCII or binary) is best for instant quoting. STEP (.step/.stp) and IGES (.iges/.igs) are also accepted for review or if you need us to export a watertight STL for you."
      },
      {
        q: "How do I get a quick quote?",
        a: "Go to Instant Quote, upload your model, pick a material and finish, and submit. If something looks off (non-manifold, tiny scale, etc.) we’ll flag it and help you fix it."
      },
      {
        q: "Do you sign NDAs / keep files private?",
        a: "Yes. Files are handled confidentially and only used for the purpose of quoting and producing your parts. We’re happy to sign your NDA on request."
      },
      {
        q: "What industries do you support?",
        a: "Prototype and end-use components for electronics, medical R&D, aerospace/automotive non-critical, tooling & fixtures, and more."
      }
    ]
  },
  {
    id: "materials",
    title: "Materials & processes",
    faqs: [
      {
        q: "Which materials do you stock?",
        a: "Formlabs SLA resins including: Grey/Black/White V5, Clear/Clear Cast, Tough 1500 V2, Tough 2000, Tough 4000, Rigid 10K, High Temp, Flexible 80A, Elastic 50A, and ESD. If you need a different resin, ask—we can usually source it."
      },
      {
        q: "What’s the difference between prototype and end-use resins?",
        a: "General prototyping resins (e.g., Grey/Black/White) are great for fast iteration and cosmetics. Engineering resins (Tough, Rigid, High Temp, ESD, Flexible/Elastic) target specific properties for functional parts."
      },
      {
        q: "Do you offer other processes (SLS, DMLS, CNC, laser cutting)?",
        a: "Currenlty we only offer SLA. As time goes on we are going to be rolling out the rest of our production line up and incorporating SLS, DMLS, CNC, and laser cutting."
      }
    ]
  },
  {
    id: "design",
    title: "Design guidelines",
    faqs: [
      {
        q: "What tolerances can I expect?",
        a: "Typical as-printed SLA tolerances are ±0.15 mm + 0.15% after post-cure, depending on geometry, orientation, and resin. If you need a specific fit, tell us the critical dimensions."
      },
      {
        q: "Recommended minimum wall thickness?",
        a: "1.0 mm for general walls (1.5–2.0 mm if large and flat). Small features (ribs, bosses) ~0.6–0.8 mm minimum. For robust end-use parts, 2.0 mm+ is best."
      },
      {
        q: "How much clearance between mating parts?",
        a: "Start with 0.2–0.4 mm clearance for sliding fits, 0.5–0.7 mm for press-free assemblies. Increase for larger parts or where surfaces are sanded/painted."
      },
      {
        q: "Small holes & text—what sizes work?",
        a: "Cylindrical holes: ≥1.5–2.0 mm recommended (smaller can close during cure). Embossed text: ≥1.5 mm height, 0.5 mm stroke. Engraved text: ≥0.3–0.5 mm depth."
      },
      {
        q: "Should I add fillets/chamfers?",
        a: "Yes—fillets reduce stress and improve surface quality. A 0.5–1.0 mm fillet at sharp intersections helps a lot."
      },
      {
        q: "Best practice for hollow parts / draining resin?",
        a: "Hollow large shells to 2–3 mm wall thickness and add at least two drain/vent holes (3–5 mm Ø) at low points to avoid trapped resin."
      },
      {
        q: "Threads and inserts?",
        a: "We recommend designing pilot holes and post-tapping common threads, or using heat-set/mold-in inserts in reinforced areas. Fine printed threads are possible but less durable."
      },
      {
        q: "Living hinges or snap-fits?",
        a: "SLA isn’t ideal for true living hinges. For snap-fits, use Tough/Flexible resins and generous radii; test with prototypes."
      }
    ]
  },
  {
    id: "build",
    title: "Build envelope & resolution",
    faqs: [
      {
        q: "What are your max part dimensions?",
        a: "Single-piece parts up to ~353 × 196 × 350 mm are typical. If you have a bigger envelope in mind, contact us—we’ll confirm options."
      },
      {
        q: "What layer heights do you print?",
        a: "Common layer heights are 100 μm and 50 μm; 25 μm is available on select resins and geometries. Finer layers improve curved surfaces at increased lead time."
      },
      {
        q: "Surface finish expectations?",
        a: "SLA produces very smooth surfaces with incredible resolution. You will see fine to almost zero layer lines on shallow angles and small support marks where supports attach; we remove supports and can sand/polish on request."
      }
    ]
  },
  {
    id: "finishing",
    title: "Finishing & post-processing",
    faqs: [
      {
        q: "What finishing do you provide?",
        a: "Standard: double wash, post-cure, support removal. Optional: sanding, bead-blast-like matte (by hand-finishing), and custom labeling. More options coming soon"
      },
      {
        q: "Can you make parts optically clear?",
        a: "Yes—on clear resins we can wet-sand and polish flat/accessible areas. Normally, parts will become very clear with high reolustion after post processing. Complex internal cavities will remain diffused without additional post-ops."
      },
      {
        q: "Sterilization / chemicals?",
        a: "Some resins tolerate IPA, limited chemical exposure, or certain sterilization methods; others do not. Tell us your use case and we’ll recommend a resin."
      }
    ]
  },
  {
    id: "performance",
    title: "Performance & special cases",
    faqs: [
      {
        q: "High-temperature parts?",
        a: "Use High Temp for heat-resistance scenarios. For fixtures that briefly see very high temps, design with thicker walls and add fillets."
      },
      {
        q: "ESD-safe parts?",
        a: "ESD resin is designed for electronics handling. It’s typically black and has specific surface resistance targets; ask if you need a datasheet."
      },
      {
        q: "Biocompatible parts?",
        a: "We can advise on medical R&D prototyping; for regulated applications you may need specific materials, workflows, and documentation—contact us to discuss."
      }
    ]
  },
  {
    id: "pricing",
    title: "Pricing, lead time & shipping",
    faqs: [
      {
        q: "How is pricing calculated?",
        a: "Primarily by material volume, print time, supports, and finishing time. Engineering resins, tighter finishes, and rush service affect cost."
      },
      {
        q: "Typical lead time?",
        a: "Standard: ~2–5 business days for most parts. Rush/expedite is available—choose it during quoting or ask us directly."
      },
      {
        q: "Multiple parts / assemblies—how should I quote?",
        a: "Upload separate files for each unique part so we can orient and quote accurately. For assemblies, include a PDF or notes with critical fits and instructions."
      },
      {
        q: "Shipping options?",
        a: "Ground, 2-day, and overnight are available at checkout."
      }
    ]
  },
  {
    id: "quality",
    title: "Quality & inspection",
    faqs: [
      {
        q: "Do you inspect parts?",
        a: "Yes—every order gets a visual inspection after post-cure and support removal. On request, we can add critical-dimension checks or a simple inspection report."
      },
      {
        q: "Color consistency & cosmetic notes?",
        a: "Color varies by resin (e.g., natural, grey, black, amber, clear). Cosmetic consistency improves with sanding/polish; request this if appearance is critical."
      }
    ]
  },
  {
    id: "orders",
    title: "Orders, reprints & policies",
    faqs: [
      {
        q: "Can I cancel or change an order?",
        a: "We can usually accommodate changes before print starts. Once printing begins, changes may require a new order."
      },
      {
        q: "What if a part arrives damaged or critically out of spec?",
        a: "Tell us within 7 days with photos and any critical dimensions. We’ll investigate and reprint or refund if we’re at fault."
      },
      {
        q: "Do you keep my files for reorders?",
        a: "Yes—securely, so you can reorder quickly. If you prefer we delete files after completion, just let us know. If parts are sensitive and require NDA please be sure to inform us and send the required information."
      }
    ]
  }
];

export default function FAQ() {
  return (
    <section className="mx-auto max-w-7xl px-6 sm:px-8 py-10">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold">FAQ</h1>
        <p className="mt-2 text-gray-600 max-w-3xl">
          Everything you need to know about working with Havell. If you don’t find what you’re
          looking for,{" "}
          <Link to="/contact" className="underline hover:text-[color:var(--brand-red,#E3362C)]">
            contact us
          </Link>
          .
        </p>
      </header>

      {/* Quick “design rules” callout */}
      <div className="mb-10 rounded-xl border bg-white p-5">
        <h2 className="font-semibold">Quick design rules (SLA)</h2>
        <ul className="mt-3 list-disc pl-5 text-gray-700 space-y-1">
          <li>Typical tolerance: ±0.15 mm + 0.15% (post-cure).</li>
          <li>Layer height: 100 μm (std), 50 μm (fine), 25 μm (select resins).</li>
          <li>Min wall: 1.0 mm (2.0 mm+ for large flats). Holes: ≥1.5–2.0 mm.</li>
          <li>Clearance: 0.2–0.4 mm sliding fits; 0.5–0.7 mm for easy assembly.</li>
          <li>Drain holes on hollow parts: 3–5 mm Ø at low points.</li>
          <li>Max single-piece size: ~353 × 196 × 350 mm (larger by splitting).</li>
        </ul>
      </div>

      {/* Category nav */}
      <nav className="mb-8 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <a
            key={c.id}
            href={`#${c.id}`}
            className="rounded-full border px-3 py-1 text-sm hover:border-[color:var(--brand-red,#E3362C)] hover:text-[color:var(--brand-red,#E3362C)]"
          >
            {c.title}
          </a>
        ))}
      </nav>

      {/* Sections */}
      <div className="space-y-12">
        {CATEGORIES.map((cat) => (
          <section key={cat.id} id={cat.id}>
            <h2 className="text-xl font-semibold">{cat.title}</h2>
            <div className="mt-4 space-y-3">
              {cat.faqs.map((item, i) => (
                <details
                  key={i}
                  className="group rounded-xl border bg-white p-4 open:shadow-sm"
                >
                  <summary className="cursor-pointer select-none font-medium leading-6 list-none">
                    {item.q}
                  </summary>
                  <p className="mt-2 text-gray-700">{item.a}</p>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-14 rounded-xl border bg-white p-6 text-center">
        <h3 className="text-lg font-semibold">Still have a question?</h3>
        <p className="mt-2 text-gray-600">
          Tell us about your part and requirements—we’ll reply within 24 hours!.
        </p>
        <div className="mt-4">
          <Link to="/contact" className="btn btn-primary">
            Contact
          </Link>
        </div>
      </div>
    </section>
  );
}
