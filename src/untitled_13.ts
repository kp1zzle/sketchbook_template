import init, {p5SVG} from "p5.js-svg";
import * as P5 from "p5";
import {defaultKeys} from "./helpers/key_pressed";
import {point} from "./helpers/point";

// Description: Triangular.
// Date: 07/20/2023 12:03:00Z

const triangles: point[][] = []
let pt1: point;
let pt2: point;
let pt3: point;

init(P5);
const sketch = (s: p5SVG) => {
    s.setup = () => {
        s.createCanvas(s.windowWidth, s.windowHeight);
        pt1 = {x: s.random(s.windowWidth), y: s.random(s.windowHeight)}
        pt2 = {x: s.random(s.windowWidth), y: s.random(s.windowHeight)}
    };

    s.draw = () =>  {
        s.background(0);
        s.stroke(255);
        s.noFill();

        pt3 = {x: s.mouseX, y: s.mouseY}
        s.triangle(pt1.x, pt1.y, pt2.x, pt2.y, pt3.x, pt3.y);

        for (let triangle of triangles) {
            s.triangle(triangle[0].x, triangle[0].y, triangle[1].x, triangle[1].y, triangle[2].x, triangle[2].y)
        }
    };

    s.mouseClicked = () => {
        let arr = [pt1, pt2, pt3]
        triangles.push(arr);
        pt1 = s.random(arr);
        pt2 = pt1;
        while (pt1 === pt2) {
            pt2 = s.random(arr);
        }

    }

    s.keyPressed = () => {
        defaultKeys(s);
    };

};
new P5(sketch, document.body);