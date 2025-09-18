// src/quote/config.js
export const SITE = {
  machineRatePerHour: 18,   // $/hr
  baseServiceFee: 8,        // $ per order
  rushMultiplier: 1.4       // 40% upcharge on rush
};

// Per-material settings (placeholder costs — please tune to your real $/L & speeds)
export const MATERIALS = {
  "Grey V5":        { resinCostPerL: 199, buildRateCm3H: 14, supportWaste: 0.12, minPrice: 18, markup: 0.25 },
  "Black V5":       { resinCostPerL: 199, buildRateCm3H: 14, supportWaste: 0.12, minPrice: 18, markup: 0.25 },
  "White V5":       { resinCostPerL: 199, buildRateCm3H: 14, supportWaste: 0.12, minPrice: 18, markup: 0.25 },
  "Clear":          { resinCostPerL: 225, buildRateCm3H: 12, supportWaste: 0.15, minPrice: 22, markup: 0.28 },
  "Clear Cast":     { resinCostPerL: 259, buildRateCm3H: 10, supportWaste: 0.15, minPrice: 25, markup: 0.30 },
  "Tough 1500 V2":  { resinCostPerL: 229, buildRateCm3H: 12, supportWaste: 0.14, minPrice: 22, markup: 0.28 },
  "Tough 2000":     { resinCostPerL: 239, buildRateCm3H: 12, supportWaste: 0.14, minPrice: 22, markup: 0.28 },
  "Tough 4000":     { resinCostPerL: 249, buildRateCm3H: 11, supportWaste: 0.15, minPrice: 24, markup: 0.30 },
  "Rigid 10K":      { resinCostPerL: 289, buildRateCm3H: 10, supportWaste: 0.16, minPrice: 28, markup: 0.30 },
  "High Temp":      { resinCostPerL: 289, buildRateCm3H: 10, supportWaste: 0.16, minPrice: 28, markup: 0.30 },
  "Flexible 80A":   { resinCostPerL: 269, buildRateCm3H: 10, supportWaste: 0.16, minPrice: 26, markup: 0.30 },
  "Elastic 50A":    { resinCostPerL: 289, buildRateCm3H: 10, supportWaste: 0.18, minPrice: 28, markup: 0.32 },
  "ESD":            { resinCostPerL: 349, buildRateCm3H: 9,  supportWaste: 0.18, minPrice: 32, markup: 0.35 },
};
