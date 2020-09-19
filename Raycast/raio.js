class raio{
    constructor(pos, angle){
        this.position = pos;
        this.direction = p5.Vector.fromAngle(angle);
    }

    lookAt(x, y){
        this.direction.x = x - this.position.x;
        this.direction.y = y - this.position.y;
        this.direction.normalize();
    }

    show(){
        stroke(255);
        push();
        translate(this.position.x, this.position.y);
        line(0, 0, this.direction.x * 20, this.direction.y * 20);
        pop();
    }

    cast(wall){
        let x1 = wall.a.x;
        let y1 = wall.a.y;
        let x2 = wall.b.x;
        let y2 = wall.b.y;
        
        let x3 = this.position.x;
        let y3 = this.position.y;
        let x4 = this.position.x + this.direction.x;
        let y4 = this.position.y + this.direction.y;

        let t, u;
        let denominador = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

        if(denominador == 0){
            return null;
        }

        t =   ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominador;
        u = -(((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denominador);
        
        if(t > 0 && t < 1 & u > 0){
            let x = (x3 + u*(x4 - x3));
            let y = (y3 + u*(y4 - y3));
            return createVector(x, y);
        }
        else{
            return null;
        }
    }
}