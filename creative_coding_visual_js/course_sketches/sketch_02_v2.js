const canvasSketch = require('canvas-sketch');
const math = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");

// Canvas settings
const canvas_settings = {
  dimensions: [600, 600],
};

const settings = {
  numSlices: 40,       // Number of slices
  radius: 200,         // Radius of the circle
  rectWidthRatio: 0.01,  // Width of each rectangle relative to canvas width
  rectHeightRatio: 0.1,  // Height of each rectangle relative to canvas height
  // rectColor: 'blue'    // Color of the rectangles
};

// Utility function to convert degrees to radians
const degToRad = (deg) => (deg / 180) * Math.PI;

// Utility function to generate random number in a rage between min and max
const Range = (min, max) => (max * Math.random() + min);

// Function to draw a single rectangle
const drawRectangle = (context, x, y, width, height, angle, color) => {
  context.save();
  context.fillStyle = color;
  context.translate(x, y);
  context.rotate(angle);
  context.scale(random.range(.1, 2), random.range(.2, 2.5));
  context.fillRect(-width * 0.5, -height * .05, width, height);
  context.restore();
};

// Function to draw a single arc
const drawArc = (context, x, y, radius, angle, slice) => {
  context.save();
  context.translate(x, y);
  context.rotate(-angle);
  context.lineWidth = random.range(1, 17);
  context.beginPath();
  context.arc(0, 0, radius * random.range(.5, 1.5), -slice * random.range(2,5), slice * random.range(2,5));
  context.stroke();

  context.restore();
}

// Sketch function
const sketch = () => {
  return ({ context, width, height }) => {

    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    context.fillStyle = 'black';
    const centerX = width * 0.5;
    const centerY = height * 0.5;
    const rectWidth = width * settings.rectWidthRatio;
    const rectHeight = height * settings.rectHeightRatio;

    for (let i = 0; i < settings.numSlices; i++) {
      const sliceAngle = math.degToRad(360 / settings.numSlices);
      const angle = sliceAngle * i * random.range(.5,1.5);
      const xOffset = settings.radius * Math.sin(angle) ;
      const yOffset = settings.radius * Math.cos(angle) ;

      drawRectangle(
        context,
        centerX + xOffset,
        centerY + yOffset,
        rectWidth,
        rectHeight,
        -angle,
        settings.rectColor
      );

      drawArc(context, centerX, centerY, settings.radius, angle, sliceAngle);
    }
  };
};

canvasSketch(sketch, canvas_settings);
