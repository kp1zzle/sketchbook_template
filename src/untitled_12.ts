import init, {p5SVG} from "p5.js-svg";
import * as P5 from "p5";
import {defaultKeys} from "./helpers/key_pressed";

// Description: Layering untitled_04.
// Date: 07/17/2023

init(P5);
const NUM_LINES = 100;
const COLORS = [
    "#ba00ff",
    "#00ffe1",
];
let v1 = 5;
let v2 = 6;
let rot = 0;

const sketch = (s: p5SVG) => {
    s.setup = () => {
        s.createCanvas(s.windowWidth, s.windowHeight);
    };

    s.draw = () =>  {
        s.background(0);
        s.translate(s.windowWidth/2 - NUM_LINES/2*10, s.windowHeight/2 - 500);
        s.noFill();
        s.strokeWeight(4);
        s.stroke(COLORS[0]);
        for (let i = 0; i < NUM_LINES; i++) {
            s.beginShape();
            s.vertex(0,0);
            s.vertex(0,0);
            s.curveVertex(2+v1*i,300);
            s.curveVertex(2-v2*(NUM_LINES - i),600);
            // curveVertex(-5*i,500-i)
            // curveVertex(100-2*i,1000-i)
            s.vertex(-20 * (i % 5),1000);
            s.vertex(-20 * (i % 5),1000);
            s.endShape();
            s.translate(10, 0);
        }
        s.translate(-10*NUM_LINES, 0);
        s.stroke(COLORS[1]);
        s.translate(NUM_LINES/2*10, 500);
        s.rotate(rot);
        s.translate(-NUM_LINES/2*10, -500);

        for (let i = 0; i < NUM_LINES/2; i++) {
            s.beginShape();
            s.vertex(-20 * (i % 5),0);
            s.vertex(-20 * (i % 5),0);
            s.curveVertex(2+v1*i,300);
            s.curveVertex(2-v2*(NUM_LINES - i),600);
            // curveVertex(-5*i,500-i)
            // curveVertex(100-2*i,1000-i)
            s.vertex(60,1000);
            s.vertex(60,1000);
            s.endShape();
            s.translate(20, 0);
        }
    };

    s.keyPressed = () => {
        defaultKeys(s);
    };

    s.mouseDragged = () => {
        v1 += (s.mouseX - s.pmouseX)/100;
        v2 += (s.mouseY - s.pmouseY)/100;
    };

    s.mouseWheel = (event: {delta: number}) => {
        rot -= event.delta/100;
    };
};
new P5(sketch, document.body);