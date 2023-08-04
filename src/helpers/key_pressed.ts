import {p5SVG} from "p5.js-svg";
import {exportPNG, exportSVG} from "./export";

export function defaultKeys(s: p5SVG, sketch: (s: p5SVG) => void) {
    if (s.key === "s") {
        exportPNG(s);
    } else if (s.key === "S") {
        exportSVG(s, sketch);
    } else if (s.key === "1") {
        s.resizeCanvas(s.windowWidth, s.windowHeight);
    } else if (s.key === "2") {
        const unit = s.min(s.windowWidth / 11, s.windowHeight / 14);
        s.resizeCanvas(unit * 11, unit * 14);
    }
}