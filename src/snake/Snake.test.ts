import Position from "./Position";
import { Snake } from "./Snake";

describe("snake game", () => {
  it("starts in the expected location", () => {
    const expectedPosition = new Position(2, 2);

    const snake = new Snake(expectedPosition);

    expect(snake.position).toEqual(expectedPosition);
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

      expect(snake.position).toEqual(expectedPosition);
    }
  );
  
  it.each([
    [1, new Position(3, 2)],
    [2, new Position(3, 3)],
    [3, new Position(2, 3)],
    [4, new Position(2, 2)],
    [5, new Position(3, 2)]
])
    ("turns right", (times, expectedPosition) => {
        const snake = new Snake(new Position(2,2));

        for (let i = 0; i < times; i++) {
            snake.turnRight();
        }
        
        expect(snake.position).toEqual(expectedPosition);
    });

});
