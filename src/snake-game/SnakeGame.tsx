import * as React from "react";
import { useState } from "react";
import Grid from "./grid/Grid";
import Position from "./Position";
import { Snake } from "./snake/Snake";
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
    const [reset, setReset] = useState(false);

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

    function resetGame() {
        setSnake(new Snake([getInitialSnakePosition()]))
        setReset(true);
    }

    React.useEffect(() => {
        if(reset === true){
            setReset(false);
        }
    }, [reset]);

    return (
        <>
            <button onClick={turnSnakeLeft} disabled={snake.isDead()}>&lt;</button>
            <button onClick={moveSnake} disabled={snake.isDead()}>Move</button>
            <button onClick={turnSnakeRight} disabled={snake.isDead()}>&gt;</button>

            { snake.isDead() ? <><p>You died! Score: {snake.getSize()}</p> <button onClick={() => {resetGame()}}>Play again</button></> : null}
            

            <SnakeContext.Provider value={{ snake: snake, setSnake: setSnake }}>
                { !reset ? <Grid height={height} width={width} /> : null }
            </SnakeContext.Provider>
        </>
    )
}

export default SnakeGame;