import {point} from "./point";

export function pointsOnGrid(x: number, y: number, callbackAtPt: (x: number, y: number) => void) {
    for (let i = 0; i < y; i++) {
        for (let j = 0; j < x; j++) {
            callbackAtPt(j, i);
        }
    }
}

export function pointsOnSquareGrid(x: number, callbackAtPt: (x: number, y: number) => void) {
    pointsOnGrid(x, x, callbackAtPt);
}

export function pointCoords(spacing: number, x: number, y: number): point {
    return {x: x * spacing, y: y * spacing}
}