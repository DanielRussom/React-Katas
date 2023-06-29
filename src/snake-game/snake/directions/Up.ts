import Position from "../../Position";
import { Direction } from "./Direction";
import Left from "./Left";
import Right from "./Right";

export default class Up implements Direction {
  move(currentPosition: Position): Position {
    return new Position(currentPosition.x, currentPosition.y - 1);
  }

  turnRight(): Direction {
    return new Right();
  }

  turnLeft(): Direction {
    return new Left();
  }
}
