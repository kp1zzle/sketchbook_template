import init, {p5SVG} from "p5.js-svg";
import * as P5 from "p5";
import {defaultKeys} from "./helpers/key_pressed";
import QuickSettings from "quicksettings";

// Description: untitled 16 but all lines start and end at the same point.
// Date: 08/09/2023 12:04:00Z

const q = {
    numLines: 75,
    spacing: 2,
    lineLen: 1000,
    ptsPerLine: 10,
    disturbance: 100,
    color1: "#018f14",
    color2: "#002afd",
    zoom: 100,
    weight: 1,
    gradDivisor: 3,
};
const settings = QuickSettings.create(10, 10, "settings");
settings.hide();
settings.bindNumber("numLines", 0, 1000, q.numLines, 1,  q);
settings.bindRange("spacing", 0, 100, q.spacing, 0.5,  q);
settings.bindRange("lineLen", 0, 2000, q.lineLen, 1,  q);
settings.bindRange("ptsPerLine", 0, 100, q.ptsPerLine, 1,  q);
settings.bindRange("disturbance", 0, 300, q.disturbance, 1,  q);
settings.bindRange("zoom", 0, 300, q.zoom, 1,  q);
settings.bindRange("weight", 0, 10, q.weight, 0.1, q);
settings.bindRange("gradDivisor", 0, 10, q.gradDivisor, 0.1, q);

init(P5);
const sketch = (s: p5SVG) => {
    s.setup = () => {
        s.createCanvas(s.windowWidth, s.windowHeight);
    };

    s.draw = () =>  {
        s.background(0);
        // s.translate(s.windowWidth/2 - q.numLines*q.spacing/2, s.windowHeight/2 - q.lineLen/2);
        s.noFill();
        s.stroke(q.color1);
        s.strokeWeight(q.weight);
        for (let i = 0; i < q.numLines; i++) {
            if (i % 2 === 0) {
                s.stroke(q.color1);
            } else {
                s.stroke(q.color2);
            }
            s.beginShape();
            s.curveVertex(s.width/2, s.windowHeight/2 - q.lineLen/2);
            s.curveVertex(s.width/2, s.windowHeight/2 - q.lineLen/2);
            for (let j = 1; j < q.ptsPerLine; j++) {
                let x = s.windowWidth/2 - q.numLines*q.spacing/2 + i*q.spacing;
                if (j < q.ptsPerLine/q.gradDivisor) {
                    x = s.windowWidth/2 - j/(q.ptsPerLine/q.gradDivisor) * (q.numLines*q.spacing/2 - i*q.spacing);
                }
                if (j > (q.ptsPerLine - q.ptsPerLine/q.gradDivisor)) {
                    x = s.windowWidth/2 - (1 - (j-(q.ptsPerLine - q.ptsPerLine/q.gradDivisor))/(q.ptsPerLine/q.gradDivisor)) * (q.numLines*q.spacing/2 - i*q.spacing);
                }
                const y = s.windowHeight/2 - q.lineLen/2 + j*q.lineLen/q.ptsPerLine;
                s.curveVertex(x + q.disturbance*(s.noise(x/q.zoom, y/q.zoom)-0.5)*2, y);
            }
            s.curveVertex(s.width/2, s.windowHeight/2 - q.lineLen/2 + q.lineLen);
            s.curveVertex(s.width/2, s.windowHeight/2 - q.lineLen/2 + q.lineLen);
            s.endShape();
        }
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