import init, {p5SVG} from "p5.js-svg";
import * as P5 from "p5";
import {defaultKeys} from "./helpers/key_pressed";
import QuickSettings from "quicksettings";
import {setAspectRatioStr} from "./helpers/aspect_ratio";
import {defaultCoordFn, defaultDiamondShapeFn, gradient} from "./helpers/gradient";

// Description: 
// Date: 9/30/23 19:15:19Z

const q = {
    width: 50,
    height: 100,
    spacing:8,
    multiplier: .05,
    angle: 0,
};
const settings = QuickSettings.create(10, 10, "settings");
settings.hide();
settings.bindRange("width", 0, 1000, q.width, 1, q);
settings.bindRange("height", 0, 1000, q.height, 1, q);
settings.bindRange("spacing", 0, 50, q.spacing, 1, q);
settings.bindRange("multiplier", 0, 10, q.multiplier, 0.25, q);
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
            q.width,
            q.height,
            (x: number, y: number) => {

                return (y % 20) * q.spacing * q.multiplier;
            },
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