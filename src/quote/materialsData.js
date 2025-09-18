// Minimal starter catalog (you can expand numbers later)
// Units: costs in USD, rates in cm3/hr, labor in USD/hr
export const MATERIALS = [
  {
    id: 'rigid10k',
    name: 'Rigid 10K',
    type: 'SLA',
    resinCostPerL: 399,            // update from your supplier
    machineRatePerHour: 12,        // your amortized printer cost/hour
    laborRatePerHour: 25,
    buildRateCm3PerHour: 12,       // effective throughput incl. peel & overhead
    shrinkFactor: 1.00,
  },
  {
    id: 'high-temp',
    name: 'High Temp',
    type: 'SLA',
    resinCostPerL: 349,
    machineRatePerHour: 12,
    laborRatePerHour: 25,
    buildRateCm3PerHour: 10,
    shrinkFactor: 1.00,
  },
  {
    id: 'tough1500v2',
    name: 'Tough 1500 V2',
    type: 'SLA',
    resinCostPerL: 179,
    machineRatePerHour: 12,
    laborRatePerHour: 25,
    buildRateCm3PerHour: 18,
    shrinkFactor: 1.00,
  },
  {
    id: 'clear',
    name: 'Clear',
    type: 'SLA',
    resinCostPerL: 149,
    machineRatePerHour: 12,
    laborRatePerHour: 25,
    buildRateCm3PerHour: 20,
    shrinkFactor: 1.00,
  },
];

// Helper: lookup by id
export function getMaterial(id) {
  return MATERIALS.find(m => m.id === id);
}
