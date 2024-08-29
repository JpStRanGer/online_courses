const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [600, 600]
};

const degToRad = (deg) => {
  return deg / 180 * (1 * Math.PI);
}

const sketch = () => {
  return ({ context, width, height }) => {
    // context.fillStyle = 'white';
    // context.fillRect(0, 0, width, height);

    let x = width * 0.5;
    let y = height * 0.5;
    let w = width * 0.01;
    let h = height * 0.1

    let num = 12;
    let radius = 200;

    for (let i = 0; i < num; i++) {
      let slice = 360 / num;
      let angle = slice * i;
      
      context.save();
      context.fillStyle = 'blue';
      let x_r = radius * Math.sin(degToRad(angle));
      let y_r = radius * Math.cos(degToRad(angle));
      
      context.translate(x + x_r, y-y_r);
      context.rotate(degToRad(angle));
      context.rect(-w * .5, -h * .5, w, h);
      // context.rect(0, 0, w, h);
      context.fill();
      context.restore();
      // context.stroke();
    }
  };
};

canvasSketch(sketch, settings);
