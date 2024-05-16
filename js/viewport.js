class Viewport{
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.zoom = 1;
        this.offset = new Point(0,0);
        this.drag = {
            start : new Point(0,0),
            end : new Point(0,0),
            offset : new Point(0,0),
            active : false
        }

        this.#addEventListeners();
    }

    getMouse(event){
        return new Point(event.offsetX * this.zoom, event.offsetY * this.zoom);
    }

    #addEventListeners(){
        this.canvas.addEventListener("mousewheel", this.#handleMouseWheel.bind(this));
        this.canvas.addEventListener("mousedown", this.#handleMousedown.bind(this));
        this.canvas.addEventListener("mousemove", this.#handleMousemove.bind(this));
        this.canvas.addEventListener("mouseup", this.#handleMouseup.bind(this));
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
}