import init, {p5SVG} from "p5.js-svg";
import * as P5 from "p5";
import {defaultKeys} from "./helpers/key_pressed";
import {pointCoords, pointsOnGrid} from "./helpers/grid";
import QuickSettings from "quicksettings";

// Description: Untitled 17 but on a picture instead of a noise function.
// Date: 08/16/2023 12:03:00Z

const q = {
    numPts: 75,
    spacing: 8,
    zoom: 25,
    color1: "#0773ff",
    color2: "#e236ff",
    minCircleD: 1,
    maxCircleDMult: 0.5,
    background: "#000000",
    xOffset: 0,
    yOffset: 0,
    redWeight: 0.2989,
    greenWeight: 0.5870,
    blueWeight: 0.1140,
};
const settings = QuickSettings.create(10, 10, "settings");
settings.hide();
settings.bindNumber("numPts", 0, 1000, q.numPts, 1,  q);
settings.bindRange("spacing", 0, 100, q.spacing, 1,  q);
settings.bindRange("zoom", 1, 100, q.zoom, 1,  q);
settings.bindRange("minCircleD", 0, 10, q.minCircleD, 0.1,  q);
settings.bindRange("maxCircleDMult", 0, 1, q.maxCircleDMult, 0.05,  q);
settings.bindColor("background", q.background, q);

init(P5);
const sketch = (s: p5SVG) => {
    let img: P5.Image = null;

    s.setup = () => {
        function receivedFile(file: p5.File) {
            if (file.type === "image") {
                img = s.loadImage(file.data, () => {
                    img.resize(q.numPts, q.numPts/11*14);
                    img.loadPixels();
                });
            } else {
                console.log("Not an image file!");
            }
        }
        const canvas = s.createCanvas(s.windowWidth, s.windowHeight);
        settings.addButton("Randomize Noise", () => {
            s.noiseSeed();
        });
        canvas.drop(receivedFile);
    };

    s.draw = () =>  {
        function determineCircleD(x: number, y: number, second: boolean): number {
            const index = (x + y * q.numPts) * 4;
            const v = ((img.pixels[index]/255*q.redWeight + img.pixels[index + 1]/255*q.greenWeight + img.pixels[index + 2]/255*q.blueWeight) + s.noise((q.xOffset + x)/q.zoom, (q.yOffset + y)/q.zoom)) - 1;
            let t = 3;
            if (second) {
                t *= -1;
            }
            return s.max(q.minCircleD, t*v*q.maxCircleDMult*q.spacing);
        }

        s.background(q.background);
        if (img === null) {
            s.fill(255);
            s.noStroke();
            s.textSize(24);
            s.textAlign(s.CENTER);
            s.text("Drag an image file onto the canvas.", s.width / 2, s.height / 2);
        } else {
            s.noFill();
            
            s.translate(s.width/2 - (q.numPts * q.spacing / 2) , s.height/2 - (q.numPts/11*14 * q.spacing / 2));

            s.stroke(q.color1);
            pointsOnGrid(q.numPts, q.numPts/11*14, (x: number, y: number) => {
                const pt = pointCoords(q.spacing, x, y);
                s.circle(pt.x, pt.y, determineCircleD(x, y, false));
            });

            s.translate(q.spacing/2, q.spacing/2);
            s.stroke(q.color2);
            pointsOnGrid(q.numPts, q.numPts/11*14,(x: number, y: number) => {
                const pt = pointCoords(q.spacing, x, y);
                s.circle(pt.x, pt.y,  determineCircleD(x, y, true));
            });
        }
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