import Position from "./Position";
import { Random } from "./Random";

export class FoodSpawner {
    pickFoodPosition(grid : string[][]): Position {  
        const randomizer = new Random();

        let validPositions = this.getValidPositions(grid);

        const result = randomizer.getNumberBelowLimit(validPositions.length);

        return new Position(0,result);
    }

    private getValidPositions(grid: string[][]): Position[] {
        let validPositions: Position[] = [];
        
        for (let i = 0; i < grid.length; i++) {
            validPositions = validPositions.concat(this.getValidPositionsInRow(grid, i));
        }

        return validPositions;
    }

    private getValidPositionsInRow(grid: string[][], i: number): Position[] {
        let validPositionsInRow : Position[] = [];

        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] !== "") {
                continue;
            }
            
            const newPosition = new Position(j, i);
            validPositionsInRow.push(newPosition);
        }

        return validPositionsInRow;
    }
};