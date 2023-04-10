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

        this.moveSnakeInDirection(currentDirection);
        return this.position;
    }

    turnSnakeRight(): Position {
        this.directionIndex = (this.directionIndex + 1) % 4;

        this.moveSnakeInDirection(this.directions[this.directionIndex]);
        return this.position;
    }

    moveSnakeInDirection(direction): void {
        if(direction === "S"){
            this.moveSnakeDown();
            return;
        }

        if(direction === "W"){
            this.moveSnakeLeft();
            return;
        }

        if(direction === "N"){
            this.moveSnakeUp();
            return;
        }

        this.moveSnakeRight();
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
