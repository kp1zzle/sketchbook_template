export interface point {
    x: number;
    y: number;
}

export class Point implements point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}