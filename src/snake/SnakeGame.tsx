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
    const [snakePosition, setSnakePosition] = useState(snake.positions[0]);

    function getInitialSnakePosition(): Position {
        const xPosition = Math.round(width / 2) - 1;
        const yPosition = Math.round(height / 2) - 1;

        return new Position(xPosition, yPosition);        
    }    

    function turnSnakeLeft(): void {
        const snakePosition = snake.turnLeft();
        updateSnakeDisplay(snakePosition);
    }

    function turnSnakeRight(): void {
        const snakePosition = snake.turnRight();
        updateSnakeDisplay(snakePosition);
    }

    function moveSnake(): void {
        const snakePosition = snake.move()
        updateSnakeDisplay(snakePosition);
    }

    function updateSnakeDisplay(newPosition) {
        setSnakePosition(new Position(newPosition.x, newPosition.y));
    }

    function feedSnake() {
        snake.feed();
    }

    return (
        <>
            <button onClick={turnSnakeLeft}>&lt;</button>
            <button onClick={moveSnake}>Move</button>
            <button onClick={turnSnakeRight}>&gt;</button>

            <Grid height={height} width={width}  snakePositions={[snakePosition]} feedSnake={() => feedSnake()}/>
        </>
    )
}

export default SnakeGame;


