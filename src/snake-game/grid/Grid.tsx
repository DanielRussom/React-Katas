import * as React from "react";
import { useContext, useEffect, useState } from "react";
import Position from "../Position";
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

  // const [displayedSnakePositions, setDisplayedSnakePositions] = useState<
  //   Position[]
  // >([...snake.positions]);

  const [gridState, setGridState] = useState(
    () => new GridState(height, width, snake.positions)
  );

  useEffect(() => {
    // function snakeHasMoved() {
    //   return !displayedSnakePositions[0].equals(snake.positions[0]);
    // }

    if (snake.isDead()) {
      return;
    }

    // if (snakeHasMoved()) {
    if (snake.positions[0].isOutOfBounds(height, width)) {
      snake.die();
      // setDisplayedSnakePositions([...snake.positions]);
      setSnake(Object.assign(Object.create(snake)));
      return;
    }

    // const updatedGridState = gridState.update(snake, setSnake);

    // if (gridState !== updatedGridState) {
    setGridState(gridState.update(snake, setSnake));
    // }
    // setDisplayedSnakePositions([...snake.positions]);
    // }
  }, [snake, setSnake, gridState, height, width]);

  let rows: JSX.Element[] = [];
  const grid = gridState.getGrid();
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
