import * as React from "react";
import Grid from "./Grid";
import { useState } from "react";

export const Snake = ({
    height = 5,
    width = 5,
}) => {
    const [snakeRow, setSnakeRow] = React.useState(Math.round(height/2) - 1);
    const [snakeColumn, setSnakeColumn] = React.useState(Math.round(width/2) - 1);
    const [grid, setGrid] = React.useState<string[][]>(buildGrid(height, width));
    
    const [hasTurnedRight, setHasTurnedRight] = useState(false);

    function buildGrid(height: number, width: number) {
        let grid: string[][] = [];
    
        for (let rowId = 0; rowId < height; rowId++) {
            grid.push(buildRow(width));
        }

        grid[snakeRow][snakeColumn] = "Snake"
        return grid;
    }
    
    function buildRow(width: number) {
        let newRow: string[] = [];
    
        for (let columnId = 0; columnId < width; columnId++) {
            newRow.push("  x  ");
        }
        
        return newRow;
    }

    function moveSnake(): void {
        let newGrid = [...grid];

        if(hasTurnedRight){
            const newSnakeColumn = snakeColumn + 1;
            newGrid[snakeRow][snakeColumn] = " x ";
            newGrid[snakeRow][newSnakeColumn] = "Snake";
            setSnakeColumn(newSnakeColumn);
        }
        else {
            const newSnakeRow = snakeRow - 1;
            newGrid[snakeRow][snakeColumn] = " x ";
            newGrid[newSnakeRow][snakeColumn] = "Snake";
            setSnakeRow(newSnakeRow);
        }

        setGrid(newGrid);
    }

    function moveSnakeRight(): void {
        let newGrid = [...grid];
        const newSnakeColumn = snakeColumn + 1;
        newGrid[snakeRow][snakeColumn] = "x";
        newGrid[snakeRow][newSnakeColumn] = "Snake";
        setSnakeColumn(newSnakeColumn);
        setGrid(newGrid);
        setHasTurnedRight(true);
    }

    return (
        <>
            <style>{ }

            </style>
            <button>&lt;</button>
            <button onClick={moveSnake}>Move</button>
            <button onClick={moveSnakeRight}>&gt;</button>

            <Grid grid={grid}/>
        </>
    )
}
    
export default Snake;
