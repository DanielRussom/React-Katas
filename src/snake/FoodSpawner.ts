import Position from "./Position";
import { Random } from "./Random";

export class FoodSpawner {
    pickFoodPosition(grid : string[][]): Position {  
        const randomizer = new Random();

        const result = randomizer.getNumber(grid[0].length);

        return new Position(0,result);
    }
};