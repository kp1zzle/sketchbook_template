import {p5SVG} from "p5.js-svg";
import {exportPNG, exportSVG} from "./export";
import {setAspectRatio} from "./aspect_ratio";

export function defaultKeys(s: p5SVG, sketch: (s: p5SVG) => void) {
    if (s.key === "s") {
        exportPNG(s);
    } else if (s.key === "S") {
        exportSVG(s, sketch);
    } else if (s.key === "1") {
        s.resizeCanvas(s.windowWidth, s.windowHeight);
    } else if (s.key === "2") {
        setAspectRatio(s, 11, 14);
    } else if (s.key === "3") {
        setAspectRatio(s, 9, 16);
    }
}