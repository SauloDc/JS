let width = 600, height = 400;

const RAIO_BOLA = 10;
let bolaX = width/2, bolaY = height/2;
let bolaSpeedX = 5, bolaSpeedY = -5;

let  player1PosiY, player2PosiY;

player1PosiY = player2PosiY = height/2;

let score1 = 0, score2 = 0;
let vitoria = 0;

const BARRA_WIDTH = 10;
const BARRA_HEIGHT = 100;
const ESPACO_FUNDO = 10;
const CONTORNO = 5; 
const PONTOS_VITORIA = 3;

const PLAYER1_X = ESPACO_FUNDO + CONTORNO + (BARRA_WIDTH/2);
const PLAYER2_X = width - ESPACO_FUNDO - CONTORNO - (BARRA_WIDTH/2);


function preload() {
  soundFormats('mp3', 'ogg','wav');
  mySound = loadSound('sound/ball.wav');
}


function setup() {
  createCanvas(width, height);
  textSize(30);
  mySound.setVolume(0.2);
  noCursor();
}

function draw() {
  if(!vitoria){
    desenhaCampo();
    desenhaBola(bolaX, bolaY, RAIO_BOLA);
    desenhaBarra(PLAYER1_X, player1PosiY);
    desenhaBarra(PLAYER2_X, player2PosiY);
    movimentoBola();
    movimentoPlayer();
    movimentoIa();
  }else{
    fimDeJogo(vitoria);
  }
}

function desenhaBola( posix, posiy, raio){ //completo
  fill(0,0,0);
  ellipse(posix, posiy, 2*raio);
}

function desenhaBarra(posix, posiy){ //completo
  rectMode(CENTER);
  rect(posix, posiy, BARRA_WIDTH, BARRA_HEIGHT);
}

function desenhaCampo(){ //completo

  background(0);
  //campo branco
  rectMode(CENTER);
  fill(255);
  rect(width/2, height/2, width - (2 * CONTORNO), height - (2 * CONTORNO));

  fill(0);
  //Linha do centro 
  for(let i = 2 * CONTORNO; i < height; i+= (4 * CONTORNO)){
    rectMode(CENTER);
    rect(width/2, i, CONTORNO, 2*CONTORNO);
  }
  // Placar
  textSize(30);
  text("Player 1:", width/4 - textWidth("Player 1:")/2, height/4);
  text("Player 2:", width - width/4 - textWidth("Player 2:")/2, height/4);

  textSize(80);
  text(score1, width/4 - textWidth("0")/2, height/4 + 100);  
  text(score2, width - width/4 - textWidth("0")/2, height/4 + 100);
}

function movimentoBola(){ //completo
  bolaX += bolaSpeedX;
  bolaY += bolaSpeedY;

  if((bolaY + RAIO_BOLA >= height-CONTORNO)||(bolaY - RAIO_BOLA <= CONTORNO)){
    bolaSpeedY = -bolaSpeedY;
    mySound.play();
  }
  if(bolaX > width){
    score1++;
    resetaBola();
  }else if(bolaX < 0){
    score2++;
    resetaBola();
  }
  if((bolaX - RAIO_BOLA === PLAYER1_X + BARRA_WIDTH/2 
  && (bolaY > player1PosiY - BARRA_HEIGHT/2 && bolaY < player1PosiY + BARRA_HEIGHT/2))
  ||(bolaX + RAIO_BOLA === PLAYER2_X - BARRA_WIDTH/2 
  &&( bolaY > player2PosiY - BARRA_HEIGHT/2 && bolaY < player2PosiY + BARRA_HEIGHT/2))){
    bolaSpeedX = -bolaSpeedX;
    mySound.play();
  }

}

function resetaBola(){ //completo
  if(score1 === PONTOS_VITORIA || score2 === PONTOS_VITORIA){
    vitoria = score1 === PONTOS_VITORIA ? 1 : 2; 
  }
  
  bolaX = width/2;
  bolaY = height/2;
  desenhaBola(bolaX, bolaY, RAIO_BOLA);

  bolaSpeedX = -bolaSpeedX;
  bolaSpeedY = -bolaSpeedY;
}

function movimentoPlayer(){ // completo
  if(mouseY - BARRA_HEIGHT/2 > CONTORNO && mouseY + BARRA_HEIGHT/2 < height - CONTORNO){
    player1PosiY = mouseY;
  }
}

function movimentoIa(){ // em construção......
  if(bolaY < height - CONTORNO && bolaY > CONTORNO ){
    player2PosiY = bolaY;
  }
}

function fimDeJogo(jogador){ //Completo
  background(0);
  //campo branco
  rectMode(CENTER);
  fill(255);
  rect(width/2, height/2, width - (2 * CONTORNO), height - (2 * CONTORNO));

  fill(0);
  textSize(60);
  text("Player "+jogador+" venceu!", width/2 - textWidth("Player"+jogador+" venceu!")/2, height/3);
}

