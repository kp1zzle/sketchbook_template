import * as p5 from 'p5';
import init, { p5SVG } from 'p5.js-svg'

init(p5);
let sketch = (s: p5SVG) => {
    s.setup = () => {
        s.createCanvas(window.innerWidth, window.innerHeight)
    }

    s.draw = () => {
        s.background(220);
        s.textSize(50);
        s.text('hello world', 10, 50);
    }

    s.keyPressed = () => {
        if (s.key === 's') {
            exportPNG();
        } else if (s.key === 'S') {
            exportSVG()
        }
    }

    function exportPNG() {
        let filename = (new Date).toISOString()
        s.save(filename.concat(".png"))
    }

    function exportSVG() {
        let filename = (new Date).toISOString()
        s.createCanvas(window.innerWidth, window.innerHeight, s.SVG)
        s.draw()
        s.save(filename.concat(".svg"))
        s.createCanvas(window.innerWidth, window.innerHeight)
        s.draw()
    }

}

const P5 = new p5(sketch, document.body);