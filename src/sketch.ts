import init, {p5SVG} from "p5.js-svg";
import * as P5 from "p5";
import QuickSettings from "quicksettings";

// Description: My first sketch!
// Date: 01/01/2023

const q = {
    numHellos: 1,
};
const settings = QuickSettings.create(10, 10, "settings");
settings.bindNumber("numHellos", 0, 1000, q.numHellos, 1,  q);

init(P5);
const sketch = (s: p5SVG) => {
    s.setup = () => {
        s.createCanvas(s.windowWidth, s.windowHeight);
    };

    s.draw = () =>  {
        s.background(255);
        s.translate(s.width/2, s.height/2);
        s.textSize(24);
        for (let i = 0; i < q.numHellos; i++) {
            s.translate(20, 20);
            s.text("Hello World!", 0, 0);
        }
    };

    s.mouseClicked = () => {
    };

    s.keyPressed = () => {
    };

};
new P5(sketch, document.body);