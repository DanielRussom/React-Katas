import * as React from "react";
import { useState } from "react";
import { FoodSpawner } from "./FoodSpawner";

export default function Grid({
    height = 5,
    width = 5,
    snakeLocation
}) {
    const foodSpawner = new FoodSpawner();

    const [grid, setGrid] = useState<string[][]>(buildGrid());
    const [storedSnakeLocation, setStoredSnakeLocation] = useState(snakeLocation);

    if (storedSnakeLocation.yPosition !== snakeLocation.yPosition ||
        storedSnakeLocation.xPosition !== snakeLocation.xPosition) {

        let newGrid = [...grid];
        newGrid[storedSnakeLocation.yPosition][storedSnakeLocation.xPosition] = "| _ |";
        newGrid[snakeLocation.yPosition][snakeLocation.xPosition] = "Snake";
        setGrid(newGrid);
        setStoredSnakeLocation(snakeLocation);
    }

    function buildGrid() {
        let grid: string[][] = [];

        for (let rowId = 0; rowId < height; rowId++) {
            grid.push(buildRow(width));
        }

        grid[snakeLocation.yPosition][snakeLocation.xPosition] = "Snake"

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

    let rows: JSX.Element[] = [];
    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
        let columns = grid[rowIndex].map((columnValue, columnIndex) => <span key={columnIndex}>{columnValue}</span>);

        rows.push(<div key={rowIndex}>{columns}</div>);
    }

    return (
        <div title="GameBoard" style={{ display: "grid" }}>
            {rows}
        </div>
    );
}