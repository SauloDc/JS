let img;
let width = 500, height = 500;
let posix = width/2, posiy = height/2;
let projetilX = 0, projetilY = 0;
let atirando = false;
let velTiro = 0;
let posiTiroX = 0, posiTiroY = 0; 
let pontos = 0;
let parede = false;
let paredeX = 0, paredeY = 0;
let balas = 30;

function preload() {
  img = loadImage('imgs/car.png');
  soundFormats('mp3', 'ogg','wav');
  mySound = loadSound('sound/biglaser.wav');
}

function setup() {
 createCanvas(width, height); 
 fill(0,0,0);
 textSize(30);
 noCursor();
 mySound.setVolume(0.1);
}

function draw(){
  frameRate(60);
  background(200);

  imageMode(CENTER);
  image(img, posix, posiy);
  
  text("pontos: "+JSON.stringify(pontos), 33, height - 30);
  if(balas <= 0)
  fill (255,0,0);
  text("balas: "+JSON.stringify(balas > 0 ? balas : 0)+"/30", width - 200, height - 30);

  if(atirando){
    desenhaTiro(1);
  }
  
  desenhaParede();
  movimentoMouse();

}

function desenhaTiro(tipo){
  
  if(tipo === 1){
    velTiro = 10;
  } else if (tipo === 2){
    velTiro = 25;
  } 
  if(posiTiroY > 0 && balas > 0){
    fill(255 , 0, 0);
    noStroke();
    rect(posiTiroX, posiTiroY, 4, 10);
    posiTiroY -= velTiro;
  }else{
    atirando = false;
  }
}

function randEntre(x,y){
  return Math.floor(Math.random() * (y-x+1))+x;
}

function desenhaParede(){
  if (!parede){
    paredeX = randEntre(5, width - 55);
    paredeY = randEntre(10, 200);
    parede = true;
  }
  if(posiTiroY <= paredeY && posiTiroX > paredeX && posiTiroX < paredeX + 50){
    posiTiroY = 0;
    posiTiroX = 0;
    pontos += 10;
    parede = false;
  }
  fill(0, 30, 0);
  rect(paredeX, paredeY, 50, 10);
}

function keyPressed() {
  if ((key === 'z' || key === 'Z') && balas > 0){
    mySound.play();
    atirando = true;
    balas--;
    posiTiroX = posix - 2;
    posiTiroY = posiy - 32;
    console.log(atirando);
  }

  if (key === 'r' || key === 'R'){
    balas = 30;
  }
}

function movimento(){
  if (keyIsDown(LEFT_ARROW)) {
    posix -= 10;
  } else if (keyIsDown(RIGHT_ARROW)) {
    posix += 10;
  } else if (keyIsDown(UP_ARROW)) {
    posiy -= 10;
  } else if (keyIsDown(DOWN_ARROW)) {
    posiy += 10;
  }
}

function movimentoMouse(){
  posix = mouseX;
  posiy = mouseY;
}

function mouseClicked() {

  if (mouseButton === LEFT && balas > 0) {
    mySound.play();
    atirando = true;
    balas--;
    posiTiroX = posix - 2;
    posiTiroY = posiy - 32;
  }

}