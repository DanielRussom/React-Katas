import * as React from "react";
import Grid from "./Grid";

export const Snake = ({
    height = 5,
    width = 5,
}) => {
    const [snakeRow, setSnakeRow] = React.useState(Math.round(height/2) - 1);
    const [middleColumn] = React.useState(Math.round(width/2) - 1);
    const [grid, setGrid] = React.useState<string[][]>(buildGrid(height, width));
    
    function buildGrid(height: number, width: number) {
        let grid: string[][] = [];
    
        for (let rowId = 0; rowId < height; rowId++) {
            grid.push(buildRow(width));
        }

        grid[snakeRow][middleColumn] = "Snake"
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

        const newSnakeRow = snakeRow - 1;
        newGrid[snakeRow][middleColumn] = "x";
        newGrid[newSnakeRow][middleColumn] = "Snake";

        setSnakeRow(newSnakeRow);
        setGrid(newGrid);
    }

    function moveSnakeRight(): void {
        let newGrid = [...grid];
        newGrid[2][2] = "x";
        newGrid[2][3] = "Snake";
        setGrid(newGrid);
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
