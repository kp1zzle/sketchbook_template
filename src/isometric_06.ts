// ISOMETRIC
import {p5SVG} from "p5.js-svg";
import * as p5 from "p5";
import {convertToIsometric} from "./helpers/isometric";

// Description: Vertical plane of parallel lines.
// Date: 7/25/2023

const THETA = 15;
const NUM_LINES = 100;
const LINE_LEN = 600;
const SPACING = 2;
const POINTS_PER_LINE = 50;

const sketch = (s: p5SVG) => {
    s.setup = () => {
        s.createCanvas(s.windowWidth , s.windowHeight-4);
    };

    s.draw = () =>  {
        s.angleMode(s.DEGREES);
        s.background(0);
        s.stroke(255);
        s.noFill();
        s.translate(s.windowWidth/2 - NUM_LINES*SPACING/2, s.windowHeight - 60);

        for (let i = 0; i < NUM_LINES; i++) {
            s.beginShape();
            for (let j = 0; j < POINTS_PER_LINE; j++) {
                const pt = convertToIsometric(s, {x: i*SPACING, y: j*LINE_LEN/POINTS_PER_LINE, z: 60*s.noise(i*SPACING / 200, j*LINE_LEN/POINTS_PER_LINE / 200)}, THETA);
                s.vertex(pt.x, pt.y);
            }
            s.endShape();
        }
    };
};
const P5 = new p5(sketch, document.body);