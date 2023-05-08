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

    const { snake, setSnake } = useContext(SnakeContext);
    // const [snakePositions, setSnakePosition] = useState(snake.positions);
    

    function turnSnakeLeft(): void {
        const snakePosition = snake.turnLeft();
        updateSnakeDisplay(snakePosition);
    }

    function turnSnakeRight(): void {
        const snakePosition = snake.turnRight();
        updateSnakeDisplay(snakePosition);
    }

    function moveSnake(): void {
        const snakePosition = snake.move();
        updateSnakeDisplay(snakePosition);
    }

    function updateSnakeDisplay(newPositions) {
        // setSnake(new Snake(new Position(0,0)));
        // console.warn(snake);
    }


    return (
        <>
            <button onClick={turnSnakeLeft}>&lt;</button>
            <button onClick={moveSnake}>Move</button>
            <button onClick={turnSnakeRight}>&gt;</button>

            <Grid height={height} width={width}/>
        </>
    )
}

export default SnakeGame;


