// src/components/QuoteWidget.jsx
import React, { useState } from "react";
import { parseSTL } from "../quote/parseStl";
import { MATERIALS } from "../quote/materialsData";
import { quotePrice } from "../quote/pricing";
import { QUOTE_DEFAULTS } from "../quote/config";

const fmtMoney = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: QUOTE_DEFAULTS?.currency || "USD",
  maximumFractionDigits: 2,
});

export default function QuoteWidget() {
  // UI state
  const [units, setUnits] = useState("mm"); // "mm" | "in"
  const [materialId, setMaterialId] = useState(MATERIALS[0]?.id || "");
  const [fileName, setFileName] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  // Parsed model metrics + computed price
  const [metrics, setMetrics] = useState(null); // { volumeMm3, areaMm2, bbox:[x,y,z] }
  const [price, setPrice] = useState(null);     // result from quotePrice(...)

  const material = MATERIALS.find((m) => m.id === materialId);

  // --- helpers ---------------------------------------------------------------

  const unitsLabel = (valMm) =>
    units === "mm" ? `${valMm.toFixed(1)} mm` : `${(valMm / 25.4).toFixed(3)} in`;

  const toCm3 = (mm3) => mm3 / 1000.0; // 1 cm³ = 1000 mm³
  const toInchesIfNeeded = (bbox) =>
    units === "mm" ? bbox : bbox.map((v) => v * 25.4);

  // --- file handling ---------------------------------------------------------

  async function handleFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;

    setErr("");
    setBusy(true);
    setPrice(null);
    setMetrics(null);
    setFileName(f.name);

    try {
      // Parse STL in browser (returns mm-based metrics)
      const parsed = await parseSTL(f); // { volumeMm3, areaMm2, bbox:[x,y,z] }
      // If user chose "inches", convert the *interpreted* model dims from in→mm
      // (i.e., treat 1 model unit as inches and convert to mm for pricing).
      let volumeMm3 = parsed.volumeMm3;
      let bboxMm = parsed.bbox;

      if (units === "in") {
        const s = 25.4; // in → mm
        volumeMm3 = volumeMm3 * s * s * s;
        bboxMm = parsed.bbox.map((v) => v * s);
      }

      setMetrics({ volumeMm3, areaMm2: parsed.areaMm2, bbox: bboxMm });
    } catch (e) {
      console.error(e);
      setErr(
        "Sorry—couldn't read that STL. Please re-export and try again (binary STL preferred)."
      );
    } finally {
      setBusy(false);
    }
  }

  async function handleQuote() {
    if (!metrics || !materialId) return;
    setBusy(true);
    setErr("");
    setPrice(null);

    try {
      const res = quotePrice({
        volumeMm3: metrics.volumeMm3,
        bbox: metrics.bbox,
        materialId,
      });
      setPrice(res);
    } catch (e) {
      console.error(e);
      setErr("Pricing failed. Please try another file or material.");
    } finally {
      setBusy(false);
    }
  }

  function handleReset() {
    setFileName("");
    setMetrics(null);
    setPrice(null);
    setErr("");
    // also reset file input
    const input = document.getElementById("stl-input");
    if (input) input.value = "";
  }

  // --- UI --------------------------------------------------------------------

  return (
    <div className="mx-auto max-w-3xl rounded-2xl border p-6 shadow-sm">
      <h2 className="text-2xl font-semibold">Instant Quote</h2>
      <p className="mt-1 text-sm text-gray-600">
        Upload an STL (ASCII or binary), choose a material, and get pricing. STL
        units are assumed to be in{" "}
        <span className="font-medium">{units.toUpperCase()}</span>.
      </p>

      {/* Controls */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium">Units</label>
          <div className="mt-1 inline-flex rounded-full border">
            <button
              type="button"
              onClick={() => setUnits("mm")}
              className={`px-4 py-1 text-sm rounded-full ${
                units === "mm" ? "bg-black text-white" : "bg-white"
              }`}
            >
              mm
            </button>
            <button
              type="button"
              onClick={() => setUnits("in")}
              className={`px-4 py-1 text-sm rounded-full ${
                units === "in" ? "bg-black text-white" : "bg-white"
              }`}
            >
              inches
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Material</label>
          <select
            value={materialId}
            onChange={(e) => setMaterialId(e.target.value)}
            className="mt-1 w-full rounded-lg border px-3 py-2"
          >
            {MATERIALS.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
          {material?.notes ? (
            <p className="mt-1 text-xs text-gray-500">{material.notes}</p>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium">STL file</label>
          <input
            id="stl-input"
            type="file"
            accept=".stl"
            onChange={handleFile}
            className="mt-1 w-full cursor-pointer rounded-lg border px-3 py-2 file:mr-3 file:rounded-md file:border-0 file:bg-black file:px-4 file:py-2 file:text-white hover:file:bg-[color:var(--brand-red,#E3362C)]"
          />
          {fileName && (
            <p className="mt-1 text-xs text-gray-500">Selected: {fileName}</p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex gap-3">
        <button
          type="button"
          disabled={!metrics || busy}
          onClick={handleQuote}
          className={`btn btn-primary ${
            !metrics ? "opacity-50" : ""
          } rounded-full border px-5 py-2 text-sm`}
        >
          {busy ? "Calculating…" : "Get price"}
        </button>
        <button
          type="button"
          disabled={busy && !metrics}
          onClick={handleReset}
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

      {/* Parsed metrics preview */}
      {metrics && (
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Metric
            label="Bounding box"
            value={`${unitsLabel(metrics.bbox[0])} × ${unitsLabel(
              metrics.bbox[1]
            )} × ${unitsLabel(metrics.bbox[2])}`}
          />
          <Metric
            label="Volume"
            value={`${toCm3(metrics.volumeMm3).toFixed(2)} cm³`}
          />
          <Metric
            label="Max height"
            value={unitsLabel(metrics.bbox[2])}
          />
        </div>
      )}

      {/* Price breakdown */}
      {price && (
        <div className="mt-8 rounded-xl border p-4">
          <h3 className="text-lg font-semibold">Estimate</h3>
          <p className="mt-1 text-sm text-gray-600">
            Material: <span className="font-medium">{price.material.name}</span>
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <BreakdownRow label="Resin usage">
              {price.resinCm3.toFixed(1)} cm³
            </BreakdownRow>
            <BreakdownRow label="Build time">{price.timeHours.toFixed(2)} h</BreakdownRow>
            <BreakdownRow label="Height">{unitsLabel(price.heightMm)}</BreakdownRow>
          </div>

          <div className="mt-4 grid gap-2">
            <BreakdownRow label="Resin cost">
              {fmtMoney.format(price.cost.resin)}
            </BreakdownRow>
            <BreakdownRow label="Machine cost">
              {fmtMoney.format(price.cost.machine)}
            </BreakdownRow>
            <BreakdownRow label="Labor">
              {fmtMoney.format(price.cost.labor)}
            </BreakdownRow>
            <hr className="my-2" />
            <div className="flex items-center justify-between">
              <div className="text-base font-semibold">Total</div>
              <div className="text-xl font-bold">
                {fmtMoney.format(price.total)}
              </div>
            </div>
          </div>

          <p className="mt-3 text-xs text-gray-500">
            This is an instant estimate. Final pricing may vary based on
            inspection, orientation, supports, and finishing requests.
          </p>
        </div>
      )}
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-lg border p-3 text-sm">
      <div className="text-gray-500">{label}</div>
      <div className="mt-1 font-medium">{value}</div>
    </div>
  );
}

function BreakdownRow({ label, children }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <div className="text-gray-600">{label}</div>
      <div className="font-medium">{children}</div>
    </div>
  );
}
