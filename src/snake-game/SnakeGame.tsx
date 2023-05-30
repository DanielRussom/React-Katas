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

    React.useEffect(() => {
        const intervalId = setInterval(() => {
          // Function to be executed every x seconds
          console.log('Triggered every x seconds');
          moveSnake();
        }, 500); // Specify the interval in milliseconds (e.g., 5000 ms = 5 seconds)
    
        return () => {
          // Clean up the interval when the component unmounts
          clearInterval(intervalId);
        };
      }, [moveSnake]);
    

    const [snake, setSnake] = useState(new Snake([getInitialSnakePosition()]))
    const [gameIsResetting, setGameIsResetting] = useState(false);

    React.useEffect(() => {
        if(gameIsResetting === true){
            setGameIsResetting(false);
        }
    }, [gameIsResetting]);

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
        setGameIsResetting(true);
        setSnake(new Snake([getInitialSnakePosition()]))
    }

    return (
        <>
            <button onClick={turnSnakeLeft} disabled={snake.isDead()}>&lt;</button>
            <button onClick={moveSnake} disabled={snake.isDead()}>Move</button>
            <button onClick={turnSnakeRight} disabled={snake.isDead()}>&gt;</button>

            { snake.isDead() ? <><p>You died! Score: {snake.getSize()}</p> <button onClick={() => {resetGame()}}>Play again</button></> : null}
            

            <SnakeContext.Provider value={{ snake: snake, setSnake: setSnake }}>
                { !gameIsResetting ? <Grid height={height} width={width} /> : null }
            </SnakeContext.Provider>
        </>
    )
}

export default SnakeGame;