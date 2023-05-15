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

  positions = new Array<Position>();
  lastPosition : Position;

  constructor(initialPositions: Position[]) {
    this.positions = initialPositions;
    this.lastPosition = initialPositions[0];
  }


  //TODO Refactor this out
  setInitialPosition(initialPosition: Position){
    this.positions[0] = initialPosition;
    this.lastPosition = initialPosition;
  }

  feed() {
    this.positions.push(this.lastPosition)
  }

  move(): Position[] {
    this.lastPosition = this.positions[0];
    if (this.directionIndex === Direction.Down) {
      this.moveSnakeDown();
    }

    if (this.directionIndex === Direction.Left) {
      this.moveSnakeLeft();
    }

    if (this.directionIndex === Direction.Up) {
      this.moveSnakeUp();
    }

    if (this.directionIndex === Direction.Right) {
      this.moveSnakeRight();
    }

    return this.positions;
  }

  turnLeft(): Position[] {
    this.directionIndex = this.directionIndex - 1;
    if (this.directionIndex < 0) {
      this.directionIndex = this.numberOfDirections - 1;
    }

    return this.move();
  }

  turnRight(): Position[] {
    this.directionIndex = (this.directionIndex + 1) % this.numberOfDirections;

    return this.move();
  }

  moveSnakeUp() {
    this.positions.unshift(new Position(this.positions[0].x, this.positions[0].y - 1))
    this.positions.pop()
  }

  moveSnakeLeft() {
    this.positions[0] = new Position(this.positions[0].x - 1, this.positions[0].y);
  }

  moveSnakeRight() {
    this.positions.unshift(new Position(this.positions[0].x + 1, this.positions[0].y))
    this.positions.pop()
  }

  moveSnakeDown() {
    this.positions[0] = new Position(this.positions[0].x, this.positions[0].y + 1);
  }
}
