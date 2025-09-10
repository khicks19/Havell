import React, { useMemo, useState } from 'react'
import { parseSTL } from '../quote/parseStl'
import { MATERIALS, FINISH_LEVELS, LEAD_TIMES } from '../quote/PricingConfig'

export default function QuoteWidget() {
  const [file, setFile] = useState(null)
  const [units, setUnits] = useState('mm')
  const [stats, setStats] = useState(null)
  const [material, setMaterial] = useState(MATERIALS[0].id)
  const [finish, setFinish] = useState(FINISH_LEVELS[0].id)
  const [lead, setLead] = useState(LEAD_TIMES[0].id)
  const [qty, setQty] = useState(1)
  const [loading, setLoading] = useState(false)
  const [quote, setQuote] = useState(null)
  const [error, setError] = useState(null)

  const materialObj = useMemo(() => MATERIALS.find(m => m.id === material), [material])
  const finishObj = useMemo(() => FINISH_LEVELS.find(f => f.id === finish), [finish])
  const leadObj = useMemo(() => LEAD_TIMES.find(l => l.id === lead), [lead])

  async function handleParse() {
    if (!file) return
    setError(null)
    setLoading(true)
    try {
      const parsed = await parseSTL(file, units)
      setStats(parsed)
    } catch (e) {
      console.error(e)
      setError(e.message || 'Failed to parse STL')
    } finally {
      setLoading(false)
    }
  }

  async function handleQuote() {
    if (!stats) return;
    setLoading(true);
    setError(null);
    setQuote(null);
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          material,
          finish,
          lead,
          qty: Number(qty),
          metrics: {
            volume_cc: stats.volume_cc,
            area_cm2: stats.area_cm2,
            z_mm: stats.z_mm,
            bbox: stats.bbox
          }
        })
      });

      const contentType = res.headers.get('content-type') || '';
      let data;
      if (contentType.includes('application/json')) {
        data = await res.json();
      } else {
        const text = await res.text();
        throw new Error('API endpoint not running yet (deploy to Vercel or use `vercel dev`).');
      }

      if (!res.ok) throw new Error(data?.error || 'Quote failed');
      if (!data?.totals) throw new Error('Malformed response from API');
      setQuote(data);
    } catch (e) {
      console.error(e);
      setError(e.message || 'Failed to get quote');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
        <div className="text-sm text-gray-300">1) Upload CAD (.stl)</div>
        <input
          type="file"
          accept=".stl"
          className="mt-2 block w-full text-sm text-gray-200 file:mr-4 file:rounded-md file:border-0 file:bg-sky-600 file:px-3 file:py-2 file:text-white hover:file:bg-sky-500"
          onChange={(e) => { setFile(e.target.files?.[0] || null); setStats(null); setQuote(null); setError(null); }}
        />

        <div className="mt-3 flex items-center gap-4 text-sm">
          <label className="flex items-center gap-2">
            <input type="radio" name="units" value="mm" checked={units === 'mm'} onChange={() => setUnits('mm')} />
            <span>mm</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="units" value="in" checked={units === 'in'} onChange={() => setUnits('in')} />
            <span>inches</span>
          </label>
        </div>

        <button
          onClick={handleParse}
          disabled={!file || loading}
          className="mt-4 w-full rounded-xl bg-white/10 px-4 py-2 text-sm font-medium hover:bg-white/15 disabled:opacity-50"
        >
          {loading ? 'Parsing…' : 'Analyze Model'}
        </button>

        <hr className="my-6 border-white/10" />

        <div className="text-sm text-gray-300">2) Choose options</div>
        <div className="mt-3 grid grid-cols-1 gap-3">
          <Select label="Material" value={material} onChange={setMaterial} options={MATERIALS} />
          <Select label="Finish" value={finish} onChange={setFinish} options={FINISH_LEVELS} />
          <Select label="Lead time" value={lead} onChange={setLead} options={LEAD_TIMES} />
          <Number label="Quantity" value={qty} onChange={setQty} min={1} />
        </div>

        <button
          onClick={handleQuote}
          disabled={!stats || loading}
          className="mt-4 w-full rounded-xl bg-sky-500 px-4 py-2 text-sm font-medium text-gray-950 hover:bg-sky-400 disabled:opacity-50"
        >
          {loading ? 'Quoting…' : 'Get Price'}
        </button>

        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
      </div>

      <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
        <div className="text-sm text-gray-300">Model metrics</div>
        {stats ? (
          <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <Metric label="Triangles" value={stats.triangles.toLocaleString()} />
            <Metric label="Volume" value={`${stats.volume_cc.toFixed(2)} cc`} />
            <Metric label="Surface Area" value={`${stats.area_cm2.toFixed(2)} cm²`} />
            <Metric label="Z Height" value={`${stats.z_mm.toFixed(1)} mm`} />
            <div className="col-span-2">
              <div className="text-gray-400">Bounding Box (mm)</div>
              <div className="mt-1 rounded-md bg-white/5 px-3 py-2">
                {stats.bbox.size_mm.map(n => n.toFixed(1)).join(' × ')}
              </div>
            </div>
            <div className="col-span-2 text-xs text-gray-400 mt-2">
              Units assumed: <b>{units}</b>. If your STL was exported in inches, toggle accordingly.
            </div>
          </div>
        ) : (
          <p className="mt-3 text-sm text-gray-400">Upload and analyze a model to see metrics.</p>
        )}
      </div>

      <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
        <div className="text-sm text-gray-300">Quote</div>
        {quote ? (
          <div className="mt-3 text-sm">
            <div className="text-xl font-semibold">${Number(quote?.totals?.unit_price ?? 0).toFixed(2)} <span className="text-sm text-gray-400">/ unit</span></div>
            <div className="mt-1 text-gray-300">Qty {quote?.input?.qty} → <b>${Number(quote?.totals?.batch_total ?? 0).toFixed(2)}</b></div>
            <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3">
              <div className="font-medium">Breakdown</div>
              <ul className="mt-2 space-y-1 text-gray-300">
                <li>Material: ${Number(quote?.breakdown?.material ?? 0).toFixed(2)}</li>
                <li>Print time: ${Number(quote?.breakdown?.print ?? 0).toFixed(2)} ({Number(quote?.derived?.print_time_hr ?? 0).toFixed(2)} hr)</li>
                <li>Support removal: ${Number(quote?.breakdown?.support ?? 0).toFixed(2)}</li>
                <li>Wash & Cure: ${Number(quote?.breakdown?.wash_cure ?? 0).toFixed(2)}</li>
                <li>Finishing: ${Number(quote?.breakdown?.finishing ?? 0).toFixed(2)}</li>
                <li>Inspection: ${Number(quote?.breakdown?.inspection ?? 0).toFixed(2)}</li>
                <li>Overhead: ${Number(quote?.breakdown?.overhead ?? 0).toFixed(2)}</li>
                <li>Margin: ${Number(quote?.breakdown?.margin ?? 0).toFixed(2)}</li>
              </ul>
            </div>
            <div className="mt-4 text-xs text-gray-400">Lead time: {leadObj.days} day(s). Prices include lead-time multiplier.</div>
            <div className="mt-4 flex flex-col gap-2">
              <button className="rounded-xl bg-emerald-500 px-4 py-2 font-medium text-gray-950 hover:bg-emerald-400 disabled:opacity-50">Checkout (mock)</button>
              <button className="rounded-xl border border-white/10 px-4 py-2 font-medium hover:bg-white/10">Save RFQ (email)</button>
            </div>
          </div>
        ) : (
          <p className="mt-3 text-sm text-gray-400">Get a price to see breakdown and actions.</p>
        )}
      </div>
    </div>
  )
}

function Metric({ label, value }) {
  return (
    <div>
      <div className="text-gray-400">{label}</div>
      <div className="mt-1 rounded-md bg-white/5 px-3 py-2">{value}</div>
    </div>
  )
}

function Select({ label, value, onChange, options }) {
  return (
    <label className="block text-sm">
      <div className="text-gray-300">{label}</div>
      <select
        className="mt-1 w-full rounded-xl border border-gray-700 bg-gray-800 px-3 py-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
      </select>
    </label>
  )
}

function Number({ label, value, onChange, min=1 }) {
  return (
    <label className="block text-sm">
      <div className="text-gray-300">{label}</div>
      <input
        type="number"
        min={min}
        className="mt-1 w-full rounded-xl border border-gray-700 bg-gray-800 px-3 py-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  )
}
