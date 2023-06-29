import Position from "../../Position";
import { Direction } from "./Direction";
import Down from "./Down";
import Up from "./Up";

export default class Right implements Direction {
  move(currentPosition: Position): Position {
    return new Position(currentPosition.x + 1, currentPosition.y);
  }

  turnRight(): Direction {
    return new Down();
  }

  turnLeft(): Direction {
    return new Up();
  }
}
