import { render, screen } from "@testing-library/react";
import SnakeGame from "./SnakeGame";
import * as React from "react";
import { clickButton } from "../../testExtensions/screenTestExtensions";
import Position from "./Position";

jest.mock("./FoodSpawner", () => ({
    getFoodLocation: () => ({
        position: new Position(1, 1)
    }),
}));

describe("snake eating food feature", () => {
    it("should increase the snake's length and have the snake in the expected position", () => {
        render(<SnakeGame height={7} width={7} />);
       
        clickButton('Move');
        clickButton('Move');
        clickButton('<');
        clickButton('Move');
        
        const gameBoard = screen.getByTitle("GameBoard");
        const secondRow = gameBoard.childNodes[1];
        
        const firstSnakeCell = secondRow.childNodes[1]
        const secondSnakeCell = secondRow.childNodes[2]

        expect(firstSnakeCell).toHaveTextContent("Snake");
        expect(secondSnakeCell).toHaveTextContent("Snake");
        
        expect(screen.getAllByText("Snake").length).toEqual(2);
    });
});