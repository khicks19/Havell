import { QUOTE_DEFAULTS } from './config';
import { getMaterial } from './materialsData';

// Convert resin $/L to $/cm3
function resinUsdPerCm3(resinCostPerL) {
  // 1 liter = 1000 cm3
  return resinCostPerL / 1000;
}

/**
 * quotePrice
 * @param {Object} args
 * @param {number} args.volumeMm3      - raw part volume (from STL)
 * @param {Object} args.bbox           - {x,y,z} in mm
 * @param {string} args.materialId
 * @returns {Object} { material, timeHours, resinCm3, cost: { resin, machine, labor, total }, total }
 */
export function quotePrice({ volumeMm3, bbox, materialId }) {
  const mat = getMaterial(materialId);
  if (!mat) throw new Error('Unknown material');

  const { supportFactor, postProcessFactor, zSafetyMm, minPrice } = QUOTE_DEFAULTS;

  // Geometry/volume
  const partCm3 = (volumeMm3 / 1000);            // mm3 -> cm3
  const effectiveCm3 = partCm3 * supportFactor;   // add supports/waste

  // Build height (mm)
  const heightMm = bbox.z + zSafetyMm;

  // Time estimate from throughput (cm3/hr)
  const rawTimeHours = effectiveCm3 / Math.max(1e-6, mat.buildRateCm3PerHour);
  const timeHours = rawTimeHours * (postProcessFactor); // include wash/cure/handling

  // Costs
  const resinCost = effectiveCm3 * resinUsdPerCm3(mat.resinCostPerL);
  const machineCost = timeHours * mat.machineRatePerHour;
  const laborCost = timeHours * mat.laborRatePerHour;

  const subtotal = resinCost + machineCost + laborCost;
  const total = Math.max(minPrice, Math.round(subtotal * 100) / 100);

  return {
    material: mat,
    resinCm3: Math.round(effectiveCm3 * 100) / 100,
    timeHours: Math.round(timeHours * 100) / 100,
    heightMm: Math.round(heightMm * 100) / 100,
    cost: {
      resin: Math.round(resinCost * 100) / 100,
      machine: Math.round(machineCost * 100) / 100,
      labor: Math.round(laborCost * 100) / 100,
      total,
    },
    total,
  };
}
