// src/quote/parseStl.js
// Minimal, Vite-friendly STL parser (ASCII or binary). Units: mm or inches.
export async function parseSTL(file, units = 'mm') {
  const buf = await file.arrayBuffer();
  const dv = new DataView(buf);

  // Heuristic: ASCII if header starts with "solid"
  const isAscii = (() => {
    const head = new Uint8Array(buf.slice(0, 80));
    let txt = '';
    for (let i = 0; i < head.length; i++) txt += String.fromCharCode(head[i]);
    return txt.trim().toLowerCase().startsWith('solid');
  })();

  let vertices = [];
  let triangles = 0;

  if (!isAscii) {
    // Binary STL
    if (dv.byteLength < 84) throw new Error('Invalid STL: too small');
    const triCount = dv.getUint32(80, true);
    let offset = 84;
    triangles = triCount;
    for (let i = 0; i < triCount; i++) {
      offset += 12; // skip normal
      for (let v = 0; v < 9; v++) {
        vertices.push(dv.getFloat32(offset, true));
        offset += 4;
      }
      offset += 2; // skip attribute
    }
  } else {
    // ASCII STL
    const text = new TextDecoder().decode(buf);
    const lines = text.split(/\r?\n/);
    const vertexRE = /^vertex\s+([-\d.eE]+)\s+([-\d.eE]+)\s+([-\d.eE]+)/;
    let tmp = [];
    for (let i = 0; i < lines.length; i++) {
      const m = vertexRE.exec(lines[i].trim());
      if (m) {
        tmp.push(parseFloat(m[1]), parseFloat(m[2]), parseFloat(m[3]));
        if (tmp.length === 9) { vertices.push(...tmp); tmp = []; triangles++; }
      }
    }
    if (triangles === 0) throw new Error('ASCII STL parse failed');
  }

  // Unit scale
  const scale = units === 'in' ? 25.4 : 1;
  for (let i = 0; i < vertices.length; i++) vertices[i] *= scale;

  // Metrics
  let minx=Infinity, miny=Infinity, minz=Infinity, maxx=-Infinity, maxy=-Infinity, maxz=-Infinity;
  let area = 0, volume6 = 0;

  function cross(ax, ay, az, bx, by, bz) { return [ay*bz - az*by, az*bx - ax*bz, ax*by - ay*bx]; }
  function dot(ax, ay, az, bx, by, bz) { return ax*bx + ay*by + az*bz; }

  for (let i = 0; i < vertices.length; i += 9) {
    const x1=vertices[i],   y1=vertices[i+1], z1=vertices[i+2];
    const x2=vertices[i+3], y2=vertices[i+4], z2=vertices[i+5];
    const x3=vertices[i+6], y3=vertices[i+7], z3=vertices[i+8];

    minx = Math.min(minx, x1, x2, x3);
    miny = Math.min(miny, y1, y2, y3);
    minz = Math.min(minz, z1, z2, z3);
    maxx = Math.max(maxx, x1, x2, x3);
    maxy = Math.max(maxy, y1, y2, y3);
    maxz = Math.max(maxz, z1, z2, z3);

    const ax = x2 - x1, ay = y2 - y1, az = z2 - z1;
    const bx = x3 - x1, by = y3 - y1, bz = z3 - z1;
    const c = cross(ax, ay, az, bx, by, bz);
    const triArea = 0.5 * Math.sqrt(c[0]*c[0] + c[1]*c[1] + c[2]*c[2]);
    area += triArea;
    volume6 += dot(x1, y1, z1, c[0], c[1], c[2]);
  }

  const volume = Math.abs(volume6) / 6;

  return {
    triangles,
    bbox: { min: [minx, miny, minz], max: [maxx, maxy, maxz], size_mm: [maxx-minx, maxy-miny, maxz-minz] },
    area_cm2: area / 100,
    volume_cc: volume / 1000,
    z_mm: maxz - minz
  };
}
