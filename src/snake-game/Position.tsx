export default class Position {
  readonly x: number;
  readonly y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  
  isOutOfBounds(height: number, width: number): boolean {
    return (
      this.y < 0 || this.y >= height ||
      this.x < 0 || this.x >= width
    );
  }

  equals(positionToCompare: Position): any {
    return positionToCompare.x === this.x && positionToCompare.y === this.y;
  }
}