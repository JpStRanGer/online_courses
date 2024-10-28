const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1024, 1024 ]
};

let manager;
let text = 'A';
let fontSize = 1200;
// let fontFamily = 'Arial';
// let fontFamily = 'Impact';
// let fontFamily = 'Palatino Linotype';
// let fontFamily = 'serif';
let fontFamily = 'Lucida';

const typeCanvas = document.createElement('canvas');
const typeContext = typeCanvas.getContext('2d');

const sketch = ({ context, width, height }) => {

  const cell = 15;
  const cols = Math.floor(width / cell);
  const rows = Math.floor(height / cell);
  const numCells = cols * rows;

  // typeCanvas.width = width;
  // typeCanvas.height = height;
  // typeCanvas.width = cols;
  // typeCanvas.height = rows;


  return ({ context, width, height }) => {
    typeContext.fillStyle = 'black';
    // typeContext.fillStyle = 'white';
    typeContext.fillRect(0, 0, width, height);
    // typeContext.fillRect(0, 0, cols, rows);
  
    // fontSize = width/4;

    typeContext.fillStyle = 'white';
    // typeContext.fillStyle = 'black';
    // typeContext.font = `${fontSize}px ${fontFamily}`;
    typeContext.font = `35px Arial`;
    // typeContext.textBaseline = 'hanging';
    // typeContext.textBaseline = 'middle';
    // typeContext.textBaseline = 'bottom';
    // typeContext.textBaseline = 'top';

    // typeContext.textAlign = 'center';
    // typeContext.textAlign = 'start';

    const metrics = typeContext.measureText(text);
    const metrics_x = metrics.actualBoundingBoxLeft * -1;
    const metrics_y = metrics.actualBoundingBoxAscent * -1;
    const metrics_width = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
    const metrics_height = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    const type_x = (cols - metrics_width) * .5 - metrics_x;
    const type_y = (rows - metrics_height) * .5 - metrics_y;
    
    typeContext.save();
    // typeContext.translate(type_x, type_y);
    // typeContext.translate(type_x, type_y);
    typeContext.translate(50, 50);

    typeContext.beginPath();
    typeContext.lineWidth = 5;
    typeContext.rect(metrics_x, metrics_y, metrics_width, metrics_height);
    typeContext.stroke();

    typeContext.fillText(text, 0, 0);
    typeContext.restore();
    
    // const image = new Image();
    // image.src = 'https://picsum.photos/200';
    // image.onload = async () => {
    //   typeContext.drawImage(image, 0, 0, typeCanvas.width, typeCanvas.height);
    //   // context.drawImage(image, 0, 0, width, height);
    // };

    const typeData = typeContext.getImageData(0, 0, cols, rows).data;

    console.log(typeData);

    context.drawImage(typeCanvas, 0, 0, cell, cell);
    // context.drawImage(typeCanvas, 0, 0, width, height);
    // context.drawImage(typeCanvas, 0, 0, context.width, context.height);

    for (let i = 0; i < numCells; i++){
      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = col * cell + cell/2;
      const y = row * cell + cell/2;

      const r = typeData[i * 4 + 0];
      const g = typeData[i * 4 + 1];
      const b = typeData[i * 4 + 2];
      const a = typeData[i * 4 + 3];

      context.fillStyle = `rgb(${r},${b},${g})`;

      context.save();
      context.translate(x,y);

      context.fillRect(0,0,cell,cell);
      // context.beginPath();
      // context.arc(0,0,cell/3,0,Math.PI *2);
      // context.fill();

      context.restore();


    }

  };
};

const onKeyUp = (e) => {
  console.log(e.key);
  text = `${e.key.toUpperCase()}`;
  manager.render();
}

document.addEventListener('keyup', onKeyUp);

const start = async () => {
  manager = await canvasSketch(sketch, settings);
}

const loadMeSomeImage = () => {
  const url = 'https://picsum.photos/200';
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => resolve(img);
		img.onerror = () => reject();
		img.src = url;
	});
};

start();