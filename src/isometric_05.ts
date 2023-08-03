// ISOMETRIC
import {p5SVG} from "p5.js-svg";
import * as p5 from "p5";
import {IsoCube} from "./helpers/isometric";
import {defaultKeys} from "./helpers/key_pressed";

// Description: Terrain of white cubes.
// Date: 2/11/2023

const THETA = 30;
const ANIMATION_STEP = 0.1;
const COLORS = [
    [255,0,0],
    [255,128,0],
    [255,255,0],
    [0,255,0],
    [0,0,255]
];
const CUBE_LEN = 10;
const sketch = (s: p5SVG) => {
    s.setup = () => {
        s.createCanvas(s.windowWidth , s.windowHeight-4);
    };

    s.draw = () =>  {
        s.angleMode(s.DEGREES);
        s.background(0);
        s.stroke(255);
        s.translate(s.windowWidth/2, s.windowHeight/2);
        // fill(255)
        s.noFill();
        const points = [];

        for (let x = 0; x <= 500; x += CUBE_LEN) {
            for (let y = 0; y <= 500; y += CUBE_LEN) {
                points.push({x: x, y: -heightFunc(x, y), z: y});
            }
        }

        for (let i = points.length-1; i > 0; i--) {
            //resetMatrix();
            //IsoTranslate(points[i].x, -1600, points[i].z)
            const stack = -1 * points[i].y / CUBE_LEN;
            // fill(random(COLORS))
            //stroke(random(COLORS))
            IsoCube(s, points[i].x,  points[i].y, points[i].z, CUBE_LEN, THETA);
        }

        // save();
    };

    s.keyPressed = () => {
        defaultKeys(s, sketch);
    };

    function heightFunc(x: number, y: number) {
        // return sin(x)*50 + sin(y - 590) * 30 + sin(30*y - 590) * 5
        return(s.noise(x/244, y/250) * 300 + s.sin(x)*50);
    }


};
const P5 = new p5(sketch, document.body);