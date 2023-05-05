import { render, screen } from "@testing-library/react";
import * as React from "react";
import { clickButton } from "../../testExtensions/screenTestExtensions";
import SnakeGame from "./SnakeGame";
import { Snake } from "./Snake";
import Position from "./Position";
import { SnakeContext } from "../App";

const mockGrid = jest.fn();
jest.mock("./Grid", () => (props) => {
  mockGrid(props);
  // props.feedSnake();
  return <div data-testid="gameBoard" />;
})

describe("snake game", () => {
  it("game board is rendered", () => {
    render(<SnakeContext.Provider value={new Snake(new Position(2,2))}><SnakeGame /></SnakeContext.Provider>);
    const board = screen.getByTestId("gameBoard");

    expect(board).toBeInTheDocument();

    expect(mockGrid).toHaveBeenCalledWith(
      expect.objectContaining({
        height: 5,
        width: 5
      })
    );
  });

  describe("snake", () => {
    it.each([
      [5, new Position(2, 2)],
      [6, new Position(2, 2)],
      [7, new Position(3, 3)],
    ])(
      "spawns in the middle of the game board",
      (gridSize, expectedPosition) => {
        render(<SnakeContext.Provider value={new Snake(new Position(2,2))}><SnakeGame /></SnakeContext.Provider>);
        // render(<SnakeGame height={gridSize} width={gridSize} />);

        const firstMockCall = mockGrid.mock.calls[0][0];
        const actualSnakePositions = firstMockCall.snakePositions;

        expect(actualSnakePositions.length).toEqual(1);
        expect(actualSnakePositions[0]).toEqual(expectedPosition)
      });

    it("tells the snake to move", () => {
      const moveFunction = jest.fn().mockImplementation(() => {
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

    it("tells the snake it has been fed", () => {
      const feedFunction = jest.fn();
      Snake.prototype.feed = feedFunction;

      render(<SnakeGame />);

      expect(feedFunction).toHaveBeenCalled();
    });

  });
});
