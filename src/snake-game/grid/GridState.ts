import { EmptySpace, FoodToken, SnakeToken } from "../Constants";
import { FoodSpawner } from "../FoodSpawner";
import Position from "../Position";
import { Snake } from "../snake/Snake";

export class GridState {
  private grid: string[][];
  private foodSpawner: FoodSpawner;
  private displayedSnakePositions: Position[];

  constructor(height: number, width: number, snakePositions: Position[]) {
    this.foodSpawner = new FoodSpawner();
    let newGrid: string[][] = [];

    for (let rowId = 0; rowId < height; rowId++) {
      newGrid.push(this.buildRow(width));
    }

    snakePositions.forEach((position) => {
      newGrid[position.y][position.x] = SnakeToken;
    });
    this.displayedSnakePositions = [...snakePositions];

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

  update(snake: Snake): GridState {
    if (snake.positions[0].equals(this.displayedSnakePositions[0])) {
      return this;
    }

    const newGridState = [...this.grid];

    const hasEatenFood =
      this.grid[snake.positions[0].y][snake.positions[0].x] === FoodToken;

    if (hasEatenFood) {
      snake.eatFood();
    }

    this.updateSnakeDisplay(newGridState, snake);

    if (hasEatenFood) {
      this.spawnNewFood(newGridState);
    }

    const newerGridState: GridState = Object.assign(Object.create(this));
    newerGridState.grid = newGridState;
    return newerGridState;
  }

  private updateSnakeDisplay(newGridState: string[][], snake: Snake) {
    this.displayedSnakePositions.forEach((position) => {
      newGridState[position.y][position.x] = EmptySpace;
    });

    snake.positions.forEach((position) => {
      newGridState[position.y][position.x] = SnakeToken;
    });

    this.displayedSnakePositions = [...snake.positions];
  }

  private spawnNewFood(newGridState: string[][]) {
    const foodPosition = this.foodSpawner.pickFoodPosition(newGridState);
    newGridState[foodPosition.y][foodPosition.x] = FoodToken;
  }
}
