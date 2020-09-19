let teste = true;
let width = 784, height  = 504;

const LADRILHO = 56;

let tabuleiro = {
  posiX : 168, //28
  posiY : 28, //28
  pecas : [[-2,-3,-4,-5,-6,-4,-3,-2],
           [-1,-1,-1,-1,-1,-1,-1,-1],
           [ 0, 0, 0, 0, 0, 0, 0, 0],
           [ 0, 0, 0, 0, 0, 0, 0, 0],
           [ 0, 0, 0, 0, 0, 0, 0, 0],
           [ 0, 0, 0, 0, 0, 0, 0, 0],
           [ 1, 1, 1, 1, 1, 1, 1, 1],
           [ 2, 3, 4, 5, 6, 4, 3, 2]],
  brancasCapturadas : [],
  amarelasCapturadas : [],
  tamanho : 8 * LADRILHO
}

let pca = {
  posi : [],
  tipo : null
};

let pcasNome = ["Peao", "Torre", "Cavalo", "Bispo", "Rainha", "Rei"];
let pcasBrancasImg = [""];
let pcasAmarelasImg = [""];

function preload() {
  
  for(let i = 0; i < 6; i++){
    pcasBrancasImg.push(loadImage('imgs/pcas/'+pcasNome[i]+'_b.png'));
    pcasAmarelasImg.push(loadImage('imgs/pcas/'+pcasNome[i]+'_a.png'));
  }
  board = loadImage('imgs/board.png');
}

function setup() {
  createCanvas(width, height);
}

function draw() {
  background(50);

  imageMode(CORNER);
  image(board, 140, 0);

  desenhaMovimento(pca.posi, pca.tipo); 
  //desenhaLadrilhos();
  desenhaPecas();
  
  console.log(JSON.stringify(pca.posi));

  imageMode(CENTER);
  if(pca.tipo > 0){
    image(pcasAmarelasImg[pca.tipo], mouseX, mouseY);
  }else if(pca.tipo < 0){
    image(pcasBrancasImg[-pca.tipo], mouseX, mouseY);
  }
}

function desenhaLadrilhos(){
  rectMode(CORNER);
  for(let i = tabuleiro.posiX; i < tabuleiro.tamanho + tabuleiro.posiX; i += LADRILHO){
    for(let j = tabuleiro.posiY; j < tabuleiro.tamanho + tabuleiro.posiY; j += LADRILHO){
  // for(let i = tabuleiro.posiX+28; i < tabuleiro.tamanho + tabuleiro.posiX; i += LADRILHO){
  //   for(let j = tabuleiro.posiY+28; j < tabuleiro.tamanho + tabuleiro.posiY; j += LADRILHO){
      noStroke();
      fill('rgba(255, 0, 0, 0.3)');
      rect( i, j, LADRILHO, LADRILHO);
      //fill("blue");
      //text(coordToTabuleiro( i, j)[0]+","+coordToTabuleiro(i,j)[1], i, j);
    }
  }
}

