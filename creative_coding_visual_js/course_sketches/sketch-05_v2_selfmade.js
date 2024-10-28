const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 2048, 2048 ]
};

let pos = {
  x: 500,
  y: 0
}

let manager;

// Hoved Callback funksjonen som sendes inn i canvasSketch.
const sketch = (context,width,height) => {
  console.log("Running Sketch...(callback)")

  return async ({ context, width, height }) => {
    console.log("Running Sketch...(Return)")

    // Tegn Bilde rett i hoved canvaset
    image = await JpDrawImage('https://picsum.photos/2000');
    context.drawImage(image, 200, 200, 200, 200);

    // // Dette fungerer det også!
    // image2 = new Image();
    // image2.src = `https://picsum.photos/${2000-pos.x}`
    // // image2.src = `https://picsum.photos/${2000}`
    // image2.onload = async () =>{
    //   context.drawImage(image2,400,400,1000, 1000);
    // }


    // // Tegn Mal Canvasset inn i hovedcanvaset
    // canvas = await drawCanvas();
    // context.drawImage(canvas, 0, 0, 1000,1000);
    context.drawImage(await drawCanvas(), 0, 0, 1000,1000);

    context.fillStyle = "black";
    context.fillRect(pos.x += 100, pos.y += 100, 200, 200);
    
  };
};

// Funksjon for å lage selve Mal Canvaset
const drawCanvas = async () => {
  const typeCanvas = document.createElement('canvas');
  const typeContext = typeCanvas.getContext('2d');
  typeCanvas.width = 1000;
  typeCanvas.height = 1000; 
  typeContext.width = typeCanvas.width;
  typeContext.height = typeCanvas.height;

  typeContext.fillStyle = "red";
  typeContext.fillRect(0,0,typeContext.width,typeContext.height);

  typeContext.fillStyle = "yellow";
  typeContext.fillRect(0, typeContext.height/2-50, typeContext.width, 100);

  typeContext.fillStyle = "yellow";
  typeContext.fillRect(typeContext.width/2-50, 0, 100, typeContext.width);

  typeContext.lineWidth = 5;
  typeContext.rect(0, 0, typeContext.width, typeContext.height);
  typeContext.stroke();

  tmnt = await JpDrawImage('https://hdqwalls.com/download/tmnt-cartoon-art-1k-1920x1080.jpg');
  typeContext.drawImage(tmnt, 0, 0, typeContext.width/2, typeContext.height/2);

  return typeCanvas
}

// Funksjon som skal kjøres ved gitt event
const onKeydown = (e) => {
  input_text = e.key.toUpperCase();
  console.log(e);
  manager.render();
}
// registrer funksjonen over inn i et gitt event
document.addEventListener('keyup',onKeydown);

// Funksjon for å starte canvasSketch og legge the i variablen manager som ett object. dette objectet kan styres med feks. "manager.render()"
const start = async () => {
  manager = await canvasSketch(sketch, settings)
}
start();

// funksjon som returnerer ett promise om at det lages og lastes ett bilde når bildet er ferdig lastet.
const JpDrawImage = (url) =>{
  return new Promise((resolve, reject) =>{
    console.log("promise");
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject();
    img.src = url;
  })
}