const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, '..', 'src', 'shaders', 'glass-ai-button', 'sources', 'glass-ai-button.html');
const outPath = path.join(__dirname, '..', 'src', 'shaders', 'officium-glass-button', 'sources', 'officium-glass-button.html');

const srcContent = fs.readFileSync(srcPath, 'utf8');
const lines = srcContent.split('\n');

// Lines 1-49 (0 to 48 in 0-indexed)
// Line 49 ends with Three.js r170
const headLines = lines.slice(0, 49);

// Update title and meta theme color in head
let head = headLines.join('\n');
head = head.replace('<title>GPT 6 Sol — Glass Galaxy</title>', '<title>Officium Supremum — Optical Glass CTA</title>');
head = head.replace('aria-label="GPT 6 Sol — activate the galaxy"', 'aria-label="Explore Programs — View mentorship curriculum"');

const appScript = `
// The complete renderer, geometry, textures and GLSL are embedded in this file.
const THREE = window.THREE;

// Polished acrylic needs a sharp transmission image. Trilinear mip sampling
// avoids the costly 16-tap cubic filter intended for rougher transmissive glass.
THREE.ShaderChunk.transmission_pars_fragment = THREE.ShaderChunk.transmission_pars_fragment.replace(
  'return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );',
  'return textureLod( transmissionSamplerMap, fragCoord.xy, lod );'
);

const canvas = document.querySelector('#glass');
let renderer;
try {
  renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,
    powerPreference: 'high-performance',
  });
} catch(e) {
  document.querySelector('#fallback').style.display = 'grid';
  throw e;
}

const qualityRatio = () => Math.min(
  Math.max(devicePixelRatio, 1.3),
  innerWidth >= 1600 ? 1.3 : 1.75,
  Math.sqrt(8000000 / (innerWidth * innerHeight))
);
renderer.setPixelRatio(qualityRatio());
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.13;

// Background handling via query parameter: 'nearblack' (default), 'burgundy', or 'threeui'
const query = new URLSearchParams(location.search);
const bgMode = query.get('bg') || 'nearblack';

let bgHex = '#211C1D';
let bgRgb = new THREE.Vector3(0.0112, 0.0075, 0.0082); // sRGB #211C1D in linear
if (bgMode === 'burgundy') {
  bgHex = '#722F37';
  bgRgb = new THREE.Vector3(0.165, 0.024, 0.034); // sRGB #722F37 in linear
} else if (bgMode === 'threeui') {
  bgHex = '#a8b0bd';
  bgRgb = new THREE.Vector3(0.130, 0.168, 0.232); // original ThreeUI silver
}

const scene = new THREE.Scene();
scene.background = new THREE.Color(bgHex);

const camera = new THREE.PerspectiveCamera(31, 1, 0.1, 100);
camera.position.set(0, 1.7, 8.65);
camera.lookAt(0, 0, 0);

const group = new THREE.Group();
scene.add(group);

const uniforms = {
  uTime: { value: 0 },
  uPulse: { value: 0 },
  uFlow: { value: 0 },
  uHover: { value: 0 },
  uPress: { value: 0 },
  uBurst: { value: 100 },
  uBgColor: { value: bgRgb },
};

// Seamless studio HDR environment with high-contrast umbrella softboxes.
// Preserving the exact crisp studio reflection map from the original ThreeUI source
// ensures authentic optical glass reflections without muddying or plastic tinting.
const envCanvas = document.createElement('canvas');
envCanvas.width = 2048;
envCanvas.height = 1024;
const ec = envCanvas.getContext('2d');
let eg = ec.createLinearGradient(0, 0, 0, 1024);
eg.addColorStop(0, '#cad5e3');
eg.addColorStop(0.42, '#67768b');
eg.addColorStop(0.60, '#4e6078');
eg.addColorStop(1, '#aab9ca');
ec.fillStyle = eg;
ec.fillRect(0, 0, 2048, 1024);

function umbrella(x, y, rx, ry, brightness) {
  for (const wrap of [-2048, 0, 2048]) {
    ec.save();
    ec.translate(x + wrap, y);
    ec.scale(rx, ry);
    const g = ec.createRadialGradient(0, 0, 0, 0, 0, 1);
    g.addColorStop(0, "rgba(" + brightness + "," + brightness + "," + brightness + ",1)");
    g.addColorStop(0.46, "rgba(" + brightness + "," + brightness + "," + brightness + ",.98)");
    g.addColorStop(0.76, "rgba(" + brightness + "," + brightness + "," + brightness + ",.55)");
    g.addColorStop(1, "rgba(" + brightness + "," + brightness + "," + brightness + ",0)");
    ec.fillStyle = g;
    ec.fillRect(-1, -1, 2, 2);
    ec.restore();
  }
}
umbrella(400, 175, 490, 155, 255);
umbrella(1260, 200, 280, 100, 244);
umbrella(720, 715, 660, 100, 255);
umbrella(1780, 470, 95, 360, 250);
umbrella(1265, 460, 32, 190, 234);
umbrella(1510, 535, 80, 22, 236);

const pixels = ec.getImageData(0, 0, 2048, 1024).data;
const hdr = new Uint16Array(2048 * 1024 * 4);
for (let i = 0; i < pixels.length; i += 4) {
  const lum = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 765;
  const energy = lum > 0.86 ? 1 + Math.pow((lum - 0.86) / 0.14, 2) * 7.5 : 1;
  for (let c = 0; c < 3; c++) {
    hdr[i + c] = THREE.DataUtils.toHalfFloat(Math.pow(pixels[i + c] / 255, 2.2) * energy);
  }
  hdr[i + 3] = THREE.DataUtils.toHalfFloat(1);
}
const env = new THREE.DataTexture(hdr, 2048, 1024, THREE.RGBAFormat, THREE.HalfFloatType);
env.minFilter = THREE.LinearFilter;
env.magFilter = THREE.LinearFilter;
env.wrapS = THREE.RepeatWrapping;
env.mapping = THREE.EquirectangularReflectionMapping;
env.needsUpdate = true;

const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromEquirectangular(env).texture;
pmrem.dispose();

scene.add(new THREE.AmbientLight('#d5ddea', 0.65));

// Floor shader: grounds the glass object with realistic contact occlusion
// and a subtle Burgundy caustic glow directly below the left orb.
const floorMat = new THREE.ShaderMaterial({
  uniforms,
  vertexShader: \`
    varying vec3 p;
    void main() {
      p = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  \`,
  fragmentShader: \`
    precision highp float;
    varying vec3 p;
    uniform float uTime;
    uniform float uPulse;
    uniform float uHover;
    uniform float uPress;
    uniform vec3 uBgColor;

    float capsule(vec2 q, float r) {
      q.x -= clamp(q.x, -2.26, 2.26);
      return length(q) - r;
    }
    float gauss(vec2 p, vec2 s) {
      return exp(-dot(p / s, p / s));
    }

    void main() {
      vec2 q = p.xy;
      vec3 col = uBgColor;

      // Soft directional shadow under capsule
      float sh = capsule(q - mix(vec2(0.25, -0.47), vec2(0.08, -0.14), uPress), 0.99);
      float shadow = exp(-max(sh, 0.0) * (3.0 + uPress * 2.5)) * (0.24 + uPress * 0.08);
      shadow += exp(-max(capsule(q - vec2(0.52, -0.91), 1.0), 0.0) * 2.1) * 0.10;
      col *= (1.0 - shadow);

      // Deep Burgundy caustic glow under left orb at x = -2.12
      vec3 burgundyGlow = vec3(0.447, 0.184, 0.216) * 0.22;
      col += burgundyGlow * gauss(q - vec2(-2.12, -0.35), vec2(0.95, 0.75)) * (0.7 + uPulse * 0.9);

      // Pinpoint contact occlusion
      float contact = exp(-pow(capsule(q - vec2(0.06, -0.09), 0.90) * 6.0, 2.0)) * 0.06;
      col -= contact;

      // Subtle edge light bleed
      float edge = capsule(q - vec2(0.08, -0.10), 1.04);
      float nearEdge = exp(-pow((edge - 0.025) / 0.10, 2.0));
      float lower = 1.0 - smoothstep(-0.8, -0.25, q.y);
      col += nearEdge * lower * vec3(0.02, 0.02, 0.02) * (1.0 + uHover * 0.6);
      col *= (1.0 - uHover * 0.08);
      col = max(col, uBgColor * 0.4);

      gl_FragColor = vec4(col, 1.0);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }
  \`
});

const floor = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), floorMat);
floor.position.z = -1.05;
scene.add(floor);

// Procedural convex capsule geometry (identical to verified reference)
function createConvexCapsuleGeometry() {
  const halfLine = 2.25;
  const faceRadius = 0.92;
  const bevelRadius = 0.115;
  const frontEdgeZ = 0.195;
  const frontWallZ = 0.08;
  const backWallZ = -0.12;
  const backEdgeZ = -0.235;
  const frontBulge = 0.055;
  const faceRings = 32;
  const bevelSteps = 16;
  const straightSamples = 116;
  const arcSamples = 76;
  const perimeterCount = 2 * (straightSamples + arcSamples);
  const outline = [];
  const positions = [];
  const indices = [];

  for (let i = 0; i < straightSamples; i++) {
    outline.push([halfLine - 2 * halfLine * i / straightSamples, 0, 1]);
  }
  for (let i = 0; i < arcSamples; i++) {
    const angle = Math.PI * 0.5 + Math.PI * i / arcSamples;
    outline.push([-halfLine, Math.cos(angle), Math.sin(angle)]);
  }
  for (let i = 0; i < straightSamples; i++) {
    outline.push([-halfLine + 2 * halfLine * i / straightSamples, 0, -1]);
  }
  for (let i = 0; i < arcSamples; i++) {
    const angle = -Math.PI * 0.5 + Math.PI * i / arcSamples;
    outline.push([halfLine, Math.cos(angle), Math.sin(angle)]);
  }

  positions.push(0, 0, frontEdgeZ + frontBulge);

  for (let r = 1; r <= faceRings; r++) {
    const t = r / faceRings;
    const radialScale = faceRadius * t;
    const z = frontEdgeZ + frontBulge * Math.pow(1 - t * t, 2);
    for (let i = 0; i < perimeterCount; i++) {
      const [cx, nx, ny] = outline[i];
      positions.push(cx + nx * radialScale, ny * radialScale, z);
    }
  }

  for (let i = 0; i < perimeterCount; i++) {
    indices.push(0, 1 + i, 1 + (i + 1) % perimeterCount);
  }
  for (let r = 1; r < faceRings; r++) {
    const currentRing = 1 + (r - 1) * perimeterCount;
    const nextRing = 1 + r * perimeterCount;
    for (let i = 0; i < perimeterCount; i++) {
      const current = currentRing + i;
      const next = currentRing + (i + 1) % perimeterCount;
      const aboveCurrent = nextRing + i;
      const aboveNext = nextRing + (i + 1) % perimeterCount;
      indices.push(current, aboveCurrent, next);
      indices.push(next, aboveCurrent, aboveNext);
    }
  }

  const frontPerimeterStart = 1 + (faceRings - 1) * perimeterCount;
  for (let b = 1; b <= bevelSteps; b++) {
    const angle = (Math.PI * 0.5) * (b / bevelSteps);
    const z = frontEdgeZ - bevelRadius * (1 - Math.cos(angle));
    const rad = faceRadius + bevelRadius * Math.sin(angle);
    for (let i = 0; i < perimeterCount; i++) {
      const [cx, nx, ny] = outline[i];
      positions.push(cx + nx * rad, ny * rad, z);
    }
  }
  for (let b = 0; b < bevelSteps; b++) {
    const ringA = b === 0 ? frontPerimeterStart : frontPerimeterStart + b * perimeterCount;
    const ringB = frontPerimeterStart + (b + 1) * perimeterCount;
    for (let i = 0; i < perimeterCount; i++) {
      indices.push(ringA + i, ringB + i, ringA + (i + 1) % perimeterCount);
      indices.push(ringA + (i + 1) % perimeterCount, ringB + i, ringB + (i + 1) % perimeterCount);
    }
  }

  const frontWallStart = frontPerimeterStart + bevelSteps * perimeterCount;
  const backWallStart = frontWallStart + perimeterCount;
  for (let i = 0; i < perimeterCount; i++) {
    const [cx, nx, ny] = outline[i];
    const rad = faceRadius + bevelRadius;
    positions.push(cx + nx * rad, ny * rad, backWallZ);
  }
  for (let i = 0; i < perimeterCount; i++) {
    indices.push(frontWallStart + i, backWallStart + i, frontWallStart + (i + 1) % perimeterCount);
    indices.push(frontWallStart + (i + 1) % perimeterCount, backWallStart + i, backWallStart + (i + 1) % perimeterCount);
  }

  for (let b = 1; b <= bevelSteps; b++) {
    const angle = (Math.PI * 0.5) * (b / bevelSteps);
    const z = backWallZ - bevelRadius * Math.sin(angle);
    const rad = faceRadius + bevelRadius * Math.cos(angle);
    for (let i = 0; i < perimeterCount; i++) {
      const [cx, nx, ny] = outline[i];
      positions.push(cx + nx * rad, ny * rad, z);
    }
  }
  for (let b = 0; b < bevelSteps; b++) {
    const ringA = b === 0 ? backWallStart : backWallStart + b * perimeterCount;
    const ringB = backWallStart + (b + 1) * perimeterCount;
    for (let i = 0; i < perimeterCount; i++) {
      indices.push(ringA + i, ringB + i, ringA + (i + 1) % perimeterCount);
      indices.push(ringA + (i + 1) % perimeterCount, ringB + i, ringB + (i + 1) % perimeterCount);
    }
  }

  const backPerimeterStart = backWallStart + bevelSteps * perimeterCount;
  for (let r = faceRings - 1; r >= 1; r--) {
    const t = r / faceRings;
    const radialScale = faceRadius * t;
    const z = backEdgeZ;
    for (let i = 0; i < perimeterCount; i++) {
      const [cx, nx, ny] = outline[i];
      positions.push(cx + nx * radialScale, ny * radialScale, z);
    }
  }
  for (let r = 0; r < faceRings - 1; r++) {
    const ringA = backPerimeterStart + r * perimeterCount;
    const ringB = backPerimeterStart + (r + 1) * perimeterCount;
    for (let i = 0; i < perimeterCount; i++) {
      indices.push(ringA + i, ringB + i, ringA + (i + 1) % perimeterCount);
      indices.push(ringA + (i + 1) % perimeterCount, ringB + i, ringB + (i + 1) % perimeterCount);
    }
  }

  const backCenterIndex = positions.length / 3;
  positions.push(0, 0, backEdgeZ);
  const previousRing = backPerimeterStart + (faceRings - 2) * perimeterCount;
  for (let i = 0; i < perimeterCount; i++) {
    indices.push(backCenterIndex, previousRing + i, previousRing + (i + 1) % perimeterCount);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();
  return geometry;
}

const bodyGeo = createConvexCapsuleGeometry();

function capsuleRho(x, y) {
  const ax = Math.abs(x), ay = Math.abs(y);
  const halfLine = 2.25, radius = 0.92;
  if (ax === 0 && ay === 0) return 0;
  if (ax * radius <= halfLine * ay) return ay / radius;
  const discriminant = Math.max(0, radius * radius * ax * ax - (halfLine * halfLine - radius * radius) * ay * ay);
  return (ax * ax + ay * ay) / (halfLine * ax + Math.sqrt(discriminant));
}
function capsuleFrontZ(x, y) {
  const rho = Math.min(1, capsuleRho(x, y));
  return 0.195 + 0.055 * Math.pow(1 - rho * rho, 2);
}

// Optical Glass Physical Material (MeshPhysicalMaterial with high transmission)
// Pure optical glass: transmission 1, thickness 0.48, neutral white color, IOR 1.52.
const glassMaterial = new THREE.MeshPhysicalMaterial({
  color: '#ffffff',
  depthWrite: false,
  envMap: scene.environment,
  metalness: 0,
  specularIntensity: 1,
  specularColor: new THREE.Color(1, 1, 1),
  roughness: 0.028,
  transmission: 1,
  thickness: 0.48,
  ior: 1.52,
  dispersion: 0,
  envMapIntensity: 1.18,
  clearcoat: 0.85,
  clearcoatRoughness: 0.020,
  attenuationColor: new THREE.Color('#ffffff'),
  attenuationDistance: 8,
});
const body = new THREE.Mesh(bodyGeo, glassMaterial);
group.add(body);

// Fresnel specular highlights on the domed capsule bevel edges
const fresnelMaterial = new THREE.ShaderMaterial({
  uniforms: { ...uniforms, uEnvironment: { value: env } },
  transparent: true,
  depthWrite: false,
  depthTest: true,
  blending: THREE.AdditiveBlending,
  vertexShader: \`
    varying vec3 vNormal;
    varying vec3 vView;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vec4 mv = modelViewMatrix * vec4(position + normal * 0.0015, 1.0);
      vView = -mv.xyz;
      gl_Position = projectionMatrix * mv;
    }
  \`,
  fragmentShader: \`
    varying vec3 vNormal;
    varying vec3 vView;
    uniform sampler2D uEnvironment;
    uniform float uHover;
    uniform float uPulse;
    void main() {
      vec3 N = normalize(vNormal), V = normalize(vView);
      float ndv = clamp(dot(N, V), 0.0, 1.0);
      float grazing = pow(max(1.0 - ndv, 0.0), 3.2);
      vec3 R = reflect(-V, N);
      vec3 worldR = normalize((vec4(R, 0.0) * viewMatrix).xyz);
      float longitude = length(worldR.xz) > 1e-5 ? atan(worldR.z, worldR.x) : 0.0;
      vec2 uv = vec2(longitude * 0.15915494 + 0.5, asin(clamp(worldR.y, -1.0, 1.0)) * 0.31830989 + 0.5);
      vec3 reflected = texture2D(uEnvironment, uv).rgb;
      vec3 color = vec3(0.20, 0.19, 0.18) + reflected * 0.22;
      float alpha = grazing * (0.32 + uHover * 0.16 + uPulse * 0.12);
      gl_FragColor = vec4(color, max(alpha, 0.0));
    }
  \`,
});
const fresnelShell = new THREE.Mesh(bodyGeo, fresnelMaterial);
fresnelShell.renderOrder = 6;
group.add(fresnelShell);

const rimMaterial = new THREE.MeshPhysicalMaterial({
  color: '#f3f7ff',
  envMap: scene.environment,
  metalness: 0,
  roughness: 0.045,
  transmission: 1,
  thickness: 0.028,
  ior: 1.46,
  envMapIntensity: 1.1,
  depthWrite: false,
});

// -------------------------------------------------------------
// STEP 5: Left Orb — The Guiding Thread
// Deep Burgundy optical sphere with a single luminous Warm Cream trajectory.
// No galaxy spirals, no cosmic rings, no starry dust clouds.
// -------------------------------------------------------------
const orbUniforms = {
  ...uniforms,
  uPrepass: { value: 0 },
  uEye: { value: new THREE.Vector3(0, 0, 12) },
  uEnvironment: { value: env },
};

const lensMat = new THREE.ShaderMaterial({
  uniforms: orbUniforms,
  vertexShader: \`
    varying vec3 vP;
    varying vec3 vN;
    varying vec3 vView;
    void main() {
      vP = position;
      vN = normalize(normalMatrix * normal);
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      vView = -mv.xyz;
      gl_Position = projectionMatrix * mv;
    }
  \`,
  fragmentShader: \`
    precision highp float;
    varying vec3 vP;
    varying vec3 vN;
    varying vec3 vView;
    uniform vec3 uEye;
    uniform float uPrepass;
    uniform float uTime;
    uniform float uPulse;
    uniform float uFlow;
    uniform float uHover;
    uniform sampler2D uEnvironment;

    void main() {
      vec3 V = normalize(vView), N = normalize(vN), R = reflect(-V, N);
      vec3 incident = normalize(vP - uEye);
      vec3 direction = refract(incident, normalize(vP), 1.0 / 1.48);
      float path = max(0.001, -2.0 * dot(vP, direction));
      vec3 sum = vec3(0.0);
      float trans = 1.0;
      float samples = mix(24.0, 8.0, uPrepass);

      for (int i = 0; i < 24; i++) {
        if (float(i) >= samples) break;
        float travel = (float(i) + 0.5) / samples * path;
        vec3 p = vP + direction * travel;
        float r = length(p);
        float envelope = 1.0 - smoothstep(0.72, 0.98, r);

        // Single clean S-curve trajectory entering lower-left, curving smoothly,
        // and exiting cleanly towards the right (Guiding Thread)
        float tNorm = clamp((p.x + 0.75) / 1.5, 0.0, 1.0);
        float curveY = -0.22 + 0.38 * (tNorm * tNorm * (3.0 - 2.0 * tNorm));
        float curveZ = 0.12 * sin(tNorm * 3.14159265);
        float distToThread = length(vec2(p.y - curveY, p.z - curveZ));

        float threadCore = exp(-pow(distToThread / 0.038, 2.0));
        float threadHalo = exp(-pow(distToThread / 0.12, 2.0));
        float threadAlpha = (threadCore * 3.2 + threadHalo * 0.8) * (1.0 - smoothstep(0.68, 0.90, abs(p.x)));

        // Travelling light pulse moving from left to right along the trajectory
        float flowPhase = fract(tNorm * 1.3 - uFlow * 0.28);
        float pulseLight = exp(-pow(flowPhase - 0.5, 2.0) * 36.0);

        // Deep Burgundy optical sphere body
        vec3 burgundy = vec3(0.447, 0.184, 0.216);
        vec3 deepBurgundy = vec3(0.18, 0.04, 0.06);
        float sphereCore = exp(-r * r * 2.8);
        vec3 sphereVol = mix(deepBurgundy, burgundy, sphereCore * 0.85);

        // Warm Cream Guiding Thread
        vec3 warmCream = vec3(0.910, 0.863, 0.776);
        vec3 brightCream = vec3(1.35, 1.28, 1.15);
        vec3 threadColor = mix(warmCream, brightCream, pulseLight);

        vec3 voxelCol = sphereVol + threadColor * threadAlpha * (1.6 + uHover * 0.8 + uPulse * 1.4);
        float density = (sphereCore * 0.40 + threadCore * 2.6) * envelope;

        sum += voxelCol * density * trans * path * (3.8 / samples) * (1.0 + uPulse * 0.32 + uHover * 0.25);
        trans *= exp(-density * path * (1.65 / samples));
      }

      float ndv = clamp(dot(N, V), 0.0, 1.0);
      float fresnel = 0.035 + 0.965 * pow(max(1.0 - ndv, 0.0), 5.0);
      vec3 col = vec3(0.045, 0.015, 0.020) * trans + sum;
      col += vec3(0.447, 0.184, 0.216) * 0.5 * pow(max(1.0 - ndv, 0.0), 1.8) * 0.36;

      vec3 worldR = normalize((vec4(R, 0.0) * viewMatrix).xyz);
      vec2 envUV = vec2(
        (length(worldR.xz) > 1e-5 ? atan(worldR.z, worldR.x) : 0.0) * 0.15915494 + 0.5,
        asin(clamp(worldR.y, -1.0, 1.0)) * 0.31830989 + 0.5
      );
      vec3 reflected = texture2D(uEnvironment, envUV).rgb;
      col = mix(col, reflected, clamp(fresnel, 0.0, 1.0));
      col += vec3(0.447, 0.184, 0.216) * 0.7 * pow(max(1.0 - ndv, 0.0), 3.0) * (0.34 + uHover * 0.12 + uPulse * 0.14);

      gl_FragColor = vec4(col, 1.0);
    }
  \`
});

const lens = new THREE.Mesh(new THREE.SphereGeometry(1, 160, 112), lensMat);
lens.position.set(-2.12, 0, 0.36);
lens.scale.set(0.685, 0.685, 0.50);
lens.renderOrder = 2;
group.add(lens);

const orbLight = new THREE.PointLight('#722F37', 1.2, 3.2, 2);
orbLight.position.set(-2.12, 0.02, 0.72);
group.add(orbLight);

const lensRing = new THREE.Mesh(new THREE.TorusGeometry(0.706, 0.014, 16, 144), rimMaterial);
lensRing.position.set(-2.12, 0, 0.265);
group.add(lensRing);

// Physical 3D Tube for the luminous Warm Cream trajectory inside the sphere
const threadGroup = new THREE.Group();
threadGroup.position.copy(lens.position);
group.add(threadGroup);

const threadPoints = [];
const ptsCount = 96;
for (let i = 0; i <= ptsCount; i++) {
  const t = i / ptsCount;
  const x = -0.72 + t * 1.44;
  const curveY = -0.22 + 0.38 * (t * t * (3.0 - 2.0 * t));
  const curveZ = 0.12 * Math.sin(t * Math.PI);
  threadPoints.push(new THREE.Vector3(x, curveY, curveZ));
}
const threadCurve = new THREE.CatmullRomCurve3(threadPoints);

for (let layer = 0; layer < 2; layer++) {
  const isCore = layer === 0;
  const tubeMat = new THREE.ShaderMaterial({
    uniforms: { ...uniforms, uLayer: { value: layer } },
    transparent: true,
    depthWrite: false,
    depthTest: true,
    blending: THREE.AdditiveBlending,
    vertexShader: \`
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    \`,
    fragmentShader: \`
      varying vec2 vUv;
      uniform float uFlow;
      uniform float uHover;
      uniform float uPulse;
      uniform float uLayer;
      void main() {
        float phase = fract(vUv.x * 1.3 - uFlow * 0.28);
        float pulse = exp(-pow(phase - 0.5, 2.0) * 32.0);
        float taper = smoothstep(0.0, 0.12, vUv.x) * smoothstep(1.0, 0.88, vUv.x);

        vec3 warmCream = vec3(0.910, 0.863, 0.776);
        vec3 brightCream = vec3(1.35, 1.30, 1.20);
        vec3 col = mix(warmCream, brightCream, pulse);

        float intensity = (uLayer < 0.5) ? 1.5 : 0.45;
        intensity *= (0.85 + uHover * 0.65 + uPulse * 0.95);

        gl_FragColor = vec4(col, intensity * taper);
      }
    \`
  });
  const tube = new THREE.Mesh(
    new THREE.TubeGeometry(threadCurve, 120, isCore ? 0.009 : 0.024, 8, false),
    tubeMat
  );
  tube.renderOrder = isCore ? 12 : 11;
  threadGroup.add(tube);
}

// Deterministic random generator
let randomState = 71931;
function random() {
  randomState = (Math.imul(randomState, 1664525) + 1013904223) >>> 0;
  return randomState / 4294967296;
}

// Disciplined Click Burst: Warm Cream and Taupe particles with subtle Burgundy wave ring
const burstCount = 420;
const burstSeeds = new Float32Array(burstCount * 4);
for (let i = 0; i < burstCount; i++) {
  burstSeeds.set([random(), random(), random(), random()], i * 4);
}
const burstGeo = new THREE.BufferGeometry();
burstGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(burstCount * 3), 3));
burstGeo.setAttribute('aSeed', new THREE.BufferAttribute(burstSeeds, 4));

const particleUniforms = { ...uniforms, uDpr: { value: qualityRatio() } };

const burstMat = new THREE.ShaderMaterial({
  uniforms: particleUniforms,
  transparent: true,
  depthWrite: false,
  depthTest: false,
  blending: THREE.AdditiveBlending,
  vertexShader: \`
    attribute vec4 aSeed;
    uniform float uBurst;
    uniform float uDpr;
    varying float alpha;
    varying vec3 color;
    void main() {
      float age = max(0.0, uBurst - aSeed.z * 0.065);
      float life = 0.85 + aSeed.w * 1.1;
      float theta = aSeed.x * 6.283185;
      float travel = (1.0 - exp(-age * 3.2)) * (0.6 + aSeed.y * 3.0);
      vec3 p = vec3(-2.12, 0.0, 0.60) + vec3(cos(theta) * travel + age * 0.28, sin(theta) * travel * 0.63, sin(theta * 3.0 + aSeed.w * 6.0) * 0.16);
      alpha = pow(max(0.0, 1.0 - age / life), 1.55) * smoothstep(0.0, 0.025, age);
      alpha *= uBurst < 2.0 ? 1.0 : 0.0;
      color = mix(vec3(0.718, 0.659, 0.604), vec3(0.96, 0.93, 0.88), aSeed.w);
      vec4 mv = modelViewMatrix * vec4(p, 1.0);
      gl_Position = projectionMatrix * mv;
      gl_PointSize = (2.4 + aSeed.w * 3.6) * uDpr * 8.7 / -mv.z * (1.0 + exp(-age * 5.0) * 0.55);
    }
  \`,
  fragmentShader: \`
    varying float alpha;
    varying vec3 color;
    void main() {
      float r = length(gl_PointCoord - 0.5);
      float a = (exp(-r * r * 30.0) + exp(-r * r * 95.0) * 0.4) * (1.0 - smoothstep(0.34, 0.5, r));
      gl_FragColor = vec4(color, a * alpha);
    }
  \`
});

burstGeo.setDrawRange(0, matchMedia('(pointer:coarse)').matches ? 140 : 260);
const burstPoints = new THREE.Points(burstGeo, burstMat);
burstPoints.frustumCulled = false;
burstPoints.renderOrder = 14;
group.add(burstPoints);

// Thin comet streaks
const streakPositions = [], streakSeeds = [], streakAlong = [], streakSide = [], streakIndices = [];
for (let i = 0; i < 60; i++) {
  const seed = [random(), random(), random(), random()];
  for (let j = 0; j < 4; j++) {
    streakPositions.push(0, 0, 0);
    streakSeeds.push(...seed);
    streakAlong.push(j < 2 ? 0 : 1);
    streakSide.push(j % 2 === 0 ? -1 : 1);
  }
  const k = i * 4;
  streakIndices.push(k, k + 1, k + 2, k + 2, k + 1, k + 3);
}
const streakGeo = new THREE.BufferGeometry();
streakGeo.setAttribute('position', new THREE.Float32BufferAttribute(streakPositions, 3));
streakGeo.setAttribute('aSeed', new THREE.Float32BufferAttribute(streakSeeds, 4));
streakGeo.setAttribute('aAlong', new THREE.Float32BufferAttribute(streakAlong, 1));
streakGeo.setAttribute('aSide', new THREE.Float32BufferAttribute(streakSide, 1));
streakGeo.setIndex(streakIndices);

const streakMat = new THREE.ShaderMaterial({
  uniforms,
  transparent: true,
  side: THREE.DoubleSide,
  depthWrite: false,
  depthTest: false,
  blending: THREE.AdditiveBlending,
  vertexShader: \`
    attribute vec4 aSeed;
    attribute float aAlong;
    attribute float aSide;
    uniform float uBurst;
    varying float alpha;
    varying float across;
    void main() {
      float age = max(0.0, uBurst - aSeed.z * 0.045);
      float theta = aSeed.x * 6.283185;
      float travel = (1.0 - exp(-max(0.0, age - aAlong * 0.11) * 2.7)) * (1.0 + aSeed.y * 2.8);
      vec2 dir = vec2(cos(theta), sin(theta) * 0.63);
      vec3 p = vec3(vec2(-2.12, 0.0) + dir * travel + vec2(age * 0.28, 0.0), 0.70);
      p.xy += normalize(vec2(-dir.y, dir.x)) * aSide * 0.005 * (1.0 - aAlong * 0.75);
      alpha = pow(max(0.0, 1.0 - age / 1.20), 1.4) * smoothstep(0.0, 0.045, age) * (1.0 - aAlong * 0.9);
      alpha *= uBurst < 1.2 ? 1.0 : 0.0;
      across = aSide;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
    }
  \`,
  fragmentShader: \`
    varying float alpha;
    varying float across;
    void main() {
      gl_FragColor = vec4(vec3(0.910, 0.863, 0.776) * 1.4, max(alpha, 0.0) * max(0.0, 1.0 - across * across) * 0.75);
    }
  \`
});
const streaks = new THREE.Mesh(streakGeo, streakMat);
streaks.frustumCulled = false;
streaks.renderOrder = 13;
group.add(streaks);

// Subtle Burgundy expanding wave ring on click
const waveMat = new THREE.ShaderMaterial({
  uniforms,
  transparent: true,
  depthWrite: false,
  depthTest: false,
  blending: THREE.AdditiveBlending,
  vertexShader: \`
    varying vec2 p;
    void main() {
      p = position.xy;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  \`,
  fragmentShader: \`
    varying vec2 p;
    uniform float uBurst;
    void main() {
      float radius = 0.60 + uBurst * 2.9;
      float d = abs(length(p) - radius);
      float ring = exp(-pow(d / 0.017, 2.0)) * 0.35 + exp(-pow(d / 0.085, 2.0)) * 0.055;
      float fade = pow(max(0.0, 1.0 - uBurst / 1.05), 2.0);
      gl_FragColor = vec4(vec3(0.447, 0.184, 0.216) * 1.6, ring * fade);
    }
  \`
});
const wave = new THREE.Mesh(new THREE.PlaneGeometry(9, 9), waveMat);
wave.position.set(-2.12, 0, 0.93);
wave.renderOrder = 15;
group.add(wave);

// -------------------------------------------------------------
// STEP 6: Three-Zone Layout & Editorial Typography
// [ LEFT: Guiding Thread Orb ] [ CENTER: EXPLORE PROGRAMS ] [ RIGHT: Arrow ]
// Generous breathing room, zero visual collision.
// -------------------------------------------------------------
const labelCanvas = document.createElement('canvas');
labelCanvas.width = 4096;
labelCanvas.height = 1024;
const lc = labelCanvas.getContext('2d');
lc.scale(4, 4);

const labelText = (query.get('label') || 'EXPLORE PROGRAMS').toUpperCase();

// Left zone: 0 to 280 reserved for 3D orb.
// Center zone: centered at x = 525, y = 128
lc.font = '600 70px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
lc.fillStyle = '#E8DCC6';
lc.textBaseline = 'middle';
lc.textAlign = 'center';
lc.shadowColor = 'rgba(20, 16, 17, 0.75)';
lc.shadowBlur = 4;
lc.shadowOffsetY = 2;

const textX = 525, textY = 128, maxW = 440;
const chars = labelText.split('');
let fontPx = 70, tracking = 4.5, totalW = 0, widths = [];
for (let k = 0; k < 6; k++) {
  lc.font = '600 ' + fontPx + 'px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  totalW = 0;
  widths = chars.map(ch => {
    const w = lc.measureText(ch).width;
    totalW += w + tracking;
    return w;
  });
  totalW -= tracking;
  if (totalW <= maxW) break;
  fontPx = Math.floor(fontPx * maxW / totalW);
  tracking = fontPx * 0.064;
}
let curX = textX - totalW / 2;
for (let i = 0; i < chars.length; i++) {
  lc.fillText(chars[i], curX + widths[i] / 2, textY);
  curX += widths[i] + tracking;
}

// Vertical optical separator at x = 770
lc.strokeStyle = 'rgba(232, 220, 198, 0.28)';
lc.lineWidth = 2.2;
lc.beginPath();
lc.moveTo(770, 68);
lc.lineTo(770, 188);
lc.stroke();

// Right zone: Directional Arrow at x = 865, y = 128
lc.save();
lc.translate(865, 128);
lc.scale(2.2, 2.2);
lc.strokeStyle = '#E8DCC6';
lc.lineWidth = 2.8;
lc.lineCap = 'round';
lc.lineJoin = 'round';
lc.beginPath();
lc.moveTo(-14, 0);
lc.lineTo(14, 0);
lc.moveTo(5, -9);
lc.lineTo(14, 0);
lc.lineTo(5, 9);
lc.stroke();
lc.restore();

const labelTexture = new THREE.CanvasTexture(labelCanvas);
labelTexture.colorSpace = THREE.SRGBColorSpace;
labelTexture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8);

const label = new THREE.Mesh(
  new THREE.PlaneGeometry(5.50, 1.375, 96, 24),
  new THREE.MeshBasicMaterial({
    color: new THREE.Color(1.12, 1.12, 1.12),
    map: labelTexture,
    transparent: true,
    depthWrite: false,
    opacity: 0.98,
    toneMapped: false,
  })
);
label.position.set(0.27, 0, 0.220);
label.renderOrder = 3;
group.add(label);

const labelPositions = label.geometry.attributes.position;
for (let i = 0; i < labelPositions.count; i++) {
  labelPositions.setZ(i, capsuleFrontZ(labelPositions.getX(i) + label.position.x, labelPositions.getY(i)) + 0.008 - label.position.z);
}
labelPositions.needsUpdate = true;
label.geometry.computeVertexNormals();

// Interactive light trace over the directional arrow
const arrowTraceCanvas = document.createElement('canvas');
arrowTraceCanvas.width = arrowTraceCanvas.height = 256;
const arrowTraceCtx = arrowTraceCanvas.getContext('2d');

const arrowStemPath = new Path2D();
arrowStemPath.moveTo(-14, 0);
arrowStemPath.lineTo(14, 0);

const arrowHeadPath = new Path2D();
arrowHeadPath.moveTo(5, -9);
arrowHeadPath.lineTo(14, 0);
arrowHeadPath.lineTo(5, 9);

const arrowTraceTexture = new THREE.CanvasTexture(arrowTraceCanvas);
arrowTraceTexture.colorSpace = THREE.SRGBColorSpace;
arrowTraceTexture.minFilter = THREE.LinearFilter;
arrowTraceTexture.magFilter = THREE.LinearFilter;

const iconX = label.position.x + (865 / 1024 - 0.5) * 5.50;
const iconY = (0.5 - 128 / 256) * 1.375;

const arrowTrace = new THREE.Mesh(
  new THREE.PlaneGeometry(0.78, 0.78, 16, 16),
  new THREE.MeshBasicMaterial({
    map: arrowTraceTexture,
    transparent: true,
    depthWrite: false,
    depthTest: false,
    blending: THREE.AdditiveBlending,
    toneMapped: false,
  })
);
arrowTrace.position.set(iconX, iconY, 0.230);
arrowTrace.renderOrder = 7;
group.add(arrowTrace);

const arrowTracePositions = arrowTrace.geometry.attributes.position;
for (let i = 0; i < arrowTracePositions.count; i++) {
  arrowTracePositions.setZ(i, capsuleFrontZ(arrowTracePositions.getX(i) + iconX, arrowTracePositions.getY(i) + iconY) + 0.019 - arrowTrace.position.z);
}
arrowTracePositions.needsUpdate = true;
arrowTrace.geometry.computeVertexNormals();

let arrowTraceFrame = -Infinity;
function drawArrowTrace(phase) {
  const c = arrowTraceCtx;
  c.setTransform(1, 0, 0, 1, 0, 0);
  c.clearRect(0, 0, 256, 256);
  c.translate(128, 128);
  c.scale(3.8, 3.8);
  c.lineCap = 'round';
  c.lineJoin = 'round';

  const power = 0.75 + uniforms.uHover.value * 0.35 + uniforms.uPulse.value * 0.45;
  c.setLineDash([12, 48]);
  c.lineDashOffset = -(phase * 32.0);

  // Warm Cream trace
  c.strokeStyle = "rgba(232, 220, 198, " + Math.min(0.85, power * 0.70) + ")";
  c.lineWidth = 5.0;
  c.shadowColor = '#E8DCC6';
  c.shadowBlur = 6;
  c.stroke(arrowStemPath);
  c.stroke(arrowHeadPath);

  c.strokeStyle = "rgba(255, 250, 240, " + Math.min(1.0, power * 0.95) + ")";
  c.lineWidth = 1.6;
  c.shadowBlur = 2;
  c.stroke(arrowStemPath);
  c.stroke(arrowHeadPath);

  arrowTraceTexture.needsUpdate = true;
}

// HDR Bloom & Tonemapping
const sceneTarget = new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, depthBuffer: true });
sceneTarget.samples = 4;
const bloomA = new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, depthBuffer: false });
const bloomB = new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, depthBuffer: false });
const postScene = new THREE.Scene();
const postCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
const postVertex = "varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }";

const blurMaterial = new THREE.ShaderMaterial({
  depthWrite: false,
  depthTest: false,
  uniforms: { tMap: { value: null }, uStep: { value: new THREE.Vector2() }, uThreshold: { value: 0.90 } },
  vertexShader: postVertex,
  fragmentShader: \`
    varying vec2 vUv;
    uniform sampler2D tMap;
    uniform vec2 uStep;
    uniform float uThreshold;
    vec3 sampleLight(vec2 uv) {
      vec3 c = texture2D(tMap, uv).rgb;
      float l = max(max(c.r, c.g), c.b);
      return c * max(l - uThreshold, 0.0) / max(l, 0.0001);
    }
    void main() {
      vec3 c = sampleLight(vUv) * 0.227027;
      c += (sampleLight(vUv + uStep * 1.384615) + sampleLight(vUv - uStep * 1.384615)) * 0.316216;
      c += (sampleLight(vUv + uStep * 3.230769) + sampleLight(vUv - uStep * 3.230769)) * 0.070270;
      gl_FragColor = vec4(c, 1.0);
    }
  \`
});

const finishMaterial = new THREE.ShaderMaterial({
  depthWrite: false,
  depthTest: false,
  uniforms: { tScene: { value: sceneTarget.texture }, tBloom: { value: bloomB.texture } },
  vertexShader: postVertex,
  fragmentShader: \`
    varying vec2 vUv;
    uniform sampler2D tScene;
    uniform sampler2D tBloom;
    void main() {
      vec3 col = texture2D(tScene, vUv).rgb + texture2D(tBloom, vUv).rgb * 0.16;
      float grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
      col += (grain - 0.5) * 0.0007;
      gl_FragColor = vec4(col, 1.0);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }
  \`
});
const postQuad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), finishMaterial);
postScene.add(postQuad);

const floorTarget = new THREE.WebGLRenderTarget(2048, 2048, { type: THREE.HalfFloatType, depthBuffer: false });
const floorScene = new THREE.Scene();
const floorCamera = new THREE.OrthographicCamera(-16, 16, 16, -16, 0.1, 10);
floorCamera.position.z = 1;
floorScene.add(new THREE.Mesh(new THREE.PlaneGeometry(32, 32), floorMat));
floorTarget.texture.repeat.set(6.25, 6.25);
floorTarget.texture.offset.set(-2.625, -2.625);
floor.material = new THREE.MeshBasicMaterial({ map: floorTarget.texture });

let floorTime = -10, floorPulse = -10, floorHover = -10, floorPress = -10;
lens.onBeforeRender = (activeRenderer) => {
  orbUniforms.uPrepass.value = activeRenderer.getRenderTarget() === sceneTarget ? 0 : 1;
  lens.material.uniformsNeedUpdate = true;
};

function renderStudy() {
  if (needsRender || ((Math.abs(uniforms.uPulse.value - floorPulse) > 0.012 && Math.abs(uniforms.uTime.value - floorTime) > 1 / 16) || Math.abs(uniforms.uHover.value - floorHover) > 0.012 || Math.abs(uniforms.uPress.value - floorPress) > 0.012)) {
    renderer.setRenderTarget(floorTarget);
    renderer.render(floorScene, floorCamera);
    floorTime = uniforms.uTime.value;
    floorPulse = uniforms.uPulse.value;
    floorHover = uniforms.uHover.value;
    floorPress = uniforms.uPress.value;
  }
  renderer.setRenderTarget(sceneTarget);
  renderer.render(scene, camera);

  postQuad.material = blurMaterial;
  blurMaterial.uniforms.tMap.value = sceneTarget.texture;
  blurMaterial.uniforms.uThreshold.value = 0.90;
  blurMaterial.uniforms.uStep.value.set(2.0 / bloomA.width, 0);
  renderer.setRenderTarget(bloomA);
  renderer.render(postScene, postCamera);

  blurMaterial.uniforms.tMap.value = bloomA.texture;
  blurMaterial.uniforms.uThreshold.value = 0;
  blurMaterial.uniforms.uStep.value.set(0, 2.0 / bloomA.height);
  renderer.setRenderTarget(bloomB);
  renderer.render(postScene, postCamera);

  postQuad.material = finishMaterial;
  renderer.setRenderTarget(null);
  renderer.render(postScene, postCamera);
}

let perfStart = 0, perfFrames = 0, perfCpu = 0;
let needsRender = true;
const reviewTime = query.get('frame');
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
let paused = motionPreference.matches || reviewTime !== null;
let reduced = motionPreference.matches;
let burstAutoPause = false;
let time = reviewTime === null ? 0 : Math.max(0, Number(reviewTime) || 0);
let last = 0;
let pulseTime = -100;
let hover = 0, targetHover = 0;
let press = 0, targetPress = 0, pressVelocity = 0, pressLatchUntil = 0;
let burstTime = -100, burstCountFired = 0, handledDown = false;
const pointer = new THREE.Vector2(), smoothPointer = new THREE.Vector2();

const activate = document.querySelector('#activate');
const pauseButton = document.querySelector('#pause');

bodyGeo.computeBoundingBox();
const hitBox = bodyGeo.boundingBox;
const hitCorner = new THREE.Vector3();
let hitStyle = '';

function syncHitArea() {
  camera.updateMatrixWorld();
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const x of [hitBox.min.x, hitBox.max.x]) {
    for (const y of [hitBox.min.y, hitBox.max.y]) {
      for (const z of [hitBox.min.z, hitBox.max.z]) {
        hitCorner.set(x, y, z).applyMatrix4(body.matrixWorld).project(camera);
        const sx = (hitCorner.x * 0.5 + 0.5) * innerWidth;
        const sy = (-hitCorner.y * 0.5 + 0.5) * innerHeight;
        minX = Math.min(minX, sx);
        maxX = Math.max(maxX, sx);
        minY = Math.min(minY, sy);
        maxY = Math.max(maxY, sy);
      }
    }
  }
  const pad = 6;
  const next = "transform:none;left:" + Math.floor(minX - pad) + "px;top:" + Math.floor(minY - pad) + "px;width:" + Math.ceil(maxX - minX + pad * 2) + "px;height:" + Math.ceil(maxY - minY + pad * 2) + "px";
  if (next !== hitStyle) {
    activate.style.cssText = next;
    hitStyle = next;
  }
}

function pauseLabel() {
  perfStart = performance.now();
  perfFrames = 0;
  perfCpu = 0;
  needsRender = true;
  pauseButton.setAttribute('aria-label', paused ? 'Play animation' : 'Pause animation');
  pauseButton.title = paused ? 'Play' : 'Pause';
  pauseButton.innerHTML = paused
    ? '<svg viewBox="0 0 24 24" fill="currentColor"><path d="m8 5 11 7-11 7z"/></svg>'
    : '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 5h3v14H7zm7 0h3v14h-3z"/></svg>';
}

function energize() {
  pulseTime = time;
  burstTime = time;
  burstCountFired++;
  document.querySelector('#status').textContent = 'Officium Glass Button — Activated';
  if (paused) {
    burstAutoPause = reduced;
    paused = false;
    pauseLabel();
  }
  // Notify parent frame
  try {
    window.parent.postMessage({ type: 'officium-glass-click' }, '*');
  } catch(e) {}
}

function replay() {
  pressLatchUntil = Math.max(pressLatchUntil, performance.now() + 300);
  energize();
  needsRender = true;
}

function beginPress() {
  targetPress = 1;
  handledDown = true;
  pressLatchUntil = performance.now() + 300;
  energize();
  needsRender = true;
}

activate.addEventListener('click', () => {
  if (handledDown) {
    handledDown = false;
    return;
  }
  replay();
});
activate.addEventListener('focus', () => {
  if (activate.matches(':focus-visible')) targetHover = 1;
});
activate.addEventListener('blur', () => {
  targetHover = 0;
  targetPress = 0;
});
activate.addEventListener('pointerenter', () => (targetHover = 1));
activate.addEventListener('pointerleave', () => (targetHover = 0));
activate.addEventListener('pointerdown', (e) => {
  if (e.button !== 0) return;
  activate.setPointerCapture(e.pointerId);
  beginPress();
});
window.addEventListener('pointerup', () => (targetPress = 0));
activate.addEventListener('pointercancel', () => {
  targetPress = 0;
  handledDown = false;
});
activate.addEventListener('lostpointercapture', () => (targetPress = 0));
activate.addEventListener('keydown', (e) => {
  if (e.key === ' ' || e.key === 'Enter') {
    if (e.repeat) {
      e.preventDefault();
      return;
    }
    beginPress();
  }
});
activate.addEventListener('keyup', (e) => {
  if (e.key === ' ' || e.key === 'Enter') targetPress = 0;
});

document.querySelector('#replay').addEventListener('click', replay);
pauseButton.addEventListener('click', () => {
  burstAutoPause = false;
  paused = !paused;
  pauseLabel();
});
motionPreference.addEventListener('change', (e) => {
  reduced = e.matches;
  burstAutoPause = false;
  paused = e.matches || reviewTime !== null;
  if (e.matches) {
    pulseTime = -100;
    burstTime = -100;
    targetPress = 0;
    pressLatchUntil = 0;
  }
  pauseLabel();
});
pauseLabel();

let controlsTimer;
window.addEventListener('pointermove', (e) => {
  pointer.set((e.clientX / innerWidth - 0.5) * 2, (e.clientY / innerHeight - 0.5) * 2);
  document.body.classList.add('controls');
  clearTimeout(controlsTimer);
  controlsTimer = setTimeout(() => document.body.classList.remove('controls'), 1800);
}, { passive: true });
window.addEventListener('blur', () => {
  pointer.set(0, 0);
  targetPress = 0;
  handledDown = false;
  pressLatchUntil = 0;
});

// Dynamic Camera Framing
// If aspect ratio >= 2.4 (dedicated button container), scale camera distance to fill container
// If aspect ratio < 2.4 (showcase container), match exact ThreeUI reference framing
function resize() {
  needsRender = true;
  renderer.setPixelRatio(qualityRatio());
  particleUniforms.uDpr.value = renderer.getPixelRatio();
  renderer.setSize(innerWidth, innerHeight);
  const pw = Math.round(innerWidth * renderer.getPixelRatio());
  const ph = Math.round(innerHeight * renderer.getPixelRatio());
  sceneTarget.samples = pw * ph > 6000000 ? 0 : pw * ph > 2500000 ? 2 : 4;
  sceneTarget.setSize(pw, ph);
  bloomA.setSize(Math.max(1, Math.round(pw / 3)), Math.max(1, Math.round(ph / 3)));
  bloomB.setSize(bloomA.width, bloomA.height);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();

  const isButtonContainer = camera.aspect >= 2.4;
  if (isButtonContainer) {
    // Dedicated button container (e.g. 340x88, 300x80, 260x72)
    // Capsule width = 6.6, height = 2.1.
    // Fill ~82% height and ~88% width:
    const requiredFrustumHeight = Math.max(2.1 / 0.82, 6.6 / (0.88 * camera.aspect));
    camera.position.z = requiredFrustumHeight / (2.0 * Math.tan(15.5 * Math.PI / 180.0));
    camera.position.y = -camera.position.z * 0.06;
    camera.lookAt(0, -0.04, 0);
  } else {
    // Showcase container (e.g. 960x480, 800x400 comparison)
    // Matches exact ThreeUI reference distance
    camera.position.z = 8.65 * Math.max(1, 1.77778 / camera.aspect);
    camera.position.y = -camera.position.z * 0.155;
    camera.lookAt(0, -0.12, 0);
  }
}
window.addEventListener('resize', resize);
resize();

if (reviewTime !== null) {
  uniforms.uFlow.value = time * 0.70;
  if (query.has('press')) {
    press = 1;
    targetPress = 1;
  }
  if (query.has('burst')) {
    burstTime = time - Math.max(0, Number(query.get('burst')) || 0);
    pulseTime = burstTime;
  }
}

function animate(ms) {
  requestAnimationFrame(animate);
  const dt = Math.min((ms - last) * 0.001, 0.05);
  last = ms;
  const pressTarget = Math.max(targetPress, ms < pressLatchUntil ? 1 : 0);
  if (document.hidden || (paused && !needsRender && Math.abs(targetHover - hover) < 0.001 && Math.abs(pressTarget - press) < 0.001 && Math.abs(pressVelocity) < 0.005)) {
    return;
  }
  if (!paused) time += dt;
  const ease = 1 - Math.exp(-dt * 5);
  smoothPointer.lerp(pointer, ease);
  hover += (targetHover - hover) * ease;
  pressVelocity += (pressTarget - press) * 280.0 * dt;
  pressVelocity *= Math.exp(-dt * 20.0);
  press += pressVelocity * dt;
  press = Math.max(-0.04, Math.min(1.06, press));
  const depression = Math.max(0, press);
  const elapsed = time - pulseTime;
  const auto = reduced ? 0 : Math.pow(Math.max(0, Math.sin(time * 0.32 - 1.0)), 8) * 0.35;
  uniforms.uPulse.value = Math.max(auto, elapsed >= 0 && elapsed < 3.2 ? Math.exp(-elapsed * 0.8) * Math.min(elapsed * 14.0, 1.0) : 0);
  uniforms.uTime.value = time;
  uniforms.uPress.value = depression;
  uniforms.uBurst.value = Math.max(0, time - burstTime);

  wave.visible = uniforms.uBurst.value < 1.05;
  streaks.visible = uniforms.uBurst.value < 1.3;
  burstPoints.visible = uniforms.uBurst.value < 2.0;

  if (!paused) uniforms.uFlow.value += dt * (0.70 + hover * 0.70 + uniforms.uPulse.value * 1.6);

  group.rotation.x = reduced ? 0 : -0.08 + Math.sin(time * 0.38) * 0.18 + smoothPointer.y * 0.025 - depression * 0.045;
  group.rotation.y = reduced ? 0 : Math.sin(time * 0.38 + 0.4) * 0.10 + smoothPointer.x * 0.032;
  group.rotation.z = reduced ? 0 : Math.sin(time * 0.38) * 0.045;
  group.position.z = hover * 0.028 - depression * 0.13;
  group.position.y = -depression * 0.045;
  group.scale.set(1.0 - depression * 0.055, 1.0 - depression * 0.055, 1.0 - depression * 0.08);

  orbLight.intensity = 0.90 + hover * 0.5 + uniforms.uPulse.value * 1.4;
  uniforms.uHover.value = hover;

  lens.scale.set(0.685, 0.685, 0.50).multiplyScalar(1.0 + uniforms.uPulse.value * 0.028 - depression * 0.055);
  threadGroup.scale.set(1.0, 1.0, 1.0).multiplyScalar(1.0 + uniforms.uPulse.value * 0.028 - depression * 0.055);

  group.updateMatrixWorld(true);
  syncHitArea();

  orbUniforms.uEye.value.copy(camera.position);
  lens.worldToLocal(orbUniforms.uEye.value);

  if (needsRender || time - arrowTraceFrame >= 1 / 30) {
    drawArrowTrace(time);
    arrowTraceFrame = time;
  }

  const cpuStart = performance.now();
  renderStudy();
  perfCpu += performance.now() - cpuStart;
  perfFrames++;
  if (ms - perfStart > 1800) {
    canvas.dataset.cpuMs = (perfCpu / perfFrames).toFixed(2);
    perfCpu = 0;
    canvas.dataset.fps = (perfFrames * 1000 / (ms - perfStart)).toFixed(1);
    perfStart = ms;
    perfFrames = 0;
  }
  needsRender = false;
  canvas.dataset.ready = 'true';
  canvas.dataset.press = press.toFixed(3);
  canvas.dataset.burst = uniforms.uBurst.value.toFixed(3);
  canvas.dataset.bursts = String(burstCountFired);
  canvas.dataset.hover = hover.toFixed(3);
  canvas.dataset.phase = uniforms.uFlow.value.toFixed(3);
  if (burstAutoPause && time - burstTime >= 3.2) {
    paused = true;
    burstAutoPause = false;
    pauseLabel();
  }
  canvas.dataset.motion = paused ? 'paused' : 'playing';
}

requestAnimationFrame(animate);

canvas.addEventListener('webglcontextlost', (event) => {
  event.preventDefault();
  paused = true;
  document.querySelector('#fallback').style.display = 'grid';
});
canvas.addEventListener('webglcontextrestored', () => location.reload());
</script>
</body>
</html>
\`;

const fullHtml = head + '\n' + appScript;
fs.writeFileSync(outPath, fullHtml, 'utf8');
console.log('Successfully generated officium-glass-button.html! Total size:', fullHtml.length);
