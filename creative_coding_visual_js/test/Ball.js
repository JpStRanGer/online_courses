class Ball{
    constructor(t_width, t_height){
        this.width = t_width;
        this.height = t_height;
        console.log("Constructing Ball");
    }

    draw(context){
        console.log("drawing ball")
        context.beginPath();
        let x = this.width / 2;
        let y = this.height /2;
        let radius = this.width / 4;
        let startAngle = 0 * Math.PI;
        let endAngel = 1 * Math.PI;
        context.lineWidth = 40;
        context.arc(x, y, radius, startAngle, endAngel);
        context.stroke();
        context.beginPath
    }
}

export default Ball;