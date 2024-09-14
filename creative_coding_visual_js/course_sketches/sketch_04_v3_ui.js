const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');
const Tweakpane = require('tweakpane');
import {Pane} from 'tweakpane';

const settings = {
  dimensions: [2048, 2048],
  animate: true,
};

// Constants for the grid layout
const COLS = 20;
const ROWS = 20;
const NOISE_FREQ = 0.001;
const LINE_LENGTH = 100;
const NOISE_MULTIPLIER = Math.PI * 0.3;
const SCALE_MIN = 1;
const SCALE_MAX = 30;

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

// Draws the grid of lines with noise-based rotation and scaling
function drawGrid(context, width, height, frame) {
  const gridWidth = width * 0.8;
  const gridHeight = height * 0.8;
  const cellWidth = gridWidth / COLS;
  const cellHeight = gridHeight / ROWS;
  const marginX = (width - gridWidth) / 2;
  const marginY = (height - gridHeight) / 2;

  for (let i = 0; i < COLS * ROWS; i++) {
    const { x, y } = getCellPosition(i, cellWidth, cellHeight, marginX, marginY);
    const noise = random.noise2D(x + frame, y + frame *10, NOISE_FREQ);
    drawLine(context, x, y, noise);
  }
}

// Calculates the position of each cell in the grid
function getCellPosition(index, cellWidth, cellHeight, marginX, marginY) {
  const col = index % COLS;
  const row = Math.floor(index / COLS);
  const x = col * cellWidth + marginX + cellWidth / 2;
  const y = row * cellHeight + marginY + cellHeight / 2;
  return { x, y };
}

// Draws a line with rotation and scaling based on noise
function drawLine(context, x, y, noise) {
  // const angle = noise * NOISE_MULTIPLIER;
  const angle = 2*math.PI* noise;
  const scale = math.mapRange(noise, -1, 1, SCALE_MIN, SCALE_MAX);

  context.save();
  context.translate(x, y);
  context.rotate(angle);
  context.lineWidth = scale;
  context.beginPath();
  context.moveTo(-LINE_LENGTH / 2, 0);
  context.lineTo(LINE_LENGTH / 2, 0);
  context.stroke();
  context.restore();
}

const createPane = () => {
  const pane = new Tweakpane.Pane();
}

createPane();
canvasSketch(sketch, settings);

