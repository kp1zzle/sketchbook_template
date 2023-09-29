import init, {p5SVG} from "p5.js-svg";
import * as P5 from "p5";
import {defaultKeys} from "./helpers/key_pressed";
import QuickSettings from "quicksettings";
import {setAspectRatioStr} from "./helpers/aspect_ratio";
import {pointCoords} from "./helpers/grid";

// Description: Diamond grid increasing in size each row.
// Date: 9/28/23 22:07:03Z

const q = {
    columns: 100,
    rows: 250,
    spacing: 5,
    thickest: 1,
};
const settings = QuickSettings.create(10, 10, "settings");
settings.hide();
settings.bindRange("columns", 0, 1000, q.columns, 1, q);
settings.bindRange("rows", 0, 1000, q.rows, 1, q);
settings.bindRange("spacing", 0, 10, q.spacing, 1, q);
settings.bindRange("thickest", 0, 10, q.thickest, 0.25, q);

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
        s.stroke("#0773ff");
        s.fill("#0773ff");
        s.strokeCap(s.SQUARE);
        for (let r = 0; r < q.rows; r++) {
            const len = r/q.rows * q.spacing * q.thickest ;
            // s.strokeWeight(1+ r/q.rows * q.thickest);
            for (let c = 0; c < q.columns; c++) {
                const pt = pointCoords(q.spacing, c, r);

                s.beginShape();
                s.vertex(pt.x, pt.y - len/2);
                s.vertex(pt.x - len/2, pt.y);
                s.vertex(pt.x, pt.y + len/2);
                s.vertex(pt.x + len/2, pt.y);
                s.endShape();
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