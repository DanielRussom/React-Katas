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

  private buildRow(width: number) {
    const newRow: string[] = [];

    for (let columnId = 0; columnId < width; columnId++) {
      newRow.push(EmptySpace);
    }

    return newRow;
  }

  getGrid = (): string[][] => this.grid;

  update(snake: Snake): GridState {
    const snakeHead = snake.positions[0];
    if (snakeHead.equals(this.displayedSnakePositions[0])) {
      return this;
    }

    const newGridState: GridState = this.cloneGridState();

    const hasEatenFood = this.grid[snakeHead.y][snakeHead.x] === FoodToken;
    if (hasEatenFood) {
      snake.eatFood();
    }

    newGridState.updateSnakeDisplay(snake);

    if (hasEatenFood) {
      this.spawnNewFood();
    }

    return newGridState;
  }

  private cloneGridState = (): GridState => Object.assign(Object.create(this));

  private updateSnakeDisplay(snake: Snake) {
    this.displayedSnakePositions.forEach((position) => {
      this.grid[position.y][position.x] = EmptySpace;
    });

    snake.positions.forEach((position) => {
      this.grid[position.y][position.x] = SnakeToken;
    });

    this.displayedSnakePositions = [...snake.positions];
  }

  private spawnNewFood() {
    const foodPosition = this.foodSpawner.pickFoodPosition(this.grid);
    this.grid[foodPosition.y][foodPosition.x] = FoodToken;
  }
}
