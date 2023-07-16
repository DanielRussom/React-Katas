import { render, screen, within } from "@testing-library/react";
import Grid from "./Grid";
import * as React from "react";
import Position from "../Position";
import { FoodSpawner } from "../FoodSpawner";
import "../../../testExtensions/screenTestExtensions";
import { EmptySpace, FoodToken, SnakeToken } from "../Constants";
import { Snake } from "../snake/Snake";
import { SnakeContext } from "../SnakeContext";
import { GridState } from "./GridState";

let feedSnakeFunction: Function;
let killSnakeFunction: Function;

describe("game board", () => {
  beforeEach(() => {
    const getGridFunction = jest.fn().mockImplementation(() => {
      return [[EmptySpace], [EmptySpace]];
    });

    GridState.prototype.getGrid = getGridFunction;

    FoodSpawner.prototype.pickFoodPosition = jest
      .fn()
      .mockImplementation(() => {
        return new Position(0, 0);
      });

    killSnakeFunction = jest.fn();
    feedSnakeFunction = jest.fn();
  });

  it("is a grid", () => {
    render(
      buildWithContext(<Grid height={5} width={5} />, [new Position(2, 2)])
    );

    const board = screen.getByTitle("GameBoard");

    expect(board).toHaveStyle("display: grid");
  });

  it.each([1, 3, 5])("has the expected row count", (expectedRows) => {
    let gridState: string[][] = [];

    for (let i = 0; i < expectedRows; i++) {
      gridState.push([]);
    }

    const getGridFunction = jest.fn().mockImplementation(() => {
      return gridState;
    });

    GridState.prototype.getGrid = getGridFunction;

    render(
      buildWithContext(<Grid height={expectedRows} width={5} />, [
        new Position(0, 0),
      ])
    );

    const rows = screen.getByTitle("GameBoard").childNodes;

    expect(rows.length).toEqual(expectedRows);
  });

  it.each([1, 2, 3])("has the expected column count", (expectedColumns) => {
    let gridState: string[][] = [[]];

    for (let i = 0; i < expectedColumns; i++) {
      gridState[0].push(EmptySpace);
    }

    const getGridFunction = jest.fn().mockImplementation(() => {
      return gridState;
    });

    GridState.prototype.getGrid = getGridFunction;

    render(
      buildWithContext(<Grid height={5} width={expectedColumns} />, [
        new Position(0, 0),
      ])
    );

    const firstRow = screen.getByTitle("GameBoard").childNodes[0];
    const columns = firstRow.childNodes;

    expect(columns.length).toEqual(expectedColumns);
  });

  it("renders the snake in the expected location", () => {
    const getGridFunction = jest.fn().mockImplementation(() => {
      return [
        [EmptySpace, EmptySpace, EmptySpace],
        [EmptySpace, SnakeToken, EmptySpace],
        [EmptySpace, EmptySpace, EmptySpace],
      ];
    });

    GridState.prototype.getGrid = getGridFunction;

    const snakePosition = new Position(1, 1);
    render(buildWithContext(<Grid height={5} width={5} />, [snakePosition]));

    const expectedSnakeLocation = screen
      .getByTitle("GameBoard")
      .getChildAt(snakePosition);

    expect(expectedSnakeLocation).toHaveTextContent(SnakeToken);
    expect(screen.getAllByText(SnakeToken).length).toEqual(1);
  });

  it("renders a longer snake in the expected locations", () => {
    const getGridFunction = jest.fn().mockImplementation(() => {
      return [
        [EmptySpace, EmptySpace, EmptySpace],
        [EmptySpace, EmptySpace, EmptySpace],
        [EmptySpace, SnakeToken, SnakeToken],
      ];
    });

    GridState.prototype.getGrid = getGridFunction;

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
    const getGridFunction = jest
      .fn()
      .mockImplementationOnce(() => {
        return [
          [EmptySpace, EmptySpace, EmptySpace],
          [EmptySpace, EmptySpace, EmptySpace],
          [EmptySpace, EmptySpace, SnakeToken],
        ];
      })
      .mockImplementation(() => {
        return [
          [EmptySpace, EmptySpace, EmptySpace],
          [EmptySpace, SnakeToken, EmptySpace],
          [EmptySpace, EmptySpace, EmptySpace],
        ];
      });

    GridState.prototype.getGrid = getGridFunction;

    const { rerender } = render(
      buildWithContext(<Grid height={7} width={7} />, [new Position(2, 2)])
    );

    const updatedSnakePosition = new Position(1, 1);
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
    const getGridFunction = jest
      .fn()
      .mockImplementationOnce(() => {
        return [
          [EmptySpace, EmptySpace, EmptySpace],
          [EmptySpace, EmptySpace, EmptySpace],
          [EmptySpace, SnakeToken, SnakeToken],
        ];
      })
      .mockImplementation(() => {
        return [
          [EmptySpace, SnakeToken, EmptySpace],
          [EmptySpace, SnakeToken, EmptySpace],
          [EmptySpace, EmptySpace, EmptySpace],
        ];
      });

    GridState.prototype.getGrid = getGridFunction;

    const { rerender } = render(
      buildWithContext(<Grid height={7} width={7} />, [
        new Position(2, 2),
        new Position(2, 3),
      ])
    );

    const updatedSnakePositions = [new Position(1, 0), new Position(1, 1)];
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

  it.each([new Position(0, 0), new Position(1, 0), new Position(2, 1)])(
    "food renders in the expected location",
    (expectedPosition) => {
      const gridState = [
        [EmptySpace, EmptySpace, EmptySpace],
        [EmptySpace, EmptySpace, EmptySpace],
        [EmptySpace, EmptySpace, EmptySpace],
      ];

      gridState[expectedPosition.y][expectedPosition.x] = FoodToken;

      const getGridFunction = jest.fn().mockImplementation(() => {
        return gridState;
      });

      GridState.prototype.getGrid = getGridFunction;
      render(
        buildWithContext(<Grid height={7} width={7} />, [new Position(3, 3)])
      );

      const expectedFoodLocation = screen
        .getByTitle("GameBoard")
        .getChildAt(expectedPosition);

      expect(expectedFoodLocation).toHaveTextContent(FoodToken);
      expect(screen.getAllByText(FoodToken).length).toEqual(1);
    }
  );

  it.each([
    [new Position(3, -1)],
    [new Position(-1, 3)],
    [new Position(3, 7)],
    [new Position(7, 3)],
  ])("kills snake when moved off of the board", (newPosition) => {
    const { rerender } = render(
      buildWithContext(<Grid height={7} width={7} />, [new Position(3, 3)])
    );
    rerender(buildWithContext(<Grid height={7} width={7} />, [newPosition]));

    expect(killSnakeFunction).toHaveBeenCalled();
  });

  it("stops interacting with the snake when it's dead", () => {
    const killSnakeFunction = jest.fn();
    Snake.prototype.die = killSnakeFunction;
    const isDeadSnakeFunction = jest.fn().mockImplementation(() => {
      return true;
    });
    Snake.prototype.isDead = isDeadSnakeFunction;

    const { rerender } = render(
      buildWithContext(<Grid height={7} width={7} />, [new Position(-1, 3)])
    );
    rerender(
      buildWithContext(<Grid height={7} width={7} />, [new Position(-2, 3)])
    );

    expect(killSnakeFunction).not.toHaveBeenCalled();
  });
});

function buildWithContext(grid: JSX.Element, snakePositions: Position[]) {
  return (
    <SnakeContext.Provider
      value={{ snake: new Snake(snakePositions), killSnake: killSnakeFunction }}
    >
      {grid}
    </SnakeContext.Provider>
  );
}
