import { render, screen } from "@testing-library/react";
import * as React from "react";
import { clickButton } from "../../testExtensions/screenTestExtensions";
import SnakeGame from "./SnakeGame";
import { Snake } from "./snake/Snake";
import Position from "./Position";
import { SnakeToken } from "./Constants";

describe("snake game", () => {
  beforeEach(() => {
    Snake.prototype.getSize = jest.fn().mockImplementation(() => {
      return 1;
    });

    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useFakeTimers();
  })

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

  it("calls the move function every second", () => {
    const moveFunction = jest.fn();
    Snake.prototype.move = moveFunction;

    render(<SnakeGame />);

    jest.advanceTimersByTime(300);

    expect(moveFunction).toHaveBeenCalledTimes(1);
  })

  describe("When snake is dead", () => {
    it("disables the movement buttons", () => {
      const isDeadFunction = jest.fn().mockImplementation(() => {
        return true;
      });
      Snake.prototype.isDead = isDeadFunction;

      render(<SnakeGame />);

      expect(screen.getByRole('button', { name: "Move" })).toBeDisabled();
      expect(screen.getByRole('button', { name: "<" })).toBeDisabled();
      expect(screen.getByRole('button', { name: ">" })).toBeDisabled();
    })

    it("displays game over message", () => {
      const isDeadFunction = jest.fn().mockImplementation(() => {
        return true;
      });
      Snake.prototype.isDead = isDeadFunction;

      render(<SnakeGame />);

      expect(screen.getByText(/You died!.*/gm)).toBeInTheDocument();
    })

    it("doesn't display game over message", () => {
      render(<SnakeGame />);

      expect(screen.queryByText(/You died!.*/gm)).toBeNull();
      expect(screen.queryByText(/Score:*/gm)).toBeNull();
    })

    it.each([[1], [2], [5]])("displays the player's score", (expectedScore) => {
      const isDeadFunction = jest.fn().mockImplementation(() => {
        return true;
      });
      Snake.prototype.isDead = isDeadFunction;

      const getSizeFunction = jest.fn().mockImplementation(() => {
        return expectedScore;
      });
      Snake.prototype.getSize = getSizeFunction;

      render(<SnakeGame />);

      const playerScoreRegex = new RegExp(`.*Score: ${expectedScore}`);
      expect(screen.getByText(playerScoreRegex)).toBeInTheDocument();
    });
    
    it("displays a Play Again button", () => {
      const isDeadFunction = jest.fn().mockImplementation(() => {
        return true;
      });
      Snake.prototype.isDead = isDeadFunction;

      render(<SnakeGame />);

      expect(screen.getByRole("button", {name: "Play again"})).toBeInTheDocument();
    });
  });
});
