import { act, fireEvent, render, screen } from "@testing-library/react";
import SnakeGame from "./SnakeGame";
import * as React from "react";
import { clickButton } from "../../testExtensions/screenTestExtensions";
import { Random } from "./Random";
import Position from "./Position";
import { FoodToken, MovementSpeed, SnakeToken } from "./Constants";

jest.mock("./Random");

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllTimers();
});

describe("snake eating food feature", () => {
  it("should increase the snake's length and have the snake in the expected position", () => {
    jest.useFakeTimers();
    const gridHeight = 7;
    const gridWidth = 7;
    const firstFoodLocation = new Position(1, 1);
    const secondFoodLocation = new Position(3, 3);

    const randomFunction = jest
      .fn()
      .mockImplementationOnce(() => {
        return getGridIndexForFoodSpawn(firstFoodLocation, gridWidth);
      })
      .mockImplementationOnce(() => {
        return getGridIndexForFoodSpawn(secondFoodLocation, gridWidth, 2);
      });

    Random.prototype.getNumberBelowLimit = randomFunction;

    const { container } = render(
      <SnakeGame height={gridHeight} width={gridWidth} />
    );

    expect(screen.getAllByText(SnakeToken).length).toEqual(1);

    let gameBoard = screen.getByTitle("GameBoard");

    let expectedFoodLocation = gameBoard.getChildAt(firstFoodLocation);
    expect(expectedFoodLocation).toHaveTextContent(FoodToken);

    act(() => {
      jest.advanceTimersByTime(MovementSpeed);
    });
    act(() => {
      jest.advanceTimersByTime(MovementSpeed);
    });
    fireEvent.keyDown(container, { key: "ArrowLeft" });

    act(() => {
      jest.advanceTimersByTime(MovementSpeed);
    });
    act(() => {
      jest.advanceTimersByTime(MovementSpeed);
    });
    act(() => {
      jest.advanceTimersByTime(MovementSpeed);
    });

    const firstExpectedSnakeCell = gameBoard.getChildAt(new Position(0, 1));
    const secondExpectedSnakeCell = gameBoard.getChildAt(new Position(1, 1));

    expect(firstExpectedSnakeCell).toHaveTextContent(SnakeToken);
    expect(secondExpectedSnakeCell).toHaveTextContent(SnakeToken);

    expect(screen.getAllByText(SnakeToken).length).toEqual(2);

    expectedFoodLocation = gameBoard.getChildAt(secondFoodLocation);
    expect(expectedFoodLocation).toHaveTextContent(FoodToken);
    jest.clearAllTimers();
  });
});

describe("Snake dying feature", () => {
  it("should die after colliding with a wall", () => {
    const foodLocation = new Position(1, 0);
    const randomFunction = jest.fn().mockImplementation(() => {
      return getGridIndexForFoodSpawn(foodLocation, 3);
    });

    Random.prototype.getNumberBelowLimit = randomFunction;

    render(<SnakeGame height={3} width={3} />);

    let gameBoard = screen.getByTitle("GameBoard");

    let expectedSnakeLocation = gameBoard.getChildAt(new Position(1, 1));
    expect(expectedSnakeLocation).toHaveTextContent(SnakeToken);

    let expectedFoodLocation = gameBoard.getChildAt(foodLocation);
    expect(expectedFoodLocation).toHaveTextContent(FoodToken);

    expect(screen.queryByText(/You died!.*/gm)).toBeNull();

    act(() => {
      jest.advanceTimersByTime(MovementSpeed);
    });
    act(() => {
      jest.advanceTimersByTime(MovementSpeed);
    });

    expect(screen.getByText("You died! Score: 2")).toBeInTheDocument();

    clickButton("Play again");

    expectedSnakeLocation = gameBoard.getChildAt(new Position(1, 1));
    expect(expectedSnakeLocation).toHaveTextContent(SnakeToken);
    expect(screen.getAllByText(SnakeToken).length).toEqual(1);
  });
});

function getGridIndexForFoodSpawn(
  foodPosition,
  gridWidth,
  invalidPositionsOffset = 0
) {
  return foodPosition.y * gridWidth + foodPosition.x - invalidPositionsOffset;
}
