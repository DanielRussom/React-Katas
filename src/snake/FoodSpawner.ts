import Position from "./Position";
import { Random } from "./Random";

export class FoodSpawner {
    pickFoodPosition(grid : string[][]): Position {  
        const randomizer = new Random();

        let validPositions: Position[] = [];

        for(let i = 0; i < grid.length; i++){
            for(let j = 0; j < grid[i].length; j++){
                if(grid[i][j] !== ""){
                    continue;
                }
                const newPosition = new Position(j, i); 
                validPositions.push(newPosition);
            }
        }

        const result = randomizer.getNumberBelowLimit(validPositions.length);

        return new Position(0,result);
    }
};