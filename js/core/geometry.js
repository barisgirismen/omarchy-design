import { state } from "./state.js";
import { ASSETS } from "../data/marks.js";
import { clamp } from "./color.js";
import { shapeById } from "../data/shapes.js";

export function asset() { return ASSETS[state.asset]; }

export function frame() {
  const a = asset(), u = a.unit, pad = state.pad * u;
  let padX = pad, padY = pad;
  const r = shapeById(state.aspect).ratio;
  if (r) {
    const W = Math.max(a.w + 2 * pad, (a.h + 2 * pad) * r), H = W / r;
    padX = (W - a.w) / 2; padY = (H - a.h) / 2;
  }
  return { x: -padX, y: -padY, w: a.w + 2 * padX, h: a.h + 2 * padY, a, u };
}

/* Gradient axis across the mark itself (not the padded canvas). */
export function axis(angleDeg) {
  const a = asset(), rad = angleDeg * Math.PI / 180;
  const z = v => Math.abs(v) < 1e-9 ? 0 : v;
  const dx = z(Math.cos(rad)), dy = z(Math.sin(rad));
  const cx = a.w / 2, cy = a.h / 2;
  const half = Math.abs(dx * a.w / 2) + Math.abs(dy * a.h / 2);
  return { x1: cx - dx * half, y1: cy - dy * half, x2: cx + dx * half, y2: cy + dy * half, len: 2 * half, dx, dy };
}

export function snappable() { return state.snap && state.angle % 90 === 0; }

export function snapOffset(p) {
  if (!snappable()) return p;
  const a = asset(), ax = axis(state.angle);
  const rows = ax.len / a.unit;
  if (!isFinite(rows) || rows < 2) return p;
  return clamp(Math.round(p * rows) / rows, 0, 1);
}
