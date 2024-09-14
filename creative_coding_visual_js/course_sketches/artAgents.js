import math, { expand2D } from "canvas-sketch-util/math";
import random from "canvas-sketch-util/random";

export class point {
  constructor(x, y, radius=40) {
    console.log('Constructing Point.')
    this.x = x;
    this.y = y;
    this.radius = radius; // only for use as point in 03_v1
  };
}

export default class agent {
  constructor(x, y){
    this.pos = new point(x, y);
    this.vel = new point(random.range(-1,1), random.range(-1,1));
    this.mass = random.range(10,10)
    this.radius = this.mass*1;
    this.lineWidth = this.mass/5;
  }

  getDistance(pos){
    let dx = this.pos.x - pos.x;
    let dy = this.pos.y - pos.y;
    this.dist = Math.sqrt(dx**2+dy**2);
    return this.dist;
  }

  bounce(width, height){
    if (this.pos.x <= 0 || this.pos.x >= width) this.vel.x *= -1;
    if (this.pos.y <= 0 || this.pos.y >= height) this.vel.y *= -1;
  }

  update(){
    this.pos.x += this.vel.x; 
    this.pos.y += this.vel.y;
    // this.radius = this.dist*0.051;
  }
  
  draw(context){
    context.save();
    context.translate(this.pos.x, this.pos.y);

    context.beginPath();
    // context.strokeStyle = "red";
    // context.fillStyle = "blue";
    context.lineWidth = this.lineWidth;
    context.arc(0, 0, this.radius, 0, 2*Math.PI)
    context.fill();
    context.stroke();
    context.restore();
  }
}

// export default point;