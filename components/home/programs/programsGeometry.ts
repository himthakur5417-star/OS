export type Pt = readonly [number, number];
export type Curve = readonly [Pt, Pt, Pt]; // control1, control2, end

export interface PathDef {
  start: Pt;
  curves: readonly Curve[];
  end?: Pt;
}

export interface ProgramsStageGeometry {
  entry: PathDef;
  decisionNode: Pt;
  juniors: {
    path: PathDef;
    waypoint: Pt;
  };
  scholars: {
    path: PathDef;
    waypoint: Pt;
  };
  defence: {
    path: PathDef;
    waypoint: Pt;
  };
  ambient: readonly PathDef[];
}

/**
 * Normalized geometry for desktop / landscape (aspect ratio >= 0.8)
 * Decision node sits on left-center, branching paths travel rightward into three tiers.
 */
const DESKTOP_PROGRAMS: ProgramsStageGeometry = {
  entry: {
    start: [0.5, 0.0],
    curves: [
      [[0.48, 0.15], [0.40, 0.32], [0.36, 0.50]],
    ],
  },
  decisionNode: [0.36, 0.50],
  juniors: {
    path: {
      start: [0.36, 0.50],
      curves: [
        [[0.38, 0.42], [0.40, 0.28], [0.43, 0.24]],
      ],
    },
    waypoint: [0.43, 0.24],
  },
  scholars: {
    path: {
      start: [0.36, 0.50],
      curves: [
        [[0.38, 0.50], [0.40, 0.50], [0.43, 0.50]],
      ],
    },
    waypoint: [0.43, 0.50],
  },
  defence: {
    path: {
      start: [0.36, 0.50],
      curves: [
        [[0.38, 0.58], [0.40, 0.72], [0.43, 0.76]],
      ],
    },
    waypoint: [0.43, 0.76],
  },
  ambient: [
    {
      start: [0.10, 0.35],
      curves: [
        [[0.18, 0.28], [0.26, 0.24], [0.35, 0.22]],
      ],
    },
    {
      start: [0.12, 0.65],
      curves: [
        [[0.20, 0.72], [0.28, 0.76], [0.35, 0.78]],
      ],
    },
  ],
};

function toSvgPathString(def: PathDef, w: number, h: number): string {
  const formatPt = (p: Pt) => `${(p[0] * w).toFixed(1)} ${(p[1] * h).toFixed(1)}`;
  let d = `M ${formatPt(def.start)}`;
  for (const [c1, c2, end] of def.curves) {
    d += ` C ${formatPt(c1)}, ${formatPt(c2)}, ${formatPt(end)}`;
  }
  if (def.end) {
    d += ` L ${formatPt(def.end)}`;
  }
  return d;
}

export interface BuiltProgramsGeometry {
  entryD: string;
  decisionNode: { x: number; y: number };
  juniorsD: string;
  juniorsWaypoint: { x: number; y: number };
  scholarsD: string;
  scholarsWaypoint: { x: number; y: number };
  defenceD: string;
  defenceWaypoint: { x: number; y: number };
  ambientD: string[];
}

export function buildProgramsGeometry(width: number, height: number): BuiltProgramsGeometry {
  const g = DESKTOP_PROGRAMS;
  return {
    entryD: toSvgPathString(g.entry, width, height),
    decisionNode: { x: g.decisionNode[0] * width, y: g.decisionNode[1] * height },
    juniorsD: toSvgPathString(g.juniors.path, width, height),
    juniorsWaypoint: { x: g.juniors.waypoint[0] * width, y: g.juniors.waypoint[1] * height },
    scholarsD: toSvgPathString(g.scholars.path, width, height),
    scholarsWaypoint: { x: g.scholars.waypoint[0] * width, y: g.scholars.waypoint[1] * height },
    defenceD: toSvgPathString(g.defence.path, width, height),
    defenceWaypoint: { x: g.defence.waypoint[0] * width, y: g.defence.waypoint[1] * height },
    ambientD: g.ambient.map((a) => toSvgPathString(a, width, height)),
  };
}
