import { EmptySpace, FoodToken, SnakeToken } from "../Constants";
import Position from "../Position";
import { GridState } from "./GridState";
import { FoodSpawner } from "../FoodSpawner";
import { Snake } from "../snake/Snake";

jest.mock("../FoodSpawner");

describe("GridState", () => {
  beforeEach(() => {
    FoodSpawner.prototype.pickFoodPosition = jest
      .fn()
      .mockImplementation(() => {
        return new Position(0, 0);
      });
  });

  describe("creation", () => {
    it.each([
      [5, 5],
      [2, 3],
      [15, 24],
    ])(
      "has the expected dimensions %s x %s",
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
    ])("has the snake in the expected location", (snakePositions) => {
      const gridState = new GridState(5, 5, snakePositions);

      const gridStateValue = gridState.getGrid();
      for (let i = 0; i < snakePositions.length; i++) {
        const expectedSnakeLocation =
          gridStateValue[snakePositions[i].y][snakePositions[i].x];
        expect(expectedSnakeLocation).toEqual(SnakeToken);
      }
    });

    it.each([new Position(0, 0), new Position(2, 2), new Position(4, 3)])(
      "has the food in the expected location",
      (expectedPosition) => {
        const pickedFoodFunction = jest.fn().mockImplementationOnce(() => {
          return expectedPosition;
        });
        FoodSpawner.prototype.pickFoodPosition = pickedFoodFunction;

        const gridState = new GridState(5, 5, []);

        const gridStateValue = gridState.getGrid();
        expect(gridStateValue[expectedPosition.y][expectedPosition.x]).toEqual(
          FoodToken
        );
      }
    );
  });

  it("doesn't update if snake hasn't moved", () => {
    const snakePosition = [new Position(0, 0)];
    const gridState = new GridState(5, 5, snakePosition);

    const updatedGridState = gridState.update(new Snake(snakePosition));

    expect(updatedGridState).toBe(gridState);
  });

  it("updates to the new snake location", () => {
    const startingSnakePosition = new Position(0, 0);
    const gridState = new GridState(5, 5, [startingSnakePosition]);

    const updatedSnakePosition = new Position(1, 1);
    const updatedGridState = gridState.update(
      new Snake([updatedSnakePosition])
    );

    const updatedGrid = updatedGridState.getGrid();
    expect(updatedGrid[updatedSnakePosition.y][updatedSnakePosition.x]).toBe(
      SnakeToken
    );
    expect(updatedGrid[startingSnakePosition.y][startingSnakePosition.x]).toBe(
      EmptySpace
    );
  });
});
