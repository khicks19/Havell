// Global knobs for the quote calculation
export const QUOTE_DEFAULTS = {
  currency: 'USD',
  // Safety factors
  supportFactor: 1.10,       // add 10% for supports & waste
  postProcessFactor: 1.15,   // 15% time/cost overhead for wash/cure/handling
  minPrice: 25,              // minimum job price
  // Build rules
  zSafetyMm: 1.0,            // extra height to account for raft/base
  maxBoundingBoxMm: { x: 145, y: 145, z: 185 }, // Form 4L single-part safe box (example)
};
