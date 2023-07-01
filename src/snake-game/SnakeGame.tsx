import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import Grid from "./grid/Grid";
import Position from "./Position";
import { Snake } from "./snake/Snake";
import { SnakeContext } from "./SnakeContext";
import { MovementSpeed } from "./Constants";

export const SnakeGame = ({ height = 15, width = 15 }) => {
  function getInitialSnakePosition(): Position {
    const xPosition = Math.round(width / 2) - 1;
    const yPosition = Math.round(height / 2) - 1;

    return new Position(xPosition, yPosition);
  }

  const [snake, setSnake] = useState(new Snake([getInitialSnakePosition()]));
  const [gameIsResetting, setGameIsResetting] = useState(false);

  const updateSnakeDisplay = useCallback(() => {
    setSnake(copy(snake));
  }, [snake]);

  const moveSnake = useCallback(() => {
    snake.move();
    updateSnakeDisplay();
  }, [snake, updateSnakeDisplay]);

  const turnSnakeLeft = useCallback(() => {
    snake.turnLeft();
  }, [snake]);

  const turnSnakeRight = useCallback(() => {
    snake.turnRight();
  }, [snake]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!snake.isDead()) {
        moveSnake();
      }
    }, MovementSpeed);

    return () => {
      clearInterval(intervalId);
    };
  }, [moveSnake, snake]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (snake.isDead()) {
        return;
      }
      event.preventDefault();
      if (event.key === "ArrowLeft" || event.key === "a") {
        turnSnakeLeft();
      } else if (event.key === "ArrowRight" || event.key === "d") {
        turnSnakeRight();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [snake, turnSnakeLeft, turnSnakeRight]);

  useEffect(() => {
    if (gameIsResetting === true) {
      setGameIsResetting(false);
    }
  }, [gameIsResetting]);

  function copy(snake: Snake): Snake {
    return Object.assign(Object.create(snake));
  }

  function resetGame() {
    setGameIsResetting(true);
    setSnake(new Snake([getInitialSnakePosition()]));
  }

  return (
    <>
      {/* Message saying how to move? */}
      <SnakeContext.Provider value={{ snake: snake, setSnake: setSnake }}>
        {!gameIsResetting ? <Grid height={height} width={width} /> : null}
      </SnakeContext.Provider>

      {snake.isDead() ? (
        <>
          <p>You died! Score: {snake.getSize()}</p>{" "}
          <button
            onClick={() => {
              resetGame();
            }}
          >
            Play again
          </button>
        </>
      ) : null}
    </>
  );
};

export default SnakeGame;
