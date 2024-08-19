const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [600, 600]
  // dimensions: [2048, 2048]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    let col = 5;
    let row = 5;
    let box_width = 60;
    let box_height = 60;
    let gap = 50;
    let global_x_offset = 10;
    let global_y_offset = 10;
    let box_child_offset = 30;

    for (let x = 0; x < col; x++) {
      for (let y = 0; y < row; y++) {
        context.lineWidth = 6;
        context.beginPath();
        context.rect(global_x_offset + (gap + box_width) * x, global_y_offset + (gap + box_height) * y, box_width, box_height);
        context.stroke();

        if (Math.random() < 0.4) {
          context.beginPath();
          // context.rotate(Math.random() * Math.PI *0.1);
          context.rect(global_x_offset + (gap + box_width) * x + box_child_offset/2, global_y_offset + (gap + box_height) * y + box_child_offset/2, box_width - box_child_offset, box_height - box_child_offset);
          context.stroke();

        }
      }
    }
  }
}
canvasSketch(sketch, settings);