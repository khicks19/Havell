// src/quote/parseStl.js
// Robust STL parser for ASCII + Binary. Returns { volumeMm3, areaMm2, bbox: [x,y,z], triangles }

// Small vector helpers
function vSub(a,b){ return [a[0]-b[0], a[1]-b[1], a[2]-b[2]]; }
function vCross(a,b){ return [
  a[1]*b[2]-a[2]*b[1],
  a[2]*b[0]-a[0]*b[2],
  a[0]*b[1]-a[1]*b[0],
]; }
function vDot(a,b){ return a[0]*b[0]+a[1]*b[1]+a[2]*b[2]; }
function triArea(a,b,c){
  const ab = vSub(b,a), ac = vSub(c,a);
  const cr = vCross(ab,ac);
  return 0.5 * Math.sqrt(vDot(cr,cr));
}
function triSignedVolume(a,b,c){
  // Volume of tetrahedron (0,a,b,c)
  return vDot(a, vCross(b,c)) / 6.0;
}

function computeMetrics(tris){
  if (!tris.length) throw new Error("No triangles found in STL.");
  let min=[Infinity,Infinity,Infinity], max=[-Infinity,-Infinity,-Infinity];
  let area = 0, vol = 0;

  for (const [a,b,c] of tris){
    // bbox
    for (const p of [a,b,c]){
      if (p[0] < min[0]) min[0]=p[0];
      if (p[1] < min[1]) min[1]=p[1];
      if (p[2] < min[2]) min[2]=p[2];
      if (p[0] > max[0]) max[0]=p[0];
      if (p[1] > max[1]) max[1]=p[1];
      if (p[2] > max[2]) max[2]=p[2];
    }
    area += triArea(a,b,c);
    vol  += triSignedVolume(a,b,c);
  }
  const bbox = [max[0]-min[0], max[1]-min[1], max[2]-min[2]];
  const volumeMm3 = Math.abs(vol);       // already in mm³ if input is mm
  const areaMm2 = area;

  return { volumeMm3, areaMm2, bbox, triangles: tris.length };
}

function looksAscii(text){
  // Heuristic: ASCII usually contains "facet normal" and "vertex" words.
  // But binary can start with "solid" too, so we don't rely only on that.
  const t = text.slice(0, 2000).toLowerCase();
  return t.includes("facet normal") && t.includes("vertex");
}

function parseAscii(text){
  const tris = [];
  const lines = text.split(/\r?\n/);
  let verts = [];
  for (let line of lines){
    line = line.trim().toLowerCase();
    if (line.startsWith("vertex")){
      const parts = line.split(/\s+/).map(Number).filter(n=>!Number.isNaN(n));
      // after "vertex" we expect 3 numbers
      if (parts.length >= 3){
        const xyz = parts.slice(-3);
        verts.push(xyz);
        if (verts.length === 3){
          tris.push([verts[0], verts[1], verts[2]]);
          verts = [];
        }
      }
    }
  }
  return computeMetrics(tris);
}

function parseBinary(buf){
  const dv = new DataView(buf);
  // 80-byte header + 4-byte face count
  if (dv.byteLength < 84) throw new Error("Binary STL too small.");
  const triCount = dv.getUint32(80, true);
  const expected = 84 + triCount * 50;
  if (expected !== dv.byteLength){
    // Some exporters pad files; we still try but warn
    // (We won't throw here unless it's obviously impossible)
    if (expected > dv.byteLength) throw new Error("Corrupt binary STL (size shorter than expected).");
  }
  const tris = [];
  let offset = 84;
  for (let i=0;i<triCount;i++){
    offset += 12; // skip normal (3 floats)
    const ax = dv.getFloat32(offset+0,  true);
    const ay = dv.getFloat32(offset+4,  true);
    const az = dv.getFloat32(offset+8,  true);
    const bx = dv.getFloat32(offset+12, true);
    const by = dv.getFloat32(offset+16, true);
    const bz = dv.getFloat32(offset+20, true);
    const cx = dv.getFloat32(offset+24, true);
    const cy = dv.getFloat32(offset+28, true);
    const cz = dv.getFloat32(offset+32, true);
    tris.push([[ax,ay,az],[bx,by,bz],[cx,cy,cz]]);
    offset += 36;
    offset += 2; // attr byte count
  }
  return computeMetrics(tris);
}

export default async function parseStl(file){
  if (!file) throw new Error("No file provided.");
  if (file.size > 50 * 1024 * 1024) {
    throw new Error("File is larger than 50 MB. Please upload a smaller STL.");
  }

  // Read first chunk to decide ASCII vs binary.
  const head = await file.slice(0, Math.min(2048, file.size)).text();
  const isAscii = looksAscii(head);

  if (isAscii){
    const text = await file.text();
    return parseAscii(text);
  } else {
    const buf = await file.arrayBuffer();
    // Binary STL can still begin with 'solid'; double-check with size logic.
    const dv = new DataView(buf);
    const startsSolid =
      head.trimStart().toLowerCase().startsWith("solid") &&
      !head.toLowerCase().includes("facet normal");
    const asBinary = (!startsSolid) || dv.byteLength >= 84;
    if (!asBinary){
      // fallback: treat as ASCII
      const text = new TextDecoder().decode(buf);
      return parseAscii(text);
    }
    return parseBinary(buf);
  }
}
