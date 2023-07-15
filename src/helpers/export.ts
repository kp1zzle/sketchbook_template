import {p5SVG} from "p5.js-svg";

export function exportPNG(s: p5SVG) {
    let filename = (new Date).toISOString()
    s.save(filename.concat(".png"))
}

export function exportSVG(s: p5SVG) {
    let filename = (new Date).toISOString()
    s.createCanvas(window.innerWidth, window.innerHeight, s.SVG)
    s.draw()
    s.save(filename.concat(".svg"))
    s.createCanvas(window.innerWidth, window.innerHeight)
    s.draw()
}