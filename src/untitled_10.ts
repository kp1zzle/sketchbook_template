import {p5SVG} from "p5.js-svg";
import * as p5 from "p5";

// Description: When does a square become a circle?
// Date: 2/28/2023

let ANIMATION_STEP = 0;
let MULT = 0.1;

const sketch = (s: p5SVG) => {
    s.setup = () => {
        const canvasSize = s.min(s.windowWidth, s.windowHeight-4);
        s.createCanvas(canvasSize , canvasSize, s.SVG);
    };

    s.draw = () =>  {
        s.angleMode(s.DEGREES);
        s.background(0);
        s.stroke(255);
        s.translate(100, 100);
        const canvasSize = s.min(s.windowWidth, s.windowHeight-4);
        const r = 100;
        const row = 1;
        const displacement =300;
        const shapesPerRow = s.floor(canvasSize / displacement);
        // for (let i = 2; i < 100; i++) {
        //     beginShape();
        //     for (let p = 0; p < i; p++){
        //         let theta = 360/i * p
        //         vertex(r * sin(theta), r * cos(theta))
        //     }
        //     endShape();
        //
        //     translate(displacement, 0)
        //     if (row === shapesPerRow) {
        //         row = 1
        //         translate(-displacement * shapesPerRow, displacement)
        //     } else {
        //         row += 1
        //     }
        // }
        s.translate(canvasSize/2 - r, canvasSize/2 - r);
        s.beginShape();
        for (let p = 0; p < ANIMATION_STEP; p++){
            const theta = 360/s.floor(ANIMATION_STEP) * p;
            s.vertex(r * s.sin(theta), r * s.cos(theta));
        }
        s.endShape();
        if (ANIMATION_STEP > 30){
            MULT = -0.1;
        }

        if (ANIMATION_STEP < 0){
            MULT = 0.1;
        }


        ANIMATION_STEP += MULT;

    };
};
const P5 = new p5(sketch, document.body);