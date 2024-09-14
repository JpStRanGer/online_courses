const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');

const settings = {
  dimensions: [ 2048, 2048 ],
  animate: true
};

const sketch = () => {
  return ({ context, width, height, frame}) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    
    const cols = 10;
    const rows = 10;
    const numOfCells = cols * rows;

    const gridWidth = width * 0.8; 
    const gridHeight = height * 0.8; 
    const cellwidth = gridWidth / cols;
    const cellHeight = gridHeight / rows;
    const marginX = (width - gridWidth)/2;
    const marginY = (height - gridWidth)/2;

    for (let i = 0; i < numOfCells; i++){
      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = col * cellwidth + marginX + cellwidth/2;
      const y = row * cellHeight + marginY + cellHeight/2;

      const noise = random.noise2D(x + frame, y, 0.001);
      const angle = noise * Math.PI *0.5;
      const scale = noise * math.mapRange(noise,-1,1,1,30);

      context.save();
      context.translate(x, y);
      context.rotate(angle);
      context.lineWidth = scale;
      context.moveTo(100 * -0.5, 0);
      context.lineTo(100 * 0.5, 0);
      // context.scale(0.1,10);
      context.stroke();
      context.restore();


    };
  };
};



canvasSketch(sketch, settings);
