class Viewport {
    constructor(canvas) {
        this.canvas = canvas;
        this.angle = 0;
        this.ctx = canvas.getContext("2d");

        this.zoom = 1;
        this.center = new Point(canvas.width / 2, canvas.height / 2);
        this.offset = scale(this.center, -1);
        this.drag = {
            start: new Point(0, 0),
            end: new Point(0, 0),
            offset: new Point(0, 0),
            active: false
        }

        this.#addEventListeners();
    }

    render() {
        this.ctx.restore();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.save();
        this.ctx.translate(this.center.x, this.center.y);
        this.ctx.rotate(this.angle);
        this.ctx.scale(1 / this.zoom, 1 / this.zoom);
        const offset = this.getOffset();
        this.ctx.translate(offset.x, offset.y);
    }

    getMouse(event, subtractDragOffset = false) {
        const p = new Point(
            (event.offsetX - this.center.x) * this.zoom - this.offset.x,
            (event.offsetY - this.center.y) * this.zoom - this.offset.y
        );
        return subtractDragOffset ? subtract(p, this.drag.offset) : p;
    }

    getTouchPosition(touch) {
        return new Point(
            (touch.clientX - this.center.x) * this.zoom - this.offset.x,
            (touch.clientY - this.center.y) * this.zoom - this.offset.y
        );
    }

    getOffset(event) {
        return add(this.offset, this.drag.offset);
    }

    #addEventListeners() {
        this.canvas.addEventListener("mousewheel", this.#handleMouseWheel.bind(this));
        this.canvas.addEventListener("mousedown", this.#handleMousedown.bind(this));
        this.canvas.addEventListener("mousemove", this.#handleMousemove.bind(this));
        this.canvas.addEventListener("mouseup", this.#handleMouseup.bind(this));

        this.canvas.addEventListener("touchstart", this.#handleTouchStart.bind(this), { passive: false });
        this.canvas.addEventListener("touchmove", this.#handleTouchMove.bind(this), { passive: false });
        this.canvas.addEventListener("touchend", this.#handleTouchEnd.bind(this), { passive: false });
        this.canvas.addEventListener("touchcancel", this.#handleTouchEnd.bind(this), { passive: false });
    }

    #handleMousedown(event) {
        if (event.button == 1) {
            this.drag.start = this.getMouse(event);
            this.drag.active = true;
        }
    }

    #handleMousemove(event) {
        if (this.drag.active) {
            this.drag.end = this.getMouse(event);
            this.drag.offset = subtract(this.drag.end, this.drag.start);
        }
    }

    #handleMouseup(event) {
        if (this.drag.active) {
            this.offset = add(this.offset, this.drag.offset);
            this.drag = {
                start: new Point(0, 0),
                end: new Point(0, 0),
                offset: new Point(0, 0),
                active: false
            }
        }
    }

    #handleMouseWheel(event) {
        // const dir = Math.sign(event.deltaY);
        // const step = 0.1;
        // this.zoom += dir * step;
        // this.zoom = Math.max(1, Math.min(5, this.zoom));
        // uncomment for required base functionality

        event.preventDefault(); // Prevent default browser behavior

        // comment this portion to set to base functionality
        // Check if the shift key is pressed (indicating scroll)
        if (event.shiftKey) {
            this.#handleScroll(event);
        } else {
            this.#handleZoom(event);
        }

    }

    #handleZoom(event) {
        const dir = Math.sign(event.deltaY);
        const step = 0.1;
        this.zoom += dir * step;
        this.zoom = Math.max(1, Math.min(5, this.zoom));
    }
    
    #handleScroll(event) {
        const deltaX = event.deltaX;
        const deltaY = event.deltaY;
    
        const moveStep = 1; // Adjust this value to control scroll speed
    
        this.offset.x += deltaX * moveStep * this.zoom;
        this.offset.y += deltaY * moveStep * this.zoom;
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
