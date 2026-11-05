/**
 * Tiny, allocation-free helpers for imperative scroll-linked animation.
 * Used by the Guiding Thread renderer so scroll updates never touch React state.
 */

export type Ease = (t: number) => number;

export const linear: Ease = (t) => t;
export const easeInOutSine: Ease = (t) => -(Math.cos(Math.PI * t) - 1) / 2;
export const easeOutCubic: Ease = (t) => 1 - Math.pow(1 - t, 3);

/**
 * Piecewise interpolation, clamped at both ends.
 * `eases` (optional) supplies an easing function per segment.
 */
export function interpolate(
  p: number,
  input: readonly number[],
  output: readonly number[],
  eases?: readonly Ease[] | Ease
): number {
  const last = input.length - 1;
  if (p <= input[0]) return output[0];
  if (p >= input[last]) return output[last];

  let i = 1;
  while (i < last && p > input[i]) i++;

  const span = input[i] - input[i - 1] || 1;
  const t = (p - input[i - 1]) / span;
  const ease = typeof eases === "function" ? eases : eases?.[i - 1] ?? linear;
  return output[i - 1] + (output[i] - output[i - 1]) * ease(t);
}

export type RGB = readonly [number, number, number];

/* Officium palette as RGB tuples (mirrors the CSS tokens in styles/globals.css). */
export const RGB_CREAM: RGB = [232, 220, 198];
export const RGB_BURGUNDY: RGB = [114, 47, 55];
export const RGB_TAUPE: RGB = [183, 168, 154];
export const RGB_INK: RGB = [33, 28, 29];

export function mixRgb(a: RGB, b: RGB, t: number): string {
  const k = Math.min(1, Math.max(0, t));
  const r = Math.round(a[0] + (b[0] - a[0]) * k);
  const g = Math.round(a[1] + (b[1] - a[1]) * k);
  const bl = Math.round(a[2] + (b[2] - a[2]) * k);
  return `rgb(${r} ${g} ${bl})`;
}

export function rgb(c: RGB, alpha = 1): string {
  return alpha >= 1 ? `rgb(${c[0]} ${c[1]} ${c[2]})` : `rgb(${c[0]} ${c[1]} ${c[2]} / ${alpha})`;
}
