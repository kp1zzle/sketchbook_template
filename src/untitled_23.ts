import init, {p5SVG} from "p5.js-svg";
import * as P5 from "p5";
import {defaultKeys} from "./helpers/key_pressed";
import QuickSettings from "quicksettings";
import {setAspectRatioStr} from "./helpers/aspect_ratio";
import Flatten from "@flatten-js/core";
const {circle, point} = Flatten;

// Description: Lines hitting circle edges
// Date: 08/28/2023 12:05:00Z

const q = {
    numLines: 3,
    pointsPerLine: 20,
    diameter: 600,
    zoom: 10,
};
const settings = QuickSettings.create(10, 10, "settings");
settings.hide();
settings.bindNumber("numLines", 0, 1000, q.numLines, 1,  q);
settings.bindRange("pointsPerLine", 2, 100, q.pointsPerLine, 1,  q);
settings.bindRange("diameter", 1, 1000, q.diameter, 1,  q);
settings.bindNumber("zoom", 0, 5, q.zoom, 0.1,  q);

init(P5);
const sketch = (s: p5SVG) => {
    s.setup = () => {
        s.createCanvas(s.windowWidth, s.windowHeight);
        settings.addText("Aspect Ratio", "11x14", (aspect: string) => { setAspectRatioStr(s, aspect); });
    };

    s.draw = () =>  {
        const colors = ["#809BCE", "#95B8D1", "#B8E0D2","#D6EADF","#EAC4D5",];
        s.background(0);
        s.angleMode(s.DEGREES);
        s.noFill();
        s.translate(s.width/2, s.height/2);
        const circ = circle(point(0,0), q.diameter/2).toArc();
        for (let i=0; i < q.numLines; i++) {
            s.stroke(colors[i % colors.length]);
            s.rotate(s.noise(i) * 180);
            s.beginShape();
            for (let p = 0; p < q.pointsPerLine; p++) {
                let v = s.noise(i*q.zoom, p*q.zoom) * circ.length;
                if (p % 2 === 0) {
                    v = circ.length - v;
                }
                const pt = circ.pointAtLength(v);
                s.vertex(pt.x, pt.y);
            }
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