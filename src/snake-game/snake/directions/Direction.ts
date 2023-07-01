import Position from "../../Position";

export abstract class Direction {
  abstract turnRight(): Direction;
  abstract turnLeft(): Direction;
  abstract move(currentPosition: Position): Position;
}
