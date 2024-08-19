const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [600, 600]
};

const sketch = () => {
  return ({ context, width, height }) => {
    // context.fillStyle = 'white';
    // context.fillRect(0, 0, width, height);

    let x = width * 0.5;
    let y = height * 0.5;
    let w = width * 0.01;
    let h = height * 0.1

    let num = 5;

    for (let i = 0; i < num; i++) {
      context.save();
      context.fillStyle = 'blue';
      context.translate(x, y);
      context.rotate((Math.PI / 180) +i/Math.PI)
      context.rect(0, 0, w, h);
      context.fill();
      context.restore();
      // context.stroke();
    }
  };
};

canvasSketch(sketch, settings);
