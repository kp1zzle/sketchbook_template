import {p5SVG} from "p5.js-svg";
import * as p5 from "p5";
import Flatten from "@flatten-js/core";

// Description: Flying donut.

const NUM_POINTS = 150
const COLORS = [
    [255,0,0],
    [255,128,0],
    [255,255,0],
    [0,255,0],
    [0,0,255]
]
let sketch = (s: p5SVG) => {
    s.setup = () => {
        s.createCanvas(s.windowWidth, s.windowHeight, s.SVG);
    }

    s.draw = () =>  {
        //translate(windowWidth/2, windowHeight/2)
        s.angleMode(s.DEGREES);
        s.background(0);
        s.stroke(255)
        s.noFill()
        let center = [s.windowWidth/2, s.windowHeight/2]
        let points1 = determinePointsOnCircle(NUM_POINTS, center, 80);

        let points2 = determinePointsOnCircle(NUM_POINTS, center, 300);

        let points3 = determinePointsOnCircle(NUM_POINTS * 2, center, 400);
        let points4 = determinePointsOnCircle(NUM_POINTS * 2, center, 450);

        s.stroke(COLORS[4])
        for (let i = 0; i < NUM_POINTS; i++) {

            s.strokeWeight(0.7 * s.sin(0.3*i) + 1)
            // line(points1[i].x, points1[i].y + sin(i), points2[i].x , points2[i].y)
            let multiplier = 1

            if (i > 0.25 * NUM_POINTS && i < 0.75 * NUM_POINTS) {
                multiplier = -1
            }

            s.beginShape();
            s.vertex(points1[i].x, points1[i].y + s.sin(i))
            s.bezierVertex(points1[i].x - (50*s.sin(360/NUM_POINTS*i)), points1[i].y - (100*s.sin(360/NUM_POINTS*i)), points2[i].x + (300*s.sin(360/NUM_POINTS*i)), points2[i].y + (200*s.sin(360/NUM_POINTS*i)), points2[i].x, points2[i].y);
            s.endShape();
            // beginShape();
            // vertex(points1[i].x, points1[i].y)
            // vertex(points1[i].x, points1[i].y)
            // curveVertex(points1[i].x+ (4*i), points1[i].y - (10/i))
            // // curveVertex(-5*i,500-i)
            // // curveVertex(100-2*i,1000-i)
            // curveVertex(points2[i].x - (2 / i),points2[i].y + (2 * i))
            // vertex(points2[i].x,points2[i].y)
            // vertex(points2[i].x,points2[i].y)
            // endShape();
        }

        for (let i = 0; i < NUM_POINTS * 2; i++) {
            s.strokeWeight(0.7 * s.sin(0.3*i) + 1)
            s.stroke(COLORS[0])
            s.beginShape();
            s.vertex(points3[i].x, points3[i].y + s.sin(i))
            s.bezierVertex(points3[i].x - (300*s.sin(360/NUM_POINTS*i)), points3[i].y - (100*s.sin(360/NUM_POINTS*i)), points4[i].x + (100*s.sin(360/NUM_POINTS*i)), points4[i].y + (100*s.sin(360/NUM_POINTS*i)), points4[i].x, points4[i].y);
            s.endShape();
        }

    }

    function determinePointsOnCircle(numPoints: number, center: number[], radius: number) {
        let arc = Flatten.circle(Flatten.point(center[0], center[1]), radius).toArc()
        let spaceBetweenPoints = arc.length / numPoints
        let outputPoints = []
        for (let i = 0; i < numPoints; i++) {
            let dist = i * spaceBetweenPoints
            outputPoints[i] = arc.pointAtLength(dist);
        }
        return outputPoints
    }
}
const P5 = new p5(sketch, document.body);