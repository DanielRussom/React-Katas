import { Directions } from "./Directions";
import Position from "../Position";

export class Snake {
  private currentDirection = Directions.Up;
  private nextDirection = this.currentDirection;
  private dead: boolean;

  positions: Array<Position>;
  lastPosition: Position;

  constructor(initialPositions: Position[]) {
    this.positions = initialPositions;
    this.lastPosition = initialPositions[0];
    this.dead = false;
  }

  eatFood() {
    this.positions.push(this.lastPosition);
  }

  isDead() {
    return this.dead;
  }

  die() {
    this.dead = true;
  }

  getSize(): number {
    return this.positions.length;
  }

  turnLeft() {
    this.nextDirection = this.currentDirection - 1;
    if (this.nextDirection < 0) {
      this.nextDirection = Directions.Left;
    }
  }

  turnRight() {
    this.nextDirection = this.currentDirection + 1;
    if (this.nextDirection > 3) {
      this.nextDirection = Directions.Up;
    }
  }

  move(): Position[] {
    this.currentDirection = this.nextDirection;

    if (this.currentDirection === Directions.Up) {
      this.moveSnakeUp();
    }

    if (this.currentDirection === Directions.Down) {
      this.moveSnakeDown();
    }

    if (this.currentDirection === Directions.Left) {
      this.moveSnakeLeft();
    }

    if (this.currentDirection === Directions.Right) {
      this.moveSnakeRight();
    }

    return this.positions;
  }

  private moveSnakeUp() {
    this.updatePositions(
      new Position(this.positions[0].x, this.positions[0].y - 1)
    );
  }

  private moveSnakeDown() {
    this.updatePositions(
      new Position(this.positions[0].x, this.positions[0].y + 1)
    );
  }

  private moveSnakeLeft() {
    this.updatePositions(
      new Position(this.positions[0].x - 1, this.positions[0].y)
    );
  }

  private moveSnakeRight() {
    this.updatePositions(
      new Position(this.positions[0].x + 1, this.positions[0].y)
    );
  }

  private updatePositions(newPosition: Position) {
    this.lastPosition = this.positions.pop()!;

    if (this.hasCollided(newPosition)) {
      this.die();
    }

    this.positions.unshift(newPosition);
  }

  private hasCollided = (newPosition: Position) =>
    this.positions.find((position) => position.equals(newPosition)) !==
    undefined;
}
