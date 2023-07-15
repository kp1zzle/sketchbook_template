import * as p5 from "p5";
import init, { p5SVG } from "p5.js-svg";
import {defaultKeys} from "./helpers/key_pressed";

// Description: Wavy lines get farther apart over time.

init(p5);
let t = 0;
let space_between = 3;
const sketch = (s: p5SVG) => {
    s.setup = () => {
        s.createCanvas(window.innerWidth, window.innerHeight);
    };

    s.draw = () => {
        t+= 0.1;
        space_between += 0.001;
        s.background(0);
        s.noFill();
        const NUM_LINES = 100;
        s.translate(window.innerWidth/2 - space_between*(NUM_LINES/2), 0);

        const h = window.innerHeight;
        for (let i = 0; i < NUM_LINES; i++) {
            // s.stroke(COLORS[i % 5])
            s.stroke(s.lerpColor(
                s.color("#fd9200"),
                s.color("#bc43ff"),
                i/NUM_LINES,
            ));
            s.strokeWeight(0.4 **s.sin(0.1*i + t) + 0.3);
            s.beginShape();
            s.vertex(0,0);
            s.vertex(0,0);
            s.curveVertex(3+0.1*i,0.3*h);
            s.curveVertex(40-(NUM_LINES - i),0.6*h);
            // curveVertex(-5*i,500-i)
            // curveVertex(100-2*i,1000-i)
            s.vertex(0,h);
            s.vertex(0,h);
            s.endShape();
            s.translate(space_between, 0);
        }
    };

    s.keyPressed = () => {
        defaultKeys(s);
    };

};

const P5 = new p5(sketch, document.body);