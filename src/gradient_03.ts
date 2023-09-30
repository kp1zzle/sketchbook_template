import init, {p5SVG} from "p5.js-svg";
import * as P5 from "p5";
import {defaultKeys} from "./helpers/key_pressed";
import QuickSettings from "quicksettings";
import {setAspectRatioStr} from "./helpers/aspect_ratio";
import {defaultCoordFn, defaultDiamondShapeFn, gradient, linearGradLenFn} from "./helpers/gradient";

// Description: Diamond grid increasing in size each row.
// Date: 9/28/23 22:07:03Z

const q = {
    columns: 50,
    rows: 100,
    spacing:8,
    thickest: 1,
    angle: 0,
};
const settings = QuickSettings.create(10, 10, "settings");
settings.hide();
settings.bindRange("columns", 0, 1000, q.columns, 1, q);
settings.bindRange("rows", 0, 1000, q.rows, 1, q);
settings.bindRange("spacing", 0, 50, q.spacing, 1, q);
settings.bindRange("thickest", 0, 10, q.thickest, 0.25, q);
settings.bindRange("angle", 0, 360, q.angle, 1, q);

init(P5);
const sketch = (s: p5SVG) => {
    s.setup = () => {
        s.createCanvas(s.windowWidth, s.windowHeight);
        settings.addText("Aspect Ratio", "11x14", (aspect: string) => {
            setAspectRatioStr(s, aspect);
        });
    };

    s.draw = () => {
        s.background(0);
        // s.stroke("#0773ff");
        s.noStroke();
        s.fill("#0773ff");
        s.strokeCap(s.SQUARE);
        s.translate(30,30);
        gradient(
            q.columns,
            q.rows,
            linearGradLenFn(q.columns, q.rows, q.spacing, q.thickest, q.angle),
            defaultCoordFn(q.spacing),
            defaultDiamondShapeFn(s)
        );
    };

    s.mouseClicked = () => {
    };

    s.keyPressed = () => {
        defaultKeys(s, sketch);

        if (s.keyCode === s.ESCAPE || s.key === "q") {
            settings.toggleVisibility();
        }
    };

};
new P5(sketch, document.body);