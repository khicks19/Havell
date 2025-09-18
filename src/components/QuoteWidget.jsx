// src/components/QuoteWidget.jsx
import React, { useState } from "react";
import parseStl from "../quote/parseStl";
import { MATERIALS } from "../quote/config";     // your materials map
import pricePart, { formatUSD } from "../quote/pricing"; // your pricing fn
import ErrorBoundary from "./ErrorBoundary";

export default function QuoteWidget(){
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [metrics, setMetrics] = useState(null);
  const [material, setMaterial] = useState(Object.keys(MATERIALS)[0]);
  const [rush, setRush] = useState(false);
  const [price, setPrice] = useState(null);

  async function onFile(e){
    const f = e.target.files?.[0];
    setError(""); setMetrics(null); setPrice(null);
    if (!f) return;

    try {
      if (!/\.stl$/i.test(f.name)) throw new Error("Please upload a .stl file.");
      setBusy(true);
      const m = await parseStl(f);
      // sanity checks
      if (!Number.isFinite(m.volumeMm3) || m.volumeMm3 <= 0){
        throw new Error("Parsed STL, but volume looks invalid. Check that the model is watertight.");
      }
      setMetrics(m);
    } catch (err){
      console.error(err);
      setError(String(err?.message || err));
    } finally {
      setBusy(false);
    }
  }

  function onQuote(){
    try{
      setError("");
      if (!metrics) throw new Error("Upload a model first.");
      const cfg = MATERIALS[material];
      if (!cfg) throw new Error("Unknown material.");
      const res = pricePart({
        volumeMm3: metrics.volumeMm3,
        maxZmm: metrics.bbox[2],
        materialKey: material,
        qty: 1,
        rush
      });
      setPrice(res);
    } catch (err){
      console.error(err);
      setError(String(err?.message || err));
    }
  }

  return (
    <ErrorBoundary>
      <div className="rounded-xl border p-4 sm:p-6">
        <div className="flex items-center gap-3">
          <input
            type="file"
            accept=".stl"
            onChange={onFile}
            className="block"
          />
          <select
            className="border rounded px-2 py-1"
            value={material}
            onChange={e => setMaterial(e.target.value)}
          >
            {Object.keys(MATERIALS).map(k => (
              <option key={k} value={k}>{MATERIALS[k].label || k}</option>
            ))}
          </select>
          <label className="inline-flex items-center gap-2 text-sm">
            <input type="checkbox" checked={rush} onChange={e=>setRush(e.target.checked)} />
            Rush
          </label>
          <button
            className="btn btn-primary"
            onClick={onQuote}
            disabled={busy || !metrics}
            title={!metrics ? "Upload a model first" : "Calculate price"}
          >
            {busy ? "Parsing…" : "Get Price"}
          </button>
        </div>

        {error && (
          <div className="mt-4 rounded-lg border border-red-300 bg-red-50 p-3 text-red-700">
            {error}
          </div>
        )}

        {metrics && (
          <div className="mt-4 grid gap-2 text-sm">
            <div className="text-gray-600">Triangles: <span className="text-black">{metrics.triangles}</span></div>
            <div className="text-gray-600">Volume: <span className="text-black">{metrics.volumeMm3.toFixed(0)}</span> mm³</div>
            <div className="text-gray-600">Surface Area: <span className="text-black">{metrics.areaMm2.toFixed(0)}</span> mm²</div>
            <div className="text-gray-600">Bounding Box: <span className="text-black">{metrics.bbox.map(n=>n.toFixed(2)).join(" × ")}</span> mm</div>
          </div>
        )}

        {price && (
          <div className="mt-6 rounded-xl border p-4">
            <div className="text-lg font-semibold">Estimated price</div>
            <div className="mt-1 text-3xl">{formatUSD(price.total)}</div>
            <div className="mt-2 text-sm text-gray-600">
              Material: <b>{MATERIALS[material].label || material}</b> ·
              Print: {formatUSD(price.print)} ·
              Labor: {formatUSD(price.labor)} ·
              Overhead: {formatUSD(price.overhead)}
              {rush ? <> · Rush: {formatUSD(price.rushFee)}</> : null}
            </div>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
}
