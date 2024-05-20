function getIntersection(A,B,C,D){ 
    const tTop=(D.x-C.x)*(A.y-C.y)-(D.y-C.y)*(A.x-C.x);
    const uTop=(C.y-A.y)*(A.x-B.x)-(C.x-A.x)*(A.y-B.y);
    const bottom=(D.y-C.y)*(B.x-A.x)-(D.x-C.x)*(B.y-A.y);
    
    // small change made
    const eps = 0.001;
    if(Math.abs(bottom)>eps){      //if(bottom!=0){
        const t=tTop/bottom;
        const u=uTop/bottom;
        if(t>=0 && t<=1 && u>=0 && u<=1){
            return {
                x:lerp(A.x,B.x,t),
                y:lerp(A.y,B.y,t),
                offset:t
            }
        }
    }

    return null;
}

function lerp(A,B,t){
    return A+(B-A)*t;
}

function lerp2D(A, B, t){
    return new Point(lerp(A.x, B.x, t), lerp(A.y, B.y, t));
}

function invLerp(a, b, v){
    return (v - a) / (b - a);
}

function getNearestPoint(location, points, threshold = 20){
    let minDist = Number.MAX_SAFE_INTEGER;
    let nearest = null;
    for(const point of points){
        const dist = distance(point, location);
        if(dist < minDist && dist < threshold){
            minDist = dist;
            nearest = point;
        }
    }
    return nearest;
}

function getNearestSegment(location, segments, threshold = 20){
    let minDist = Number.MAX_SAFE_INTEGER;
    let nearest = null;
    for(const segment of segments){
        const dist = segment.distanceToPoint(location);
        if(dist < minDist && dist < threshold){
            minDist = dist;
            nearest = segment;
        }
    }
    return nearest;
}

function distance(p1, p2){
    return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}

function average(p1, p2){
    return new Point( (p1.x + p2.x) / 2, (p1.y + p2.y) / 2 );
}

function dot(p1, p2){
    return p1.x * p2.x + p1.y * p2.y;
}

function add(p1, p2){
    return new Point(p1.x + p2.x, p1.y + p2.y);
}

function subtract(p1, p2){
    return new Point(p1.x - p2.x, p1.y - p2.y);
}

function getTouchPosition(touch) {
    const rect = this.canvas.getBoundingClientRect();
    return new Point(
      (touch.clientX - rect.left) / this.zoom,
      (touch.clientY - rect.top) / this.zoom
    );
  }

function scale(p, scaler){
    return new Point(p.x*scaler, p.y*scaler);
}

function normalize(p){
    return scale(p, 1 / magnitude(p));
}

function magnitude(p){
    return Math.hypot(p.x, p.y);
}

function translate(loc, angle, offset){
    return new Point(
        loc.x + Math.cos(angle) * offset,
        loc.y + Math.sin(angle) * offset
    );
}

function perpendicular(p){
    return new Point(-p.y, p.x);
}

function angle(p){
    return Math.atan2(p.y, p.x);
}

function getRandomColor(){
    const hue = 290 + Math.random() * 260;
    return "hsl(" + hue + ", 100%, 60%)";
}