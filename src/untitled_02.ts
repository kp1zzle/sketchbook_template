// ROTATING SQUARE
// PARAMETERS
import {p5SVG} from "p5.js-svg";
import * as p5 from "p5";

// Description: Circle flying off into the galaxy.
// Date: 1/23/2023

const SQUARE_SIDE = 400;
const NUM_RECTS = 50;

const sketch = (s: p5SVG) => {
    s.setup = () => {
        s.createCanvas(s.windowWidth, s.windowHeight, s.SVG);
    };

    s.draw = () =>  {
        s.background(0);
        s.angleMode(s.DEGREES);
        s.noFill();
        s.strokeWeight(1);
        s.stroke(255);
        s.translate(s.windowWidth/2, s.windowHeight/2);
        s.rotate(19);
        for (let i = 0; i < NUM_RECTS; i ++) {
            // triangle(-SQUARE_SIDE, -SQUARE_SIDE, SQUARE_SIDE/2 , SQUARE_SIDE/2, -SQUARE_SIDE , SQUARE_SIDE)
            // rotate(3)
            const displacement = i;
            s.ellipse(100 + 5 * displacement, 100 + 0.2 * displacement,SQUARE_SIDE , SQUARE_SIDE );
            s.shearX(s.PI * 2.5);
            s.strokeWeight((1 / (1.2 * i)));
        }
        s.noLoop();
        // s.save()
    };
};
const P5 = new p5(sketch, document.body);