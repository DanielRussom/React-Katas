import * as React from "react";
import { useState } from "react";
import { FoodSpawner } from "./FoodSpawner";
import Position from "./Position";

export default function Grid({
    height = 5,
    width = 5,
    snakeLocation
}) {
    const foodSpawner = new FoodSpawner();

    const [grid, setGrid] = useState<string[][]>(() => buildGrid());
    const [storedSnakeLocation, setStoredSnakeLocation] = useState<Position>(snakeLocation);

    if (storedSnakeLocation.y !== snakeLocation.y ||
        storedSnakeLocation.x !== snakeLocation.x) {

        let newGrid = [...grid];
        let oldValue = grid[snakeLocation.y][snakeLocation.x];
        newGrid[storedSnakeLocation.y][storedSnakeLocation.x] = "| _ |";
        newGrid[snakeLocation.y][snakeLocation.x] = "Snake";

        
        if(oldValue === "Food"){
            const foodPosition = foodSpawner.pickFoodPosition(newGrid);
            newGrid[foodPosition.y][foodPosition.x] = "Food"
        }

        setGrid(newGrid);
        setStoredSnakeLocation(snakeLocation);
    }

    function buildGrid() {
        let grid: string[][] = [];

        for (let rowId = 0; rowId < height; rowId++) {
            grid.push(buildRow(width));
        }

        grid[snakeLocation.y][snakeLocation.x] = "Snake"

        const foodPosition = foodSpawner.pickFoodPosition(grid);
        grid[foodPosition.y][foodPosition.x] = "Food"
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