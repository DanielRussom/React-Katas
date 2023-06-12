import { fireEvent, render, screen } from "@testing-library/react";
import * as React from "react";
import SnakeGame from "./SnakeGame";
import { Snake } from "./snake/Snake";
import Position from "./Position";
import { MovementSpeed, SnakeToken } from "./Constants";
import "../../testExtensions/screenTestExtensions";

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
  });

  it.each([
    [5, new Position(2, 2)],
    [6, new Position(2, 2)],
    [7, new Position(3, 3)],
  ])(
    "snake spawns in the middle of the game board",
    (gridSize, expectedPosition) => {
      render(<SnakeGame height={gridSize} width={gridSize} />);

      const expectedSnakeLocation = screen
        .getByTitle("GameBoard")
        .getChildAt(expectedPosition);

      expect(expectedSnakeLocation).toHaveTextContent(SnakeToken);
      expect(screen.getAllByText(SnakeToken).length).toEqual(1);
    }
  );

  it("tells the snake to move", () => {
    const moveFunction = jest.fn().mockImplementation(() => {
      return new Position(0, 0);
    });
    Snake.prototype.move = moveFunction;

    render(<SnakeGame />);

    jest.advanceTimersByTime(MovementSpeed);

    expect(moveFunction).toHaveBeenCalled();
  });

  it.each(["ArrowRight", "d"])("tells the snake to turn right", (keyName) => {
    const turnRightFunction = jest.fn().mockImplementationOnce(() => {
      return new Position(0, 0);
    });
    Snake.prototype.turnRight = turnRightFunction;

    const { container } = render(<SnakeGame />);

    fireEvent.keyDown(container, { key: keyName });

    expect(turnRightFunction).toHaveBeenCalled();
  });

  it.each(["ArrowLeft", "a"])("tells the snake to turn left", (keyName) => {
    const turnLeftFunction = jest.fn().mockImplementationOnce(() => {
      return new Position(0, 0);
    });

    Snake.prototype.turnLeft = turnLeftFunction;

    const { container } = render(<SnakeGame />);

    fireEvent.keyDown(container, { key: keyName });

    expect(turnLeftFunction).toHaveBeenCalled();
  });

  it("tells the snake to move after a second", () => {
    const moveFunction = jest.fn();
    Snake.prototype.move = moveFunction;

    render(<SnakeGame height={3} width={3} />);

    jest.advanceTimersByTime(MovementSpeed);

    expect(moveFunction).toHaveBeenCalledTimes(1);
    const expectedSnakeLocation = screen
      .getByTitle("GameBoard")
      .getChildAt(new Position(1, 1));

    expect(expectedSnakeLocation).toHaveTextContent(SnakeToken);
  });

  it("tells the snake to move twice after two seconds", () => {
    const moveFunction = jest.fn();
    Snake.prototype.move = moveFunction;

    render(<SnakeGame />);

    jest.advanceTimersByTime(MovementSpeed);
    jest.advanceTimersByTime(MovementSpeed);

    expect(moveFunction).toHaveBeenCalledTimes(2);
  });

  describe("When snake is dead", () => {
    it("disables turning", () => {
      const turnRightFunction = jest.fn();
      Snake.prototype.turnRight = turnRightFunction;
      const turnLeftFunction = jest.fn();
      Snake.prototype.turnLeft = turnLeftFunction;

      const isDeadFunction = jest.fn().mockImplementation(() => {
        return true;
      });
      Snake.prototype.isDead = isDeadFunction;

      const { container } = render(<SnakeGame />);

      fireEvent.keyDown(container, { key: "ArrowRight" });
      fireEvent.keyDown(container, { key: "ArrowLeft" });
      expect(turnRightFunction).not.toHaveBeenCalled();
      expect(turnLeftFunction).not.toHaveBeenCalled();
    });

    it("stops moving forward", () => {
      const moveFunction = jest.fn();
      Snake.prototype.move = moveFunction;

      const isDeadFunction = jest.fn().mockImplementation(() => {
        return true;
      });
      Snake.prototype.isDead = isDeadFunction;

      render(<SnakeGame height={3} width={3} />);

      jest.advanceTimersByTime(MovementSpeed);

      expect(moveFunction).toHaveBeenCalledTimes(0);
    });

    it("displays game over message", () => {
      const isDeadFunction = jest.fn().mockImplementation(() => {
        return true;
      });
      Snake.prototype.isDead = isDeadFunction;

      render(<SnakeGame />);

      expect(screen.getByText(/You died!.*/gm)).toBeInTheDocument();
    });

    it("doesn't display game over message", () => {
      render(<SnakeGame />);

      expect(screen.queryByText(/You died!.*/gm)).toBeNull();
      expect(screen.queryByText(/Score:*/gm)).toBeNull();
    });

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

      expect(
        screen.getByRole("button", { name: "Play again" })
      ).toBeInTheDocument();
    });
  });
});
