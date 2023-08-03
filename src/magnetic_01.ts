import init, {p5SVG} from "p5.js-svg";
import * as P5 from "p5";
import {defaultKeys} from "./helpers/key_pressed";
import {point} from "./helpers/point";

// Description: Magnetic field diagram, all lines point to one point.
// Date: 07/19/2023

init(P5);
const NUM_LINES = 50;
const NUM_ROWS: number = 50;
let towardsPt: point = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
};

const sketch = (s: p5SVG) => {
    s.setup = () => {
        s.createCanvas(s.windowWidth, s.windowHeight);
    };

    s.draw = () =>  {
        function endPointAlongLineAtDist(start: point, end: point, d: number): point {
            const vec: point = {x: end.x-start.x, y: end.y-start.y};
            const dist = s.sqrt((vec.x*vec.x) + (vec.y*vec.y));
            return{x: start.x + d*(vec.x/dist), y: start.y + d*(vec.y/dist)};
        }

        towardsPt = {x: s.mouseX, y: s.mouseY};

        s.background(0);
        s.stroke(255);
        s.noFill();

        const leftCorner = {x: window.innerWidth / 2 - 15 * NUM_LINES/2, y: window.innerHeight / 2 - 15 * NUM_ROWS/2};

        for (let row = 0; row < NUM_ROWS; row++) {
            for (let i = 0; i < NUM_LINES; i++) {
                const centerPt = {x: leftCorner.x + i * 15, y: leftCorner.y + 15 * row};
                const endPt = endPointAlongLineAtDist(centerPt, towardsPt, 5);
                const startPt = endPointAlongLineAtDist(centerPt, towardsPt, -5);

                s.stroke(255);
                s.line(startPt.x, startPt.y, endPt.x, endPt.y);
            }
        }


    };

    s.keyPressed = () => {
        defaultKeys(s, sketch);
    };

    s.mouseClicked = () => {
        towardsPt = {x: s.mouseX, y: s.mouseY};
    };
};
new P5(sketch, document.body);