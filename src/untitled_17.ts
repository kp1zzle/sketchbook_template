import init, {p5SVG} from "p5.js-svg";
import * as P5 from "p5";
import {defaultKeys} from "./helpers/key_pressed";
import {pointCoords, pointsOnGrid} from "./helpers/grid";
import QuickSettings from "quicksettings";

// Description: Untitled 15 but 3 steps of circle sizes.
// Date: 07/27/2023 12:03:00Z

const q = {
    numPts: 75,
    spacing: 8,
    zoom: 25,
    color1: "#0773ff",
    color2: "#e236ff",
    minCircleD: 1,
    maxCircleDMult: 0.5,
    background: "#000000",
    xOffset: 0,
    yOffset: 0,
};
const settings = QuickSettings.create(10, 10, "settings");
settings.hide();
settings.bindNumber("numPts", 0, 1000, q.numPts, 1,  q);
settings.bindRange("spacing", 0, 100, q.spacing, 1,  q);
settings.bindRange("zoom", 1, 100, q.zoom, 1,  q);
settings.bindRange("minCircleD", 0, 10, q.minCircleD, 0.1,  q);
settings.bindRange("maxCircleDMult", 0, 1, q.maxCircleDMult, 0.05,  q);
settings.bindColor("background", q.background, q);

init(P5);
const sketch = (s: p5SVG) => {
    s.setup = () => {
        s.createCanvas(s.windowWidth, s.windowHeight);
        settings.addButton("Randomize Noise", () => {
            s.noiseSeed();
        });
    };

    s.draw = () =>  {
        function determineCircleD(x: number, y: number, second: boolean): number {
            const v = s.noise((q.xOffset + x)/q.zoom, (q.yOffset + y)/q.zoom) - 0.5;
            let t = 3;
            if (second) {
                t *= -1;
            }
            return s.max(q.minCircleD, t*v*q.maxCircleDMult*q.spacing);
        }

        s.background(q.background);
        s.noFill();
        s.translate(s.windowWidth/2 - (q.numPts * q.spacing / 2) , s.windowHeight/2 - (q.numPts/11*14 * q.spacing / 2));

        s.stroke(q.color1);
        pointsOnGrid(q.numPts, q.numPts/11*14, (x: number, y: number) => {
            const pt = pointCoords(q.spacing, x, y);
            s.circle(pt.x, pt.y, determineCircleD(x, y, false));
        });

        s.translate(q.spacing/2, q.spacing/2);
        s.stroke(q.color2);
        pointsOnGrid(q.numPts, q.numPts/11*14,(x: number, y: number) => {
            const pt = pointCoords(q.spacing, x, y);
            s.circle(pt.x, pt.y,  determineCircleD(x, y, true));
        });
    };

    s.mouseClicked = () => {
    };

    s.mouseDragged = () => {
        q.xOffset += (s.pmouseX - s.mouseX)/3;
        q.yOffset += (s.pmouseY - s.mouseY)/3;
    };

    s.keyPressed = () => {
        defaultKeys(s);

        if (s.keyCode === s.ESCAPE) {
            settings.toggleVisibility();
        }
    };

};
new P5(sketch, document.body);