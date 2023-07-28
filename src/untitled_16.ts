import init, {p5SVG} from "p5.js-svg";
import * as P5 from "p5";
import {defaultKeys} from "./helpers/key_pressed";
import QuickSettings from "quicksettings";

// Description: Isometric_06 but not isometric.
// Date: 07/26/2023 12:04:00Z

const q = {
    numLines: 75,
    spacing: 10,
    lineLen: 1000,
    ptsPerLine: 10,
    disturbance: 100,
    color1: "#018f14",
    color2: "#002afd",
    zoom: 100,
};
const settings = QuickSettings.create(10, 10, "settings");
settings.hide();
settings.bindNumber("numLines", 0, 1000, q.numLines, 1,  q);
settings.bindRange("spacing", 0, 100, q.spacing, 0.5,  q);
settings.bindRange("lineLen", 0, 2000, q.lineLen, 1,  q);
settings.bindRange("ptsPerLine", 0, 100, q.ptsPerLine, 1,  q);
settings.bindRange("disturbance", 0, 300, q.disturbance, 1,  q);
settings.bindRange("zoom", 0, 300, q.zoom, 1,  q);

init(P5);
const sketch = (s: p5SVG) => {
    s.setup = () => {
        s.createCanvas(s.windowWidth, s.windowHeight);
    };

    s.draw = () =>  {
        s.background(0);
        s.translate(s.windowWidth/2 - q.numLines*q.spacing/2, s.windowHeight/2 - q.lineLen/2);
        s.noFill();
        s.stroke(q.color1);
        for (let i = 0; i < q.numLines; i++) {
            s.beginShape();
            for (let j = 0; j < q.ptsPerLine; j++) {
                const x = i*q.spacing;
                const y = j*q.lineLen/q.ptsPerLine;
                s.curveVertex(x + q.disturbance*s.noise(x/q.zoom, y/q.zoom), y);
            }
            s.endShape();
        }

        s.translate(q.spacing/2,0);
        s.stroke(q.color2);
        for (let i = 0; i < q.numLines; i++) {
            s.beginShape();
            for (let j = 0; j < q.ptsPerLine; j++) {
                const x = i*q.spacing;
                const y = j*q.lineLen/q.ptsPerLine;
                s.curveVertex(x + q.disturbance*s.noise(x/q.zoom, y/q.zoom), y);
            }
            s.endShape();
        }
    };

    s.mouseClicked = () => {
    };

    s.keyPressed = () => {
        defaultKeys(s);

        if (s.keyCode === s.ESCAPE) {
            settings.toggleVisibility();
        }
    };

};
new P5(sketch, document.body);