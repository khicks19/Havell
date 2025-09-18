// Lightweight STL parser (binary or ASCII) to get bbox & volume
// Returns { volumeMm3, areaMm2, bbox: {x,y,z}, triangles }

function triVolume(a,b,c) {
  // Signed volume of tetrahedron (0, a, b, c)
  return (
    (a[0]*(b[1]*c[2]-b[2]*c[1]) -
     a[1]*(b[0]*c[2]-b[2]*c[0]) +
     a[2]*(b[0]*c[1]-b[1]*c[0])) / 6
  );
}

function parseAscii(text) {
  const verts = [];
  const re = /vertex\s+([+-]?\d*\.?\d+(?:e[+-]?\d+)?)\s+([+-]?\d*\.?\d+(?:e[+-]?\d+)?)\s+([+-]?\d*\.?\d+(?:e[+-]?\d+)?)/ig;
  let m;
  while ((m = re.exec(text))) {
    verts.push([+m[1], +m[2], +m[3]]);
  }
  // group into triangles in order
  const tris = [];
  for (let i = 0; i + 2 < verts.length; i += 3) tris.push([verts[i], verts[i+1], verts[i+2]]);
  return tris;
}

function parseBinary(buf) {
  const dv = new DataView(buf);
  const triCount = dv.getUint32(80, true);
  const tris = [];
  let off = 84;
  for (let i = 0; i < triCount; i++) {
    off += 12; // skip normal
    const v = [];
    for (let k = 0; k < 3; k++) {
      const x = dv.getFloat32(off, true); off += 4;
      const y = dv.getFloat32(off, true); off += 4;
      const z = dv.getFloat32(off, true); off += 4;
      v.push([x,y,z]);
    }
    tris.push(v);
    off += 2; // attribute
  }
  return tris;
}

function isBinarySTL(buf) {
  if (buf.byteLength < 100) return false;
  const dv = new DataView(buf);
  const n = dv.getUint32(80, true);
  const expected = 84 + n * 50;
  // heuristic: size matches binary layout?
  return expected === buf.byteLength;
}

export async function parseSTL(fileOrArrayBuffer) {
  let arrayBuffer;
  if (fileOrArrayBuffer instanceof ArrayBuffer) {
    arrayBuffer = fileOrArrayBuffer;
  } else if (fileOrArrayBuffer && fileOrArrayBuffer.arrayBuffer) {
    arrayBuffer = await fileOrArrayBuffer.arrayBuffer();
  } else {
    throw new Error('parseSTL: expected File/Blob or ArrayBuffer');
  }

  let triangles;
  if (isBinarySTL(arrayBuffer)) {
    triangles = parseBinary(arrayBuffer);
  } else {
    // try ASCII
    const text = new TextDecoder().decode(arrayBuffer);
    triangles = parseAscii(text);
    if (!triangles.length) throw new Error('Invalid STL');
  }

  // bbox + volume
  let min = [ Infinity,  Infinity,  Infinity];
  let max = [-Infinity, -Infinity, -Infinity];
  let vol = 0;

  for (const [a,b,c] of triangles) {
    for (const p of [a,b,c]) {
      if (p[0] < min[0]) min[0] = p[0]; if (p[0] > max[0]) max[0] = p[0];
      if (p[1] < min[1]) min[1] = p[1]; if (p[1] > max[1]) max[1] = p[1];
      if (p[2] < min[2]) min[2] = p[2]; if (p[2] > max[2]) max[2] = p[2];
    }
    vol += triVolume(a,b,c);
  }

  // Convert units (assume STL in millimeters)
  const bbox = { x: max[0]-min[0], y: max[1]-min[1], z: max[2]-min[2] };
  const volumeMm3 = Math.abs(vol); // already in mm^3 if vertices are in mm

  return { volumeMm3, areaMm2: 0, bbox, triangles };
}
