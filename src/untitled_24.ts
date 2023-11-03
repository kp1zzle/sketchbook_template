import init, {p5SVG} from "p5.js-svg";
import * as P5 from "p5";
import {defaultKeys} from "./helpers/key_pressed";
import QuickSettings from "quicksettings";
import {setAspectRatioStr} from "./helpers/aspect_ratio";
import {pointCoordsUnevenSpacing, pointsOnGrid} from "./helpers/grid";
import {Point, point} from "./helpers/point";

// Description: Windows!
// Date: 9/6/23 19:35:04Z

const q = {
    background: "#FFFFFF",
    displacement: 10,
    numWindows: 10,
    xMult: 1,
    yMult: 1,
    xSpacing: 325,
    ySpacing: 300,
    xDisplacement: 10,
    yDisplacement: 60,
};
const settings = QuickSettings.create(10, 10, "settings");
settings.hide();
settings.bindRange("displacement", 0, 100, q.displacement, 1, q);
settings.bindRange("numWindows", 0, 100, q.numWindows, 1, q);
settings.bindRange("xMult", -10, 10, q.xMult, 0.25, q);
settings.bindRange("yMult", -10, 10, q.yMult, 0.25, q);
settings.bindRange("xSpacing", -10, 1000, q.xSpacing, 1, q);
settings.bindRange("ySpacing", -10, 1000, q.ySpacing, 1, q);
settings.bindRange("xDisplacement", 0, 500, q.xDisplacement, 1, q);
settings.bindRange("yDisplacement", 0, 500, q.yDisplacement, 1, q);


init(P5);
const sketch = (s: p5SVG) => {
    s.setup = () => {
        s.createCanvas(s.windowWidth, s.windowHeight);
        setAspectRatioStr(s, "11x14");
        settings.addText("Aspect Ratio", "11x14", (aspect: string) => {
            setAspectRatioStr(s, aspect);
        });

    };

    s.draw = () => {
        function drawWindow(x: number, y: number, w: number, h: number) {
            s.rect(x, y, w, h);
            s.rect(x, y, w, 20);
        }
        function drawCascadingWindows(x: number, y: number, numWindows: number, displacementFn: (i: number) => point, sizeFn: (i: number) => point) {
            for (let i = 0; i < numWindows;  i++) {
                const coord = displacementFn(i);
                const dims = sizeFn(i);
                drawWindow(x + coord.x, y + coord.y, dims.x, dims.y);
            }
        }

        // Size / Displacement functions
        function constant(x: number, y: number) {
            return (i: number) => {
                return new Point(x, y);
            };
        }

        function linear(xSlope: number, ySlope: number) {
            return (i: number) => {
                return new Point(i * xSlope, i * ySlope);
            };
        }

        function sine(x: number, y: number) {
            return (i: number) => {
                return new Point(s.sin(i * x) * 100, s.cos(i * y) * 50);
            };
        }

        s.background(q.background);
        s.fill(q.background);
        s.strokeWeight(2);

        pointsOnGrid(3, 4, (x, y)=> {
            const coords = pointCoordsUnevenSpacing(q.xSpacing, q.ySpacing, x, y);

            if ((x + y) % 2 == 0) {
                s.stroke("#de50ff");
            } else {
                s.stroke("#00ffe1");
            }

            drawCascadingWindows(q.xDisplacement + coords.x, q.yDisplacement + coords.y, q.numWindows, sine(1, 10), constant(100, 200));
        });




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