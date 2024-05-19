class Marking{
    constructor(center, directionVector, width, height){
        this.center = center;
        this.directionVector = directionVector;
        this.width = width;
        this.height = height;

        this.support = new Segment(
            translate(center, angle(directionVector), height / 2),
            translate(center, angle(directionVector), -height / 2)
        );

        this.poly = new Envelope(this.support, width, 0).poly;
        this.type = "marking";
    }

    static load(info){
        const point = new Point(info.center.x, info.center.y)
        const directionVector = new Point(info.directionVector.x, info.directionVector.y);
        switch(info.type){
            case "crossing":
                return new Crossing(point, directionVector, info.width, info.height);
            case "stop":
                return new Stop(point, directionVector, info.width, info.height);
            case "start":
                return new Start(point, directionVector, info.width, info.height);
            case "marking":
                return new Marking(point, directionVector, info.width, info.height);
        }
    }

    draw(ctx){
        this.poly.draw(ctx);
    }
}