function desenhaMovimento( position, tipo){
  let coord = tabuleiroToCoord(position[0], position[1]);
  rectMode(CORNER);
  stroke(255);
  fill("black");
  
  switch(tipo){
    case -1 : {//peao branco COMPLETO
      if(position[0] <= 7 && position[1] + 1 <= 7){ 
        if(tabuleiro.pecas[position[1]+1][position[0]] === 0){
          fill('rgba(238, 153, 45, 0.5)');
          rect( coord[0], coord[1] + LADRILHO, LADRILHO, LADRILHO);
          if(position[1] === 1 && tabuleiro.pecas[position[1]+2][position[0]] === 0)
            rect( coord[0], coord[1] + 2 * LADRILHO, LADRILHO, LADRILHO);
        }
        if(tabuleiro.pecas[position[1]+1][position[0]+1] > 0){
          fill('rgba(255, 0, 0, 1)');
          rect( coord[0] + LADRILHO, coord[1] + LADRILHO, LADRILHO, LADRILHO);
        }
        if(tabuleiro.pecas[position[1]+1][position[0]-1] > 0){
          fill('rgba(255, 0, 0, 1)');
          rect( coord[0] - LADRILHO, coord[1] + LADRILHO, LADRILHO, LADRILHO);
        } 
      }
      break;
    }
    case  1 : {  //peao amarelo COMPLETO
      if(position[0] >= 0 && position[1] - 1 >= 0){ 
        if(tabuleiro.pecas[position[1] - 1][position[0]] === 0){
          fill('rgba(238, 153, 45, 0.5)');
          rect( coord[0], coord[1] - LADRILHO, LADRILHO, LADRILHO);
          if(position[1] === 6 && tabuleiro.pecas[position[1] - 2][position[0]] === 0)
            rect( coord[0], coord[1] - 2 * LADRILHO, LADRILHO, LADRILHO);
        }
        if(tabuleiro.pecas[position[1] - 1][position[0] - 1] < 0){
          fill('rgba(255, 0, 0, 1)');
          rect( coord[0] - LADRILHO, coord[1] - LADRILHO, LADRILHO, LADRILHO);
        }
        if(tabuleiro.pecas[position[1] - 1][position[0]+1] < 0){
          fill('rgba(255, 0, 0, 1)');
          rect( coord[0] + LADRILHO, coord[1] - LADRILHO, LADRILHO, LADRILHO);
        }
      }
      break;
    }      
    case -2 :    //torre branca  //COMPLETO 
    case  2 : {  //torre amarela //COMPLETO
      let distXp = 10; //direita
      let distXn = 10; //esquerda
      let distYp = 10; //baixo
      let distYn = 10; //cima
      
      for(let i  = 0; i < 8; i++){
        if( tabuleiro.pecas[i][position[0]] !== 0 && i < position[1]){
          distYn = i;
        }
        else if(tabuleiro.pecas[i][position[0]] !== 0 && i > position[1]){
          distYp = i;
          break;
        }        
      }

      for(let j  = 0; j < 8; j++){
        if( tabuleiro.pecas[position[1]][j] !== 0 && j < position[0]){
          distXn = j;
        }
        else if(tabuleiro.pecas[position[1]][j] !== 0 && j > position[0]){
          distXp = j;
          break;
        }        
      }
      
      distYn++;
      distXn++;

      distYn = distYn > 7 ? 0 : distYn;
      distYp = distYp > 8 ? 8 : distYp;
      distXn = distXn > 7 ? 0 : distXn;
      distXp = distXp > 8 ? 8 : distXp;

      for(let i = distYn; i < distYp; i++){
        for(let j = distXn; j < distXp; j++){
          if(i == position[1] && j == position[0]){
          }
          else if(i == position[1] || j == position[0]){
            fill('rgba(238, 153, 45, 0.5)');
            rect( tabuleiroToCoord( j, i)[0], tabuleiroToCoord( j, i)[1], LADRILHO, LADRILHO);
          }
        }
      }
      // capturar
      fill('rgba(255, 0, 0, 1)');
      if(distYn - 1 >= 0 && distYn - 1 < position[1]){
        if(tabuleiro.pecas[distYn - 1][position[0]] > 0 && pca.tipo < 0 || tabuleiro.pecas[distYn - 1][position[0]] < 0 && pca.tipo > 0){
          rect( tabuleiroToCoord(position[0], distYn - 1)[0], tabuleiroToCoord( position[0], distYn - 1)[1], LADRILHO, LADRILHO);
        }
      }
      if(distYp > position[1] && distYp <= 7){
        if(tabuleiro.pecas[distYp][position[0]] > 0 && pca.tipo < 0 || tabuleiro.pecas[distYp][position[0]] < 0 && pca.tipo > 0){
          rect( tabuleiroToCoord(position[0], distYp)[0], tabuleiroToCoord( position[0], distYp)[1], LADRILHO, LADRILHO);
        }
      }
      if(distXn - 1 >= 0 && distXn - 1 < position[0]){
        if(tabuleiro.pecas[position[1]][distXn - 1] > 0 && pca.tipo < 0 || tabuleiro.pecas[position[1]][distXn - 1] < 0 && pca.tipo > 0){
          rect( tabuleiroToCoord(distXn - 1, position[1])[0], tabuleiroToCoord(distXn - 1, position[1])[1], LADRILHO, LADRILHO);
        }
      }
      if(distXp > position[0] && distXp <= 7){
        if(tabuleiro.pecas[position[1]][distXp] > 0 && pca.tipo < 0 || tabuleiro.pecas[position[1]][distXp] < 0 && pca.tipo > 0){
          rect( tabuleiroToCoord(distXp, position[1])[0], tabuleiroToCoord(distXp, position[1])[1], LADRILHO, LADRILHO);
        }
      } 
      break;
    }
    case -3 :   //cavalo branco
    case  3 : { //cavalo amarelo
      if(position[0] - 1 >= 0 && position[1] - 2 >= 0){ //cima esquerda
        if(tabuleiro.pecas[position[1] - 2][position[0] - 1] > 0 && pca.tipo < 0 ||
           tabuleiro.pecas[position[1] - 2][position[0] - 1] < 0 && pca.tipo > 0){
            fill('rgba(255, 0, 0, 1)');
            rect( tabuleiroToCoord(position[0] - 1, position[1] - 2)[0], tabuleiroToCoord(position[0] - 1, position[1] - 2)[1], LADRILHO, LADRILHO);
        }
        else if(tabuleiro.pecas[position[1] - 2][position[0] - 1] == 0){
          fill('rgba(238, 153, 45, 0.5)');
          rect( tabuleiroToCoord(position[0] - 1, position[1] - 2)[0], tabuleiroToCoord(position[0] - 1, position[1] - 2)[1], LADRILHO, LADRILHO);
        }
      }
      if(position[0] + 1 <= 7 && position[1] - 2 >= 0){ //cima direita
        if(tabuleiro.pecas[position[1] - 2][position[0] + 1] > 0 && pca.tipo < 0 ||
           tabuleiro.pecas[position[1] - 2][position[0] + 1] < 0 && pca.tipo > 0){
            fill('rgba(255, 0, 0, 1)');
            rect( tabuleiroToCoord(position[0] + 1, position[1] - 2)[0], tabuleiroToCoord(position[0] + 1, position[1] - 2)[1], LADRILHO, LADRILHO);
        }
        else if(tabuleiro.pecas[position[1] - 2][position[0] + 1] == 0){
          fill('rgba(238, 153, 45, 0.5)');
          rect( tabuleiroToCoord(position[0] + 1, position[1] - 2)[0], tabuleiroToCoord(position[0] + 1, position[1] - 2)[1], LADRILHO, LADRILHO);
        }
      }
      if(position[0] - 1 >= 0 && position[1] + 2 <= 7){ //baixo esquerda
        if(tabuleiro.pecas[position[1] + 2][position[0] - 1] > 0 && pca.tipo < 0 ||
           tabuleiro.pecas[position[1] + 2][position[0] - 1] < 0 && pca.tipo > 0){
            fill('rgba(255, 0, 0, 1)');
            rect( tabuleiroToCoord(position[0] - 1, position[1] + 2)[0], tabuleiroToCoord(position[0] - 1, position[1] + 2)[1], LADRILHO, LADRILHO);
        }
        else if(tabuleiro.pecas[position[1] + 2][position[0] - 1] == 0){
          fill('rgba(238, 153, 45, 0.5)');
          rect( tabuleiroToCoord(position[0] - 1, position[1] + 2)[0], tabuleiroToCoord(position[0] - 1, position[1] + 2)[1], LADRILHO, LADRILHO);
        }
      }
      if(position[0] + 1 <= 7 && position[1] + 2 <= 7){ //baixo direita
        if(tabuleiro.pecas[position[1] + 2][position[0] + 1] > 0 && pca.tipo < 0 ||
           tabuleiro.pecas[position[1] + 2][position[0] + 1] < 0 && pca.tipo > 0){
            fill('rgba(255, 0, 0, 1)');
            rect( tabuleiroToCoord(position[0] + 1, position[1] + 2)[0], tabuleiroToCoord(position[0] + 1, position[1] + 2)[1], LADRILHO, LADRILHO);
        }
        else if(tabuleiro.pecas[position[1] + 2][position[0] + 1] == 0){
          fill('rgba(238, 153, 45, 0.5)');
          rect( tabuleiroToCoord(position[0] + 1, position[1] + 2)[0], tabuleiroToCoord(position[0] + 1, position[1] + 2)[1], LADRILHO, LADRILHO);
        }
      }
      if(position[0] - 2 >= 0 && position[1] - 1 >= 0){ //meio esquerda cima
        if(tabuleiro.pecas[position[1] - 1][position[0] - 2] > 0 && pca.tipo < 0 ||
           tabuleiro.pecas[position[1] - 1][position[0] - 2] < 0 && pca.tipo > 0){
            fill('rgba(255, 0, 0, 1)');
            rect( tabuleiroToCoord(position[0] - 2, position[1] - 1)[0], tabuleiroToCoord(position[0] - 2, position[1] - 1)[1], LADRILHO, LADRILHO);
        }
        else if(tabuleiro.pecas[position[1] - 1][position[0] - 2] == 0){
          fill('rgba(238, 153, 45, 0.5)');
          rect( tabuleiroToCoord(position[0] - 2, position[1] - 1)[0], tabuleiroToCoord(position[0] - 2, position[1] - 1)[1], LADRILHO, LADRILHO);
        }
      }
      if(position[0] - 2 >= 0 && position[1] + 1 <= 7){ //meio esquerda baixo
        if(tabuleiro.pecas[position[1] + 1][position[0] - 2] > 0 && pca.tipo < 0 ||
           tabuleiro.pecas[position[1] + 1][position[0] - 2] < 0 && pca.tipo > 0){
            fill('rgba(255, 0, 0, 1)');
            rect( tabuleiroToCoord(position[0] - 2, position[1] + 1)[0], tabuleiroToCoord(position[0] - 2, position[1] + 1)[1], LADRILHO, LADRILHO);
        }
        else if(tabuleiro.pecas[position[1] + 1][position[0] - 2] == 0){
          fill('rgba(238, 153, 45, 0.5)');
          rect( tabuleiroToCoord(position[0] - 2, position[1] + 1)[0], tabuleiroToCoord(position[0] - 2, position[1] + 1)[1], LADRILHO, LADRILHO);
        }
      }
      if(position[0] + 2 <= 7 && position[1] - 1 >= 0){ //meio direita cima
        if(tabuleiro.pecas[position[1] - 1][position[0] + 2] > 0 && pca.tipo < 0 ||
           tabuleiro.pecas[position[1] - 1][position[0] + 2] < 0 && pca.tipo > 0){
            fill('rgba(255, 0, 0, 1)');
            rect( tabuleiroToCoord(position[0] + 2, position[1] - 1)[0], tabuleiroToCoord(position[0] + 2, position[1] - 1)[1], LADRILHO, LADRILHO);
        }
        else if(tabuleiro.pecas[position[1] - 1][position[0] + 2] == 0){
          fill('rgba(238, 153, 45, 0.5)');
          rect( tabuleiroToCoord(position[0] + 2, position[1] - 1)[0], tabuleiroToCoord(position[0] + 2, position[1] - 1)[1], LADRILHO, LADRILHO);
        }
      }
      if(position[0] + 2 <= 7 && position[1] + 1 <= 7){ //meio direita baixo
        if(tabuleiro.pecas[position[1] + 1][position[0] + 2] > 0 && pca.tipo < 0 ||
           tabuleiro.pecas[position[1] + 1][position[0] + 2] < 0 && pca.tipo > 0){
            fill('rgba(255, 0, 0, 1)');
            rect( tabuleiroToCoord(position[0] + 2, position[1] + 1)[0], tabuleiroToCoord(position[0] + 2, position[1] + 1)[1], LADRILHO, LADRILHO);
        }
        else if(tabuleiro.pecas[position[1] + 1][position[0] + 2] == 0){
          fill('rgba(238, 153, 45, 0.5)');
          rect( tabuleiroToCoord(position[0] + 2, position[1] + 1)[0], tabuleiroToCoord(position[0] + 2, position[1] + 1)[1], LADRILHO, LADRILHO);
        }
      }    
      break;
    }
    case -4 :   //bispo branco
    case  4 : { //bispo amarelo 
      let distCd = 10; //cima direita
      let distCe = 10; //cima esquerda
      let distBd = 10; //baixo direita
      let distBe = 10; //baixo esquerda
      
      for(let i  = 0; i < 8; i++){
        if( tabuleiro.pecas[i][position[0]] !== 0 && i < position[1]){
          distYn = i;
        }
        else if(tabuleiro.pecas[i][position[0]] !== 0 && i > position[1]){
          distYp = i;
          break;
        }        
      }

      for(let j  = 0; j < 8; j++){
        if( tabuleiro.pecas[position[1]][j] !== 0 && j < position[0]){
          distXn = j;
        }
        else if(tabuleiro.pecas[position[1]][j] !== 0 && j > position[0]){
          distXp = j;
          break;
        }        
      }
      
      distYn++;
      distXn++;

      distYn = distYn > 7 ? 0 : distYn;
      distYp = distYp > 8 ? 8 : distYp;
      distXn = distXn > 7 ? 0 : distXn;
      distXp = distXp > 8 ? 8 : distXp;

      for(let i = distYn; i < distYp; i++){
        for(let j = distXn; j < distXp; j++){
          if(i == position[1] && j == position[0]){
          }
          else if(i == position[1] || j == position[0]){
            fill('rgba(238, 153, 45, 0.5)');
            rect( tabuleiroToCoord( j, i)[0], tabuleiroToCoord( j, i)[1], LADRILHO, LADRILHO);
          }
        }
      }
      // capturar
      fill('rgba(255, 0, 0, 1)');
      if(distYn - 1 >= 0 && distYn - 1 < position[1]){
        if(tabuleiro.pecas[distYn - 1][position[0]] > 0 && pca.tipo < 0 || tabuleiro.pecas[distYn - 1][position[0]] < 0 && pca.tipo > 0){
          rect( tabuleiroToCoord(position[0], distYn - 1)[0], tabuleiroToCoord( position[0], distYn - 1)[1], LADRILHO, LADRILHO);
        }
      }
      if(distYp > position[1] && distYp <= 7){
        if(tabuleiro.pecas[distYp][position[0]] > 0 && pca.tipo < 0 || tabuleiro.pecas[distYp][position[0]] < 0 && pca.tipo > 0){
          rect( tabuleiroToCoord(position[0], distYp)[0], tabuleiroToCoord( position[0], distYp)[1], LADRILHO, LADRILHO);
        }
      }
      if(distXn - 1 >= 0 && distXn - 1 < position[0]){
        if(tabuleiro.pecas[position[1]][distXn - 1] > 0 && pca.tipo < 0 || tabuleiro.pecas[position[1]][distXn - 1] < 0 && pca.tipo > 0){
          rect( tabuleiroToCoord(distXn - 1, position[1])[0], tabuleiroToCoord(distXn - 1, position[1])[1], LADRILHO, LADRILHO);
        }
      }
      if(distXp > position[0] && distXp <= 7){
        if(tabuleiro.pecas[position[1]][distXp] > 0 && pca.tipo < 0 || tabuleiro.pecas[position[1]][distXp] < 0 && pca.tipo > 0){
          rect( tabuleiroToCoord(distXp, position[1])[0], tabuleiroToCoord(distXp, position[1])[1], LADRILHO, LADRILHO);
        }
      }
    }
    case -5 :   //rainha branco
    case  5 : { //rainha amarelo
      
    }
    case -6 :   //rei branco
    case  6 : { //rei amarelo 
      
    }
  }
}

