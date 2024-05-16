class Point {
    constructor(x,y){
        this.x = x;
        this.y = y;
    }

    equals(poiint){
        return this.x == poiint.x && this.y == poiint.y;
    }
    
    draw(ctx, size=18, color="black"){
        const rad = size/2;
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(this.x, this.y, rad, 0, Math.PI*2);
        ctx.fill();
    }
}