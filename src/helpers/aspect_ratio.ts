import {p5SVG} from "p5.js-svg";

export function setAspectRatio(s: p5SVG, w: number, h: number) {
    const unit = s.min(s.windowWidth / w, s.windowHeight / h);
    s.resizeCanvas(unit * w, unit * h);
}

export function setAspectRatioStr(s: p5SVG, aspect: string) {
    let dims = aspect.split(":");
    if (dims.length !== 2) {
        dims = aspect.split("x");
    }
    if (dims.length !== 2) {
        return;
    }

    const w = parseFloat(dims[0]);
    if (isNaN(w)) {
        return;
    }
    const h = parseFloat(dims[1]);
    if (isNaN(h)) {
        return;
    }

    setAspectRatio(s, w, h);
}