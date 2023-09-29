import init, {p5SVG} from "p5.js-svg";
import * as P5 from "p5";
import {defaultKeys} from "./helpers/key_pressed";
import QuickSettings from "quicksettings";
import {setAspectRatioStr} from "./helpers/aspect_ratio";

// Description: Gradient made of squares of randomly placed points.
// Date: 9/27/23 22:11:43Z

const q = {
    columns: 20,
    rows: 20,
    size: 50,
};
const settings = QuickSettings.create(10, 10, "settings");
settings.hide();
settings.bindNumber("columns", 0, 100, q.columns, 1, q);
settings.bindNumber("rows", 0, 100, q.rows, 1, q);
settings.bindNumber("size", 0, 100, q.size, 1, q);


init(P5);
const sketch = (s: p5SVG) => {
    s.setup = () => {
        s.createCanvas(s.windowWidth, s.windowHeight);
        settings.addText("Aspect Ratio", "11x14", (aspect: string) => {
            setAspectRatioStr(s, aspect);
        });
        // s.noLoop();
        s.frameRate(1);
    };

    s.draw = () => {
        function gradientRect(x: number, y: number, height: number, width: number, color1: string, color2: string, balance: number, alpha: number) {
            const numPts = alpha * height * width;
            const color1Pts = numPts * balance;
            const color2Pts = numPts * (1 - balance);
            const set: Set<string> = new Set();
            s.stroke(color1);
            for (let i = 0; i < color1Pts-1; i++) {
                let x_rand, y_rand;
                do {
                    x_rand = Math.round(s.random(0, width-1));
                    y_rand = Math.round(s.random(0, height-1));
                } while (set.has(x_rand.toString() + "," + y_rand.toString()));
                set.add(x_rand.toString() + "," + y_rand.toString());
                s.point(x + x_rand, y + y_rand);
            }

            s.stroke(color2);
            for (let i = 0; i < color2Pts-1; i++) {
                let x_rand, y_rand;
                do {
                    x_rand = Math.round(s.random(0, width-1));
                    y_rand = Math.round(s.random(0, height-1));
                } while (set.has(x_rand.toString() + "," + y_rand.toString()));
                set.add(x_rand.toString() + "," + y_rand.toString());
                s.point(x + x_rand, y + y_rand);
            }
        }
        s.background(0);
        s.strokeWeight(1.2);
        for (let a = 0; a <= q.rows; a ++){
            for (let i = 0; i <= q.columns; i ++) {
                gradientRect(10 + i*q.size, 10 + a*q.size, q.size, q.size, "#e236ff", "#0773ff", i/q.columns, 1-(a/q.rows));
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