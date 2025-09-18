// src/quote/quoteConfig.js

export const COMPANY = {
  name: "Havell",
  currency: "USD",
  minCharge: 25,            // Minimum job charge
  wasteFactor: 1.12,        // 12% overhead for support/uncured resin loss
};

// Machine-time (your “shop rate”) by material class
export const MACHINE_RATES = {
  standard: 55,   // $/hr  (Grey/Black/White/Clear V5)
  engineering: 65, // $/hr  (Tough/Durable/Rigid/High Temp/FR/ESD)
  elastomer: 70,  // $/hr  (Flexible 80A / Elastic 50A)
  casting: 65,    // $/hr  (Castable Wax 40)
};

// Base post-processing labor per part (wash+UV, light clip) — minutes
export const POSTPROCESS_MIN = 10; // minutes per part
export const LABOR_RATE = 45;      // $/hr for post ops

// Expedite options (optional UI toggle)
export const EXPEDITE = {
  none:   { label: "Standard lead",     multiplier: 1.00 },
  rush:   { label: "Rush (x1.35)",      multiplier: 1.35 },
  hot:    { label: "Expedite (x1.60)",  multiplier: 1.60 },
};

// Layer height assumptions let you add future rules if you wish
// (We currently estimate by volume/buildRate, which gives robust results.)
export const DEFAULT_LAYER_MM = 0.1;

// -----------------------
// Material library (Formlabs SLA / Form 4L compatible)
// buildRate is the *effective* volumetric throughput for typical parts.
// Tune these with a couple calibration jobs on your machine.
// -----------------------

export const MATERIALS = [
  // ---------- Standard V5 family ----------
  {
    key: "grey_v5",
    name: "Grey V5",
    class: "standard",
    resinCostPerL: 149,
    buildRate: 12, // cm³/hr
    tags: ["Rapid Prototyping", "Models & Props"],
  },
  {
    key: "black_v5",
    name: "Black V5",
    class: "standard",
    resinCostPerL: 149,
    buildRate: 12,
    tags: ["Rapid Prototyping", "Models & Props"],
  },
  {
    key: "white_v5",
    name: "White V5",
    class: "standard",
    resinCostPerL: 149,
    buildRate: 12,
    tags: ["Rapid Prototyping", "Models & Props"],
  },
  {
    key: "clear_v5",
    name: "Clear V5",
    class: "standard",
    resinCostPerL: 149,
    buildRate: 12,
    tags: ["Rapid Prototyping", "Models & Props", "Manufacturing Aids"],
  },

  // ---------- Engineering resins ----------
  {
    key: "tough_1500_v2",
    name: "Tough 1500 V2",
    class: "engineering",
    resinCostPerL: 179,
    buildRate: 10,
    tags: ["End-Use Parts", "Manufacturing Aids", "Rapid Prototyping"],
  },
  {
    key: "tough_2000",
    name: "Tough 2000",
    class: "engineering",
    resinCostPerL: 179,
    buildRate: 10,
    tags: ["End-Use Parts", "Manufacturing Aids"],
  },
  {
    key: "durable",
    name: "Durable",
    class: "engineering",
    resinCostPerL: 199,
    buildRate: 9,
    tags: ["End-Use Parts", "Manufacturing Aids"],
  },
  {
    key: "rigid_10k",
    name: "Rigid 10K",
    class: "engineering",
    resinCostPerL: 299,
    buildRate: 8,
    tags: ["End-Use Parts", "Manufacturing Aids"],
  },
  {
    key: "high_temp",
    name: "High Temp",
    class: "engineering",
    resinCostPerL: 199,
    buildRate: 7,
    tags: ["End-Use Parts", "Rapid Tooling"],
  },
  {
    key: "flame_retardant",
    name: "Flame Retardant (FR)",
    class: "engineering",
    resinCostPerL: 299,
    buildRate: 8,
    tags: ["End-Use Parts", "Manufacturing Aids"],
  },
  {
    key: "esd",
    name: "ESD",
    class: "engineering",
    resinCostPerL: 345, // reseller ref ~$343.50
    buildRate: 8,
    tags: ["End-Use Parts", "Electronics"],
  },

  // ---------- Elastomers ----------
  {
    key: "flexible_80a",
    name: "Flexible 80A",
    class: "elastomer",
    resinCostPerL: 199,
    buildRate: 7,
    tags: ["End-Use Parts", "Gaskets & Grips"],
  },
  {
    key: "elastic_50a",
    name: "Elastic 50A",
    class: "elastomer",
    resinCostPerL: 199,
    buildRate: 6,
    tags: ["End-Use Parts", "Wearables", "Seals"],
  },

  // ---------- Casting ----------
  {
    key: "castable_wax_40",
    name: "Castable Wax 40",
    class: "casting",
    resinCostPerL: 199,
    buildRate: 8,
    tags: ["Models & Props", "Casting"],
  },
];

// -----------------------
// Quote math
// -----------------------
export function estimateQuote({
  // required
  volumeCm3,          // from STL parsing
  materialKey,
  partCount = 1,

  // optional
  expedite = "none",  // 'none' | 'rush' | 'hot'
}) {
  const mat = MATERIALS.find(m => m.key === materialKey);
  if (!mat) throw new Error("Unknown material.");

  const classRate = MACHINE_RATES[mat.class] ?? MACHINE_RATES.engineering;

  const effectiveVolumeL = (volumeCm3 / 1000) * COMPANY.wasteFactor;
  const materialCost = effectiveVolumeL * mat.resinCostPerL;

  const printHours = Math.max(0.5, volumeCm3 / mat.buildRate);
  const machineCost = printHours * classRate;

  const postMinutes = POSTPROCESS_MIN * partCount;
  const postCost = (postMinutes / 60) * LABOR_RATE;

  let subtotal = (materialCost + machineCost + postCost) * partCount;
  subtotal = Math.max(subtotal, COMPANY.minCharge);
  const mult = EXPEDITE[expedite]?.multiplier ?? 1;
  const total = Math.max(COMPANY.minCharge, subtotal * mult);

  return {
    breakdown: {
      materialCost: round(materialCost),
      machineCost: round(machineCost),
      postCost: round(postCost),
      expedite: EXPEDITE[expedite]?.label ?? EXPEDITE.none.label,
      multiplier: mult,
    },
    totals: {
      subtotal: round(subtotal),
      total: round(total),
      currency: COMPANY.currency,
    },
    time: {
      printHours: round(printHours, 2),
      postMinutes,
    },
    meta: {
      material: mat.name,
      class: mat.class,
      buildRateCm3h: mat.buildRate,
      resinCostPerL: mat.resinCostPerL,
      wasteFactor: COMPANY.wasteFactor,
      minCharge: COMPANY.minCharge,
    },
  };
}

function round(v, p = 2) {
  return Math.round(v * Math.pow(10, p)) / Math.pow(10, p);
}
