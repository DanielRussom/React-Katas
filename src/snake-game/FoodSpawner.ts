import { EmptySpace } from "./Constants";
import Position from "./Position";
import { Random } from "./Random";

export class FoodSpawner {
    pickFoodPosition(grid : string[][]): Position {  
        const randomizer = new Random();

        let validPositions = this.getValidPositions(grid);

        const result = randomizer.getNumberBelowLimit(validPositions.length);
        return validPositions[result];
    }

    private getValidPositions(grid: string[][]): Position[] {
        let validPositions: Position[] = [];
        
        for (let row = 0; row < grid.length; row++) {
            validPositions = validPositions.concat(this.getValidPositionsInRow(grid, row));
        }

        return validPositions;
    }

    private getValidPositionsInRow(grid: string[][], rowIndex: number): Position[] {
        let validPositionsInRow : Position[] = [];

        for (let column = 0; column < grid[rowIndex].length; column++) {
            if (grid[rowIndex][column] !== EmptySpace) {
                continue;
            }

            const newPosition = new Position(column, rowIndex);
            validPositionsInRow.push(newPosition);
        }

        return validPositionsInRow;
    }
};