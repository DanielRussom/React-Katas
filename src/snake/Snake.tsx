import * as React from "react";
import Grid from "./Grid";

export const Snake = ({
    height = 5,
    width = 5,
}) => {
    const [grid, setGrid] = React.useState<string[][]>(buildGrid(height, width));
    


   
    function moveSnake(): void {
        let newGrid = [...grid];

        newGrid[2][2] = "x";
        newGrid[1][2] = "Snake";
        console.log(newGrid);
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
}

function buildGrid(height: number, width: number) {
    let grid: string[][] = [];

    for (let i = 0; i < height; i++) {
        let newRow: string[] = [];

        for (let j = 0; j < width; j++) {
            newRow.push("  x  ");
        }
        grid.push(newRow);
    }
    let middleColumn = Math.round(width/2) - 1;
    let middleRow = Math.round(height/2) - 1;
    grid[middleRow][middleColumn] = "Snake"
    return grid;
}

export default Snake;