import Position from "./Position";

enum Direction {
    Up = 0,
    Right = 1,
    Down = 2,
    Left = 3,
  }

export class Snake {
    readonly numberOfDirections = 4;
    directionIndex = 0;

    position : Position

    constructor(initialPosition : Position) {
        this.position = initialPosition;
    }

    moveSnake() {        
        if(this.directionIndex === Direction.Down){
            this.moveSnakeDown();
        }

        if(this.directionIndex === Direction.Left){
            this.moveSnakeLeft();
        }

        if(this.directionIndex === Direction.Up){
            this.moveSnakeUp();
        }

        if(this.directionIndex === Direction.Right){
            this.moveSnakeRight();

        }
    }

    turnSnakeLeft() {
        this.directionIndex = (this.directionIndex - 1);
        if(this.directionIndex < 0){
            this.directionIndex = this.numberOfDirections - 1;
        }
        
        this.moveSnake();
    }

    turnSnakeRight() {
        this.directionIndex = (this.directionIndex + 1) % this.numberOfDirections;

        this.moveSnake();
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
