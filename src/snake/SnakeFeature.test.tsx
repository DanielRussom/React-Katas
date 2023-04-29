import { render, screen } from "@testing-library/react";
import SnakeGame from "./SnakeGame";
import * as React from "react";
import { clickButton } from "../../testExtensions/screenTestExtensions";
import { Random } from "./Random";
import Position from "./Position";
import { FoodToken, SnakeToken } from "./Constants";


jest.mock("./Random");

describe("snake eating food feature", () => {
    it.skip("should increase the snake's length and have the snake in the expected position", () => {
        const randomFunction = 
        jest.fn()
        .mockImplementationOnce(() => {
            return 8; // (1,1)
        }).mockImplementationOnce(() => {
            return 24; // (3,3)
        })
        //return undefined 
        Random.prototype.getNumberBelowLimit = randomFunction;

        render(<SnakeGame height={7} width={7} />);

        let gameBoard = screen.getByTitle("GameBoard");
        
        let expectedFoodLocation = gameBoard.getChildAt(new Position(1,1));
        expect(expectedFoodLocation).toHaveTextContent(FoodToken);

        clickButton('Move');
        clickButton('Move');
        clickButton('<');
        clickButton('Move');
        clickButton('Move');

        gameBoard = screen.getByTitle("GameBoard");
        
        const firstExpectedSnakeCell = gameBoard.getChildAt(new Position(0,1));
        const secondExpectedSnakeCell = gameBoard.getChildAt(new Position(1,1))

        expect(firstExpectedSnakeCell).toHaveTextContent(SnakeToken);
        expect(secondExpectedSnakeCell).toHaveTextContent(SnakeToken);

        expect(screen.getAllByText(SnakeToken).length).toEqual(2);

        expectedFoodLocation = gameBoard.getChildAt(new Position(3,3));
        expect(expectedFoodLocation).toHaveTextContent(FoodToken);

    });
});