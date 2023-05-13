import Position from "./Position";
import { Snake } from "./Snake";

describe("snake game", () => {
  it("starts in the expected location", () => {
    const expectedPosition = new Position(2, 2);

    const snake = new Snake([expectedPosition]);

    expect(snake.positions[0]).toEqual(expectedPosition);
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
  ])("turns right and then forward", (times, expectedPosition) => {
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
});

  it.each([
    [new Position(2,2), [new Position(2,1), new Position(2,2)]],
    [new Position(3,3), [new Position(3,2), new Position(3,3)]],
    [new Position(4,2), [new Position(4,1), new Position(4,2)]]
  ])("grows after feeding", (startingPosition, expectedPositions) => {
    const snake = new Snake([startingPosition]);
    
    snake.move();
    snake.feed();

    expect(snake.positions.length).toEqual(2);
    expect(snake.positions[0]).toEqual(expectedPositions[0]);
    expect(snake.positions[1]).toEqual(expectedPositions[1]);
  })
});
