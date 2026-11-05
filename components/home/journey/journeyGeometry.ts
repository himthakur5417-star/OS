/**
 * Guiding Thread — journey geometry.
 *
 * All coordinates are normalised (0–1 of the stage width / height) and are
 * converted to real pixels at render time. Building the paths in pixel space
 * (instead of a scaled viewBox) keeps strokes crisp at exactly 1px, lets the
 * final point land precisely on the bottom-centre of the stage on every aspect
 * ratio, and allows dash lengths to be computed in true pixels.
 *
 * Narrative encoded in the shapes:
 *   uncertain  – several possible trajectories leaving the student's position
 *   ambient    – faint, unrelated paths in the far layer (depth)
 *   wander     – the student's first hesitant attempt (follows a wrong direction, curls back)
 *   entry      – the guiding thread arriving from beyond the frame
 *   tail       – the shared direction: guidance first, then the student alone
 */

export type Pt = readonly [number, number];
export type Curve = readonly [Pt, Pt, Pt]; // cubic: control 1, control 2, end

export interface PathDef {
  start: Pt;
  curves: readonly Curve[];
  /** optional straight extension after the last curve */
  end?: Pt;
}

export interface JourneyGeometry {
  student: Pt;
  uncertain: readonly { def: PathDef; opacity: number }[];
  ambient: readonly PathDef[];
  waypoints: readonly Pt[];
  wander: PathDef;
  entry: PathDef;
  tail: PathDef;
  nodeRadius: number;
}

/* ------------------------------------------------------------------ */
/* Desktop / landscape composition — copy sits left, journey on right  */
/* ------------------------------------------------------------------ */
const DESKTOP: JourneyGeometry = {
  student: [0.7, 0.4],
  uncertain: [
    {
      opacity: 0.42,
      def: { start: [0.7, 0.4], curves: [[[0.76, 0.33], [0.8, 0.2], [0.9, 0.16]], [[0.95, 0.14], [0.99, 0.18], [1.05, 0.14]]] },
    },
    {
      opacity: 0.34,
      def: { start: [0.7, 0.4], curves: [[[0.77, 0.42], [0.84, 0.36], [0.89, 0.44]], [[0.94, 0.52], [0.97, 0.47], [1.06, 0.52]]] },
    },
    {
      opacity: 0.3,
      def: { start: [0.7, 0.4], curves: [[[0.66, 0.33], [0.61, 0.26], [0.6, 0.16]], [[0.59, 0.08], [0.63, 0.03], [0.67, -0.05]]] },
    },
    {
      opacity: 0.32,
      def: {
        start: [0.7, 0.4],
        curves: [
          [[0.74, 0.49], [0.68, 0.58], [0.74, 0.66]],
          [[0.8, 0.75], [0.88, 0.71], [0.91, 0.84]],
          [[0.93, 0.93], [0.9, 1.0], [0.92, 1.08]],
        ],
      },
    },
    {
      opacity: 0.2,
      def: { start: [0.7, 0.4], curves: [[[0.64, 0.5], [0.62, 0.62], [0.57, 0.72]], [[0.53, 0.82], [0.47, 0.88], [0.44, 1.08]]] },
    },
  ],
  ambient: [
    { start: [0.46, -0.06], curves: [[[0.62, 0.2], [0.96, 0.24], [1.06, 0.36]]] },
    { start: [0.6, 1.06], curves: [[[0.68, 0.82], [0.9, 0.66], [1.06, 0.7]]] },
  ],
  waypoints: [
    [0.9, 0.16],
    [0.89, 0.44],
    [0.6, 0.16],
    [0.74, 0.66],
    [0.57, 0.72],
  ],
  wander: {
    start: [0.7, 0.4],
    curves: [
      [[0.72, 0.33], [0.77, 0.28], [0.8, 0.31]],
      [[0.83, 0.34], [0.785, 0.36], [0.78, 0.43]],
    ],
  },
  entry: { start: [1.06, -0.02], curves: [[[0.95, 0.12], [0.8, 0.26], [0.78, 0.43]]] },
  tail: {
    start: [0.78, 0.43],
    curves: [
      [[0.765, 0.56], [0.66, 0.66], [0.58, 0.74]],
      [[0.52, 0.8], [0.5, 0.9], [0.5, 1.0]],
    ],
    end: [0.5, 1.04],
  },
  nodeRadius: 4.5,
};

