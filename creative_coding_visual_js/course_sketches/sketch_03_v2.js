import agent from "./artAgents";
import Agent from "./artAgents";

const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random')

const settings = {
  dimensions: [ 1000, 1000 ],
  animate:true
};

const animate = () => {
  console.log('Domestica animation');
  requestAnimationFrame(animate);  
}
// animate();

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

    for (let i = 0; i < agents.length; i++){
      const agent = agents[i];

      for (let j = 0; j < agents.length; j++){
        const other = agents[j];
        
      }
    }

    // loop throug all agents and draw them
    agents.forEach(element => {
      element.update();
      element.draw(context);
      element.bounce(width,height);
    });
  };
};



canvasSketch(sketch, settings);
