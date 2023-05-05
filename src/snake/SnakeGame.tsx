import * as React from "react";
import { useContext, useState } from "react";
import Grid from "./Grid";
import Position from "./Position";
import { Snake } from "./Snake";
import { SnakeContext } from "../App";

export const SnakeGame = ({
    height = 5,
    width = 5,
}) => {

    const otherSnake = useContext(SnakeContext);
    const [snake] = useState(otherSnake!);
    const [snakePositions, setSnakePosition] = useState(snake.positions);

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

    function updateSnakeDisplay(newPositions) {
        setSnakePosition(newPositions);
    }

    function feedSnake() {
        snake.feed();
    }

    return (
        <>
            <button onClick={turnSnakeLeft}>&lt;</button>
            <button onClick={moveSnake}>Move</button>
            <button onClick={turnSnakeRight}>&gt;</button>

            <Grid height={height} width={width} snakePositions={snakePositions} feedSnake={() => feedSnake()}/>
        </>
    )
}

export default SnakeGame;