/* ------------------------------------------------------------------ */
/* Mobile / portrait composition — copy on top, a simpler journey below */
/* ------------------------------------------------------------------ */
const MOBILE: JourneyGeometry = {
  student: [0.78, 0.7],
  uncertain: [
    { opacity: 0.4, def: { start: [0.78, 0.7], curves: [[[0.86, 0.64], [0.92, 0.57], [1.06, 0.55]]] } },
    {
      opacity: 0.28,
      def: { start: [0.78, 0.7], curves: [[[0.7, 0.64], [0.58, 0.68], [0.48, 0.63]], [[0.38, 0.58], [0.24, 0.62], [-0.06, 0.58]]] },
    },
    { opacity: 0.32, def: { start: [0.78, 0.7], curves: [[[0.86, 0.78], [0.96, 0.82], [1.06, 0.9]]] } },
  ],
  ambient: [{ start: [-0.06, 0.84], curves: [[[0.2, 0.78], [0.42, 0.9], [0.64, 0.84]], [[0.76, 0.81], [0.88, 0.88], [1.06, 0.82]]] }],
  waypoints: [
    [0.48, 0.63],
    [0.95, 0.56],
  ],
  wander: {
    start: [0.78, 0.7],
    curves: [
      [[0.8, 0.65], [0.86, 0.62], [0.88, 0.65]],
      [[0.9, 0.68], [0.83, 0.68], [0.8, 0.73]],
    ],
  },
  entry: { start: [1.08, 0.46], curves: [[[0.98, 0.54], [0.84, 0.6], [0.8, 0.73]]] },
  tail: {
    start: [0.8, 0.73],
    curves: [
      [[0.77, 0.82], [0.6, 0.85], [0.54, 0.9]],
      [[0.51, 0.93], [0.5, 0.96], [0.5, 1.0]],
    ],
    end: [0.5, 1.03],
  },
  nodeRadius: 4,
};

/** Landscape layouts ≥ 768px use the full composition; everything else the simplified one. */
export function pickGeometry(width: number, height: number): JourneyGeometry {
  return width >= 768 && width / height > 0.85 ? DESKTOP : MOBILE;
}

function toD(def: PathDef, w: number, h: number): string {
  const f = (p: Pt) => `${(p[0] * w).toFixed(1)} ${(p[1] * h).toFixed(1)}`;
  let d = `M ${f(def.start)}`;
  for (const [c1, c2, e] of def.curves) d += ` C ${f(c1)}, ${f(c2)}, ${f(e)}`;
  if (def.end) d += ` L ${f(def.end)}`;
  return d;
}

export interface BuiltJourney {
  key: string;
  isMobile: boolean;
  student: { x: number; y: number };
  nodeRadius: number;
  uncertain: { d: string; opacity: number }[];
  ambient: string[];
  waypoints: { x: number; y: number }[];
  wander: string;
  tail: string;
  /** entry + tail joined into one continuous guiding thread */
  thread: string;
}

export function buildJourney(width: number, height: number): BuiltJourney {
  const g = pickGeometry(width, height);
  const thread: PathDef = { start: g.entry.start, curves: [...g.entry.curves, ...g.tail.curves], end: g.tail.end };
  return {
    key: `${width}x${height}`,
    isMobile: g === MOBILE,
    student: { x: g.student[0] * width, y: g.student[1] * height },
    nodeRadius: g.nodeRadius,
    uncertain: g.uncertain.map((u) => ({ d: toD(u.def, width, height), opacity: u.opacity })),
    ambient: g.ambient.map((a) => toD(a, width, height)),
    waypoints: g.waypoints.map((p) => ({ x: p[0] * width, y: p[1] * height })),
    wander: toD(g.wander, width, height),
    tail: toD(g.tail, width, height),
    thread: toD(thread, width, height),
  };
}
