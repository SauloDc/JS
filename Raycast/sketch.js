let walls = [];
let particle;
let width = 900;
let height = 900;

function setup() {
  createCanvas(width, height);
  particle = new particles();

  walls.push(new fronteira(1, 1, width - 1, 1));
  walls.push(new fronteira(1, 1, 1, height - 1));
  walls.push(new fronteira(width - 1, 1, width - 1, height - 1));
  walls.push(new fronteira(1, height - 1, width - 1, height - 1));
  
  for(let i = 0; i < 5; i++){
    x1 = random(width);
    y1 = random(height);
    x2 = random(width);
    y2 = random(height);
    walls.push(new fronteira(x1, y1, x2, y2));
  }
}

function draw() {
  background(0);
  particle.move(mouseX, mouseY);
  particle.show();
  particle.look(walls);  

  for(let wall of walls){
    wall.show();
  }

}