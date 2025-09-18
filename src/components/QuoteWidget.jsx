// src/components/QuoteWidget.jsx
import React, { useMemo, useState } from "react";
import { parseStl } from "../quote/parseStl";
import { MATERIALS } from "../quote/config";
import { pricePart, formatUSD } from "../quote/pricing";

export default function QuoteWidget() {
  const [units, setUnits] = useState("mm");  // "mm" | "in"
  const [material, setMaterial] = useState("Grey V5");
  const [qty, setQty] = useState(1);
  const [rush, setRush] = useState(false);
  const [metrics, setMetrics] = useState(null);
  const [price, setPrice] = useState(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const materialKeys = Object.keys(MATERIALS);

  async function onFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    setErr(""); setBusy(true); setPrice(null);
    try {
      const { volumeMm3, areaMm2, bbox } = await parseStl(f);
      setMetrics({ volumeMm3, areaMm2, bbox });
    } catch (e) {
      console.error(e);
      setErr("Sorry—couldn't read that STL. Try re-exporting (binary STL preferred).");
    } finally {
      setBusy(false);
    }
  }

  function toDisplay(valMm) {
    return units === "mm" ? valMm : valMm / 25.4;
  }

  function compute() {
    if (!metrics) return;
    const maxZ = metrics.bbox.size[2]; // mm
    const res = pricePart({
      volumeMm3: metrics.volumeMm3,
      maxZmm: maxZ,
      materialKey: material,
      qty: Number(qty) || 1,
      rush
    });
    setPrice(res);
  }

  const bbox = metrics?.bbox?.size || [0,0,0];
  const volDisp = units === "mm" ? (metrics?.volumeMm3 || 0) : (metrics?.volumeMm3 || 0) / 16387.064; // mm³ to in³

  return (
    <div className="rounded-xl border p-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium">Upload STL</label>
          <input type="file" accept=".stl" onChange={onFile}
                 className="mt-2 block w-full rounded-lg border p-2" />
          <div className="mt-4 flex gap-3">
            <label className="flex items-center gap-2">
              <input type="radio" name="units" value="mm" checked={units === "mm"} onChange={() => setUnits("mm")} />
              <span>mm</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="units" value="in" checked={units === "in"} onChange={() => setUnits("in")} />
              <span>inches</span>
            </label>
          </div>

          {metrics && (
            <div className="mt-4 text-sm text-gray-700 space-y-1">
              <div><span className="font-medium">Volume:</span> {units === "mm" ? `${metrics.volumeMm3.toFixed(0)} mm³` : `${volDisp.toFixed(2)} in³`}</div>
              <div><span className="font-medium">Bounding box:</span> {toDisplay(bbox[0]).toFixed(2)} × {toDisplay(bbox[1]).toFixed(2)} × {toDisplay(bbox[2]).toFixed(2)} {units}</div>
            </div>
          )}
          {err && <p className="mt-3 text-sm text-red-600">{err}</p>}
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Material</label>
            <select className="mt-2 w-full rounded-lg border p-2"
                    value={material} onChange={e => setMaterial(e.target.value)}>
              {materialKeys.map(k => <option key={k} value={k}>{k}</option>)}
            </select>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium">Quantity</label>
              <input type="number" min={1} value={qty}
                     onChange={e => setQty(e.target.value)}
                     className="mt-2 w-full rounded-lg border p-2" />
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 mb-1">
                <input type="checkbox" checked={rush} onChange={e => setRush(e.target.checked)} />
                <span>Rush</span>
              </label>
            </div>
          </div>

          <button disabled={!metrics || busy}
                  onClick={compute}
                  className="btn btn-primary disabled:opacity-50">
            {busy ? "Analyzing…" : "Get Price"}
          </button>

          {price && (
            <div className="mt-4 rounded-lg border p-4 text-sm">
              <div className="text-lg font-semibold">Total: {formatUSD(price.total)}</div>
              <div className="mt-2 text-gray-600 space-y-1">
                <div>Per-part: {formatUSD(price.partPrice)} (qty {Number(qty)})</div>
                <div>Est. print time: {price.timeHours.toFixed(2)} hr</div>
                <div>Material vol: {price.volumeCm3.toFixed(2)} cm³</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
