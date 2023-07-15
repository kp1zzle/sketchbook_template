// ISOMETRIC
import {p5SVG} from "p5.js-svg";
import * as p5 from "p5";
import {convertToIsometric} from "./helpers/isometric";

// Description: Landscape made of small rainbow cubes.

const THETA = 30;
const ANIMATION_STEP = 0.1;
const COLORS = [
    [255,0,0],
    [255,128,0],
    [255,255,0],
    [0,255,0],
    [0,0,255]
];
const CUBE_LEN = 5;

const sketch = (s: p5SVG) => {
    s.setup = () => {
        s.createCanvas(s.windowWidth , s.windowHeight-4, s.SVG);
    };

    s.draw = () =>  {
        s.angleMode(s.DEGREES);
        s.background(0);
        //stroke(255)
        s.translate(s.windowWidth/2, s.windowHeight/2);
        //fill(255)
        //noFill();
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
            s.fill(s.random(COLORS));
            //stroke(random(COLORS))
            for (let p = 0; p < stack; p++) {

                IsoCube(points[i].x, p*CUBE_LEN, points[i].z, CUBE_LEN);
            }
        }

        s.noLoop();


    };

    function heightFunc(x: number, y: number) {
        // return sin(x)*50 + sin(y - 590) * 30 + sin(30*y - 590) * 5
        return(s.noise(x/244, y/250) * 300 + s.sin(x)*50);
    }

    function IsoCube(x: number, y: number, z: number, len: number) {
        IsoShape([
            {x: x, y: y, z:z},
            {x: x + len, y: y, z:z},
            {x: x + len, y: y + len, z:z},
            {x: x, y: y+len, z:z},
        ]);
        IsoShape([
            {x: x, y: y, z: z},
            {x: x , y: y, z: z + len},
            {x: x, y: y + len, z:z + len},
            {x: x, y: y+len, z:z},
        ]);
        IsoShape([
            {x: x + len, y: y + len, z: z},
            {x: x + len, y: y + len, z: z + len},
            {x: x, y: y + len, z:z + len},
            {x: x, y: y+len, z:z},
        ]);
    }

    function IsoShape(pts: {x: number, y:number, z: number}[]) {
        s.beginShape();
        for (let i = 0; i <= pts.length; i++) {
            const pt = convertToIsometric(s,pts[i % pts.length], THETA);
            s.vertex(pt.x, pt.y);
        }
        s.endShape();
    }
};
const P5 = new p5(sketch, document.body);