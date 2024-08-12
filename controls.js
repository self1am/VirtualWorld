class Controls{
    constructor(type){
        this.forward=false;
        this.left=false;
        this.right=false;
        this.reverse=false;
        this.boost=false;

        switch(type){
            case "KEYS":
                this.#addKeyboardListeners();
                break;
            case "DUMMY":
                this.forward=true;
                break;
        }
    }

    #addKeyboardListeners(){
        document.onkeydown = (event) => {
            switch(event.key) {
                case "ArrowLeft":
                case "A":
                case "a":
                    this.left = true;
                    break;
                case "ArrowRight":
                case "D":
                case "d":
                    this.right = true;
                    break;
                case "ArrowUp":
                case "W":
                case "w":
                    this.forward = true;
                    break;
                case "ArrowDown":
                case "S":
                case "s":
                    this.reverse = true;
                    break;
                case "ShiftKey" + "ArrowUp":
                    this.boost = true;
                    break;
                // once shift is pressed the control boosts
            }
        };
        
        document.onkeyup = (event) => {
            switch(event.key) {
                case "ArrowLeft":
                case "A":
                case "a":
                    this.left = false;
                    break;
                case "ArrowRight":
                case "D":
                case "d":
                    this.right = false;
                    break;
                case "ArrowUp":
                case "W":
                case "w":
                    this.forward = false;
                    break;
                case "ArrowDown":
                case "S":
                case "s":
                    this.reverse = false;
                    break;
                case "ShiftKey" + "ArrowUp":
                    this.boost = false;
                    break;
            }
        };
        
    }
}