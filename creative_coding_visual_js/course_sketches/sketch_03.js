import point from './artAgents.js';
const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [1000, 1000]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const pointA = new point(800, 400, 10);
    const pointB = new point(700, 500, 30);
    const pointC = new point(500, 300, 100);

    context.beginPath();
    context.fillStyle = "black";
    context.arc(pointA.x, pointA.y, pointA.radius, 0, Math.PI*2);
    // context.stroke();
    context.fill();

    context.beginPath();
    context.lineWidth = 10;
    context.fillStyle = "black";
    context.arc(pointB.x, pointB.y, pointB.radius, 0, Math.PI*2);
    context.stroke();
    

    // Gradient foreground
    const fill = context.createLinearGradient(0, 0, width, height);
    fill.addColorStop(0, 'cyan');
    fill.addColorStop(0.5, 'blue');
    fill.addColorStop(1, 'orange');

    context.beginPath();
    context.lineWidth = 10;
    context.fillStyle = fill;
    context.arc(pointC.x, pointC.y, pointC.radius, 0, Math.PI*2);
    context.fill();
  };
};

canvasSketch(sketch, settings);
