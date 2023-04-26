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

    move():Position{        
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

    turnLeft() {
        this.directionIndex = (this.directionIndex - 1);
        if(this.directionIndex < 0){
            this.directionIndex = this.numberOfDirections - 1;
        }
        
        this.move();
    }

    turnRight() {
        this.directionIndex = (this.directionIndex + 1) % this.numberOfDirections;

        this.move();
    }
    
    moveSnakeUp() {
        this.position = new Position(this.position.x,  this.position.y - 1);
    }
    
    moveSnakeLeft() {
        this.position = new Position(this.position.x - 1,  this.position.y);
    }
    
    moveSnakeRight() {
        this.position = new Position(this.position.x + 1,  this.position.y);
    }

    moveSnakeDown() {
        this.position = new Position(this.position.x,  this.position.y + 1);
    }
};
