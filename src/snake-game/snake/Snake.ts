import { Directions } from "./Directions";
import Position from "../Position";

export class Snake {
  readonly numberOfDirections = 4;
  directionIndex = 0;

  positions: Array<Position>;
  lastPosition: Position;
  turningRight: boolean;
  private dead: boolean;

  constructor(initialPositions: Position[]) {
    this.positions = initialPositions;
    this.lastPosition = initialPositions[0];
    this.dead = false;
    this.turningRight = false;
  }

  eatFood() {
    this.positions.push(this.lastPosition)
  }

  isDead(){
    return this.dead;
  }

  die() {
    this.dead = true;
  }

  getSize() : number{
    return this.positions.length;
  }

  turnLeft(): Position[] {
    this.directionIndex = this.directionIndex - 1;
    if (this.directionIndex < 0) {
      this.directionIndex = this.numberOfDirections - 1;
    }

    return this.move();
  }

  turnRight() {
    this.turningRight = true;
  }

  move(): Position[] {
    if(this.turningRight){
      this.directionIndex = (this.directionIndex + 1) % this.numberOfDirections;
      this.turningRight = false;
    }
    
    if (this.directionIndex === Directions.Up) {
      this.moveSnakeUp();
    }

    if (this.directionIndex === Directions.Down) {
      this.moveSnakeDown();
    }

    if (this.directionIndex === Directions.Left) {
      this.moveSnakeLeft();
    }

    if (this.directionIndex === Directions.Right) {
      this.moveSnakeRight();
    }

    return this.positions;
  }

  private moveSnakeUp() {
    this.updatePositions(new Position(this.positions[0].x, this.positions[0].y - 1));
  }

  private moveSnakeDown() {
    this.updatePositions(new Position(this.positions[0].x, this.positions[0].y + 1));
  }

  private moveSnakeLeft() {
    this.updatePositions(new Position(this.positions[0].x - 1, this.positions[0].y));
  }

  private moveSnakeRight() {
    this.updatePositions(new Position(this.positions[0].x + 1, this.positions[0].y));
  }

  private updatePositions(newPosition: Position) {
    this.lastPosition = this.positions.pop()!;

    if (this.snakeCollision(newPosition)) {
      this.die();
    }

    this.positions.unshift(newPosition);
  }

  private snakeCollision = (newPosition: Position) => this.positions.find(position => position.x === newPosition.x && position.y === newPosition.y) !== undefined;
}
