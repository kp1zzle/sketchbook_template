import {p5SVG} from "p5.js-svg";
import * as p5 from "p5";

// Description: Square composition with random lines in the center square.

const sketch = (s: p5SVG) => {
    s.setup = () =>{
        s.createCanvas(1500 , 1500, s.SVG);
    };

    s.draw = () =>  {
        s.background(255);
        s.angleMode(s.DEGREES);
        s.fill(0);
        s.noLoop();
        s.strokeCap(s.SQUARE);
        const translation = 500;
        const innerRectanglePoints = [
            {x: translation, y: translation},
            {x: translation + 500, y: translation},
            {x: translation + 500, y: translation + 500},
            {x: translation, y: translation + 500},
        ];

        s.beginShape();
        for (let i = 0; i <= 4; i++) {
            s.vertex(innerRectanglePoints[i % 4].x, innerRectanglePoints[i % 4].y);
        }
        s.endShape();

        s.translate(translation, translation);
        const lines = 10;
        for (let r = 0; r < 4; r++) {
            for (let i = 0; i < lines; i++) {
                s.strokeWeight(50* s.sin(40*i) + 30);
                const x = translation/lines * -i;
                const y1 = 0;
                const y2 = 500;
                s.line(x, y1, x, y2);
            }
            s.translate(translation, 0);
            s.rotate(90);
        }

        s.resetMatrix();
        s.translate(translation, translation);
        s.stroke(255);
        s.strokeWeight(0.5);

        s.noFill();
        for (let i = 0; i <= 4; i++) {
            s.beginShape();
            const start = i * 66; //random(0, 500)
            s.vertex(start,0);
            s. vertex(500,s.random(0, 500));
            s.vertex(s.random(0, 500),500);
            s.vertex(0,s.random(0, 500));
            s.vertex(start,0);
            s.endShape();
        }

    };
};
const P5 = new p5(sketch, document.body);
