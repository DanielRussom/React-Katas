import { render, screen } from "@testing-library/react";
import * as React from "react";
import { clickButton } from "../../testExtensions/screenTestExtensions";
import SnakeGame from "./SnakeGame";
import { Snake } from "./Snake";
import Position from "./Position";

jest.mock("./Snake");

jest.mock("./Grid", () => () => {
  return <div data-testid="gameBoard" />;
});

describe("snake game", () => {
  beforeEach(() => {
    Snake.prototype.move = jest.fn();
  });
  // Mock out Grid
  it("game board is rendered", () => {
    render(<SnakeGame />);

    const board = screen.getByTestId("gameBoard");

    expect(board).toBeInTheDocument();
  });

  describe("snake", () => {
    // Assert snake was initialised with expected position
    // it.each([
    //   [5, new Position(2, 2)],
    //   [6, new Position(2, 2)],
    //   [7, new Position(3, 3)],
    // ])(
    //   "spawns in the middle of the game board",
    //   (gridSize, expectedPosition) => {
    //     render(<SnakeGame height={gridSize} width={gridSize} />);

    //     const expectedSnakeLocation = screen
    //       .getByTitle("GameBoard")
    //       .getChildAt(expectedPosition);

    //     expect(expectedSnakeLocation).toHaveTextContent("Snake");
    //     expect(screen.getAllByText("Snake").length).toEqual(1);
    //   }
    // );

    it("tells the snake to move", () => {
      const moveFunction = jest.fn().mockImplementationOnce(() => {
        return new Position(0, 0);
      });
      Snake.prototype.move = moveFunction;

      render(<SnakeGame />);

      clickButton("Move");

      expect(moveFunction).toHaveBeenCalled();
    });

    it("tells the snake to turn right", () => {
      const turnRightFunction = jest.fn().mockImplementationOnce(() => {
        return new Position(0, 0);
      });
      Snake.prototype.turnRight = turnRightFunction;

      render(<SnakeGame />);

      clickButton(">");

      expect(turnRightFunction).toHaveBeenCalled();
    });

    it("tells the snake to turn left", () => {
      const turnLeftFunction = jest.fn().mockImplementationOnce(() => {
        return new Position(0, 0);
      });
      Snake.prototype.turnLeft = turnLeftFunction;

      render(<SnakeGame />);

      clickButton("<");

      expect(turnLeftFunction).toHaveBeenCalled();
    });

    //     // Assert .turnRight was called
    //     it.each([
    //       [1, new Position(3, 2)],
    //       [2, new Position(3, 3)],
    //       [3, new Position(2, 3)],
    //       [4, new Position(2, 2)],
    //       [5, new Position(3, 2)],
    //     ])("turns right", (times, expectedPosition) => {
    //       render(<SnakeGame height={5} width={5} />);

    //       for (let i = 0; i < times; i++) {
    //         clickButton(">");
    //       }

    //       const expectedSnakeLocation = screen
    //         .getByTitle("GameBoard")
    //         .getChildAt(expectedPosition);

    //       expect(expectedSnakeLocation).toHaveTextContent("Snake");
    //       expect(screen.getAllByText("Snake").length).toEqual(1);
    //     });

    //     // Assert .turnLeft was called
    //     it.each([
    //       [1, new Position(1, 2)],
    //       [2, new Position(1, 3)],
    //       [3, new Position(2, 3)],
    //       [4, new Position(2, 2)],
    //       [5, new Position(1, 2)],
    //     ])("turns left", (times, expectedPosition) => {
    //       render(<SnakeGame height={5} width={5} />);

    //       for (let i = 0; i < times; i++) {
    //         clickButton("<");
    //       }

    //       const expectedSnakePosition = screen
    //         .getByTitle("GameBoard")
    //         .getChildAt(expectedPosition);

    //       expect(expectedSnakePosition).toHaveTextContent("Snake");
    //       expect(screen.getAllByText("Snake").length).toEqual(1);
    //     });
  });
});
