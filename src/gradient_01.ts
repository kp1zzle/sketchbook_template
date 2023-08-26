import init, {p5SVG} from "p5.js-svg";
import * as P5 from "p5";
import {defaultKeys} from "./helpers/key_pressed";
import QuickSettings from "quicksettings";

// Description:
// Date: 08/19/2023 12:04:00Z

const q = {
    numLines: 1000,
    spacing: 0.1,
    lineLen: 300,
    color1: "#de50ff",
    color2: "#6a3898",
    xZoom: 200,
    yZoom: 200,
    weight: 0.1,
    xOffset: 0,
};
const settings = QuickSettings.create(10, 10, "settings");
settings.hide();
settings.bindNumber("numLines", 0, 10000, q.numLines, 1,  q);
settings.bindRange("spacing", 0, 100, q.spacing, 0.5,  q);
settings.bindRange("lineLen", 0, 2000, q.lineLen, 1,  q);
settings.bindRange("xZoom", 0, 1000, q.xZoom, 1,  q);
settings.bindRange("yZoom", 0, 1000, q.yZoom, 1,  q);
settings.bindRange("weight", 0, 10, q.weight, 0.1, q);

init(P5);
const sketch = (s: p5SVG) => {
    const values: number[] = [];
    s.setup = () => {
        s.createCanvas(s.windowWidth, s.windowHeight);
        for (let i = 0; i < q.numLines; i++) {
            values[i] = s.random();
        }
    };

    s.draw = () =>  {
        s.background(0);
        s.translate(s.windowWidth/2 - q.numLines*q.spacing/2, s.windowHeight/2 - q.lineLen/2);
        s.noFill();
        s.strokeCap(s.PROJECT);
        s.strokeWeight(q.weight);
        for (let i = 0; i < q.numLines; i++) {
            const v = values[i];
            if (v > i/q.numLines) {
                s.stroke(q.color1);
            } else {
                s.stroke(q.color2);
            }
            s.line(i*q.spacing, 0, i*q.spacing, q.lineLen);
        }

    };

    s.mouseClicked = () => {
        q.xOffset += (s.pmouseX - s.mouseX)/3;
    };

    s.keyPressed = () => {
        defaultKeys(s, sketch);

        if (s.keyCode === s.ESCAPE) {
            settings.toggleVisibility();
        }
    };

};
new P5(sketch, document.body);