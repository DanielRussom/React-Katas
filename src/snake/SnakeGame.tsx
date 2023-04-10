import * as React from "react";
import { useState } from "react";
import Grid from "./Grid";
import Position from "./Position";
import { Snake } from "./Snake";

export const SnakeGame = ({
    height = 5,
    width = 5,
}) => {
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
        return grid;
    }

    function buildRow(width: number) {
        let newRow: string[] = [];

        for (let columnId = 0; columnId < width; columnId++) {
            newRow.push("x");
        }

        return newRow;
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
        newGrid[oldPosition.yPosition][oldPosition.xPosition] = " x ";
        newGrid[newPosition.yPosition][newPosition.xPosition] = "Snake";
        setGrid(newGrid);
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


