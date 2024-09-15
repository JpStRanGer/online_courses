const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1024, 1024 ]
};

let manager;
let text = 'A';
let fontSize = 1200;
// let fontFamily = 'Arial';
// let fontFamily = 'Impact';
// let fontFamily = 'Palatino Linotype';
// let fontFamily = 'serif';
let fontFamily = 'Lucida';

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.fillStyle = 'black';
    context.font = `${fontSize}px ${fontFamily}`;
    context.textBaseline = 'top';
    // context.textAlign = 'center';


    const metrics = context.measureText(text);
    const metrics_x = metrics.actualBoundingBoxLeft * -1;
    console.log(metrics_x);
    const metrics_y = metrics.actualBoundingBoxAscent * -1;
    console.log(metrics_y);
    const metrics_width = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
    console.log(metrics_width);
    const metrics_height = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    console.log(metrics_height);

    const x = (width - metrics_width) * .5 - metrics_x;
    const y = (height - metrics_height) * .5 - metrics_y;
    
    context.save();
    context.translate(x, y);

    context.beginPath();
    context.lineWidth = 5;
    context.rect(metrics_x, metrics_y, metrics_width, metrics_height);
    context.stroke();

    context.fillText(text, 0, 0);
    context.restore();
  };
};

const onKeyUp = (e) => {
  console.log(e.key);
  text = `${e.key}`;
  manager.render();
}

document.addEventListener('keyup', onKeyUp);

const start = async () => {
  manager = await canvasSketch(sketch, settings);
}

start();