import Position from "./Position";

export class Snake {

    readonly directions = ["N", "E", "S", "W"]
    
    directionIndex = 0;

    position : Position

    constructor(initialPosition : Position) {
        this.position = initialPosition;
    }

    moveSnake(): Position {        
        const currentDirection = this.directions[this.directionIndex];

        if(currentDirection === "S"){
            this.moveSnakeDown();
        }

        if(currentDirection === "W"){
            this.moveSnakeLeft();
        }

        if(currentDirection === "N"){
            this.moveSnakeUp();
        }

        if(currentDirection === "E"){
            this.moveSnakeRight();

        }

        return this.position;
    }

    turnSnakeRight(): Position {
        this.directionIndex = (this.directionIndex + 1) % 4;

        return this.moveSnake();
    }
    
    moveSnakeUp() {
        this.position = new Position(this.position.xPosition,  this.position.yPosition - 1);
    }
    
    moveSnakeLeft() {
        this.position = new Position(this.position.xPosition - 1,  this.position.yPosition);
    }
    
    moveSnakeRight() {
        this.position = new Position(this.position.xPosition + 1,  this.position.yPosition);
    }

    moveSnakeDown() {
        this.position = new Position(this.position.xPosition,  this.position.yPosition + 1);
    }
};
