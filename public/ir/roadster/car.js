// The Roadster, low-poly but with the real silhouette: long sloping nose, low beltline, glass targa canopy,
// fastback with a ducktail, thin light strips, big dark wheels with silver rims.
// Built 1 unit long, front towards -z (same convention as the game and the reels); scale the group to taste.
export function makeRoadster(THREE, color = 0xc8102e) {
  const g = new THREE.Group();
  const W = 0.46;                                                    // body width
  const paint = new THREE.MeshLambertMaterial({ color });
  const glass = new THREE.MeshLambertMaterial({ color: 0x1b2230 });
  const side = (pts, depth, bevel, mat, y0 = 0) => {
    const s = new THREE.Shape();
    s.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) {
      const p = pts[i];
      if (p.length === 4) s.quadraticCurveTo(p[0], p[1], p[2], p[3]); else s.lineTo(p[0], p[1]);
    }
    const geo = new THREE.ExtrudeGeometry(s, { depth, bevelEnabled: true, bevelSize: bevel, bevelThickness: bevel, bevelSegments: 3, curveSegments: 10 });
    geo.translate(0, y0, -depth / 2); geo.rotateY(-Math.PI / 2);      // length on x → length on z, front to -z
    const m = new THREE.Mesh(geo, mat); m.castShadow = true; g.add(m); return m;
  };
  // body: front bumper → long hood → beltline → rear deck → ducktail → rear bumper → underside
  side([[-0.49, 0.055], [-0.535, 0.07, -0.53, 0.11], [-0.4, 0.15, -0.18, 0.168], [0.1, 0.178], [0.3, 0.19, 0.42, 0.2],
        [0.5, 0.205, 0.505, 0.17], [0.51, 0.1, 0.47, 0.065], [0.0, 0.05]], W - 0.1, 0.05, paint);
  // canopy: raked windshield, short low roof, long fastback that melts into the tail
  side([[-0.2, 0.162], [-0.08, 0.262, 0.04, 0.265], [0.2, 0.262, 0.42, 0.198], [0.12, 0.178]], W - 0.18, 0.03, glass);
  // wheels with silver rims
  const tyre = new THREE.CylinderGeometry(0.11, 0.11, 0.08, 18); tyre.rotateZ(Math.PI / 2);
  const rim = new THREE.CylinderGeometry(0.075, 0.075, 0.085, 12); rim.rotateZ(Math.PI / 2);
  const tyreM = new THREE.MeshLambertMaterial({ color: 0x111214 }), rimM = new THREE.MeshLambertMaterial({ color: 0xc9ced6 });
  [[-0.32, 1], [-0.32, -1], [0.3, 1], [0.3, -1]].forEach(([z, sx]) => {
    const t = new THREE.Mesh(tyre, tyreM); t.position.set(sx * (W / 2 - 0.015), 0.11, z); g.add(t);
    const r = new THREE.Mesh(rim, rimM); r.position.set(sx * (W / 2 - 0.008), 0.11, z); g.add(r);
  });
  // light strips: slim headlights, full-width tail bar
  const lit = (c) => new THREE.MeshBasicMaterial({ color: c });
  [-1, 1].forEach((sx) => { const h = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.018, 0.03), lit(0xffffff)); h.position.set(sx * 0.13, 0.115, -0.545); h.rotation.y = sx * 0.25; g.add(h); });
  const tail = new THREE.Mesh(new THREE.BoxGeometry(W - 0.08, 0.02, 0.02), lit(0xff2a2a)); tail.position.set(0, 0.175, 0.53); g.add(tail);
  return g;
}
