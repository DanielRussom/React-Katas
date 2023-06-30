import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { FoodSpawner } from "../FoodSpawner";
import Position from "../Position";
import { EmptySpace, FoodToken, SnakeToken } from "../Constants";
import { SnakeContext } from "../SnakeContext";
import { GridState } from "./GridState";

export default function Grid({
  height = 5,
  width = 5,
}: {
  height: number;
  width: number;
}) {
  const { snake, setSnake } = useContext(SnakeContext);

  const [foodSpawner] = useState(new FoodSpawner());
  const [storedSnakeLocations, setStoredSnakeLocations] = useState<Position[]>([
    ...snake.positions,
  ]);
  const [gridState] = useState(() => new GridState(height, width, snake, foodSpawner));
  const [grid, setGrid] = useState<string[][]>(gridState.grid);

  useEffect(() => {
    function snakeHasMoved() {
      return !storedSnakeLocations[0].equals(snake.positions[0]);
    }

    if (snakeHasMoved()) {
      if (snakeIsOffBoard(snake.positions[0])) {
        snake.die();
        setStoredSnakeLocations([...snake.positions]);
        setSnake(Object.assign(Object.create(snake)));
        return;
      }

      let newlyOccupiedTile = grid[snake.positions[0].y][snake.positions[0].x];
      let newGrid = [...grid];

      refreshSnakeDisplay(newGrid);

      if (newlyOccupiedTile === FoodToken) {
        handleEatenFood(newGrid);
      }

      setGrid(newGrid);
      setStoredSnakeLocations([...snake.positions]);
    }

    function refreshSnakeDisplay(newGrid: string[][]) {
      storedSnakeLocations.forEach((position) => {
        newGrid[position.y][position.x] = EmptySpace;
      });

      snake.positions.forEach((position) => {
        newGrid[position.y][position.x] = SnakeToken;
      });
    }

    function handleEatenFood(newGrid: string[][]) {
      snake.eatFood();
      newGrid[snake.lastPosition.y][snake.lastPosition.x] = SnakeToken;
      setSnake(Object.assign(Object.create(snake)));

      const foodPosition = foodSpawner.pickFoodPosition(newGrid);
      newGrid[foodPosition.y][foodPosition.x] = FoodToken;
    }

    function snakeIsOffBoard(snakeHeadPosition: Position) {
      return (
        snakeHeadPosition.y < 0 ||
        snakeHeadPosition.y >= height ||
        snakeHeadPosition.x < 0 ||
        snakeHeadPosition.x >= width
      );
    }
  }, [foodSpawner, grid, snake, setSnake, storedSnakeLocations, height, width]);

  let rows: JSX.Element[] = [];
  for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
    let columns = grid[rowIndex].map((columnValue, columnIndex) => (
      <span
        key={columnIndex}
        style={{
          width: "25px",
          // height: "20px",
          display: "inline-block",
          border: "1px solid black",
        }}
      >
        {columnValue}
      </span>
    ));

    rows.push(<div key={rowIndex}>{columns}</div>);
  }

  return (
    <div title="GameBoard" style={{ display: "grid" }}>
      {rows}
    </div>
  );
}
