import {p5SVG} from "p5.js-svg";
import * as p5 from "p5";

// Description: Iterative shearing.

let NUM_ROWS = 6
let ELEMENTS_PER_ROW = 22

let sketch = (s: p5SVG) => {
    s.setup = () => {
        s.createCanvas(s.windowWidth, s.windowHeight, s.SVG);
    }

    s.draw = () => {
        s.background(0);
        s.noFill();
        s.strokeWeight(1);
        let palette = [
            [255, 204, 100],
            [227, 41, 174],
            [26, 201, 55],
            [59, 13, 212],
            [227, 23, 53],
            [255, 204, 100],
        ]
        for (let a = 0; a < NUM_ROWS; a++) {
            s.stroke(palette[a][0], palette[a][1], palette[a][2]);
            for (let i = 1; i < ELEMENTS_PER_ROW; i++) {
                let displacement = i * (a + 1);
                s.ellipse(100 + 0.5 * displacement, 100 + 5 * displacement, 80 * (a + 1), 80 * (a + 1));
                if (a + 1 % 2) {
                    s.shearX(s.PI / 45.0 * (a + 1));
                    s.shearY(-s.PI / 45.0 * (a + 1));
                }
            }
            // resetMatrix();
            // translate(590 - (a * 50), 200 * (a + 1) - 250)
            // for (let i = 1; i < ELEMENTS_PER_ROW; i++) {
            //     displacement = i * (a + 1);
            //     rect(100 + 0.5 * displacement, 100 + 5 * displacement, 40 * (5-a), 20 * (5-a));
            //     if (a + 1 % 2) {
            //         shearY(PI / 45.0 * (a + 1));
            //     }
            // }
            s.resetMatrix();
            s.translate(0, 100 * ((2 * a) + 1))

        }
        //save()
    }
}
const P5 = new p5(sketch, document.body);