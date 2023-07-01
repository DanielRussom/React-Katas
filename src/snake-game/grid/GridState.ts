import { EmptySpace, FoodToken, SnakeToken } from "../Constants";
import { FoodSpawner } from "../FoodSpawner";
import Position from "../Position";
import { Snake } from "../snake/Snake";

export class GridState {
  grid: string[][];
  private foodSpawner: FoodSpawner;

  constructor(height, width, snake) {
    this.foodSpawner = new FoodSpawner();
    let newGrid: string[][] = [];

    for (let rowId = 0; rowId < height; rowId++) {
      newGrid.push(this.buildRow(width));
    }

    snake.positions.forEach((position) => {
      newGrid[position.y][position.x] = SnakeToken;
    });

    const foodPosition = this.foodSpawner.pickFoodPosition(newGrid);
    newGrid[foodPosition.y][foodPosition.x] = FoodToken;
    this.grid = newGrid;
  }

  buildRow(width: number) {
    let newRow: string[] = [];

    for (let columnId = 0; columnId < width; columnId++) {
      newRow.push(EmptySpace);
    }

    return newRow;
  }

  update(
    snake: Snake,
    displayedSnakePositions: Position[],
    setSnake: Function
  ): GridState {
    let newGridState = [...this.grid];
    let newTileBeingOccupied =
      this.grid[snake.positions[0].y][snake.positions[0].x];

    displayedSnakePositions.forEach((position) => {
      newGridState[position.y][position.x] = EmptySpace;
    });

    snake.positions.forEach((position) => {
      newGridState[position.y][position.x] = SnakeToken;
    });

    if (newTileBeingOccupied === FoodToken) {
      snake.eatFood();
      newGridState[snake.lastPosition.y][snake.lastPosition.x] = SnakeToken;
      setSnake(Object.assign(Object.create(snake)));

      const foodPosition = this.foodSpawner.pickFoodPosition(newGridState);
      newGridState[foodPosition.y][foodPosition.x] = FoodToken;
    }

    let newerGridState: GridState = Object.assign(Object.create(this));
    newerGridState.grid = newGridState;
    return newerGridState;
  }
}
