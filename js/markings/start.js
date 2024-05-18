class Start extends Marking {
    constructor(center, directionVector, width, height) {
        super(center, directionVector, width, height);

        this.img = new Image();
        this.img.src = "car.png";
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.center.x, this.center.y);
        ctx.rotate(angle(this.directionVector) - Math.PI / 2);

        // Set the desired width and height here
        let desiredWidth = 30;
        desiredWidth = desiredWidth < this.img.width ? 30 : this.img.width; // Set the desired width to 30 pixels or the original width if smaller
        let desiredHeight = 50;
        desiredHeight = desiredHeight < this.img.height ? 50 : this.img.height; // Set the desired height to 50 pixels or the original height if smaller


        // Draw the image with the desired dimensions
        ctx.drawImage(this.img, -desiredWidth / 2, -desiredHeight / 2, desiredWidth, desiredHeight);
        ctx.restore();
    }
}
