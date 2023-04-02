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
    
    for(let i = 0; i < grid.length; i++) {
        let columns : JSX.Element[] = []

        for(let j = 0; j < grid[i].length; j++){
            columns.push(<span key={j}>{grid[i][j]}</span>)
        }

        rows.push(<div key={i}>{columns}</div>);
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