function tabuleiroToCoord( x, y){
  let coord = [];
  coord.push((x * LADRILHO) + tabuleiro.posiX);
  coord.push((y * LADRILHO) + tabuleiro.posiY);
  return coord;
}

function coordToTabuleiro( x, y){
  let coord = [];
  coord.push(Math.floor((x - tabuleiro.posiX)/LADRILHO));
  coord.push(Math.floor((y - tabuleiro.posiY)/LADRILHO));
  return coord;
}

function desenhaPecas(){
  for(let i = 0; i < 8; i++)
    for(let j = 0; j < 8; j++){
      if(tabuleiro.pecas[i][j] != 0){
        let coord = tabuleiroToCoord( j, i); //X = colunas(j) Y = Linhas(i)
        if(tabuleiro.pecas[i][j] > 0) 
          image(pcasAmarelasImg[tabuleiro.pecas[i][j]], coord[0], coord[1]);
        else if(tabuleiro.pecas[i][j] < 0) 
          image(pcasBrancasImg[-tabuleiro.pecas[i][j]], coord[0], coord[1]);
      }
    }
}

function mouseClicked(){
  let coord = coordToTabuleiro(mouseX, mouseY);
  if(mouseX > tabuleiro.posiX && mouseX < tabuleiro.tamanho + tabuleiro.posiX && 
     mouseY > tabuleiro.posiY && mouseY < tabuleiro.tamanho + tabuleiro.posiY ){
    if (tabuleiro.pecas[coord[1]][coord[0]] != 0 && pca.tipo === null){
      //console.log(coord[0] + " " + coord[1]);
      pca.tipo = tabuleiro.pecas[coord[1]][coord[0]];
      pca.posi = coord;
      tabuleiro.pecas[coord[1]][coord[0]] = 0; //X = colunas(j) Y = Linhas(i)
    }
    else if(pca.tipo != null){
      if(tabuleiro.pecas[coord[1]][coord[0]] < 0 && pca.tipo > 0 || 
        tabuleiro.pecas[coord[1]][coord[0]] > 0 && pca.tipo < 0){
        if(tabuleiro.pecas[coord[1]][coord[0]] > 0)
          tabuleiro.amarelasCapturadas.push(tabuleiro.pecas[coord[1]][coord[0]]);
        else
          tabuleiro.brancasCapturadas.push(tabuleiro.pecas[coord[1]][coord[0]]);

        tabuleiro.pecas[coord[1]][coord[0]] = pca.tipo; //X = colunas(j) Y = Linhas(i)
        pca.tipo = null;
        pca.posi = []; 
      }
      else if(tabuleiro.pecas[coord[1]][coord[0]] > 0 && pca.tipo > 0 || 
              tabuleiro.pecas[coord[1]][coord[0]] < 0 && pca.tipo < 0){
      }
      else{
        tabuleiro.pecas[coord[1]][coord[0]] = pca.tipo; //X = colunas(j) Y = Linhas(i)
        pca.tipo = null;
        pca.posi = []; 
      }
    }
  }

 //console.log("Amarelas: "+JSON.stringify(tabuleiro.amarelasCapturadas));
 //console.log("Brancas: "+JSON.stringify(tabuleiro.brancasCapturadas));
  
}

