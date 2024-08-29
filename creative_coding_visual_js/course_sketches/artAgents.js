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
    this.radius = 30;
    this.lineWidth = 10;
  }
  
  draw(context){
    context.beginPath();
    context.strokeStyle = "red";
    context.fillStyle = "blue";
    context.lineWidth = 10;
    context.arc(this.pos.x, this.pos.y, this.radius, 0, 2*Math.PI)
    context.stroke();
    // context.fill();
  }
}

// export default point;