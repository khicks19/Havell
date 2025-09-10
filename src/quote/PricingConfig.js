export const MATERIALS = [
  { id: 'rigid10k', name: 'Rigid 10K', cost_per_cc: 0.22, handling_factor: 1.05 },
  { id: 'tough1500', name: 'Tough 1500', cost_per_cc: 0.18, handling_factor: 1.00 },
  { id: 'high_temp', name: 'High Temp', cost_per_cc: 0.30, handling_factor: 1.15 },
  { id: 'esd', name: 'ESD Resin', cost_per_cc: 0.35, handling_factor: 1.25 },
];

export const FINISH_LEVELS = [
  { id: 'basic', name: 'Basic (support removal)', finishing_coef_hr_per_cm2: 0.003 },
  { id: 'cosmetic', name: 'Cosmetic (sanded)', finishing_coef_hr_per_cm2: 0.008 },
  { id: 'paint_ready', name: 'Paint-ready', finishing_coef_hr_per_cm2: 0.015 },
];

export const LEAD_TIMES = [
  { id: 'standard', name: 'Standard (3 days)', days: 3, price_multiplier: 1.0 },
  { id: 'rush', name: 'Rush (2 days)', days: 2, price_multiplier: 1.25 },
  { id: 'expedite', name: 'Expedite (1 day)', days: 1, price_multiplier: 1.6 },
];