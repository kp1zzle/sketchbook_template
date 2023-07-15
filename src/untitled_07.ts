import {p5SVG} from "p5.js-svg";
import * as p5 from "p5";

// Description: Circles getting progressively more deformed.
// Date: 1/25/2023

const NUM_LOOPS = 100;
const sketch = (s: p5SVG) => {
    s.setup = () => {
        s.createCanvas(s.windowWidth , s.windowHeight-4, s.SVG);
    };

    s.draw = () =>  {
        s.background(255);
        s.stroke(0);
        s.strokeWeight(3);
        s.translate(120, 100);
        s.angleMode(s.DEGREES);
        s.noFill();

        for (let i = 0; i < NUM_LOOPS; i++) {
            //stroke(COLORS[i % 5])
            // strokeWeight(0.7 *sin(i + 4) + 0.7)


            const d = [];
            for (let y = 0; y < 10; y++) {
                d[y] = Math.floor(Math.random() * 25) * s.sin(Math.floor(Math.random() * 360));
            }

            // BEZIER
            // beginShape();
            // vertex(0,0)
            // // bezierVertex(-25,-25, -25, 25, -50,50)
            // bezierVertex(75+ disturbance, disturbance, 75 + disturbance, 100 + disturbance, 0,100)
            // // bezierVertex(50,50, 50,50, 50,50)
            // // curveVertex(-5*i,500-i)
            // // curveVertex(100-2*i,1000-i)
            // bezierVertex(-75 - disturbance,100 - disturbance, -75 - disturbance, -disturbance, 0,0)
            // endShape();

            const r = 75;
            s.curveTightness(-0.5);
            s.beginShape();
            for(let a = 0; a < i + 3; a++) {
                const theta = a * 360/i;
                const displacement = Math.floor(Math.random() * 15 - (i/10)) * s.sin(Math.floor(Math.random() * 360));
                s.curveVertex(r * s.sin(theta) + displacement, r* s.cos(theta) -displacement);
            }
            // curveVertex(-50 + d[8], 50 + d[9]);
            // curveVertex(0 + d[6], 0 + d[7]);
            // // curveVertex(40, 40);
            // curveVertex(50 + d[0], 50 + d[1]);
            //  // curveVertex(30, 90);
            // curveVertex(0 + d[2], 100 + d[3]);
            // // curveVertex(-25, 75);
            // curveVertex(-50 + d[4], 50 + d[5]);
            // // curveVertex(-25, 25);
            // curveVertex(0 + d[6], 0 + d[7]);
            // curveVertex(50 + d[8], 50 + d[9]);

            s.endShape();

            s.translate(200, 0);
            if (i > 0 && (i+1) % 7 === 0) {
                s.translate(-1400, 200);
            }
        }
        s.noLoop();
        // save()
    };
};
const P5 = new p5(sketch, document.body);