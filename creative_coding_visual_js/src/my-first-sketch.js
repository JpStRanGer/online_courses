const canvasSketch = require('canvas-sketch');

// Sketch parameters
const settings = {
  dimensions: 'a4',
  pixelsPerInch: 300,
  units: 'in'
};

// Artwork function
const sketch = () => {
  return ({ context, width, height }) => {
    
    //constructing object from ball class
    const ball = new Ball(context);
    // Margin in inches
    const margin = 1 / 4;

    // Off-white background
    context.fillStyle = 'hsl(0, 0%, 98%)';
    context.fillRect(0, 0, width, height);

    // Gradient foreground
    const fill = context.createLinearGradient(0, 0, width, height);
    fill.addColorStop(0.1, 'cyan');
    fill.addColorStop(0.5, 'blue');
    fill.addColorStop(1, 'orange');

    // Fill rectangle
    context.fillStyle = fill;
    context.fillRect(margin, margin, width - margin * 2, height - margin * 2);
    
    context.beginPath();
    context.arc(100, 100, 50, 0, 1 * Math.PI);
    context.stroke();
  };
};

// Start the sketch
canvasSketch(sketch, settings);

class Ball {
  constructor(context){
    // console.log("constucting ball");
    // context.beginPath();
    // context.arc()
  }
}