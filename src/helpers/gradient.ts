import {point} from "./point";
import {pointCoords, pointsOnGrid} from "./grid";
import {mul} from "three/examples/jsm/nodes/shadernode/ShaderNodeBaseElements";
import {p5SVG} from "p5.js-svg";

export function gradient(
    width: number,
    height: number,
    lenFn: (x: number, y: number) => number,
    coordFn: (x: number, y: number) => point | null,
    shapeFn: (pt: point, len: number) => void,
    ): void {

    pointsOnGrid(width, height, (x: number, y: number) => {
        const l = lenFn(x, y);
        const pt = coordFn(x, y);
        if (pt) {
            shapeFn(pt, l);
        }
    });
}


export function verticalGradLenFn(
    height: number,
    spacing: number,
    multiplier: number,
    ): (x: number, y: number) => number {

    return (x: number, y: number) => {
        return y/height * spacing * multiplier;
    }
}

export function defaultCoordFn(spacing: number): (x: number, y: number) => point | null {
    return (x: number, y: number) => {
        return pointCoords(spacing, x, y)
    }
}

export function defaultDiamondShapeFn(s: p5SVG): (pt: point, len: number) => void {
    return (pt: point, len: number) => {
        s.beginShape();
        s.vertex(pt.x, pt.y - len/2);
        s.vertex(pt.x - len/2, pt.y);
        s.vertex(pt.x, pt.y + len/2);
        s.vertex(pt.x + len/2, pt.y);
        s.vertex(pt.x, pt.y - len/2);
        s.endShape();
    }
}