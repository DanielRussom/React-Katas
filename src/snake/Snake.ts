import Position from "./Position";

enum Direction {
    Up = 0,
    Right = 1,
    Down = 2,
    Left = 3,
  }

export class Snake {
    directionIndex = 0;

    position : Position

    constructor(initialPosition : Position) {
        this.position = initialPosition;
    }

    moveSnake(): Position {        
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
