import {p5SVG} from "p5.js-svg";
import * as p5 from "p5";

// Description: Swoosh.

const NUM_LOOPS = 100;
const sketch = (s: p5SVG) => {
    s.setup = () => {
        s.createCanvas(s.windowWidth , s.windowHeight-4, s.SVG);
    };

    s.draw = () =>  {
        s.angleMode(s.DEGREES);
        s.background(0);
        s.stroke(255);
        s.translate(s.windowWidth/2 - 500, s.windowHeight/2 + 500);
        s.noFill();
        for (let i = 0; i < 100; i++) {
            //line(0,0, 0, -500 + (sin(2*i + 200)*500))
            s.curve(-900, 100, 0,0, 0, -500 + (s.sin(2*i + 200)*500), -800, 10);
            // curve(-300, 0, 0, 400, 200, 300, 800, 400)
            s.translate(10,0);
        }
    };
};
const P5 = new p5(sketch, document.body);