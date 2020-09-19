let width = 550, height = 550;

const LADRILHO = 10;

let posiX = width/2;
let posiY = height/2;

let cobra = [posiX, posiY];
let velocidadeX = 0;
let velocidadeY = 0;

let comidaX, comidaY;
let comidas = 0;
let crescendo = 0;

let level = 10;
let emJogo = true;

function setup() {
  createCanvas(width, height);
  geraComida();  
}

function draw() {
  frameRate(level);
  if(emJogo){
    desenhaCobra();
    movimento();
    creser();
    if(comidas === 10){
      comidas = 0;
      level += 5;
    }

    textSize(30);
    fill(0);
    text("Level: " + (level - 5)/5, 20, 50);
    text("Pontos: " + (cobra.length/2), 20, height - 50);
  }
  else{
    fimDeJogo();
  }
}

function keyPressed() { //completo
  if(key === 'r' || key === 'R'){
    posiX = width/2;
    posiY = height/2;
    velocidadeX = 0;
    velocidadeY = 0;
    cobra = [posiX, posiY];
    level = 10;
    comidas = 0;
    crescendo = 0;
    emJogo = true;
    geraComida();
  }
  if(keyCode == UP_ARROW && velocidadeY != LADRILHO){
    velocidadeY = -LADRILHO;
    velocidadeX = 0;
  }else if(keyCode === DOWN_ARROW && velocidadeY != -LADRILHO){
    velocidadeY = LADRILHO;
    velocidadeX = 0;
  }else if(keyCode === LEFT_ARROW && velocidadeX != LADRILHO){
    velocidadeX = -LADRILHO;
    velocidadeY = 0;
  }else if(keyCode === RIGHT_ARROW && velocidadeX != -LADRILHO){
    velocidadeX = LADRILHO;
    velocidadeY = 0;
  }
}

function desenhaCobra(){
  background(0, 200, 100);
  
  fill("red");
  noStroke();
  rectMode(CORNER);
  rect(comidaX*LADRILHO, comidaY*LADRILHO,LADRILHO, LADRILHO );

  fill("blue");
  rectMode(CENTER);
  for(let i = 0; i < cobra.length; i += 2){
    if(i != cobra.length-2 
      && cobra[i] === cobra[cobra.length-2] 
      && cobra[i+1] === cobra[cobra.length-1]){
     // console.log(cobra);
      emJogo = false;
      break;
    }
    else{
      rect(cobra[i], cobra[i+1], LADRILHO, LADRILHO );
    }  
  }
}

function geraComida(){ //completo
  comidaX = Math.floor(randEntre(0, width)/LADRILHO);
  comidaY = Math.floor(randEntre(0, height)/LADRILHO);
}

function creser(){ //completo
  if(Math.floor(posiX/LADRILHO) === comidaX && Math.floor(posiY/LADRILHO) === comidaY){
    crescendo = 0;
    comidas++;
    geraComida();  
  }
}

function randEntre(x,y){ //completo
  return Math.floor(Math.random() * (y-x+1))+x;
}

function movimento(){ //completo
  posiX += velocidadeX;
  posiY += velocidadeY;
  
  if(posiX < 0){
    posiX = width-LADRILHO/2;
  }
  else if(posiX >= width){
    posiX = LADRILHO/2;
  }
  if(posiY < 0){
    posiY = height-LADRILHO/2;
  }
  else if(posiY >= height){
    posiY = LADRILHO/2;
  }
  
  if(crescendo > 2){
    cobra.shift();
    cobra.shift();
  }

  if(velocidadeX != 0 || velocidadeY != 0){
    cobra.push(posiX);
    cobra.push(posiY);
    crescendo++;
  }
}

function fimDeJogo(){ //completo
  background(0);
  fill(0, 200, 100);
  rectMode(CENTER);
  rect(width/2, height/2, width - 20, height - 20);

  textSize(50);
  fill(0, 0, 0);

  text("Acabou o Jogo!", width/2 - textWidth("Acabou o Jogo!")/2, 100);
  text("Seu Recorde é:", width/2 - textWidth("Seu Recorde é:")/2, 180);
  text((cobra.length/2)+ " pontos", width/2 - textWidth("Pontos: " + (cobra.length/2))/2, 250);  
}

