// src/components/QuoteWidget.jsx
import React, { useState } from "react";
import parseStl from "../quote/parseStl";
import pricePart, { formatUSD } from "../quote/pricing";
import { MATERIALS } from "../quote/config";
import ErrorBoundary from "./ErrorBoundary";

export default function QuoteWidget(){
  const [fileName, setFileName] = useState("");
  const [units, setUnits] = useState("mm");        // "mm" | "in"
  const [materialKey, setMaterialKey] = useState(Object.keys(MATERIALS)[0]);
  const [metrics, setMetrics] = useState(null);    // { volumeMm3, areaMm2, bbox:[x,y,z], triangles }
  const [price, setPrice] = useState(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const SHOW_BREAKDOWN = false;
  
  
  async function onFile(e){
    const f = e.target.files?.[0];
    if (!f) return;
    setErr(""); setPrice(null); setMetrics(null); setFileName(f.name); setBusy(true);
    try {
      let parsed = await parseStl(f); // mm-based by default
      // If user declares the STL units were inches, scale to mm for pricing
      if (units === "in"){
        const s = 25.4;
        parsed = {
          ...parsed,
          volumeMm3: parsed.volumeMm3 * s * s * s,
          bbox: parsed.bbox.map(v => v * s),
        };
      }
      if (!Number.isFinite(parsed.volumeMm3) || parsed.volumeMm3 <= 0){
        throw new Error("Parsed STL, but computed volume is invalid. Check that the mesh is watertight.");
      }
      setMetrics(parsed);
    } catch (e){
      console.error(e);
      setErr(String(e?.message || e));
    } finally {
      setBusy(false);
    }
  }

  function onQuote(){
    try{
      if (!metrics) throw new Error("Upload an STL first.");
      const res = pricePart({
        volumeMm3: metrics.volumeMm3,
        bbox: metrics.bbox,
        materialKey,
      });
      setPrice(res);
    } catch (e){
      console.error(e);
      setErr(String(e?.message || e));
    }
  }

  function resetAll(){
    setFileName(""); setMetrics(null); setPrice(null); setErr("");
    const input = document.getElementById("stl-input");
    if (input) input.value = "";
  }

  const bboxLabel = metrics ? metrics.bbox.map(v => (units === "mm" ? v.toFixed(2) + " mm" : (v/25.4).toFixed(3) + " in")).join(" × ") : "-";
  const volCm3 = metrics ? (metrics.volumeMm3 / 1000).toFixed(2) : "-";

  return (
    <ErrorBoundary>
      <div className="mx-auto max-w-3xl rounded-2xl border p-6 shadow-sm">
        <h2 className="text-2xl font-semibold">Instant Quote</h2>
        <p className="mt-1 text-sm text-gray-600">
          Upload an STL (ASCII or binary), choose a material, and get an instant estimate.
        </p>

        {/* Controls */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium">Units</label>
            <div className="mt-1 inline-flex rounded-full border">
              <button
                type="button"
                onClick={() => setUnits("mm")}
                className={`px-4 py-1 text-sm rounded-full ${units==="mm" ? "bg-black text-white" : "bg-white"}`}
              >
                mm
              </button>
              <button
                type="button"
                onClick={() => setUnits("in")}
                className={`px-4 py-1 text-sm rounded-full ${units==="in" ? "bg-black text-white" : "bg-white"}`}
              >
                inches
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Material</label>
            <select
              value={materialKey}
              onChange={(e)=>setMaterialKey(e.target.value)}
              className="mt-1 w-full rounded-lg border px-3 py-2"
            >
              {Object.entries(MATERIALS).map(([key, m]) => (
                <option key={key} value={key}>{m.label}</option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium">STL file</label>
            <input
              id="stl-input"
              type="file"
              accept=".stl"
              onChange={onFile}
              className="mt-1 w-full cursor-pointer rounded-lg border px-3 py-2 file:mr-3 file:rounded-md file:border-0 file:bg-black file:px-4 file:py-2 file:text-white hover:file:bg-[color:var(--brand-red,#E3362C)]"
            />
            {fileName && <p className="mt-1 text-xs text-gray-500">Selected: {fileName}</p>}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            disabled={!metrics || busy}
            onClick={onQuote}
            className={`btn btn-primary ${!metrics ? "opacity-50" : ""} rounded-full border px-5 py-2 text-sm`}
          >
            {busy ? "Analyzing…" : "Get price"}
          </button>
          <button
            type="button"
            onClick={resetAll}
            className="rounded-full border px-5 py-2 text-sm hover:border-[color:var(--brand-red,#E3362C)] hover:text-[color:var(--brand-red,#E3362C)]"
          >
            Reset
          </button>
        </div>

        {/* Errors */}
        {err && (
          <div className="mt-4 rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
            {err}
          </div>
        )}

        {/* Parsed metrics */}
        {metrics && (
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <Metric label="Bounding box" value={bboxLabel} />
            <Metric label="Volume" value={`${volCm3} cm³`} />
            <Metric label="Triangles" value={`${metrics.triangles}`} />
          </div>
        )}

      {/* Price */}
{price && (
  <div className="mt-8 rounded-xl border p-4">
    <h3 className="text-lg font-semibold">Estimate</h3>
    <p className="mt-1 text-sm text-gray-600">
      Material: <span className="font-medium">{price.material.label}</span>
    </p>

    <div className="mt-4 grid gap-3 sm:grid-cols-2">
      <BreakdownRow label="Resin usage">
        {price.resinCm3.toFixed(1)} cm³
      </BreakdownRow>
      <BreakdownRow label="Build time">
        {price.timeHours.toFixed(2)} h
      </BreakdownRow>
      <BreakdownRow label="Max height">
        {units === "mm"
          ? `${price.heightMm.toFixed(2)} mm`
          : `${(price.heightMm / 25.4).toFixed(2)} in`}
      </BreakdownRow>
    </div>

    <hr className="my-2" />

    <div className="flex items-center justify-between">
      <div className="text-base font-semibold">Total</div>
      <div className="text-xl font-bold">{formatUSD(price.total)}</div>
    </div>

    <p className="mt-2 text-xs text-gray-500">
      Instant estimate. Final price may change after DFM review, orientation, and supports.
    </p>
  </div>
)}

      </div>
    </ErrorBoundary>
  );
}

function Metric({ label, value }){
  return (
    <div className="rounded-lg border p-3 text-sm">
      <div className="text-gray-500">{label}</div>
      <div className="mt-1 font-medium">{value}</div>
    </div>
  );
}
function BreakdownRow({ label, children }){
  return (
    <div className="flex items-center justify-between text-sm">
      <div className="text-gray-600">{label}</div>
      <div className="font-medium">{children}</div>
    </div>
  );
}
