import {p5SVG} from "p5.js-svg";
import {exportPNG, exportSVG} from "./export";

export function defaultKeys(s: p5SVG, sketch: (s: p5SVG) => void) {
    if (s.key === "s") {
        exportPNG(s);
    } else if (s.key === "S") {
        exportSVG(s, sketch);
    }
}