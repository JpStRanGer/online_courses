import Ball from './Ball.js';

const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 2048, 2048 ],
  animate: false
};


const sketch = () => {
  return ({ context, width, height }) => {
    // console.log("Stating sketch")
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    context.fillStyle = 'blue';
    context.fillRect(1 * width / 4, 1 * height / 4, width / 2, height / 2);
    
    context.beginPath();
    let x = width / 4;
    let y = height / 2;
    let radius = width / 5;
    let startAngle = 0 * (2 * Math.PI)/360;
    let endAngel = 270 * (2 * Math.PI)/360;
    context.lineWidth = 40;
    context.arc(x, y, radius, startAngle, endAngel);
    context.stroke();
    context.beginPath

    const ball = new Ball(width, height);
    ball.draw(context);
  };
};

canvasSketch(sketch, settings);
