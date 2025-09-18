// src/quote/parseStl.js
// Robust STL parser (ASCII + Binary). Returns { volumeMm3, areaMm2, bbox:[x,y,z], triangles }

function vSub(a,b){ return [a[0]-b[0], a[1]-b[1], a[2]-b[2]]; }
function vCross(a,b){ return [a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0]]; }
function vDot(a,b){ return a[0]*b[0]+a[1]*b[1]+a[2]*b[2]; }
function triArea(a,b,c){ const ab=vSub(b,a), ac=vSub(c,a); const cr=vCross(ab,ac); return 0.5*Math.sqrt(vDot(cr,cr)); }
function triSignedVol(a,b,c){ return vDot(a, vCross(b,c)) / 6.0; }

function compute(tris){
  if (!tris.length) throw new Error("No triangles found.");
  let min=[Infinity,Infinity,Infinity], max=[-Infinity,-Infinity,-Infinity];
  let area=0, vol=0;
  for (const [a,b,c] of tris){
    for (const p of [a,b,c]){
      if (p[0]<min[0]) min[0]=p[0]; if (p[1]<min[1]) min[1]=p[1]; if (p[2]<min[2]) min[2]=p[2];
      if (p[0]>max[0]) max[0]=p[0]; if (p[1]>max[1]) max[1]=p[1]; if (p[2]>max[2]) max[2]=p[2];
    }
    area += triArea(a,b,c);
    vol  += triSignedVol(a,b,c);
  }
  return {
    volumeMm3: Math.abs(vol),
    areaMm2: area,
    bbox: [max[0]-min[0], max[1]-min[1], max[2]-min[2]],
    triangles: tris.length,
  };
}

function parseAscii(text){
  const tris=[]; let verts=[];
  const lines = text.split(/\r?\n/);
  for (let line of lines){
    line=line.trim();
    if (line.toLowerCase().startsWith("vertex")){
      const parts=line.split(/\s+/).slice(-3).map(Number);
      if (parts.length===3 && parts.every(n=>Number.isFinite(n))){
        verts.push(parts);
        if (verts.length===3){ tris.push([verts[0],verts[1],verts[2]]); verts=[]; }
      }
    }
  }
  return compute(tris);
}

function parseBinary(buf){
  const dv = new DataView(buf);
  if (dv.byteLength<84) throw new Error("Binary STL too small.");
  const triCount = dv.getUint32(80,true);
  const expected = 84 + triCount*50;
  if (expected > dv.byteLength) throw new Error("Corrupt binary STL.");
  const tris=[]; let off=84;
  for (let i=0;i<triCount;i++){
    off += 12; // normal
    const a=[dv.getFloat32(off+0,true), dv.getFloat32(off+4,true), dv.getFloat32(off+8,true)];
    const b=[dv.getFloat32(off+12,true),dv.getFloat32(off+16,true),dv.getFloat32(off+20,true)];
    const c=[dv.getFloat32(off+24,true),dv.getFloat32(off+28,true),dv.getFloat32(off+32,true)];
    tris.push([a,b,c]);
    off += 36 + 2;
  }
  return compute(tris);
}

export default async function parseStl(file){
  if (!file) throw new Error("No file provided.");
  const head = await file.slice(0, Math.min(2048, file.size)).text();
  const looksAscii = head.toLowerCase().includes("facet normal") && head.toLowerCase().includes("vertex");

  if (looksAscii){
    const text = await file.text();
    return parseAscii(text);
  } else {
    const buf = await file.arrayBuffer();
    // Binary STL might still begin with 'solid' — size check wins
    try { return parseBinary(buf); }
    catch { const text = new TextDecoder().decode(buf); return parseAscii(text); }
  }
}
