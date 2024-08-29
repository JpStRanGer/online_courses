import agent from "./artAgents";
import Agent from "./artAgents";

const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random')

const settings = {
  dimensions: [ 1000, 1000 ]
};

const sketch = ({context, width, height}) => {
  const agents = [];
  // loop for generating agents
  for (let i = 0; i  < 40; i++) {
    const x = random.range(0,width);
    const y = random.range(0,height);
    agents.push(new agent(x,y));
  }

  // returning callback function (the function that are to be executed on to the canvas)
  return ({ context, width, height }) => {
    // emptying the scring at every run
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    // loop throug all agents and draw them
    agents.forEach(element => {
      element.draw(context);
    });
  };
};

canvasSketch(sketch, settings);
