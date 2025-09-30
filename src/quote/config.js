// src/quote/config.js
// One place to tune currency and per-material settings.

export const QUOTE_DEFAULTS = {
  currency: "USD",
  // global knobs
  rushMultiplier: 1.4, // 40% upcharge if you later add a Rush toggle
};

// Map of materials (edit the numbers to your real costs/speeds)
export const MATERIALS = {
  "grey-v5":       { label: "Grey V5",       resinCostPerL: 79,  buildRateCm3H: 22, supportWaste: 0.12, machineRatePerHour: 8,  laborRatePerHour: 12, postProcessFactor: 1.0, minPrice: 15 },
  "black-v5":      { label: "Black V5",      resinCostPerL: 79,  buildRateCm3H: 22, supportWaste: 0.12, machineRatePerHour: 8,  laborRatePerHour: 12, postProcessFactor: 1.0, minPrice: 15 },
  "white-v5":      { label: "White V5",      resinCostPerL: 79,  buildRateCm3H: 22, supportWaste: 0.12, machineRatePerHour: 8,  laborRatePerHour: 12, postProcessFactor: 1.0, minPrice: 15 },
  "clear-v5":      { label: "Clear V5",      resinCostPerL: 79,  buildRateCm3H: 18, supportWaste: 0.15, machineRatePerHour: 8,  laborRatePerHour: 12, postProcessFactor: 1.0, minPrice: 18 },
  "clear-cast":    { label: "Clear Cast",    resinCostPerL: 199, buildRateCm3H: 12, supportWaste: 0.18, machineRatePerHour: 8,  laborRatePerHour: 12, postProcessFactor: 1.0, minPrice: 22 },
  "tough-1500-v2": { label: "Tough 1500 V2", resinCostPerL: 149, buildRateCm3H: 20, supportWaste: 0.14, machineRatePerHour: 8, laborRatePerHour: 12, postProcessFactor: 1.0, minPrice: 16 },
  "tough-2000":    { label: "Tough 2000",    resinCostPerL: 149, buildRateCm3H: 20, supportWaste: 0.10, machineRatePerHour: 8, laborRatePerHour: 12, postProcessFactor: 1.0, minPrice: 16 },
  "rigid-4000":    { label: "Rigid 4000",    resinCostPerL: 229, buildRateCm3H: 16, supportWaste: 0.15, machineRatePerHour: 8, laborRatePerHour: 12, postProcessFactor: 1.0, minPrice: 18 },
  "rigid-10k":     { label: "Rigid 10K",     resinCostPerL: 299, buildRateCm3H: 14, supportWaste: 0.16, machineRatePerHour: 8, laborRatePerHour: 12, postProcessFactor: 1.0, minPrice: 20 },
  "high-temp":     { label: "High Temp",     resinCostPerL: 199, buildRateCm3H: 14, supportWaste: 0.16, machineRatePerHour: 8, laborRatePerHour: 12, postProcessFactor: 1.0, minPrice: 20 },  
  "flexible-80a":  { label: "Flexible 80A",  resinCostPerL: 199, buildRateCm3H: 12, supportWaste: 0.18, machineRatePerHour: 8, laborRatePerHour: 12, postProcessFactor: 1.0, minPrice: 18 },
  "elastic-50a":   { label: "Elastic 50A",   resinCostPerL: 199, buildRateCm3H: 10, supportWaste: 0.22, machineRatePerHour: 8, laborRatePerHour: 12, postProcessFactor: 1.0, minPrice: 18 },
  "esd":           { label: "ESD",           resinCostPerL: 229, buildRateCm3H:  20, supportWaste: 0.12, machineRatePerHour: 8, laborRatePerHour: 18, postProcessFactor: 0.5, minPrice: 0 },
  "color-resin":   { label: "Color Resin",   resinCostPerL: 99,  buildRateCm3H: 20, supportWaste: 0.12, machineRatePerHour: 8, laborRatePerHour: 12, postProcessFactor: 1.0, minPrice: 15 },
};
