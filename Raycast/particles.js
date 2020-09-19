class particles{
    constructor(){
        this.pos = createVector(0, 0);
        this.rays = [];
        for(let a = 0; a < 360; a += 0.5){
            this.rays.push(new raio(this.pos, radians(a)));
        }
    }

    move(x, y){
        this.pos.set(x,y);
    }

    show(){
        fill(255);
        for(let raio of this.rays){
            raio.show();
        }
    }

    look(walls){
        for(let raio of this.rays){
            let proximo = null;
            let record = Infinity;
            for(let wall of walls){
                let point = raio.cast(wall);
                if( point != null){
                    const dist = p5.Vector.dist(this.pos, point);
                    if(dist < record){
                        record = dist;
                        proximo = point;
                    }
                }
            }
            if(proximo){
                stroke(255,100);
                line(this.pos.x, this.pos.y, proximo.x, proximo.y);
                //ellipse(proximo.x, proximo.y, 10);
            }
        }
    }
}