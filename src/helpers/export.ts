import {p5SVG} from "p5.js-svg";
import * as P5 from "p5";

export function exportPNG(s: p5SVG) {
    const filename = genFilename();
    s.save(filename.concat(".png"));
}

export function exportSVG(s: p5SVG, sketch: (s: p5SVG) => void) {
    const filename = genFilename();
    const div = document.createElement("div");
    div.id = "hidden_div";
    div.style.display = "none";
    document.body.appendChild(div);
    const svg = new P5(sketch, div);
    svg.setup = () => {
        svg.createCanvas(s.width, s.height, s.SVG);
    };
    svg.setup();
    svg.draw();
    svg.save(filename.concat(".svg"));
    svg.remove();
    div.remove();
}

function genFilename(): string {
    return document.title + "_" + (new Date).toISOString();
}