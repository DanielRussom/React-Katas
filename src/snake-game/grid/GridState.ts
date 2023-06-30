import { EmptySpace, FoodToken, SnakeToken } from "../Constants";

export class GridState {
    grid: string[][];

    constructor(height, width, snake, foodSpawner){
        let newGrid: string[][] = [];

    for (let rowId = 0; rowId < height; rowId++) {
        newGrid.push(this.buildRow(width));
    }

    snake.positions.forEach((position) => {
        newGrid[position.y][position.x] = SnakeToken;
    });

    const foodPosition = foodSpawner.pickFoodPosition(newGrid);
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
}