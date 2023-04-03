import * as React from "react";
import Grid from "./Grid";

let grid: string[][];
export const Snake = ({
    height = 5,
    width = 5,
}) => {
    grid = buildGrid(height, width);
    
    let middleColumn = Math.round(width/2) - 1;
    let middleRow = Math.round(height/2) - 1;

    grid[middleRow][middleColumn] = "Snake"

   
    return (
        <>
            <style>{ }

            </style>
            <button>&lt;</button>
            <button>Move</button>
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
    return grid;
}

export default Snake;