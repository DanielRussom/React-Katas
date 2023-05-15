import * as React from "react";
import { useContext, useState } from "react";
import { FoodSpawner } from "./FoodSpawner";
import Position from "./Position";
import { EmptySpace, FoodToken, SnakeToken } from "./Constants";
import { SnakeContext } from "./SnakeContext";

export type GridProperties = {
    height: number,
    width: number,
}

export default function Grid({
    height = 5,
    width = 5,
}: GridProperties) {
    const foodSpawner = new FoodSpawner();

    const { snake, setSnake } = useContext(SnakeContext);
    
    const [storedSnakeLocations, setStoredSnakeLocations] = useState<Position[]>([...snake.positions]);
    const [grid, setGrid] = useState<string[][]>(() => buildGrid());

    if (storedSnakeLocations[0].y !== snake.positions[0].y ||
        storedSnakeLocations[0].x !== snake.positions[0].x) {
        
        let oldValue = grid[snake.positions[0].y][snake.positions[0].x];
        
        let newGrid = [...grid];
        
        storedSnakeLocations.forEach(position => {
            grid[position.y][position.x] = EmptySpace;
        });

        snake.positions.forEach(position => {
            grid[position.y][position.x] = SnakeToken
        });

        if(oldValue === FoodToken){
            snake.feed();
            setSnake(Object.assign(Object.create(snake)));
            const foodPosition = foodSpawner.pickFoodPosition(newGrid);
            newGrid[foodPosition.y][foodPosition.x] = FoodToken
        }

        setGrid(newGrid);
        setStoredSnakeLocations([...snake.positions]);
    }

    function buildGrid() {
        let grid: string[][] = [];

        for (let rowId = 0; rowId < height; rowId++) {
            grid.push(buildRow(width));
        }

        console.warn(snake.positions)
        snake.positions.forEach(position => {
            grid[position.y][position.x] = SnakeToken
        });

        const foodPosition = foodSpawner.pickFoodPosition(grid);
        grid[foodPosition.y][foodPosition.x] = FoodToken
        return grid;
    }
    function buildRow(width: number) {
        let newRow: string[] = [];

        for (let columnId = 0; columnId < width; columnId++) {
            newRow.push(EmptySpace);
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