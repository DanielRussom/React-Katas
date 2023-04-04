import * as React from "react";
import Grid from "./Grid";

export const Snake = ({
    height = 5,
    width = 5,
}) => {
    const [middleRow] = React.useState(Math.round(height/2) - 1);
    const [middleColumn] = React.useState(Math.round(width/2) - 1);
    const [grid, setGrid] = React.useState<string[][]>(buildGrid(height, width));
    
    function moveSnake(): void {
        let newGrid = [...grid];

        newGrid[middleRow][middleColumn] = "x";
        newGrid[middleRow - 1][middleColumn] = "Snake";

        setGrid(newGrid);
    }

    return (
        <>
            <style>{ }

            </style>
            <button>&lt;</button>
            <button onClick={moveSnake}>Move</button>
            <button>&gt;</button>

            <Grid grid={grid}/>
        </>
    )

    function buildGrid(height: number, width: number) {
        let grid: string[][] = [];
    
        for (let i = 0; i < height; i++) {
            let newRow: string[] = [];
    
            for (let j = 0; j < width; j++) {
                newRow.push("  x  ");
            }
            grid.push(newRow);
        }

        grid[middleRow][middleColumn] = "Snake"
        return grid;
    }
}

export default Snake;