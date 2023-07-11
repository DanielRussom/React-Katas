import { SnakeToken } from "../Constants";
import Position from "../Position";
import { GridState } from "./GridState";

describe("GridState", () => {
  it.each([
    [5, 5],
    [2, 3],
    [15, 24],
  ])(
    "creates a gridState with the expected dimensions %s x %s",
    (expectedHeight, expectedWidth) => {
      const gridState = new GridState(expectedHeight, expectedWidth, []);

      const gridStateValue = gridState.getGrid();
      expect(gridStateValue.length).toBe(expectedHeight);
      expect(gridStateValue[0].length).toBe(expectedWidth);
    }
  );

  it.each([
    [[new Position(2, 2)]],
    [[new Position(1, 3), new Position(2, 3)]],
    [[new Position(4, 4), new Position(4, 3), new Position(3, 3)]],
  ])("puts snake in the expected location", (snakePositions) => {
    const gridState = new GridState(5, 5, snakePositions);

    const gridStateValue = gridState.getGrid();
    for (let i = 0; i < snakePositions.length; i++) {
      expect(gridStateValue[snakePositions[i].y][snakePositions[i].x]).toEqual(
        SnakeToken
      );
    }
  });
});
