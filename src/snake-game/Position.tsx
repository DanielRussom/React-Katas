export default class Position {
  readonly x: number;
  readonly y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  equals(arg0: Position): any {
    throw new Error("Method not implemented.");
  }
}
