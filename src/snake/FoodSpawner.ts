import Position from "./Position";
import { Random } from "./Random";

export class FoodSpawner {
    pickFoodPosition(grid : string[][]): Position {  
        const randomizer = new Random();

        let randomLimit = grid[0].length;

        if(grid.length > 1){
            randomLimit += grid[1].length;
        }

        const result = randomizer.getNumber(randomLimit);

        return new Position(0,result);
    }
};