import * as React from "react";
import { useState } from "react";
import Grid from "./Grid";
import Position from "./Position";
import { Snake } from "./Snake";

export const SnakeGame = ({
    height = 5,
    width = 5,
}) => {

    const [snake] = useState(new Snake(getInitialSnakePosition()));
    const [snakePosition, setSnakePosition] = useState(snake.position);


    function getInitialSnakePosition(): Position {
        const xPosition = Math.round(width / 2) - 1;
        const yPosition = Math.round(height / 2) - 1;

        return new Position(xPosition, yPosition);        
    }

    

    function turnSnakeLeft(): void {
        snake.turnSnakeLeft();
        updateSnakeDisplay();
    }

    function turnSnakeRight(): void {
        snake.turnSnakeRight();
        updateSnakeDisplay();
    }

    function moveSnake(): void {
        snake.moveSnake()
        updateSnakeDisplay();
    }

    function updateSnakeDisplay() {
        setSnakePosition(new Position(snake.position.xPosition, snake.position.yPosition));
    }

    return (
        <>
            <button onClick={turnSnakeLeft}>&lt;</button>
            <button onClick={moveSnake}>Move</button>
            <button onClick={turnSnakeRight}>&gt;</button>

            <Grid height={height} width={width} snakeLocation={snakePosition} />
        </>
    )
}

export default SnakeGame;


