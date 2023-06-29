export abstract class Direction {
  abstract turnRight(): Direction;
  abstract turnLeft(): Direction;
}

export class UpDirection implements Direction {
  turnRight(): Direction {
    return new RightDirection();
  }
  turnLeft(): Direction {
    return new LeftDirection();
  }
}

export class DownDirection implements Direction {
  turnRight(): Direction {
    return new LeftDirection();
  }
  turnLeft(): Direction {
    return new RightDirection();
  }
}

export class LeftDirection implements Direction {
  turnRight(): Direction {
    return new UpDirection();
  }
  turnLeft(): Direction {
    return new DownDirection();
  }
}

export class RightDirection implements Direction {
  turnRight(): Direction {
    return new DownDirection();
  }
  turnLeft(): Direction {
    return new UpDirection();
  }
}
