import init, {p5SVG} from "p5.js-svg";
import * as P5 from "p5";
import {defaultKeys} from "./helpers/key_pressed";
import QuickSettings from "quicksettings";
import {point, Point} from "./helpers/point";
import {color} from "three/examples/jsm/nodes/shadernode/ShaderNodeBaseElements";

// Description: Like untitled 16 but straight line segments instead of curves.
// Date: 08/19/2023 12:04:00Z

const q = {
    numLines: 75,
    spacing: 10,
    lineLen: 1000,
    ptsPerLine: 10,
    disturbance: 300,
    color1: "#018f14",
    color2: "#002afd",
    xZoom: 200,
    yZoom: 200,
    weight: 3,
};
const settings = QuickSettings.create(10, 10, "settings");
settings.hide();
settings.bindNumber("numLines", 0, 1000, q.numLines, 1,  q);
settings.bindRange("spacing", 0, 100, q.spacing, 0.5,  q);
settings.bindRange("lineLen", 0, 2000, q.lineLen, 1,  q);
settings.bindRange("ptsPerLine", 0, 100, q.ptsPerLine, 1,  q);
settings.bindRange("disturbance", 0, 1000, q.disturbance, 1,  q);
settings.bindRange("xZoom", 0, 1000, q.xZoom, 1,  q);
settings.bindRange("yZoom", 0, 1000, q.yZoom, 1,  q);
settings.bindRange("weight", 0, 10, q.weight, 0.1, q);

init(P5);
const sketch = (s: p5SVG) => {
    s.setup = () => {
        s.createCanvas(s.windowWidth, s.windowHeight);
    };

    s.draw = () =>  {
        const colors = ["#217074", "#37745B", "#8B9D77", "#E7EAEF", "#EDC5AB"];
        let idx = 0;
        s.background(0);
        s.translate(s.windowWidth/2 - q.numLines*q.spacing/2, s.windowHeight/2 - q.lineLen/2);
        s.noFill();
        s.strokeCap(s.PROJECT);
        s.strokeWeight(q.weight);
        for (let i = 0; i < q.numLines; i++) {
            let prevVertex: point = null;
            for (let j = 0; j < q.ptsPerLine; j++) {
                const x = i*q.spacing;
                const y = j*q.lineLen/q.ptsPerLine;
                s.stroke(s.color(colors[idx % colors.length]));
                const curr = new Point(x + q.disturbance*s.noise(x/q.xZoom, y/q.yZoom), y);
                if (prevVertex !== null) {
                    s.line(prevVertex.x, prevVertex.y, curr.x, curr.y);
                }
                prevVertex = curr;
                idx++;
            }

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