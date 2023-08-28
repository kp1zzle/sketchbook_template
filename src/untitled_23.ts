import init, {p5SVG} from "p5.js-svg";
import * as P5 from "p5";
import {defaultKeys} from "./helpers/key_pressed";
import QuickSettings from "quicksettings";
import {Point, point} from "./helpers/point";
import {setAspectRatioStr} from "./helpers/aspect_ratio";

// Description: Repeat untitled 18 around a circle to make a moire pattern
// Date: 08/26/2023 12:05:00Z

const q = {

};
const settings = QuickSettings.create(10, 10, "settings");
settings.hide();


init(P5);
const sketch = (s: p5SVG) => {
    s.setup = () => {
        s.createCanvas(s.windowWidth, s.windowHeight);
        settings.addText("Aspect Ratio", "11x14", (aspect: string) => { setAspectRatioStr(s, aspect); });
    };

    s.draw = () =>  {

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