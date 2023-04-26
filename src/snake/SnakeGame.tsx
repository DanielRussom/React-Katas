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
        snake.turnLeft();
        updateSnakeDisplay();
    }

    function turnSnakeRight(): void {
        const snakePosition = snake.turnRight();
        updateSnakeDisplayTo(snakePosition);
    }

    function moveSnake(): void {
        const snakePosition = snake.move()
        updateSnakeDisplayTo(snakePosition);
    }

    function updateSnakeDisplayTo(newPosition) {
        setSnakePosition(new Position(newPosition.x, newPosition.y));
    }

    function updateSnakeDisplay() {
        setSnakePosition(new Position(snake.position.x, snake.position.y));
    }

    return (
        <>
            <button onClick={turnSnakeLeft}>&lt;</button>
            <button onClick={moveSnake}>Move</button>
            <button onClick={turnSnakeRight}>&gt;</button>

            <Grid height={height} width={width} snakeLocation={snakePosition} feedSnake={() => {}}/>
        </>
    )
}

export default SnakeGame;


