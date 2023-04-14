import { render, screen } from "@testing-library/react";
import SnakeGame from "./SnakeGame";
import * as React from "react";
import { clickButton } from "../../testExtensions/screenTestExtensions";
import Position from "./Position";
import { FoodSpawner } from "./FoodSpawner";

jest.mock("./FoodSpawner");

describe("snake eating food feature", () => {
    it("should increase the snake's length and have the snake in the expected position", () => {
        FoodSpawner.prototype.getFoodLocation = jest.fn().mockReturnValueOnce(new Position (1,1)).mockReturnValueOnce(new Position(3,3));

        const spawner = new FoodSpawner();
        let spawnedFood = spawner.getFoodLocation();
        console.log(spawnedFood.xPosition + " " + spawnedFood.yPosition)

        spawnedFood = spawner.getFoodLocation();
        console.log(spawnedFood.xPosition + " " + spawnedFood.yPosition)

        render(<SnakeGame height={7} width={7} />);

        
        let gameBoard = screen.getByTitle("GameBoard");
        let secondRow = gameBoard.childNodes[1];
        
        const firstFoodCell = secondRow.childNodes[1];
        expect(firstFoodCell).toHaveTextContent("Food");
       
        clickButton('Move');
        clickButton('Move');
        clickButton('<');
        clickButton('Move');
        
        gameBoard = screen.getByTitle("GameBoard");
        secondRow = gameBoard.childNodes[1];
        
        const firstSnakeCell = secondRow.childNodes[1];
        const secondSnakeCell = secondRow.childNodes[2];

        expect(firstSnakeCell).toHaveTextContent("Snake");
        expect(secondSnakeCell).toHaveTextContent("Snake");
        
        expect(screen.getAllByText("Snake").length).toEqual(2);

        
        const fourthRow = gameBoard.childNodes[3];
        
        const secondFoodCell = fourthRow.childNodes[3];
        expect(secondFoodCell).toHaveTextContent("Food");

    });
});