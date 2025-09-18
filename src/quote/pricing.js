// src/quote/pricing.js
import { QUOTE_DEFAULTS, MATERIALS } from "./config";

// $ helpers
export function formatUSD(n) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: QUOTE_DEFAULTS.currency || "USD",
    maximumFractionDigits: 2,
  }).format(n);
}
const cm3FromMm3 = (mm3) => mm3 / 1000;

/**
 * pricePart
 * Simple, explainable calculator:
 * - Resin cost from volume (with supportWaste)
 * - Time from effective volume / build rate, then multiply by postProcessFactor
 * - Machine + labor from time * hourly rates
 * - Min price guard
 */
export default function pricePart({ volumeMm3, bbox, materialKey, qty = 1, rush = false }) {
  const m = MATERIALS[materialKey];
  if (!m) throw new Error("Unknown material: " + materialKey);

  const volumeCm3 = cm3FromMm3(volumeMm3);
  const effectiveCm3 = volumeCm3 * (1 + (m.supportWaste || 0.12));
  const timeHours = (effectiveCm3 / Math.max(1e-6, m.buildRateCm3H)) * (m.postProcessFactor || 1.15);

  const resinCost = effectiveCm3 * (m.resinCostPerL / 1000); // $/L ÷ 1000 = $/cm3
  const machineCost = timeHours * (m.machineRatePerHour || 18);
  const laborCost = timeHours * (m.laborRatePerHour || 16);

  let perPart = resinCost + machineCost + laborCost;
  perPart = Math.max(m.minPrice || 18, perPart);

  let total = perPart * qty;
  if (rush) total *= QUOTE_DEFAULTS.rushMultiplier || 1.4;

  // round to cents
  const round = (n) => Math.round(n * 100) / 100;

  return {
    material: { key: materialKey, label: m.label },
    resinCm3: round(effectiveCm3),
    timeHours: round(timeHours),
    heightMm: Math.round((bbox?.[2] || 0) * 100) / 100,
    breakdown: {
      resinCost: round(resinCost),
      machineCost: round(machineCost),
      laborCost: round(laborCost),
      perPart: round(perPart),
      qty,
      rushApplied: rush ? QUOTE_DEFAULTS.rushMultiplier : 1,
    },
    total: round(total),
  };
}
