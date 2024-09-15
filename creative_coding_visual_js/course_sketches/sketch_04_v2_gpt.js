const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');
const Tweakpane = require('tweakpane');

const settings = {
  dimensions: [2048, 2048],
  animate: true,
};

const params = {
  COLS : 30,
  ROWS : 30,
  NOISE_FREQ : 0.001,
  NOISE_AMP: 1,
  LINE_LENGTH : 100,
  NOISE_MULTIPLIER : Math.PI * 0.3,
  SCALE_MIN : 1,
  SCALE_MAX : 30
}

const sketch = () => {
  return ({ context, width, height, frame }) => {
    clearCanvas(context, width, height);
    drawGrid(context, width, height, frame);
  };
};

// Clears the canvas with a white background
function clearCanvas(context, width, height) {
  context.fillStyle = 'white';
  context.fillRect(0, 0, width, height);
}

const getColor = (frame) => {
  let red, blue = 0, green = 0;

  // red = random.noise1D(frame);
  // green = random.noise1D(frame, 0.0005, 255);
  // blue = random.noise1D(frame, 0.0005, 255);

  return `rgb(${40}, ${140}, ${230})`;
  // return `rgb(${red}, ${green}, ${blue})`;
}

// Draws the grid of lines with noise-based rotation and scaling
function drawGrid(context, width, height, frame) {
  const gridWidth = width * 0.8;
  const gridHeight = height * 0.8;
  const cellWidth = gridWidth / params.COLS;
  const cellHeight = gridHeight / params.ROWS;
  const marginX = (width - gridWidth) / 2;
  const marginY = (height - gridHeight) / 2;

  for (let i = 0; i < params.COLS * params.ROWS; i++) {
    const { x, y } = getCellPosition(i, cellWidth, cellHeight, marginX, marginY);
    // const noise = random.noise1D(y + frame * 10, params.NOISE_FREQ, params.NOISE_AMP);
   const noise = random.noise3D(x, y, frame*10, params.NOISE_FREQ, params.NOISE_AMP);
    drawLine(context, x, y, noise, frame);
  }
}

// Calculates the position of each cell in the grid
function getCellPosition(index, cellWidth, cellHeight, marginX, marginY) {
  const col = index % params.COLS;
  const row = Math.floor(index / params.COLS);
  const x = col * cellWidth + marginX + cellWidth / 2;
  const y = row * cellHeight + marginY + cellHeight / 2;
  return { x, y };
}

// Draws a line with rotation and scaling based on noise
function drawLine(context, x, y, noise, frame) {
  const angle = noise * params.NOISE_MULTIPLIER;
  const scale = math.mapRange(noise, -1, 1, params.SCALE_MIN, params.SCALE_MAX);

  context.save();
  context.translate(x, y);
  context.rotate(angle);
  context.lineWidth = scale;
  context.beginPath();
  context.moveTo(-params.LINE_LENGTH / 2, 0);
  context.lineTo(params.LINE_LENGTH / 2, 0);
  context.strokeStyle = getColor(frame);
  console.log(getColor());
  context.stroke();
  context.restore();
}

const createPane = () => {
  const pane = new Tweakpane.Pane();
  let folder;

  folder = pane.addFolder({title: 'grid'})
  folder.addInput(params, 'COLS',{min: 2, max: 50, step: 2});
  folder.addInput(params, 'ROWS',{min: 2, max: 50, step: 2});
  folder = pane.addFolder({title: 'test'})
  folder.addInput(params, 'NOISE_FREQ',{min: 0.000, max: 0.005, step: 0.0001});
  folder.addInput(params, 'NOISE_AMP',{min: -2, max: 5, step: 0.1});
  folder.addInput(params, 'LINE_LENGTH',{min: 2, max: 50, step: 2});
  folder.addInput(params, 'NOISE_MULTIPLIER',{min: 2, max: 50, step: 2});
  folder.addInput(params, 'SCALE_MIN',{min: 2, max: 50, step: 2});
  folder.addInput(params, 'SCALE_MAX',{min: 2, max: 50, step: 2});
}

createPane();
canvasSketch(sketch, settings);
