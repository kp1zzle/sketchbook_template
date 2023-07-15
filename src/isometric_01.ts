// ISOMETRIC
import {p5SVG} from "p5.js-svg";
import * as p5 from "p5";
import {convertToIsometric} from "./helpers/isometric";

// Description: Window with an isometric sine wave.
// Date: 1/28/2023

const THETHA = 30;

const sketch = (s: p5SVG) => {
    s.setup = () => {
        s.createCanvas(s.windowWidth , s.windowHeight-4, s.SVG);
    };

    s.draw = () =>  {
        s.angleMode(s.DEGREES);
        s.background(0);
        s.stroke(255);
        s.translate(s.windowWidth/2, s.windowHeight/2);
        const pt = convertToIsometric(s,{x: -300, y: -300, z:0}, THETHA);
        s.translate(pt.x, pt.y);
        s.noFill();
        const points = [
            {x: 0, y: 0, z: 0},
            {x: 600, y: 0, z: 0},
            {x: 600, y: 600, z: 0},
            {x: 0, y: 600, z: 0},
        ];
        let lastPoint = {x:0, y:0};
        for (let i = 0; i < 56; i++) {
            const startPoint = convertToIsometric(s,{x: 10*i, y: 0, z: i *5 }, THETHA);
            const endPoint = convertToIsometric(s,{x: 10*i, y:  -(s.sin(2*i + 250)*500), z: i* 5}, THETHA);
            s.line(startPoint.x, startPoint.y, endPoint.x, endPoint.y);
            lastPoint = endPoint;
        }

        s.line(lastPoint.x, lastPoint.y, convertToIsometric(s,points[1], THETHA).x, convertToIsometric(s,points[1], THETHA).y);

        for (let i = 0; i < 4; i++) {
            const startPoint = convertToIsometric(s,points[i], THETHA);
            const endPoint = convertToIsometric(s,points[(i + 1) % 4], THETHA);
            s.line(startPoint.x, startPoint.y, endPoint.x, endPoint.y);
        }
    };
};
const P5 = new p5(sketch, document.body);