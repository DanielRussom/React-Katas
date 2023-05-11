import * as React from "react";
import { createContext, useContext, useState } from "react";
import Grid from "./Grid";
import Position from "./Position";
import { Snake } from "./Snake";
import { SnakeContext } from "../App";

// export const SnakeContext = createContext<{snake: Snake, setSnake: Function}>(undefined!);

export const SnakeGame = ({
    height = 5,
    width = 5,
}) => {
    
    
  //TODO Wrap SnakeGame's Ui with a "SnakeGameControls"??? Take this out of App
//   const height = 5;
//   const width = 5;
 
  function getInitialSnakePosition(): Position {
    const xPosition = Math.round(width / 2) - 1;
    const yPosition = Math.round(height / 2) - 1;

    return new Position(xPosition, yPosition);        
}
const { snake, setSnake } = useContext(SnakeContext);
  // const value = {snake: snake, setSnake: setSnake};

    const [forceRerender, setForceRerender] = useState(0);
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
        setSnake(new Snake(newPositions[0]));
        console.warn(snake.positions)
        //setForceRerender(forceRerender + 1);
        // console.warn(snake);
    }


    return (
        <>
            <button onClick={turnSnakeLeft}>&lt;</button>
            <button onClick={moveSnake}>Move</button>
            <button onClick={turnSnakeRight}>&gt;</button>

            {/* <SnakeContext.Provider value={{snake: snake, setSnake: setSnake}}> */}
                <Grid height={height} width={width}/>
            {/* </SnakeContext.Provider> */}
        </>
    )
}

export default SnakeGame;


