// src/quote/pricing.js
import { QUOTE_DEFAULTS, MATERIALS } from "./config";

// ——— Helpers ————————————————————————————————————————————————
export function formatUSD(n) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: QUOTE_DEFAULTS.currency || "USD",
    maximumFractionDigits: 2,
  }).format(n);
}
const cm3FromMm3 = (mm3) => (mm3 ?? 0) / 1000;
const round = (n, p = 2) => Math.round((n ?? 0) * 10 ** p) / 10 ** p;

// ——— Pricing core —————————————————————————————————————————————
// Decoupled model:
//   * Build time (shown to user) = printHours = effective volume / build rate
//   * Post-processing affects **cost only** (adds labor hours), not build time
export default function pricePart({
  volumeMm3,
  bbox,
  materialKey,
  qty = 1,
  rush = false,
}) {
  const m = MATERIALS[materialKey];
  if (!m) throw new Error("Unknown material: " + materialKey);

  // Inputs
  const volumeCm3 = cm3FromMm3(volumeMm3);
  const supportWaste = m.supportWaste ?? 0.12;

  // Effective volume to print (model + support)
  const effectiveCm3 = volumeCm3 * (1 + supportWaste);

  // 1) Pure printer time from build rate (what we show as "Build time")
  const buildRate = Math.max(1e-6, m.buildRateCm3H || 1); // cm³/hour
  const printHours = effectiveCm3 / buildRate;

  // 2) Post-processing effort (hours) — contributes to LABOR cost only
  //    Example: 1.18 => 18% of print time added as PP labor hours
  const ppFactor = m.postProcessFactor ?? 1;
  const postProcessHours = Math.max(0, ppFactor - 1) * printHours;

  // 3) Costs
  const resinCostPerCm3 = (m.resinCostPerL || 0) / 1000; // $/L -> $/cm³
  const resinCost = effectiveCm3 * resinCostPerCm3;

  const machineRatePerHour = m.machineRatePerHour ?? 10;
  const machineCost = printHours * machineRatePerHour; // printer time only

  const laborRatePerHour = m.laborRatePerHour ?? 16;
  const laborCost =
    (printHours + postProcessHours) * laborRatePerHour; // print + PP labor

  // Base part cost and guards
  const rawPerPart = resinCost + machineCost + laborCost;
  const perPart = Math.max(m.minPrice ?? 0, rawPerPart);

  // Totals
  let total = perPart * (qty || 1);
  let rushApplied = 1;
  if (rush) {
    rushApplied = QUOTE_DEFAULTS.rushMultiplier || 1.4;
    total *= rushApplied;
  }

  // Height for display (max Z of bbox)
  const heightMm = bbox?.size?.[2] ?? 0;

  // Return cents-safe numbers (rounded after all math)
  return {
    material: { key: materialKey, label: m.label },
    resinCm3: round(effectiveCm3, 1),
    timeHours: round(printHours, 2), // 👈 Build time shown to user (decoupled)
    heightMm: round(heightMm, 2),

    // Price breakdown (kept for internal use or admin displays)
    breakdown: {
      resinCost: round(resinCost),
      machineCost: round(machineCost),
      laborCost: round(laborCost),
      postProcessHours: round(postProcessHours, 2),
      perPart: round(perPart),
    },

    qty: Number(qty) || 1,
    rushApplied: round(rushApplied, 2),
    total: round(total),
  };
}

