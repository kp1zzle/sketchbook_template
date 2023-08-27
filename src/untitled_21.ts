import init, {p5SVG} from "p5.js-svg";
import * as P5 from "p5";
import {defaultKeys} from "./helpers/key_pressed";
import {pointCoords, pointsOnGrid} from "./helpers/grid";
import QuickSettings from "quicksettings";
import {setAspectRatioStr} from "./helpers/aspect_ratio";

// Description: Crosses and circles
// Date: 08/26/2023 12:04:00Z

const q = {
    numPts: 75,
    spacing: 8,
    zoom: 25,
    color1: "#0773ff",
    color2: "#e236ff",
    color3: "#a1c42b",
    minCircleD: 1,
    maxCircleDMult: 0.9,
    background: "#000000",
    xOffset: 0,
    yOffset: 0,
    zMult: 10,
};
const settings = QuickSettings.create(10, 10, "settings");
settings.hide();
settings.bindNumber("numPts", 0, 1000, q.numPts, 1,  q);
settings.bindRange("spacing", 0, 100, q.spacing, 1,  q);
settings.bindRange("zoom", 1, 100, q.zoom, 1,  q);
settings.bindRange("minCircleD", 0, 10, q.minCircleD, 0.1,  q);
settings.bindRange("maxCircleDMult", 0, 1, q.maxCircleDMult, 0.05,  q);
settings.bindColor("background", q.background, q);
settings.bindRange("zMult", 0, 100, q.zMult, 1,  q);

init(P5);
const sketch = (s: p5SVG) => {
    s.setup = () => {
        s.createCanvas(s.windowWidth, s.windowHeight);
        settings.addText("Aspect Ratio", "11x14", (aspect: string) => { setAspectRatioStr(s, aspect); });
        settings.addButton("Randomize Noise", () => {
            s.noiseSeed();
        });
    };

    s.draw = () =>  {
        function determineCircleD(x: number, y: number, z:number, second: boolean): number {
            const v = s.noise((q.xOffset + x)/q.zoom, (q.yOffset + y)/q.zoom, z * q.zMult) - 0.5;
            let t = 3;
            if (second) {
                t *= -1;
            }
            return s.max(q.minCircleD, t*v*q.maxCircleDMult*q.spacing);
        }

        s.background(q.background);
        s.noFill();
        s.translate(s.width/2 - (q.numPts * q.spacing / 2) , s.height/2 - (q.numPts/11*14 * q.spacing / 2));

        s.stroke(q.color3);
        pointsOnGrid(q.numPts, q.numPts/11*14, (x: number, y: number) => {
            const pt = pointCoords(q.spacing, x, y);
            const len = determineCircleD(x, y, 0, false);
            // vertical line
            s.line(pt.x, pt.y - len/2, pt.x, pt.y + len/2);
            // horizontal line
            s.line(pt.x - len/2, pt.y, pt.x + len/2, pt.y);
        });

        s.stroke(q.color1);
        pointsOnGrid(q.numPts, q.numPts/11*14, (x: number, y: number) => {
            const pt = pointCoords(q.spacing, x, y);
            s.circle(pt.x, pt.y, determineCircleD(x, y, 1, false));
        });

        s.translate(q.spacing/2, q.spacing/2);
        s.stroke(q.color2);
        pointsOnGrid(q.numPts, q.numPts/11*14,(x: number, y: number) => {
            const pt = pointCoords(q.spacing, x, y);
            s.circle(pt.x, pt.y,  determineCircleD(x, y, 1, true));
        });
    };

    s.mouseClicked = () => {
    };

    s.mouseDragged = () => {
        q.xOffset += (s.pmouseX - s.mouseX)/3;
        q.yOffset += (s.pmouseY - s.mouseY)/3;
    };

    s.keyPressed = () => {
        defaultKeys(s, sketch);

        if (s.keyCode === s.ESCAPE) {
            settings.toggleVisibility();
        }
    };

};
new P5(sketch, document.body);