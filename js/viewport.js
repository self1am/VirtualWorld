class Viewport{
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.zoom = 1;
        this.center = new Point(canvas.width / 2, canvas.height / 2);
        this.offset = new Point(0,0);
        this.drag = {
            start : new Point(0,0),
            end : new Point(0,0),
            offset : new Point(0,0),
            active : false
        }

        this.#addEventListeners();
    }

    getMouse(event) {
        if (event.touches) {
          return this.getTouchPosition(event.touches[0]);
        }
        return new Point(event.offsetX / this.zoom, event.offsetY / this.zoom);
      }

    getOffset(event){
        return add(this.offset, this.drag.offset);
    }

    #addEventListeners(){
        this.canvas.addEventListener("mousewheel", this.#handleMouseWheel.bind(this));
        this.canvas.addEventListener("mousedown", this.#handleMousedown.bind(this));
        this.canvas.addEventListener("mousemove", this.#handleMousemove.bind(this));
        this.canvas.addEventListener("mouseup", this.#handleMouseup.bind(this));

        this.canvas.addEventListener("touchstart", this.#handleTouchStart.bind(this), { passive: false });
        this.canvas.addEventListener("touchmove", this.#handleTouchMove.bind(this), { passive: false });
        this.canvas.addEventListener("touchend", this.#handleTouchEnd.bind(this), { passive: false });
        this.canvas.addEventListener("touchcancel", this.#handleTouchEnd.bind(this), { passive: false });
    }

    #handleMousedown(event){
        if(event.button == 1){
            this.drag.start = this.getMouse(event);
            this.drag.active = true;
        }
    }

    #handleMousemove(event){
        if(this.drag.active){
            this.drag.end = this.getMouse(event);
            this.drag.offset = subtract(this.drag.end, this.drag.start);
        }
    }

    #handleMouseup(event){
        if(this.drag.active){
            this.offset = add(this.offset, this.drag.offset);
            this.drag = {
                start : new Point(0,0),
                end : new Point(0,0),
                offset : new Point(0,0),
                active : false
            }
        }
    }

    #handleMouseWheel(event){
        const dir = Math.sign(event.deltaY);
        const step = 0.1;
        this.zoom += dir * step;
        this.zoom = Math.max(1, Math.min(5, this.zoom));
    }

    // for touch screens
    #handleTouchStart(event) {
        event.preventDefault(); // Prevent default touch behavior
        this.drag.start = this.getTouchPosition(event.touches[0]);
        this.drag.active = true;
      }
      
    #handleTouchMove(event) {
        event.preventDefault(); // Prevent default touch behavior
        if (this.drag.active) {
            this.drag.end = this.getTouchPosition(event.touches[0]);
            this.drag.offset = subtract(this.drag.end, this.drag.start);
        }
    }
      
    #handleTouchEnd(event) {
        event.preventDefault(); // Prevent default touch behavior
        if (this.drag.active) {
            this.offset = add(this.offset, this.drag.offset); 
            this.drag = {
                start: new Point(0, 0),
                end: new Point(0, 0),
                offset: new Point(0, 0),
                active: false
            };    
        }
    }
}