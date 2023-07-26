// ISOMETRIC
import {p5SVG} from "p5.js-svg";
import * as p5 from "p5";
import {point} from "./helpers/point";

// Description: One line connecting points.
// Date: 7/26/2023

const spacing = 30;
const numPts = 10;

const sketch = (s: p5SVG) => {
    s.setup = () => {
        s.createCanvas(s.windowWidth , s.windowHeight-4);
    };

    s.draw = () =>  {
        function calcPtCoords(x: number, y: number): point {
            return {x: spacing * x, y: spacing * y};
        }

        s.angleMode(s.DEGREES);
        s.background(0);
        s.stroke(255);
        s.noFill();
        s.noLoop();
        s.translate(s.windowWidth/2 - (spacing * numPts)/2, s.windowHeight/2 - (spacing * numPts)/2);

        // for (let i = 0; i < 30; i++) {
        //     for (let j = 0; j < 30; j++) {
        //         const pt = calcPtCoords(i, j);
        //         s.point(pt.x, pt.y);
        //     }
        // }

        const currPt = {x: 0, y: 0};
        s.beginShape();
        for (let i = 0; i < 2000; i++) {
            const pt = calcPtCoords(currPt.x, currPt.y);
            s.curveVertex(pt.x, pt.y);

            const possibleXDirections: number[] = [0];
            const possibleYDirections: number[] = [0];
            if (currPt.x != 0) {
                possibleXDirections.push(-1);
            }
            if (currPt.y != 0) {
                possibleYDirections.push(-1);
            }
            if (currPt.x != numPts+1) {
                possibleXDirections.push(1);
            }
            if (currPt.y != numPts+1) {
                possibleYDirections.push(1);
            }
            currPt.x += s.random(possibleXDirections);
            currPt.y += s.random(possibleYDirections);
        }
        s.endShape();
    };
};
const P5 = new p5(sketch, document.body);