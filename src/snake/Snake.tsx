import * as React from "react";

export const Snake = ({
    height = 5,
    width = 5,
}) => {

    let rows : JSX.Element[] = []

    let grid: string[][] = buildGrid(height, width);
    
    let middleColumn = Math.round(width/2) - 1;
    let middleRow = Math.round(height/2) - 1;

    grid[middleRow][middleColumn] = "Snake"

    for(let rowIndex = 0; rowIndex < grid.length; rowIndex++) {

        let columns = grid[rowIndex].map((columnValue, index) => <span key={index}>{columnValue}</span>);

        rows.push(<div key={rowIndex}>{columns}</div>);
    }

    return (
        <>
            <style>{ }

            </style>
            <button>&lt;</button>
            <button>Move</button>
            <button>&gt;</button>

            <div title="GameBoard" style={{ display: "grid" }}>
                {rows}
            </div>
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
