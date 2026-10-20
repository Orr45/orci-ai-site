// The Roadster as revealed: a faceted wedge (Cybertruck-style flat planes), pearl-white body, the whole top in dark
// glass, a knife-edge nose with a full-width light bar, big dark 6-spoke wheels and the track wing.
// Low-poly loft: a hexagonal cross-section at stations along the car. 1 unit long, front towards -z.
export function makeRoadster(THREE, paintColor = 0xe9edf2) {
  const g = new THREE.Group();
  // station: z, y bottom, y shoulder, y top, half-width bottom, half-width shoulder, half-width top
  const ST = [
    [-0.5, 0.075, 0.112, 0.118, 0.17, 0.2, 0.15],    // knife-edge nose
    [-0.42, 0.058, 0.155, 0.162, 0.24, 0.25, 0.17],   // front fenders
    [-0.2, 0.055, 0.185, 0.205, 0.25, 0.255, 0.15],    // cowl: the glass starts here
    [0.0, 0.055, 0.2, 0.285, 0.25, 0.25, 0.105],    // roof peak
    [0.18, 0.058, 0.208, 0.278, 0.255, 0.258, 0.11],
    [0.42, 0.068, 0.212, 0.218, 0.25, 0.252, 0.16],  // glass ends on the rear deck
    [0.5, 0.08, 0.2, 0.205, 0.22, 0.23, 0.17],       // flat tail
  ];
  const ring = ([z, yb, ys, yt, wb, ws, wt]) => [[-wb, yb, z], [-ws, ys, z], [-wt, yt, z], [wt, yt, z], [ws, ys, z], [wb, yb, z]];
  const R = ST.map(ring);
  const body = [], glassF = [], dark = [];
  const quad = (arr, a, b, c, d) => arr.push(...a, ...b, ...c, ...a, ...c, ...d);
  for (let s = 0; s < R.length - 1; s++) {
    for (let e = 0; e < 6; e++) {
      const a = R[s][e], b = R[s][(e + 1) % 6], c = R[s + 1][(e + 1) % 6], d = R[s + 1][e];
      const isGlass = s >= 2 && s <= 4 && e >= 1 && e <= 3;          // the dark glasshouse above the shoulder line; white panels below
      quad(e === 5 ? dark : isGlass ? glassF : body, a, b, c, d);
    }
  }
  const cap = (arr, r) => { for (let i = 1; i < 5; i++) arr.push(...r[0], ...r[i], ...r[i + 1]); };
  cap(body, R[0]); cap(dark, R[R.length - 1]);
  const mesh = (pos, color) => {
    const geo = new THREE.BufferGeometry(); geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3)); geo.computeVertexNormals();
    const m = new THREE.Mesh(geo, new THREE.MeshLambertMaterial({ color, flatShading: true, side: THREE.DoubleSide })); m.castShadow = true; g.add(m); return m;
  };
  mesh(body, paintColor); mesh(glassF, 0x17191f); mesh(dark, 0x2a2d33);
  // track wing on two struts
  const white = new THREE.MeshLambertMaterial({ color: paintColor, flatShading: true });
  [-0.13, 0.13].forEach((x) => { const s = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.1, 0.04), new THREE.MeshLambertMaterial({ color: 0x2a2d33 })); s.position.set(x, 0.255, 0.44); g.add(s); });
  const wing = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.016, 0.12), white); wing.position.set(0, 0.31, 0.46); wing.rotation.x = -0.12; g.add(wing);
  [-1, 1].forEach((sx) => { const p = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.06, 0.13), white); p.position.set(sx * 0.26, 0.3, 0.46); g.add(p); });
  // big dark wheels, 6 spokes
  const tyre = new THREE.CylinderGeometry(0.115, 0.115, 0.075, 20); tyre.rotateZ(Math.PI / 2);
  const face = new THREE.CylinderGeometry(0.085, 0.085, 0.078, 16); face.rotateZ(Math.PI / 2);
  const tyreM = new THREE.MeshLambertMaterial({ color: 0x101114 }), faceM = new THREE.MeshLambertMaterial({ color: 0x9aa1ab }), spokeM = new THREE.MeshLambertMaterial({ color: 0x15171b });
  [[-0.31, 1], [-0.31, -1], [0.3, 1], [0.3, -1]].forEach(([z, sx]) => {
    const x = sx * 0.225;
    const t = new THREE.Mesh(tyre, tyreM); t.position.set(x, 0.115, z); g.add(t);
    const f = new THREE.Mesh(face, faceM); f.position.set(x + sx * 0.002, 0.115, z); g.add(f);
    for (let k = 0; k < 3; k++) { const sp = new THREE.Mesh(new THREE.BoxGeometry(0.082, 0.16, 0.018), spokeM); sp.position.set(x + sx * 0.003, 0.115, z); sp.rotation.x = (k * Math.PI) / 3; g.add(sp); }
  });
  // light bars: full-width front strip on the knife edge, red tail bar
  const lit = (c) => new THREE.MeshBasicMaterial({ color: c });
  const fl = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.012, 0.012), lit(0xffffff)); fl.position.set(0, 0.116, -0.503); g.add(fl);
  const tl = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.016, 0.012), lit(0xff2a2a)); tl.position.set(0, 0.19, 0.503); g.add(tl);
  return g;
}
