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

function distance(p1, p2){
    return Math.hypot(p1.x - p2.x, p1.y - p2.y);
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