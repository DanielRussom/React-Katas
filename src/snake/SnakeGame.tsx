import * as React from "react";
import { useState } from "react";
import Grid from "./Grid";
import Position from "./Position";
import { Snake } from "./Snake";

export const SnakeGame = ({
    height = 5,
    width = 5,
}) => {
    const [position, setPosition] = useState(getInitialSnakePosition());
    const [grid, setGrid] = useState<string[][]>(buildGrid(height, width));
    const [snake] = useState(new Snake(getInitialSnakePosition()));

    function getInitialSnakePosition(): Position {
        const xPosition = Math.round(width / 2) - 1;
        const yPosition = Math.round(height / 2) - 1;

        return new Position(xPosition, yPosition);        
    }

    function buildGrid(height: number, width: number) {
        let grid: string[][] = [];

        for (let rowId = 0; rowId < height; rowId++) {
            grid.push(buildRow(width));
        }

        grid[position.yPosition][position.xPosition] = "Snake"
        return grid;
    }

    function buildRow(width: number) {
        let newRow: string[] = [];

        for (let columnId = 0; columnId < width; columnId++) {
            newRow.push("  x  ");
        }

        return newRow;
    }

    function turnSnakeRight(): void {
        var snakePosition = snake.turnSnakeRight();
        updateSnakePosition(snakePosition);
    }

    function moveSnake(): void {        
        var snakePosition = snake.moveSnake();
        updateSnakePosition(snakePosition);
    }

    function updateSnakePosition(newPosition: Position) {
        let newGrid = [...grid];
        newGrid[position.yPosition][position.xPosition] = " x ";
        newGrid[newPosition.yPosition][newPosition.xPosition] = "Snake";
        setGrid(newGrid);
        setPosition(newPosition);
    }

    return (
        <>
            <button>&lt;</button>
            <button onClick={moveSnake}>Move</button>
            <button onClick={turnSnakeRight}>&gt;</button>

            <Grid grid={grid} />
        </>
    )
}

export default SnakeGame;


