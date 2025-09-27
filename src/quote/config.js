// src/quote/config.js
// One place to tune currency and per-material settings.

export const QUOTE_DEFAULTS = {
  currency: "USD",
  // global knobs
  rushMultiplier: 1.4, // 40% upcharge if you later add a Rush toggle
};

// Map of materials (edit the numbers to your real costs/speeds)
export const MATERIALS = {
  "grey-v5":       { label: "Grey V5",       resinCostPerL: 79, buildRateCm3H: 14, supportWaste: 0.12, machineRatePerHour: 10, laborRatePerHour: 15, postProcessFactor: 1.15, minPrice: 18 },
  "black-v5":      { label: "Black V5",      resinCostPerL: 79, buildRateCm3H: 14, supportWaste: 0.12, machineRatePerHour: 10, laborRatePerHour: 15, postProcessFactor: 1.15, minPrice: 18 },
  "white-v5":      { label: "White V5",      resinCostPerL: 79, buildRateCm3H: 14, supportWaste: 0.12, machineRatePerHour: 10, laborRatePerHour: 15, postProcessFactor: 1.15, minPrice: 18 },
  "clear-v5":      { label: "Clear V5",      resinCostPerL: 79, buildRateCm3H: 12, supportWaste: 0.15, machineRatePerHour: 10, laborRatePerHour: 16, postProcessFactor: 1.18, minPrice: 22 },
  "clear-cast":    { label: "Clear Cast",    resinCostPerL: 149, buildRateCm3H: 10, supportWaste: 0.15, machineRatePerHour: 10, laborRatePerHour: 16, postProcessFactor: 1.20, minPrice: 25 },
  "tough-1500-v2": { label: "Tough 1500 V2", resinCostPerL: 149, buildRateCm3H: 12, supportWaste: 0.14, machineRatePerHour: 10, laborRatePerHour: 16, postProcessFactor: 1.18, minPrice: 22 },
  "tough-2000":    { label: "Tough 2000",    resinCostPerL: 149, buildRateCm3H: 12, supportWaste: 0.14, machineRatePerHour: 10, laborRatePerHour: 16, postProcessFactor: 0.5, minPrice: 0 },
  "rigid-4000":    { label: "Rigd 4000",     resinCostPerL: 229, buildRateCm3H: 11, supportWaste: 0.15, machineRatePerHour: 10, laborRatePerHour: 16, postProcessFactor: 1.20, minPrice: 24 },
  "rigid-10k":     { label: "Rigid 10K",     resinCostPerL: 299, buildRateCm3H: 10, supportWaste: 0.16, machineRatePerHour: 10, laborRatePerHour: 17, postProcessFactor: 1.22, minPrice: 28 },
  "high-temp":     { label: "High Temp",     resinCostPerL: 199, buildRateCm3H: 10, supportWaste: 0.16, machineRatePerHour: 10, laborRatePerHour: 17, postProcessFactor: 1.22, minPrice: 28 },
  "flexible-80a":  { label: "Flexible 80A",  resinCostPerL: 199, buildRateCm3H: 10, supportWaste: 0.16, machineRatePerHour: 10, laborRatePerHour: 17, postProcessFactor: 1.22, minPrice: 26 },
  "elastic-50a":   { label: "Elastic 50A",   resinCostPerL: 199, buildRateCm3H:  9, supportWaste: 0.18, machineRatePerHour: 10, laborRatePerHour: 17, postProcessFactor: 1.25, minPrice: 28 },
  "esd":           { label: "ESD",           resinCostPerL: 229, buildRateCm3H:  9, supportWaste: 0.18, machineRatePerHour: 10, laborRatePerHour: 18, postProcessFactor: 1.25, minPrice: 32 },
  "color-resin":   { label: "Color Resin",   resinCostPerL: 99, buildRateCm3H:  9, supportWaste: 0.12, machineRatePerHour: 10, laborRatePerHour: 15, postProcessFactor: 1.15, minPrice: 18 },
};
