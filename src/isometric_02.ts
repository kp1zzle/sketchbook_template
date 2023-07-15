// ISOMETRIC
import {p5SVG} from "p5.js-svg";
import * as p5 from "p5";
import {convertToIsometric} from "./helpers/isometric";

// Description: Isometric plane made of squares.

let THETA = 30;
let ANIMATION_STEP = 0.1;
const COLORS = [
    [255,0,0],
    [255,128,0],
    [255,255,0],
    [0,255,0],
    [0,0,255]
];

const sketch = (s: p5SVG) => {
    s.setup = () => {
        s.createCanvas(s.windowWidth , s.windowHeight-4, s.SVG);
    };

    s.draw = () =>  {
        s.angleMode(s.DEGREES);
        s.background(0);
        s.stroke(255);
        s.translate(s.windowWidth/2, s.windowHeight/2);
        s.noFill();

        const points = [];

        for (let x = 0; x <= 500; x += 10) {
            s.stroke(COLORS[x / 10 % 5]);
            s.beginShape();
            for (let y = 0; y <= 500; y += 10) {
                points.push(convertToIsometric(s, {x: x, y: -heightFunc(x, y), z: y}, THETA));
                const pt = convertToIsometric(s,{x: x, y: -heightFunc(x, y), z: y}, THETA);
                //vertex(pt.x, pt.y)
            }
            s.endShape();
        }

        s.noFill();

        const borderPoints = [
            {x: 0, y: 0},
            {x: 500, y: 0},
            {x: 500, y: 500},
            {x: 0, y: 500},
        ];
        const borderHeights = [];
        for (let i = 0; i < 4; i++) {
            borderHeights.push(-heightFunc(borderPoints[i].x, borderPoints[i].y));
        }
        s.beginShape();
        let endPoint;
        for (let i = 0; i < 4; i++) {
            const minHeight = s.min(borderHeights);
            const x = borderPoints[i].x;
            const y = borderPoints[i].y;
            const upperPt = convertToIsometric(s,{x: x, y: -heightFunc(x, y), z: y }, THETA);
            const lowerPt = convertToIsometric(s,{x: x, y: minHeight - 50, z: y }, THETA);
            s.line(upperPt.x, upperPt.y, lowerPt.x, lowerPt.y);
            s.vertex(lowerPt.x, lowerPt.y);
            if (i === 0) {
                endPoint = lowerPt;
            }
        }
        s.vertex(endPoint.x, endPoint.y);
        s.endShape();

        s.beginShape();
        for (let i = 0; i <= 50; i++) {
            s.vertex(points[i * 51].x, points[i * 51].y);
        }
        s.endShape();


        s.beginShape();
        for (let i = 0; i <= 50; i++) {
            s.vertex(points[(i * 51) + 50].x, points[(i * 51) + 50].y);
        }
        s.endShape();




        for (let i = points.length - 1; i > 0; i--) {
            // beginShape();
            // vertex(points[i].x, points[i].y)
            // vertex(points[i + 50 % 2500].x, points[i + 50 % 2500].y)
            // vertex(points[i + 51 % 2500].x, points[i + 51 % 2500].y)
            // endShape()
            //
            s.stroke(COLORS[4]);
            s.strokeWeight(0.7* s.sin(50*i) + 1);
            s.fill(0);
            //circle(points[i].x, points[i].y, heightFunc(points[i].x, points[i].y)/15)
            const len = 10;
            s.beginShape();
            s.vertex(points[i].x, points[i].y);
            s.vertex(points[i].x, points[i].y + len);
            s.vertex(points[i].x + len, points[i].y + len);
            s.vertex(points[i].x + len, points[i].y);
            s.vertex(points[i].x, points[i].y);
            s.endShape();
        }



        // for (let y = 0; y < 500; y += 10) {
        //     stroke(COLORS[y /10 % 5])
        //     beginShape();
        //     for (let x = 0; x < 500; x += 10) {
        //         let pt = convertToIsometric({x: x, y: -heightFunc(x, y), z: y })
        //         vertex(pt.x, pt.y)
        //     }
        //     endShape();
        // }

        if (THETA + ANIMATION_STEP > 30 || THETA + ANIMATION_STEP < 0) {
            ANIMATION_STEP *= -1;
        }
        THETA = (THETA + ANIMATION_STEP);
        // noiseSeed(THETA/3);
    };

    function heightFunc(x: number, y: number) {
        // return sin(x)*50 + sin(y - 590) * 30 + sin(30*y - 590) * 5
        return(s.noise(x/244, y/250) * 300 + s.sin(x)*50);
    }

};
const P5 = new p5(sketch, document.body);