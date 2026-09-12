import { state } from "../core/state.js";
import { frame } from "../core/geometry.js";
import { buildSVG } from "../core/svg.js";
import { $ } from "../ui/dom.js";

let liveSVG = null;

export function getLiveSVG() { return liveSVG; }

export function render() {
  const svg = buildSVG();
  svg.removeAttribute("width"); svg.removeAttribute("height");
  const stage = $("stage");
  stage.replaceChildren(svg);
  stage.classList.toggle("transparent", state.bg.mode === "none");
  liveSVG = svg;
  fit();
}

export function fit() {
  if (!liveSVG) return;
  const wrap = document.querySelector(".stagewrap");
  const cs = getComputedStyle(wrap);
  const availW = wrap.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
  const availH = wrap.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
  const f = frame(), ar = f.w / f.h;
  let w = availW, h = w / ar;
  if (h > availH) { h = availH; w = h * ar; }
  liveSVG.style.width = Math.max(24, w) + "px";
  liveSVG.style.height = Math.max(24, h) + "px";
}
addEventListener("resize", fit);
