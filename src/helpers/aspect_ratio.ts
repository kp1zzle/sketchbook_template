import {p5SVG} from "p5.js-svg";

export function setAspectRatio(s: p5SVG, w: number, h: number) {
    const unit = s.min(s.windowWidth / w, s.windowHeight / h);
    s.resizeCanvas(unit * w, unit * h);
}