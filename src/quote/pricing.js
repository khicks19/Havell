// src/quote/pricing.js
import { SITE, MATERIALS } from "./config";

export function mm3ToCm3(v) { return v / 1000.0; }
export function formatUSD(n) { return n.toLocaleString("en-US", { style: "currency", currency: "USD" }); }

export function pricePart({ volumeMm3, maxZmm, materialKey, qty = 1, rush = false }) {
  const m = MATERIALS[materialKey];
  if (!m) throw new Error("Unknown material: " + materialKey);

  const volumeCm3 = mm3ToCm3(volumeMm3);
  const materialCost = volumeCm3 * (1 + m.supportWaste) * (m.resinCostPerL / 1000);
  const timeHours = (volumeCm3 / m.buildRateCm3H) + (maxZmm * 0.002); // simple height factor
  const timeCost = SITE.machineRatePerHour * timeHours;
  const subtotal = SITE.baseServiceFee + materialCost + timeCost;
  const withMarkup = subtotal * (1 + m.markup);
  const partPrice = Math.max(m.minPrice, withMarkup);
  let total = partPrice * qty;
  if (rush) total *= SITE.rushMultiplier;

  return {
    volumeCm3,
    timeHours,
    partPrice,
    total,
    breakdown: { materialCost, timeCost, base: SITE.baseServiceFee, markup: m.markup, minPrice: m.minPrice },
  };
}
