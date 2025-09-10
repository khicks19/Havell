export default async function handler(req, res) {
  res.setHeader('content-type', 'application/json');
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' }); return;
  }
  try {
    const body = req.body || (await parseJson(req));
    const { material, finish, lead, qty, metrics } = body || {};
    if (!material || !finish || !lead || !qty || !metrics) {
      res.status(400).json({ error: 'Missing fields' }); return;
    }

    const LABOR_RATE = 45;
    const MACHINE_RATE = 18;
    const OVERHEAD_PCT = 0.12;
    const MARGIN_PCT = 0.25;
    const PRINT_SPEED_MM_PER_HR = 25;

    const MATERIALS = {
      rigid10k: { cost_per_cc: 0.22, handling_factor: 1.05 },
      tough1500: { cost_per_cc: 0.18, handling_factor: 1.00 },
      high_temp: { cost_per_cc: 0.30, handling_factor: 1.15 },
      esd: { cost_per_cc: 0.35, handling_factor: 1.25 },
    };

    const FINISH = {
      basic: { coef: 0.003 },
      cosmetic: { coef: 0.008 },
      paint_ready: { coef: 0.015 },
    };

    const LEAD = {
      standard: { days: 3, mult: 1.0 },
      rush: { days: 2, mult: 1.25 },
      expedite: { days: 1, mult: 1.6 },
    };

    const mat = MATERIALS[material];
    const fin = FINISH[finish];
    const lt = LEAD[lead];
    if (!mat || !fin || !lt) {
      res.status(400).json({ error: 'Invalid options' }); return;
    }

    const { volume_cc=0, area_cm2=0, z_mm=0 } = metrics;

    const print_time_hr = Math.max(0.2, z_mm / PRINT_SPEED_MM_PER_HR);
    const support_removal_hr = Math.max(0.05, area_cm2 * 0.003);
    const wash_cure_hr = 0.3;
    const finishing_hr = Math.max(0, area_cm2 * fin.coef);
    const inspection_hr = 0.1;

    const material_cost = volume_cc * mat.cost_per_cc * mat.handling_factor;
    const print_cost = print_time_hr * MACHINE_RATE;
    const support_cost = support_removal_hr * LABOR_RATE;
    const wash_cure_cost = wash_cure_hr * LABOR_RATE;
    const finishing_cost = finishing_hr * LABOR_RATE;
    const inspection_cost = inspection_hr * LABOR_RATE;

    const base = material_cost + print_cost + support_cost + wash_cure_cost + finishing_cost + inspection_cost;
    const overhead = base * OVERHEAD_PCT;
    const margin = (base + overhead) * MARGIN_PCT;

    const per_unit = (base + overhead + margin) * lt.mult;
    const unit_price = Math.max(15, per_unit);
    const batch_total = unit_price * qty;

    res.status(200).json({
      input: { material, finish, lead, qty, metrics },
      derived: { print_time_hr, support_removal_hr, wash_cure_hr, finishing_hr, inspection_hr, lead_days: lt.days },
      breakdown: {
        material: round(material_cost * lt.mult),
        print: round(print_cost * lt.mult),
        support: round(support_cost * lt.mult),
        wash_cure: round(wash_cure_cost * lt.mult),
        finishing: round(finishing_cost * lt.mult),
        inspection: round(inspection_cost * lt.mult),
        overhead: round(overhead * lt.mult),
        margin: round(margin * lt.mult)
      },
      totals: { unit_price: round(unit_price), batch_total: round(batch_total) }
    });
  } catch (e) {
    console.error(e);
    try { res.status(500).json({ error: 'Quote error' }); } catch {}
  }
}

function round(n){ return Math.round(n * 100) / 100; }

async function parseJson(req){
  return await new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => data += chunk);
    req.on('end', () => {
      try { resolve(JSON.parse(data || '{}')); } catch (e) { reject(e); }
    });
  });
}
