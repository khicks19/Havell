// Minimal STL parser: handles binary (common) and basic ASCII STL.
// Returns { vertices: Float32Array, triangles: number, bbox, area_cm2, volume_cc, z_mm }
export async function parseSTL(file, units='mm') {
  const arrayBuffer = await file.arrayBuffer();
  const dataView = new DataView(arrayBuffer);

  // Heuristic: ASCII STL starts with 'solid', but binary can too. Check length consistency too.
  const isAscii = checkAscii(arrayBuffer);

  let vertices = [];
  let triangles = 0;

  if (!isAscii) {
    // Binary STL
    if (dataView.byteLength < 84) {
      throw new Error('Invalid STL: too small');
    }
    const triCount = dataView.getUint32(80, true);
    const expectedLen = 84 + triCount * 50;
    if (expectedLen !== dataView.byteLength) {
      // Length mismatch is common; still attempt to parse up to min length
    }
    let offset = 84;
    triangles = triCount;
    for (let i = 0; i < triCount; i++) {
      // skip normal (3 floats)
      offset += 12;
      // read v1, v2, v3
      for (let v = 0; v < 9; v++) {
        vertices.push(dataView.getFloat32(offset, true));
        offset += 4;
      }
      // skip attribute byte count
      offset += 2;
    }
  } else {
    // ASCII STL (very naive parsing)
    const text = new TextDecoder().decode(arrayBuffer);
    const lines = text.split(/[\r\n]+/);
    let current = [];
    for (const line of lines) {
      const m = line.trim().match(/^vertex\s+([\-0-9.eE]+)\s+([\-0-9.eE]+)\s+([\-0-9.eE]+)/);
      if (m) {
        current.push(parseFloat(m[1]), parseFloat(m[2]), parseFloat(m[3]));
        if (current.length === 9) {
          vertices.push(...current);
          current = [];
          triangles++;
        }
      }
    }
    if (triangles === 0) {
      throw new Error('Could not parse ASCII STL vertices');
    }
  }

  // Unit conversion
  let scale = 1.0;
  if (units === 'in') scale = 25.4; // inches -> mm

  for (let i = 0; i < vertices.length; i++) vertices[i] *= scale;

  // Compute bbox, area, volume
  let min = [Infinity, Infinity, Infinity];
  let max = [-Infinity, -Infinity, -Infinity];
  let area = 0.0;
  let volume6 = 0.0; // 6 * volume (signed)

  for (let i = 0; i < vertices.length; i += 9) {
    const v1 = [vertices[i], vertices[i+1], vertices[i+2]];
    const v2 = [vertices[i+3], vertices[i+4], vertices[i+5]];
    const v3 = [vertices[i+6], vertices[i+7], vertices[i+8]];

    // bbox
    for (const v of [v1, v2, v3]) {
      min[0] = Math.min(min[0], v[0]); min[1] = Math.min(min[1], v[1]); min[2] = Math.min(min[2], v[2]);
      max[0] = Math.max(max[0], v[0]); max[1] = Math.max(max[1], v[1]); max[2] = Math.max(max[2], v[2]);
    }

    // area
    const a = sub(v2, v1);
    const b = sub(v3, v1);
    const crossProd = cross(a, b);
    const triArea = 0.5 * length(crossProd);
    area += triArea;

    // volume via signed tetrahedra to origin
    volume6 += dot(v1, cross(v2, v3));
  }

  const volume = Math.abs(volume6) / 6.0; // in mm^3
  const area_cm2 = area / 100.0; // mm^2 -> cm^2
  const volume_cc = volume / 1000.0; // mm^3 -> cm^3
  const z_mm = max[2] - min[2];

  return {
    vertices: new Float32Array(vertices),
    triangles,
    bbox: { min, max, size_mm: [max[0]-min[0], max[1]-min[1], z_mm] },
    area_cm2,
    volume_cc,
    z_mm,
  };
}

function checkAscii(buffer) {
  const txt = new TextDecoder().decode(buffer.slice(0, 512)).toLowerCase();
  if (txt.startsWith('solid')) {
    // If it contains 'facet' early on, likely ascii; still ambiguous but ok for MVP.
    const hasFacet = txt.includes('facet');
    // If the file is large and starts with 'solid' but has no 'facet', it's likely binary with solid in header
    return hasFacet;
  }
  return false;
}

function sub(a, b){ return [a[0]-b[0], a[1]-b[1], a[2]-b[2]]; }
function cross(a, b){ return [a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0]]; }
function dot(a, b){ return a[0]*b[0]+a[1]*b[1]+a[2]*b[2]; }
function length(a){ return Math.sqrt(a[0]*a[0]+a[1]*a[1]+a[2]*a[2]); }
