import Position from "./Position";
import { Snake } from "./Snake";

describe("snake game", () => {
  it("starts in the expected location", () => {
    const expectedPosition = new Position(2, 2);

    const snake = new Snake(expectedPosition);
    const actualPosition = snake.position;

    expect(actualPosition).toEqual(expectedPosition);
  });

  it.each([
    [new Position(2, 2), 1, new Position(2, 1)],
    [new Position(2, 2), 2, new Position(2, 0)],
    [new Position(3, 3), 1, new Position(3, 2)],
  ])(
    "moves forward to expected location",
    (startingPosition, timesToMove, expectedPosition) => {
      const snake = new Snake(startingPosition);

      for (let i = 0; i < timesToMove; i++) {
        snake.move();
      }

      const actualPosition = snake.position;

      expect(actualPosition).toEqual(expectedPosition);
    }
  );
});
