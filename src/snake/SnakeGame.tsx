import * as React from "react";
import { useState } from "react";
import Grid from "./Grid";
import Position from "./Position";
import { Snake } from "./Snake";
import { SnakeContext } from "./SnakeContext";

export const SnakeGame = ({
    height = 5,
    width = 5,
}) => {
    function getInitialSnakePosition(): Position {
        const xPosition = Math.round(width / 2) - 1;
        const yPosition = Math.round(height / 2) - 1;

        return new Position(xPosition, yPosition);
    }

    const [snake, setSnake] = useState(new Snake([getInitialSnakePosition()]))

    function turnSnakeLeft(): void {
        snake.turnLeft();
        updateSnakeDisplay();
    }

    function turnSnakeRight(): void {
        snake.turnRight();
        updateSnakeDisplay();
    }

    function moveSnake(): void {
        snake.move();
        updateSnakeDisplay();
    }

    function updateSnakeDisplay() {
        setSnake(copy(snake));
    }

    function copy(snake: Snake): Snake {
        return Object.assign(Object.create(snake));
    }

    return (
        <>
            <button onClick={turnSnakeLeft}>&lt;</button>
            <button onClick={moveSnake}>Move</button>
            <button onClick={turnSnakeRight}>&gt;</button>

            <SnakeContext.Provider value={{ snake: snake, setSnake: setSnake }}>
                <Grid height={height} width={width} />
            </SnakeContext.Provider>
        </>
    )
}

export default SnakeGame;