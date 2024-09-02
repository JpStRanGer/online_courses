const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 2048, 2048 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
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
      // const row = i / rows;
      const row = Math.floor(i / cols);
      console.log("" + numOfCells + " col: " + col + " row: " + row);

      const x = col * cellwidth + marginX + cellwidth/2;
      const y = row * cellHeight + marginY + cellHeight/2;

      context.save();
      context.translate(x, y);
      context.rotate(3.14/5)
      context.lineWidth = 15;
      context.moveTo(100 * -0.5, 0);
      context.lineTo(100 * 0.5, 0);
      context.stroke();
      context.restore();


    };
  };
};



canvasSketch(sketch, settings);
