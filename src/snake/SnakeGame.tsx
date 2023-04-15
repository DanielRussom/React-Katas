import * as React from "react";
import { useState } from "react";
import Grid from "./Grid";
import Position from "./Position";
import { Snake } from "./Snake";
import { FoodSpawner } from "./FoodSpawner";

export const SnakeGame = ({
    height = 5,
    width = 5,
}) => {
    const foodSpawner = new FoodSpawner();

    const [snake] = useState(new Snake(getInitialSnakePosition()));
    const [grid, setGrid] = useState<string[][]>(buildGrid());


    function getInitialSnakePosition(): Position {
        const xPosition = Math.round(width / 2) - 1;
        const yPosition = Math.round(height / 2) - 1;

        return new Position(xPosition, yPosition);        
    }

    function buildGrid() {
        let grid: string[][] = [];

        for (let rowId = 0; rowId < height; rowId++) {
            grid.push(buildRow(width));
        }

        grid[snake.position.yPosition][snake.position.xPosition] = "Snake"
        
        const foodPosition = foodSpawner.pickFoodPosition(grid);
        grid[foodPosition.yPosition][foodPosition.xPosition] = "Food"
        return grid;
    }

    function buildRow(width: number) {
        let newRow: string[] = [];

        for (let columnId = 0; columnId < width; columnId++) {
            newRow.push("| _ |");
        }

        return newRow;
    }

    function turnSnakeLeft(): void {
        const oldSnakePosition = snake.position;
        updateSnakeDisplay(oldSnakePosition, snake.turnSnakeLeft());
    }

    function turnSnakeRight(): void {
        const oldSnakePosition = snake.position;
        updateSnakeDisplay(oldSnakePosition, snake.turnSnakeRight());
    }

    function moveSnake(): void {
        const oldSnakePosition = snake.position;
        updateSnakeDisplay(oldSnakePosition, snake.moveSnake());
    }

    function updateSnakeDisplay(oldPosition: Position, newPosition: Position) {
        let newGrid = [...grid];
        newGrid[oldPosition.yPosition][oldPosition.xPosition] = "| _ |";
        newGrid[newPosition.yPosition][newPosition.xPosition] = "Snake";
        setGrid(newGrid);
    }

    return (
        <>
            <button onClick={turnSnakeLeft}>&lt;</button>
            <button onClick={moveSnake}>Move</button>
            <button onClick={turnSnakeRight}>&gt;</button>

            <Grid grid={grid} />
        </>
    )
}

export default SnakeGame;


