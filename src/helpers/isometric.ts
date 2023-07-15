import {p5SVG} from "p5.js-svg";

export function convertToIsometric(s: p5SVG, pt: {x: number, y:number, z: number}, theta: number) {
    const x = (pt.x - pt.z) * s.cos(theta);
    const y = -1 * pt.y - ((pt.x + pt.z) * s.sin(theta));
    return {x,y};
}

export function IsoCube(s: p5SVG, x: number, y: number, z: number, len: number, theta: number) {
    IsoShape(s, [
        {x: x, y: y, z:z},
        {x: x + len, y: y, z:z},
        {x: x + len, y: y + len, z:z},
        {x: x, y: y+len, z:z},
    ], theta);
    IsoShape(s, [
        {x: x, y: y, z: z},
        {x: x , y: y, z: z + len},
        {x: x, y: y + len, z:z + len},
        {x: x, y: y+len, z:z},
    ], theta);
    IsoShape(s, [
        {x: x + len, y: y + len, z: z},
        {x: x + len, y: y + len, z: z + len},
        {x: x, y: y + len, z:z + len},
        {x: x, y: y+len, z:z},
    ], theta);
}

export function IsoShape(s: p5SVG, pts: {x: number, y:number, z: number}[], theta: number) {
    s.beginShape();
    for (let i = 0; i <= pts.length; i++) {
        const pt = convertToIsometric(s, pts[i % pts.length], theta);
        s.vertex(pt.x, pt.y);
    }
    s.endShape();
}