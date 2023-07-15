import {p5SVG} from "p5.js-svg";
import * as p5 from "p5";
import Flatten from "@flatten-js/core";

// Description: Two triangles connected by lines. Click to move the triangle.

const NUM_POINTS = 150
let INNER_TRIANGLE =  [
    [100, 150],
    [150, 220],
    [50, 220],
]
let sketch = (s: p5SVG) => {
    s.setup = () => {
        s.createCanvas(s.windowWidth, s.windowHeight, s.SVG);
    }

    s.draw = () =>  {
        //translate(windowWidth/2, windowHeight/2)
        s.background(0);
        s.stroke(255)
        s.noFill()
        let points1 = determineTrianglePoints(NUM_POINTS, [
            [500, 200],
            [700, 250],
            [300, 750],
        ]);

        let points2 = determineTrianglePoints(NUM_POINTS, INNER_TRIANGLE);

        for (let i = 0; i < NUM_POINTS; i++) {
            s.strokeWeight(0.7 * s.sin(0.3*i) + 1)
            // line(points1[i].x + 2* sin(0.5*i), points1[i].y + sin(i), points2[i].x - sin(i), points2[i].y - sin(6*i))
            s.beginShape();
            s.vertex(points1[i].x, points1[i].y)
            s.vertex(points1[i].x, points1[i].y)
            s.curveVertex(points1[i].x+ (4*i), points1[i].y - (10/i))
            // curveVertex(-5*i,500-i)
            // curveVertex(100-2*i,1000-i)
            s.curveVertex(points2[i].x - (2 / i),points2[i].y + (2 * i))
            s.vertex(points2[i].x,points2[i].y)
            s.vertex(points2[i].x,points2[i].y)
            s.endShape();
        }

    }

    s.mousePressed = () => {
        s.clear(0,0,0,0)
        INNER_TRIANGLE = [
            [s.mouseX, s.mouseY],
            [s.mouseX+100, s.mouseY+100],
            [s.mouseX-200, s.mouseY+200],

        ]
        // prevent default
        return false;
    }

    function determineTrianglePoints(numPoints: number, vertices: number[][]) {
        let totalLength = 0.0;
        let sideSegments = [];
        for (let i = 0; i < 3; i++) {
            sideSegments[i] = Flatten.segment(vertices[i][0], vertices[i][1], vertices[(i + 1) % 3][0], vertices[(i + 1) % 3][1]);
            totalLength += sideSegments[i].length;
        }
        const spaceBetweenPoints = totalLength / numPoints;
        let outputPoints = [];
        let currSideSegmentIndex = 0;
        let prevSideLengths = 0;
        for (let i = 0; i < numPoints; i++) {
            let dist = i * spaceBetweenPoints - prevSideLengths;
            let pt = sideSegments[currSideSegmentIndex].pointAtLength(dist);
            if (pt == null){
                prevSideLengths += sideSegments[currSideSegmentIndex].length;
                currSideSegmentIndex += 1;
                i--;
                continue;
            }
            outputPoints[i] = pt;
        }
        return outputPoints
    }
}
const P5 = new p5(sketch, document.body);