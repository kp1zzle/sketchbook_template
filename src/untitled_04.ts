import {p5SVG} from "p5.js-svg";
import * as p5 from "p5";

// Description: Parallel swooshing lines.
// Date: 1/24/2023

const NUM_LINES = 100;
const COLORS = [
    [248,145,3],
    [255,237,2],
    [255,5,5],
    [255,52,203],
    [76,17,48]
];
let v1 = 5;
let v2 = 6;

const sketch = (s: p5SVG) => {
    s.setup = () => {
        s.createCanvas(s.windowWidth, s.windowHeight, s.SVG);
    };

    s.draw = () =>  {
        s.background(0);
        s.stroke(255);
        s.translate(s.windowWidth/2 - NUM_LINES/2*10, s.windowHeight/2 - 500);
        s.noFill();
        for (let i = 0; i < NUM_LINES; i++) {
            s.stroke(COLORS[i % 5]);
            s.strokeWeight(0.4 **s.sin(0.1*i + 4) + 0.7);
            s.beginShape();
            s.vertex(0,0);
            s.vertex(0,0);
            s.curveVertex(2+v1*i,300);
            s.curveVertex(2-v2*(NUM_LINES - i),600);
            // curveVertex(-5*i,500-i)
            // curveVertex(100-2*i,1000-i)
            s.vertex(0,1000);
            s.vertex(0,1000);
            s.endShape();
            s.translate(10, 0);
        }
    };

    s.mouseDragged = () => {
        v1 += (s.mouseX - s.pmouseX)/100;
        v2 += (s.mouseY - s.pmouseY)/100;
    };
};
const P5 = new p5(sketch, document.body);