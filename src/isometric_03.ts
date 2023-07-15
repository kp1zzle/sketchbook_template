// ISOMETRIC
import {p5SVG} from "p5.js-svg";
import * as p5 from "p5";
import {convertToIsometric} from "./helpers/isometric";

// Description: Rainbow stairs made of cubes.

let THETA = 30;
let ANIMATION_STEP = 0.1
const COLORS = [
    [255,0,0],
    [255,128,0],
    [255,255,0],
    [0,255,0],
    [0,0,255]
];
let sketch = (s: p5SVG) => {
    s.setup = () => {
        s.createCanvas(s.windowWidth , s.windowHeight-4, s.SVG);
    }

    s.draw = () =>  {
        s.angleMode(s.DEGREES)
        s.background(0)
        s.stroke(255)
        s.translate(s.windowWidth/2, s.windowHeight - s.windowHeight*0.15)
        IsoTranslate(30*25, 0, 0)
        s.noFill()

        const points = []

        // for (let x = 0; x <= 500; x += 10) {
        //     stroke(COLORS[x / 10 % 5])
        //     beginShape();
        //     for (let y = 0; y <= 500; y += 10) {
        //         points.push(convertToIsometric({x: x, y: -heightFunc(x, y), z: y}))
        //         pt = convertToIsometric({x: x, y: -heightFunc(x, y), z: y})
        //         //vertex(pt.x, pt.y)
        //     }
        //     endShape();
        // }

        s.noFill()

        for (let t = 50; t > 0; t--) {
            for (let i = 0; i < 50-t; i++) {
                s.fill(COLORS[i%5])
                IsoCube(0, 0, 0, 30)
                IsoTranslate(0, 30, 0)
            }
            IsoTranslate(-30, -30 * (50-t), 0)
        }


        // IsoShape([
        //     {x: 0, y: 500, z:0},
        //     {x: 0, y: 600, z:250},
        //     {x: 0, y: 500, z:500},
        // ])
        // IsoShape([
        //     {x: 500, y: 500, z:0},
        //     {x: 500, y: 600, z:250},
        //     {x: 500, y: 500, z:500},
        // ])
        // IsoShape([
        //     {x: 0, y: 600, z:250},
        //     {x: 500, y: 600, z:250},
        // ])
        if (THETA + ANIMATION_STEP > 30 || THETA + ANIMATION_STEP < 0) {
            ANIMATION_STEP *= -1
        }
        THETA = (THETA + ANIMATION_STEP)

    }
    function IsoTranslate(x: number, y: number, z: number) {
        let pt = convertToIsometric(s,{x: x, y: y, z:z}, THETA)
        s.translate(pt.x, pt.y)
    }
    function IsoCube(x: number, y: number, z: number, len: number) {
        IsoShape([
            {x: x, y: y, z:z},
            {x: x + len, y: y, z:z},
            {x: x + len, y: y + len, z:z},
            {x: x, y: y+len, z:z},
        ])
        IsoShape([
            {x: x, y: y, z: z},
            {x: x , y: y, z: z + len},
            {x: x, y: y + len, z:z + len},
            {x: x, y: y+len, z:z},
        ])
        IsoShape([
            {x: x + len, y: y + len, z: z},
            {x: x + len, y: y + len, z: z + len},
            {x: x, y: y + len, z:z + len},
            {x: x, y: y+len, z:z},
        ])
    }

    function IsoShape(pts: {x: number, y:number, z: number}[]) {
        s.beginShape();
        for (let i = 0; i <= pts.length; i++) {
            let pt = convertToIsometric(s,pts[i % pts.length], THETA)
            s.vertex(pt.x, pt.y)
        }
        s.endShape();
    }
}
const P5 = new p5(sketch, document.body);