import Position from "../../Position";

export abstract class Direction {
  abstract turnRight(): Direction;
  abstract turnLeft(): Direction;
  abstract move(currentPosition: Position): Position;
}

export class UpDirection implements Direction {
  move(currentPosition: Position): Position {
    return new Position(currentPosition.x, currentPosition.y - 1);
  }

  turnRight(): Direction {
    return new RightDirection();
  }

  turnLeft(): Direction {
    return new LeftDirection();
  }
}

export class DownDirection implements Direction {
  move(currentPosition: Position): Position {
    return new Position(currentPosition.x, currentPosition.y + 1);
  }

  turnRight(): Direction {
    return new LeftDirection();
  }

  turnLeft(): Direction {
    return new RightDirection();
  }
}

export class LeftDirection implements Direction {
  move(currentPosition: Position): Position {
    return new Position(currentPosition.x - 1, currentPosition.y);
  }

  turnRight(): Direction {
    return new UpDirection();
  }

  turnLeft(): Direction {
    return new DownDirection();
  }
}

export class RightDirection implements Direction {
  move(currentPosition: Position): Position {
    return new Position(currentPosition.x + 1, currentPosition.y);
  }

  turnRight(): Direction {
    return new DownDirection();
  }

  turnLeft(): Direction {
    return new UpDirection();
  }
}
