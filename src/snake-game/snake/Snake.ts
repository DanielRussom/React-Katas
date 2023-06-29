import Position from "../Position";
import Up from "./directions/Up";

export class Snake {
  private currentDirection = new Up();
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
    this.nextDirection = this.currentDirection.turnLeft();
  }

  turnRight() {
    this.nextDirection = this.currentDirection.turnRight();
  }

  move() {
    this.currentDirection = this.nextDirection;

    this.updatePositions(this.currentDirection.move(this.positions[0]));
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
