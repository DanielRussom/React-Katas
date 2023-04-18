import Position from "./Position";
import { Random } from "./Random";

export class FoodSpawner {
    pickFoodPosition(grid : string[][]): Position {  
        const randomizer = new Random();

        let randomLimit = 0;

        for(let i = 0; i < grid.length; i++){
            randomLimit += grid[i].length;
        }

        const result = randomizer.getNumber(randomLimit);

        return new Position(0,result);
    }
};