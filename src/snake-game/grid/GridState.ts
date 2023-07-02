import { EmptySpace, FoodToken, SnakeToken } from "../Constants";
import { FoodSpawner } from "../FoodSpawner";
import Position from "../Position";
import { Snake } from "../snake/Snake";

export class GridState {
  private grid: string[][];
  private foodSpawner: FoodSpawner;

  constructor(height: number, width: number, snakePositions: Position[]) {
    this.foodSpawner = new FoodSpawner();
    let newGrid: string[][] = [];

    for (let rowId = 0; rowId < height; rowId++) {
      newGrid.push(this.buildRow(width));
    }

    snakePositions.forEach((position) => {
      newGrid[position.y][position.x] = SnakeToken;
    });

    const foodPosition = this.foodSpawner.pickFoodPosition(newGrid);
    newGrid[foodPosition.y][foodPosition.x] = FoodToken;
    this.grid = newGrid;
  }

  getGrid(): string[][] {
    return this.grid;
  }

  buildRow(width: number) {
    const newRow: string[] = [];

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
    const newGridState = [...this.grid];

    const isEatingFood =
      this.grid[snake.positions[0].y][snake.positions[0].x] === FoodToken;

    displayedSnakePositions.forEach((position) => {
      newGridState[position.y][position.x] = EmptySpace;
    });

    snake.positions.forEach((position) => {
      newGridState[position.y][position.x] = SnakeToken;
    });

    if (isEatingFood) {
      this.handleFootEaten(snake, newGridState, setSnake);
    }

    const newerGridState: GridState = Object.assign(Object.create(this));
    newerGridState.grid = newGridState;
    return newerGridState;
  }

  private handleFootEaten(
    snake: Snake,
    newGridState: string[][],
    setSnake: Function
  ) {
    snake.eatFood();
    newGridState[snake.lastPosition.y][snake.lastPosition.x] = SnakeToken;
    setSnake(Object.assign(Object.create(snake)));

    const foodPosition = this.foodSpawner.pickFoodPosition(newGridState);
    newGridState[foodPosition.y][foodPosition.x] = FoodToken;
  }
}
