import init, {p5SVG} from "p5.js-svg";
import * as P5 from "p5";
import {defaultKeys} from "./helpers/key_pressed";
import QuickSettings from "quicksettings";
import {Point, point} from "./helpers/point";

// Description: Repeat untitled 18 around a circle to make a moire pattern
// Date: 08/26/2023 12:05:00Z

const q = {
    numLines: 10,
    numPatterns: 2,
    spacing: 2,
    lineLen: 600,
    ptsPerLine: 10,
    disturbance: 100,
    color1: "#018f14",
    color2: "#002afd",
    color3: "#fd001e",
    zoom: 100,
    weight: 1,
    gradDivisor: 3,
};
const settings = QuickSettings.create(10, 10, "settings");
settings.hide();
settings.bindNumber("numLines", 0, 1000, q.numLines, 1,  q);
settings.bindNumber("numPatterns", 0, 100, q.numPatterns, 1,  q);
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
        s.angleMode(s.DEGREES);
    };

    s.draw = () =>  {
        function drawLines(n: number) {
            // function calcPtAtLen(len: number): point {
            //     return new Point(start.x + (len/q.lineLen)*(end.x - start.x), start.y + (len/q.lineLen)*(end.y - start.y));
            // }
            for (let i = 0; i < q.numLines; i++) {
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
                    s.curveVertex(x + q.disturbance*(s.noise(x/q.zoom, y/q.zoom, 10*n)-0.5)*2, y);
                }
                s.curveVertex(s.width/2, s.windowHeight/2 - q.lineLen/2 + q.lineLen);
                s.curveVertex(s.width/2, s.windowHeight/2 - q.lineLen/2 + q.lineLen);
                s.endShape();
            }
        }
        s.background(0);
        // s.translate(s.windowWidth/2 - q.numLines*q.spacing/2, s.windowHeight/2 - q.lineLen/2);
        s.noFill();
        s.stroke(q.color1);
        s.strokeWeight(q.weight);

        for (let i = 0; i < q.numPatterns; i++) {
            if (i % 3 === 0) {
                s.stroke(q.color1);
            } else if (i % 3 === 1) {
                s.stroke(q.color2);
            } else {
                s.stroke(q.color3);
            }
            s.translate(s.width/2, s.height/2);
            s.rotate(180/q.numPatterns);
            s.translate(-s.width/2, -s.height/2);
            drawLines(i);
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