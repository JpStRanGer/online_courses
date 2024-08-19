

// Sketch showing the properties of translate()


const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [600, 600]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    // context.save();
    // context.translate(50, 50);
    // context.lineWidth = 10;
    // context.rect(0, 0, 50, 50);
    // context.stroke();
    JpRect(width,height, context);
    JpRect(70,70, context);
    JpRect(70,70, context);
  };
};

canvasSketch(sketch, settings);

function JpRect(x, y, context) {
  context.save();
  context.translate(x/2, y/2);
  context.lineWidth = 10;
  context.rect(0, 0, 50, 50);
  context.stroke();
  // context.restore();
}