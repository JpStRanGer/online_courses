const canvasSketch = require('canvas-sketch');
const Random = require('canvas-sketch-util/random')
const canMath = require('canvas-sketch-util/math')
const Tweakpane = require('tweakpane')

const settings = {
  dimensions: [ 2048, 2048 ],
  animate: true
};

const params = {
  noise_freq : 1,
  noise_amp : 1
}

const sketch = () => {
  return ({ context, width, height, frame}) => {
    // context.fillStyle = 'white';
    // context.fillRect(0, 0, width, height);

    // console.log(Random.noise2D(1,1,100,2));


    noise1d = Random.noise1D(frame, params.noise_freq, params.noise_amp);

    let x = frame%width;
    let y = canMath.mapRange(noise1d,-1,1,0,height);

    draw(context, x, y);
  };
};

const draw = (context, x, y) => {
  context.save();
  context.fillStyle = 'black';
  context.fillRect(x, y, 10, 10);
  context.restore();
}

const drawPane = () => {
  const pane = new Tweakpane.Pane();
  let folder = pane.addFolder({title:'title'});
  folder.addInput(params,'noise_freq',{min:0, max:0.002, step: 0.00001});
  folder.addInput(params,'noise_amp',{min:0, max:1, step:0.0001});

}


drawPane();
canvasSketch(sketch, settings);
