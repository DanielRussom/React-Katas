import { render, screen, within } from "@testing-library/react";
import Grid from "./Grid";
import * as React from "react";
import Position from "../Position";
import { FoodSpawner } from "../FoodSpawner";
import "../../../testExtensions/screenTestExtensions";
import { FoodToken, SnakeToken } from "../Constants";
import { Snake } from "../snake/Snake";
import { SnakeContext } from "../SnakeContext";

jest.mock("../FoodSpawner");

let feedSnakeFunction: Function;

describe("game board", () => {
  beforeEach(() => {
    FoodSpawner.prototype.pickFoodPosition = jest
      .fn()
      .mockImplementation(() => {
        return new Position(0, 0);
      });

    feedSnakeFunction = jest.fn();
  });

  it("is a grid", () => {
    render(
      buildWithContext(<Grid height={5} width={5} />, [new Position(2, 2)])
    );

    const board = screen.getByTitle("GameBoard");

    expect(board).toHaveStyle("display: grid");
  });

  it.each([[1, 3, 5]])("has the expected row count", (expectedRows) => {
    render(
      buildWithContext(<Grid height={expectedRows} width={5} />, [
        new Position(0, 0),
      ])
    );

    const rows = screen.getByTitle("GameBoard").childNodes;

    expect(rows.length).toEqual(expectedRows);
  });

  it.each([[1, 2, 3]])("has the expected column count", (expectedColumns) => {
    render(
      buildWithContext(<Grid height={5} width={expectedColumns} />, [
        new Position(0, 0),
      ])
    );

    const firstRow = screen.getByTitle("GameBoard").childNodes[0];
    const columns = firstRow.childNodes;

    expect(columns.length).toEqual(expectedColumns);
  });

  it("populates the snake in the expected location", () => {
    const snakePosition = new Position(2, 2);
    render(buildWithContext(<Grid height={5} width={5} />, [snakePosition]));

    const expectedSnakeLocation = screen
      .getByTitle("GameBoard")
      .getChildAt(snakePosition);

    expect(expectedSnakeLocation).toHaveTextContent(SnakeToken);
    expect(screen.getAllByText(SnakeToken).length).toEqual(1);
  });

  it("populates a longer snake in the expected locations", () => {
    const firstSnakePosition = new Position(2, 2);
    const secondSnakePosition = new Position(1, 2);

    render(
      buildWithContext(<Grid height={5} width={5} />, [
        firstSnakePosition,
        secondSnakePosition,
      ])
    );

    const firstExpectedSnakeLocation = screen
      .getByTitle("GameBoard")
      .getChildAt(firstSnakePosition);
    const secondExpectedSnakeLocation = screen
      .getByTitle("GameBoard")
      .getChildAt(secondSnakePosition);

    expect(firstExpectedSnakeLocation).toHaveTextContent(SnakeToken);
    expect(secondExpectedSnakeLocation).toHaveTextContent(SnakeToken);
    expect(screen.getAllByText(SnakeToken).length).toEqual(2);
  });

  it("repopulates the snake in the expected location", () => {
    const { rerender } = render(
      buildWithContext(<Grid height={7} width={7} />, [new Position(3, 3)])
    );

    const updatedSnakePosition = new Position(2, 2);
    rerender(
      buildWithContext(<Grid height={7} width={7} />, [updatedSnakePosition])
    );

    const expectedSnakeLocation = screen
      .getByTitle("GameBoard")
      .getChildAt(updatedSnakePosition);

    expect(expectedSnakeLocation).toHaveTextContent(SnakeToken);
    expect(screen.getAllByText(SnakeToken).length).toEqual(1);
    expect(feedSnakeFunction).toBeCalledTimes(0);
  });

  it("repopulates a snake with two segments in the expected locations", () => {
    const { rerender } = render(
      buildWithContext(<Grid height={7} width={7} />, [
        new Position(3, 3),
        new Position(3, 4),
      ])
    );

    const updatedSnakePositions = [new Position(3, 1), new Position(3, 2)];
    rerender(
      buildWithContext(<Grid height={7} width={7} />, updatedSnakePositions)
    );

    expect(screen.getAllByText(SnakeToken).length).toEqual(2);

    expect(
      screen.getByTitle("GameBoard").getChildAt(updatedSnakePositions[0])
    ).toHaveTextContent(SnakeToken);
    expect(
      screen.getByTitle("GameBoard").getChildAt(updatedSnakePositions[1])
    ).toHaveTextContent(SnakeToken);
  });

  describe("Food", () => {
    it("exists in the grid", () => {
      render(
        buildWithContext(<Grid height={5} width={5} />, [new Position(2, 2)])
      );

      const gameBoard = screen.getByTitle("GameBoard");
      const food = within(gameBoard).getByText(FoodToken);

      expect(food).toBeInTheDocument();
    });

    it.each([[new Position(1, 1)], [new Position(3, 4)], [new Position(6, 6)]])(
      "exists in the expected location",
      (expectedPosition) => {
        const pickedFoodFunction = jest.fn().mockImplementationOnce(() => {
          return expectedPosition;
        });

        FoodSpawner.prototype.pickFoodPosition = pickedFoodFunction;

        render(
          buildWithContext(<Grid height={7} width={7} />, [new Position(3, 3)])
        );

        const expectedFoodLocation = screen
          .getByTitle("GameBoard")
          .getChildAt(expectedPosition);

        expect(expectedFoodLocation).toHaveTextContent(FoodToken);
        expect(screen.getAllByText(FoodToken).length).toEqual(1);

        expect(pickedFoodFunction).toHaveBeenCalledTimes(1);
      }
    );

    it("respawns after being eaten", () => {
      const pickedFoodFunction = jest
        .fn()
        .mockImplementationOnce(() => {
          return new Position(1, 1);
        })
        .mockImplementationOnce(() => {
          return new Position(0, 0);
        });

      FoodSpawner.prototype.pickFoodPosition = pickedFoodFunction;
      const { rerender } = render(
        buildWithContext(<Grid height={7} width={7} />, [new Position(3, 3)])
      );

      let expectedFoodLocation = screen
        .getByTitle("GameBoard")
        .getChildAt(new Position(1, 1));

      expect(expectedFoodLocation).toHaveTextContent(FoodToken);
      expect(screen.getAllByText(FoodToken).length).toEqual(1);

      rerender(
        buildWithContext(<Grid height={7} width={7} />, [new Position(1, 1)])
      );
      expectedFoodLocation = screen
        .getByTitle("GameBoard")
        .getChildAt(new Position(0, 0));

      expect(expectedFoodLocation).toHaveTextContent(FoodToken);
      expect(screen.getAllByText(FoodToken).length).toEqual(1);
    });

    it("calls feed snake method", () => {
      const pickedFoodFunction = jest
        .fn()
        .mockImplementationOnce(() => {
          return new Position(1, 1);
        })
        .mockImplementationOnce(() => {
          return new Position(0, 0);
        });

      FoodSpawner.prototype.pickFoodPosition = pickedFoodFunction;

      const feedFunction = jest.fn();
      Snake.prototype.eatFood = feedFunction;

      const { rerender } = render(
        buildWithContext(<Grid height={7} width={7} />, [new Position(3, 3)])
      );

      rerender(
        buildWithContext(<Grid height={7} width={7} />, [new Position(1, 1)])
      );

      expect(feedFunction).toHaveBeenCalled();
    });
  });

  it.each([
    [new Position(3, -1)],
    [new Position(-1, 3)],
    [new Position(3, 7)],
    [new Position(7, 3)],
  ])("kills snake when moved off of the board", (newPosition) => {
    const killSnakeFunction = jest.fn();
    Snake.prototype.die = killSnakeFunction;

    const { rerender } = render(
      buildWithContext(<Grid height={7} width={7} />, [new Position(3, 3)])
    );
    rerender(buildWithContext(<Grid height={7} width={7} />, [newPosition]));

    expect(killSnakeFunction).toHaveBeenCalled();
  });
});

function buildWithContext(grid: JSX.Element, snakePositions: Position[]) {
  return (
    <SnakeContext.Provider
      value={{ snake: new Snake(snakePositions), setSnake: () => {} }}
    >
      {grid}
    </SnakeContext.Provider>
  );
}
