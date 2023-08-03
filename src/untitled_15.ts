import init, {p5SVG} from "p5.js-svg";
import * as P5 from "p5";
import {defaultKeys} from "./helpers/key_pressed";
import {pointCoords, pointsOnGrid} from "./helpers/grid";
import QuickSettings from "quicksettings";

// Description: Varying sized circles in a grid.
// Date: 07/26/2023 12:03:00Z

const q = {
    numPts: 75,
    spacing: 10,
    zoom: 15,
    color1: "#018f14",
    color2: "#002afd",
};
const settings = QuickSettings.create(10, 10, "settings");
settings.hide();
settings.bindNumber("numPts", 0, 1000, q.numPts, 1,  q);
settings.bindRange("spacing", 0, 100, q.spacing, 1,  q);
settings.bindRange("zoom", 1, 100, q.zoom, 1,  q);

init(P5);
const sketch = (s: p5SVG) => {
    s.setup = () => {
        s.createCanvas(s.windowWidth, s.windowHeight);
    };

    s.draw = () =>  {

        s.background(0);
        s.noFill();
        s.translate(s.windowWidth/2 - (q.numPts * q.spacing / 2) , s.windowHeight/2 - (q.numPts/11*14 * q.spacing / 2));

        s.stroke(q.color1);
        pointsOnGrid(q.numPts, q.numPts/11*14, (x: number, y: number) => {
            const pt = pointCoords(q.spacing, x, y);
            s.circle(pt.x, pt.y, s.noise(x/q.zoom, y/q.zoom)*q.spacing/2);
        });

        s.translate(q.spacing/2, q.spacing/2);
        s.stroke(q.color2);
        pointsOnGrid(q.numPts, q.numPts/11*14,(x: number, y: number) => {
            const pt = pointCoords(q.spacing, x, y);
            s.circle(pt.x, pt.y,  q.spacing/2 - s.noise(x/q.zoom, y/q.zoom)*q.spacing/2);
        });
    };

    s.mouseClicked = () => {
    };

    s.keyPressed = () => {
        defaultKeys(s, sketch);

        if (s.keyCode === s.ESCAPE) {
            settings.toggleVisibility();
        }
    };

};
new P5(sketch, document.body);