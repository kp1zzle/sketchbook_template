import init, {p5SVG} from "p5.js-svg";
import * as P5 from "p5";
import {defaultKeys} from "./helpers/key_pressed";
import {point} from "./helpers/point";

// Description: Magnetic 1 and 2 overlayed on each other.
// Date: 07/20/2023 12:02:00Z

init(P5);
const NUM_LINES = 50;
const NUM_ROWS: number = 50;
let layer1Point = {x: window.innerWidth / 2, y: window.innerHeight / 2};
const layer2Points: point[] = Array(NUM_ROWS * NUM_LINES).fill({x: window.innerWidth / 2, y: window.innerHeight / 2});
let radius: number = 100;

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

        function determineIndex(row: number, column: number): number {
            return row * NUM_LINES + column;
        }

        function dist(start: point, end: point): number {
            const vec: point = {x: end.x-start.x, y: end.y-start.y};
            return s.sqrt((vec.x*vec.x) + (vec.y*vec.y));
        }

        // towardsPt = {x: s.mouseX, y: s.mouseY};

        s.background(0);
        s.stroke(255);
        s.noFill();
        layer1Point = {x: s.mouseX, y: s.mouseY};
        const leftCorner = {x: window.innerWidth / 2 - 15 * NUM_LINES/2, y: window.innerHeight / 2 - 15 * NUM_ROWS/2};

        for (let row = 0; row < NUM_ROWS; row++) {
            for (let i = 0; i < NUM_LINES; i++) {
                const centerPt = {x: leftCorner.x + i * 15, y: leftCorner.y + 15 * row};

                // layer 1
                s.stroke("#fd9200");
                const layer1EndPt = endPointAlongLineAtDist(centerPt, layer1Point, 5);
                const layer1StartPt = endPointAlongLineAtDist(centerPt, layer1Point, -5);
                s.line(layer1StartPt.x, layer1StartPt.y, layer1EndPt.x, layer1EndPt.y);

                // layer 2
                s.stroke("#bc43ff");
                if (dist(centerPt, {x: s.mouseX, y: s.mouseY}) <= radius) {
                    layer2Points[determineIndex(row, i)] = {x: s.mouseX, y: s.mouseY};
                }
                const layer2TowardsPt = layer2Points[determineIndex(row, i)];
                const endPt = endPointAlongLineAtDist(centerPt, layer2TowardsPt, 10);
                const startPt = endPointAlongLineAtDist(centerPt, layer2TowardsPt, -10);
                s.line(startPt.x, startPt.y, endPt.x, endPt.y);
            }
        }


    };

    s.keyPressed = () => {
        defaultKeys(s, sketch);
    };

    s.mouseClicked = () => {
        layer1Point = {x: s.mouseX, y: s.mouseY};
    };

    s.mouseWheel = (event: {delta: number}) => {
        radius -= event.delta/10;
        if (radius <= 0) {
            radius = 0;
        }
    };
};
new P5(sketch, document.body);