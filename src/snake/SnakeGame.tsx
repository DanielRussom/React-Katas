import * as React from "react";
import { useState } from "react";
import Grid from "./Grid";
import Position from "./Position";

export const SnakeGame = ({
    height = 5,
    width = 5,
}) => {
    const [position, setPosition] = useState(getInitialSnakePosition());
    const [grid, setGrid] = useState<string[][]>(buildGrid(height, width));
    const [directionIndex, setDirectionIndex] = useState(0);

    const directions = ["N", "E", "S", "W"]

    function getInitialSnakePosition(): Position {
        const xPosition = Math.round(width / 2) - 1;
        const yPosition = Math.round(height / 2) - 1;

        return new Position(xPosition, yPosition);        
    }

    function buildGrid(height: number, width: number) {
        let grid: string[][] = [];

        for (let rowId = 0; rowId < height; rowId++) {
            grid.push(buildRow(width));
        }

        grid[position.yPosition][position.xPosition] = "Snake"
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
        let newPosition = new Position(position.xPosition,  position.yPosition - 1);
        
        if (directions[directionIndex] === "E") {
            newPosition = new Position(position.xPosition + 1,  position.yPosition);
        }

        if (directions[directionIndex] === "S") {
            moveSnakeDown();
            return;
        }

        
        updateSnakePosition(newPosition);
    }

    function turnSnakeRight(): void {
        const newDirectionIndex = (directionIndex + 1) % 4;
        setDirectionIndex(newDirectionIndex);

        moveSnakeInDirection(directions[newDirectionIndex]);
    }

    function moveSnakeInDirection(direction): void {
        if(direction === "S"){
            moveSnakeDown();
            return;
        }

        if(direction === "W"){
            moveSnakeLeft();
            return;
        }

        if(direction === "N"){
            moveSnakeUp();
            return;
        }

        moveSnakeRight();
    }
    
    function moveSnakeLeft() {
        let newPosition = new Position(position.xPosition - 1,  position.yPosition);

        updateSnakePosition(newPosition);
    }
    
    function moveSnakeRight() {
        let newPosition = new Position(position.xPosition + 1,  position.yPosition);

        updateSnakePosition(newPosition);
    }
    
    function moveSnakeUp() {
        let newPosition = new Position(position.xPosition,  position.yPosition - 1);

        updateSnakePosition(newPosition);
    }

    function moveSnakeDown() {
        let newPosition = new Position(position.xPosition,  position.yPosition + 1);

        updateSnakePosition(newPosition);
    }

    function updateSnakePosition(newPosition: Position) {
        let newGrid = [...grid];
        newGrid[position.yPosition][position.xPosition] = " x ";
        newGrid[newPosition.yPosition][newPosition.xPosition] = "Snake";
        setGrid(newGrid);
        setPosition(newPosition);
    }

    return (
        <>
            <button>&lt;</button>
            <button onClick={moveSnake}>Move</button>
            <button onClick={turnSnakeRight}>&gt;</button>

            <Grid grid={grid} />
        </>
    )
}

export default SnakeGame;


