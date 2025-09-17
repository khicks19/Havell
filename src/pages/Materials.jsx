import React, { useMemo, useState } from "react";

const VENDOR = "Formlabs SLA";
const CATS = [
  "End-Use Parts",
  "Rapid Prototyping",
  "Rapid Tooling",
  "Manufacturing Aids",
  "Models & Props",
];

/** Upload images to /public/materials/ with these filenames (adjust as needed). */
const MATERIALS = [
  // --- End-use + prototyping mix
  {
    id: "rigid-10k",
    name: "Rigid 10K",
    vendor: VENDOR,
    img: "/materials/rigid-10k.jpg",
    blurb: "Heat-resistant, ultra-stiff, glass-filled.",
    categories: ["End-Use Parts", "Rapid Prototyping", "Rapid Tooling"],
  },
  {
    id: "high-temp",
    name: "High Temp",
    vendor: VENDOR,
    img: "/materials/high-temp.jpg",
    blurb: "Translucent, fine details, heat resistant.",
    categories: ["End-Use Parts", "Rapid Prototyping", "Rapid Tooling"],
  },
  {
    id: "tough-1500-v2",
    name: "Tough 1500 V2",
    vendor: VENDOR,
    img: "/materials/tough-1500-v2.jpg",
    blurb: "PP-like pliability with high wear resistance.",
    categories: ["End-Use Parts", "Rapid Prototyping", "Manufacturing Aids"],
  },
  {
    id: "tough-2000",
    name: "Tough 2000",
    vendor: VENDOR,
    img: "/materials/tough-2000.jpg",
    blurb: "ABS-like, strong, impact resistant.",
    categories: ["End-Use Parts", "Manufacturing Aids"],
  },
  {
    id: "tough-4000",
    name: "Tough 4000",
    vendor: VENDOR,
    img: "/materials/tough-4000.jpg",
    blurb: "High strength, glass-filled, ultra stiff.",
    categories: ["End-Use Parts"],
  },

  // --- Clear / casting / flame
  {
    id: "clear-cast",
    name: "Clear Cast",
    vendor: VENDOR,
    img: "/materials/clear-cast.jpg",
    blurb: "Fine details, investment casting, transparent.",
    categories: ["End-Use Parts", "Rapid Prototyping", "Rapid Tooling", "Models & Props", "Manufacturing Aids"],
  },
  {
    id: "flame-retardant",
    name: "Flame Retardant",
    vendor: VENDOR,
    img: "/materials/flame-retardant.jpg",
    blurb: "UL94 V0, stiff & strong, low creep.",
    categories: ["End-Use Parts", "Rapid Prototyping"],
  },

  // --- Elastomers
  {
    id: "elastic-50a",
    name: "Elastic 50A",
    vendor: VENDOR,
    img: "/materials/elastic-50a.jpg",
    blurb: "Soft, silicone-like elastomer.",
    categories: ["Rapid Prototyping"],
  },
  {
    id: "flexible-80a",
    name: "Flexible 80A",
    vendor: VENDOR,
    img: "/materials/flexible-80a.jpg",
    blurb: "Durable grips, gaskets, and seals.",
    categories: ["Rapid Prototyping"],
  },

  // --- Functional prototyping
  {
    id: "durable",
    name: "Durable",
    vendor: VENDOR,
    img: "/materials/durable.jpg",
    blurb: "Pliable, low friction, wear-resistant.",
    categories: ["Rapid Prototyping", "Manufacturing Aids"],
  },
  {
    id: "esd",
    name: "ESD",
    vendor: VENDOR,
    img: "/materials/esd.jpg",
    blurb: "Static-dissipative for safe electronics handling.",
    categories: ["Rapid Prototyping"],
  },

  // --- Color / model family
  {
    id: "color",
    name: "Color Resin",
    vendor: VENDOR,
    img: "/materials/color.jpg",
    blurb: "Stiff & strong, matte, custom colors.",
    categories: ["Rapid Prototyping", "Manufacturing Aids", "Models & Props"],
  },
  {
    id: "grey-v5",
    name: "Grey V5",
    vendor: VENDOR,
    img: "/materials/grey-v5.jpg",
    blurb: "Matte, fine details, fast printing.",
    categories: ["Rapid Prototyping", "Models & Props"],
  },
  {
    id: "black-v5",
    name: "Black V5",
    vendor: VENDOR,
    img: "/materials/black-v5.jpg",
    blurb: "High accuracy, matte black.",
    categories: ["Rapid Prototyping", "Models & Props"],
  },
  {
    id: "clear-v5",
    name: "Clear V5",
    vendor: VENDOR,
    img: "/materials/clear-v5.jpg",
    blurb: "High throughput, high strength.",
    categories: ["Rapid Prototyping", "Models & Props"],
  },
  {
    id: "white-v5",
    name: "White V5",
    vendor: VENDOR,
    img: "/materials/white-v5.jpg",
    blurb: "High accuracy, fine details.",
    categories: ["Rapid Prototyping"],
  },
  {
    id: "precision-model",
    name: "Precision Model",
    vendor: VENDOR,
    img: "/materials/precision-model.jpg",
    blurb: "Matte, high-accuracy visual models.",
    categories: ["Models & Props"],
  },

  // --- Casting specialty
  {
    id: "castable-wax",
    name: "Castable Wax",
    vendor: VENDOR,
    img: "/materials/castable-wax.jpg",
    blurb: "Fine details, clean burnout, investment casting.",
    categories: ["Rapid Tooling"],
  },
];

