import Position from "../Position";
import { Snake } from "./Snake";

describe("snake game", () => {
  it("starts in the expected location", () => {
    const expectedPosition = new Position(2, 2);

    const snake = new Snake([expectedPosition]);

    expect(snake.positions[0]).toEqual(expectedPosition);
    expect(snake.isDead()).toBe(false);
  });

  
describe("movement", () => {
  it.each([
    [new Position(2, 2), 1, new Position(2, 1)],
    [new Position(2, 2), 2, new Position(2, 0)],
    [new Position(3, 3), 1, new Position(3, 2)],
  ])(
    "moves forward to expected location",
    (startingPosition, timesToMove, expectedPosition) => {
      const snake = new Snake([startingPosition]);

      for (let i = 0; i < timesToMove; i++) {
        snake.move();
      }

      expect(snake.positions[0]).toEqual(expectedPosition);
    }
  );

  it.each([
    [1, new Position(3, 2)],
    [2, new Position(3, 3)],
    [3, new Position(2, 3)],
    [4, new Position(2, 2)],
    [5, new Position(3, 2)],
  ])("turns right %i times", (times, expectedPosition) => {
    const snake = new Snake([new Position(2, 2)]);

    for (let i = 0; i < times; i++) {
      snake.turnRight();
    }

    expect(snake.positions[0]).toEqual(expectedPosition);
  });

  it.each([
    [1, new Position(1, 2)],
    [2, new Position(1, 3)],
    [3, new Position(2, 3)],
    [4, new Position(2, 2)],
    [5, new Position(1, 2)],
  ])('turns left %i times', (times, expectedPosition) => {
    const snake = new Snake([new Position(2, 2)]);

    for (let i = 0; i < times; i++) {
      snake.turnLeft();
    }

    expect(snake.positions[0]).toEqual(expectedPosition);
  });

  it.each([
    [1, new Position(4, 2)],
    [2, new Position(3, 4)],
    [3, new Position(1, 3)],
  ])("turns right %i times and then forward", (times, expectedPosition) => {
    const snake = new Snake([new Position(2, 2)]);

    for (let i = 0; i < times; i++) {
      snake.turnRight();
    }
    snake.move();

    expect(snake.positions[0]).toEqual(expectedPosition);
  });

  it("moves right and then forward twice", () => {
    const expectedPosition = new Position(5, 2);
    const snake = new Snake([new Position(2, 2)]);

    snake.turnRight();
    snake.move();
    snake.move();

    expect(snake.positions.length).toEqual(1);
    expect(snake.positions[0]).toEqual(expectedPosition);
  });

  it.each([
    [0, [new Position(2, 1), new Position(2, 2)]],
    [1, [new Position(4, 2), new Position(3, 2)]],
    [2, [new Position(3, 4), new Position(3, 3)]],
    [3, [new Position(1, 3), new Position(2, 3)]]
  ])("move multiple segments in given direction", (timesTurning, expectedPositions) => {
    const snake = new Snake([new Position(2, 2), new Position(2, 3)]);

    for(let i = 0; i < timesTurning; i++){
      snake.turnRight();
    }

    snake.move();

    expect(snake.positions.length).toEqual(2);
    for(let i = 0; i < expectedPositions.length; i++){
      expect(snake.positions[i]).toEqual(expectedPositions[i]);
    }
  });
});

  it.each([
    [new Position(2,2), [new Position(2,1), new Position(2,2)]],
    [new Position(3,3), [new Position(3,2), new Position(3,3)]],
    [new Position(4,2), [new Position(4,1), new Position(4,2)]]
  ])("grows after eating once", (startingPosition, expectedPositions) => {
    const snake = new Snake([startingPosition]);
    
    snake.move();
    snake.eatFood();

    expect(snake.positions.length).toEqual(2);
    expect(snake.positions[0]).toEqual(expectedPositions[0]);
    expect(snake.positions[1]).toEqual(expectedPositions[1]);
  })

  it("grows after eating twice", () => {
    const snake = new Snake([new Position(2,2)]);
    
    snake.move();
    snake.eatFood();

    snake.move();
    snake.eatFood();

    expect(snake.positions.length).toEqual(3);
    expect(snake.positions[0]).toEqual(new Position(2,0));
    expect(snake.positions[1]).toEqual(new Position(2,1));
    expect(snake.positions[2]).toEqual(new Position(2,2));
  })

  it("dies", () => {
    const snake = new Snake([new Position(2,2)]);

    snake.die();

    expect(snake.isDead()).toBe(true);
  })

  it("dies after colliding with itself", () => {
    const snake = new Snake([new Position(1,1), new Position(1,2), new Position(2,2), new Position(2,1), new Position(2,0)]);

    snake.turnRight();

    expect(snake.isDead()).toBe(true);
  })

  it("doesn't die after moving into the space its tail just left", () => {
    const snake = new Snake([new Position(1,1), new Position(1,2), new Position(2,2), new Position(2,1)]);

    snake.turnRight();

    expect(snake.isDead()).toBe(false);
  })
});
