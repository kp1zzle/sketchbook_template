import {p5SVG} from "p5.js-svg";
import * as p5 from "p5";

// Description: Alternating squares made of lines in a square composition.
// Date: 1/25/2023

const WIDTH_BOXES = 10;
const HEIGHT_BOXES = 10;
const sketch = (s: p5SVG) => {
    s.setup = () => {
        s.createCanvas(s.windowWidth, s.windowHeight, s.SVG);
    };

    s.draw = () =>  {
        s.angleMode(s.DEGREES);
        s.background(0);
        s.stroke(255);
        s.translate(s.windowWidth/2 - WIDTH_BOXES*20, s.windowHeight/2 - HEIGHT_BOXES*20);
        for (let row = 0; row < HEIGHT_BOXES; row++) {
            for (let i = 0; i < WIDTH_BOXES; i++) {
                for (let b = 0; b < 6; b++) {
                    s.line(0, 0, 0, 50);
                    s.translate(10, 0);
                }

                if (i % 2 === 0) {
                    s.translate(40, 0);
                    s.rotate(90);
                } else {
                    s.translate(-60, 0);
                    s.rotate(-90);

                }
            }

            s.rotate(180);
            if (row % 2 === 0) {
                s.translate(0,-100);
            }

        }
    };
};
const P5 = new p5(sketch, document.body);