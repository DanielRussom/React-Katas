import { render, screen } from "@testing-library/react";
import * as React from "react";
import { clickButton } from "../../testExtensions/screenTestExtensions";
import SnakeGame from "./SnakeGame";
import { Snake } from "./snake/Snake";
import Position from "./Position";
import { SnakeToken } from "./Constants";

describe("snake game", () => {
    it.each([
      [5, new Position(2, 2)],
      [6, new Position(2, 2)],
      [7, new Position(3, 3)],
    ])(
      "snake spawns in the middle of the game board",
      (gridSize, expectedPosition) => {
        render(<SnakeGame height={gridSize} width={gridSize} />);

        const expectedSnakeLocation = screen.getByTitle("GameBoard").getChildAt(expectedPosition);

        expect(expectedSnakeLocation).toHaveTextContent(SnakeToken);
        expect(screen.getAllByText(SnakeToken).length).toEqual(1);
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
});