function keyPressed(){

  if (key === "r" || key === "R"){
    pca.tipo = null;
    pca.posi = [];
    tabuleiro.pecas = [[-2,-3,-4,-5,-6,-4,-3,-2],
                       [-1,-1,-1,-1,-1,-1,-1,-1],
                       [ 0, 0, 0, 0, 0, 0, 0, 0],
                       [ 0, 0, 0, 0, 0, 0, 0, 0],
                       [ 0, 0, 0, 0, 0, 0, 0, 0],
                       [ 0, 0, 0, 0, 0, 0, 0, 0],
                       [ 1, 1, 1, 1, 1, 1, 1, 1],
                       [ 2, 3, 4, 5, 6, 4, 3, 2]];
    tabuleiro.brancasCapturadas = [];
    tabuleiro.amarelasCapturadas = [];
  }
  if ((key === "z" || key === "Z") && teste){
    pca.tipo = null;
    pca.posi = [];
    tabuleiro.pecas = [[ 3, 0, 0, 0, 0, 0, 0, -3],
                       [ 0, 0, 0, 0, 0, 0, 0, 0],
                       [ 0, 0, 1, 0, 1, 0, 0, 0],
                       [ 0, 1, 0, 0, 0, 1, 0, 0],
                       [ 0, 0, 0, -3, 0, -2, 0, 0],
                       [ 0, 1, 0, 0, 0, 1, 0, 0],
                       [ 0, 0, 1, 0, 1, 0, 0, 0],
                       [ -3, 0, 0, 0, 0, 0, 0, 3]];
    tabuleiro.brancasCapturadas = [];
    tabuleiro.amarelasCapturadas = [];
  }
}
