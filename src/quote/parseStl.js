// src/quote/parseStl.js
// Tiny STL parser (ASCII + binary). Returns { volumeMm3, areaMm2, bbox:{min,max}, verticesCount, tris }
export async function parseStl(fileOrArrayBuffer) {
  const buf = fileOrArrayBuffer instanceof ArrayBuffer
    ? fileOrArrayBuffer
    : await fileOrArrayBuffer.arrayBuffer();

  // Detect ASCII vs binary
  const header = new TextDecoder().decode(buf.slice(0, 80));
  const isAsciiLikely = header.trim().startsWith("solid") && !header.toLowerCase().includes("binary");

  return isAsciiLikely ? parseAscii(new TextDecoder().decode(buf)) : parseBinary(buf);
}

function parseBinary(buf) {
  const dv = new DataView(buf);
  const triCount = dv.getUint32(80, true);
  let offset = 84;
  let min = [ Infinity,  Infinity,  Infinity];
  let max = [-Infinity, -Infinity, -Infinity];
  let volume = 0;
  let area = 0;

  for (let i = 0; i < triCount; i++) {
    // skip normal (3 floats)
    offset += 12;
    const v0 = [dv.getFloat32(offset+0, true), dv.getFloat32(offset+4, true), dv.getFloat32(offset+8, true)];
    const v1 = [dv.getFloat32(offset+12, true), dv.getFloat32(offset+16, true), dv.getFloat32(offset+20, true)];
    const v2 = [dv.getFloat32(offset+24, true), dv.getFloat32(offset+28, true), dv.getFloat32(offset+32, true)];
    offset += 36;
    offset += 2; // attribute

    updateBounds(min, max, v0); updateBounds(min, max, v1); updateBounds(min, max, v2);
    area += triArea(v0, v1, v2);
    volume += signedTetraVolume(v0, v1, v2);
  }
  return finalize(min, max, volume, area, triCount);
}

function parseAscii(text) {
  const vtx = [];
  const re = /vertex\s+([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)\s+([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)\s+([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)/g;
  let m;
  while ((m = re.exec(text)) !== null) vtx.push([+m[1], +m[2], +m[3]]);
  // Triangles are sequential groups of 3
  let min = [ Infinity,  Infinity,  Infinity];
  let max = [-Infinity, -Infinity, -Infinity];
  let volume = 0;
  let area = 0;
  for (let i = 0; i < vtx.length; i += 3) {
    const v0 = vtx[i], v1 = vtx[i+1], v2 = vtx[i+2];
    if (!v2) break;
    updateBounds(min, max, v0); updateBounds(min, max, v1); updateBounds(min, max, v2);
    area += triArea(v0, v1, v2);
    volume += signedTetraVolume(v0, v1, v2);
  }
  return finalize(min, max, volume, area, Math.floor(vtx.length / 3));
}

function updateBounds(min, max, v) {
  if (v[0] < min[0]) min[0] = v[0]; if (v[0] > max[0]) max[0] = v[0];
  if (v[1] < min[1]) min[1] = v[1]; if (v[1] > max[1]) max[1] = v[1];
  if (v[2] < min[2]) min[2] = v[2]; if (v[2] > max[2]) max[2] = v[2];
}
function triArea(a, b, c) {
  const ab = [b[0]-a[0], b[1]-a[1], b[2]-a[2]];
  const ac = [c[0]-a[0], c[1]-a[1], c[2]-a[2]];
  const cross = [
    ab[1]*ac[2] - ab[2]*ac[1],
    ab[2]*ac[0] - ab[0]*ac[2],
    ab[0]*ac[1] - ab[1]*ac[0]
  ];
  const mag = Math.hypot(cross[0], cross[1], cross[2]);
  return 0.5 * mag;
}
function signedTetraVolume(a, b, c) {
  // V = dot(a, cross(b, c)) / 6
  const cross = [
    b[1]*c[2] - b[2]*c[1],
    b[2]*c[0] - b[0]*c[2],
    b[0]*c[1] - b[1]*c[0]
  ];
  return (a[0]*cross[0] + a[1]*cross[1] + a[2]*cross[2]) / 6;
}
function finalize(min, max, signedVolume, area, Triangles) {
  const volumeMm3 = Math.abs(signedVolume); // assumes mm units in STL
  const areaMm2 = area;
  return {
    volumeMm3,
    areaMm2,
    bbox: { min, max, size: [max[0]-min[0], max[1]-min[1], max[2]-min[2]] },
    verticesCount: Triangles * 3,
    triangles: Triangles
  };
}