function StarRow({ count }) {
  if (!count) return null;
  return (
    <div className="mt-1 text-xs font-medium text-[color:var(--brand-red,#E3362C)]">
      {"★".repeat(count)}
      <span className="sr-only">{count} use categories</span>
    </div>
  );
}

function MaterialCard({ m }) {
  const stars = m.categories?.length || 0;
  return (
    <div className="rounded-2xl border p-4 flex flex-col">
      <div className="rounded-xl overflow-hidden border">
        <img
          src={m.img}
          alt={m.name}
          className="w-full aspect-[16/10] object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>
      <h3 className="mt-3 font-semibold">{m.name}</h3>
      <p className="mt-1 text-sm text-gray-600">{m.blurb}</p>
      <StarRow count={stars} />
      <div className="mt-2 flex flex-wrap gap-2">
        {(m.categories || []).map((c) => (
          <span
            key={c}
            className="rounded-full border px-2 py-0.5 text-xs text-gray-700"
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Materials() {
  // filter shape: { kind: "all" } | { kind: "vendor" } | { kind: "category", cat: string }
  const [filter, setFilter] = useState({ kind: "all" });

  const visible = useMemo(() => {
    if (filter.kind === "all") return MATERIALS;
    if (filter.kind === "vendor") {
      return MATERIALS.filter((m) => m.vendor === VENDOR);
    }
    if (filter.kind === "category") {
      return MATERIALS.filter(
        (m) => m.vendor === VENDOR && m.categories?.includes(filter.cat)
      );
    }
    return MATERIALS;
  }, [filter]);

  return (
    <section className="mx-auto max-w-7xl px-6 sm:px-8 py-10">
      <h1 className="text-3xl font-semibold">Materials &amp; uses</h1>
      {/* Caption under the title */}
      <p className="mt-3 text-gray-600 max-w-3xl">
        Explore our SLA materials for prototypes and end-use parts. Choose <em>All</em> to see
        everything, or filter by <strong>Formlabs SLA</strong> and hover to select a use category.
      </p>

      {/* Filters */}
      <div className="mt-6 flex items-center gap-3">
        <button
          onClick={() => setFilter({ kind: "all" })}
          className={`btn ${filter.kind === "all" ? "btn-primary" : "btn-outline"}`}
        >
          All
        </button>

        {/* Formlabs SLA with hover dropdown */}
        <div className="relative group">
          <button
            onClick={() => setFilter({ kind: "vendor" })}
            className={`btn ${filter.kind !== "all" ? "btn-primary" : "btn-outline"}`}
            aria-haspopup="true"
            aria-expanded="false"
          >
            Formlabs SLA ▾
          </button>
          <div
            className="absolute left-0 z-10 hidden group-hover:block mt-2 w-56 rounded-2xl border bg-white shadow-lg"
            role="menu"
          >
            {CATS.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter({ kind: "category", cat })}
                className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
                role="menuitem"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((m) => (
          <MaterialCard key={m.id} m={m} />
        ))}
      </div>
    </section>
  );
}
