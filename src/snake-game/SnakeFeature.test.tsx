import { render, screen } from "@testing-library/react";
import SnakeGame from "./SnakeGame";
import * as React from "react";
import { clickButton } from "../../testExtensions/screenTestExtensions";
import { Random } from "./Random";
import Position from "./Position";
import { FoodToken, SnakeToken } from "./Constants";

jest.mock("./Random");

describe("snake eating food feature", () => {
    it("should increase the snake's length and have the snake in the expected position", () => {
        const gridHeight = 7;
        const gridWidth = 7;
        const firstFoodLocation = new Position(1, 1);
        const secondFoodLocation = new Position(3, 3);

        const randomFunction =
            jest.fn()
                .mockImplementationOnce(() => {
                    return getGridIndexForFoodSpawn(firstFoodLocation, gridHeight);
                }).mockImplementationOnce(() => {
                    return getGridIndexForFoodSpawn(secondFoodLocation, gridHeight, 2);
                })

        Random.prototype.getNumberBelowLimit = randomFunction;

        render(<SnakeGame height={gridHeight} width={gridWidth} />);

        let gameBoard = screen.getByTitle("GameBoard");

        let expectedFoodLocation = gameBoard.getChildAt(firstFoodLocation);
        expect(expectedFoodLocation).toHaveTextContent(FoodToken);

        clickButton('Move');
        clickButton('Move');
        clickButton('<');
        clickButton('Move');
        clickButton('Move');

        const firstExpectedSnakeCell = gameBoard.getChildAt(new Position(0, 1));
        const secondExpectedSnakeCell = gameBoard.getChildAt(new Position(1, 1))

        expect(firstExpectedSnakeCell).toHaveTextContent(SnakeToken);
        expect(secondExpectedSnakeCell).toHaveTextContent(SnakeToken);

        expect(screen.getAllByText(SnakeToken).length).toEqual(2);


        expectedFoodLocation = gameBoard.getChildAt(secondFoodLocation);
        expect(expectedFoodLocation).toHaveTextContent(FoodToken);
    });

    function getGridIndexForFoodSpawn(foodPosition, gridHeight, invalidPositionsOffset = 0) {
        return (foodPosition.y * gridHeight) + foodPosition.x - invalidPositionsOffset
    }
});