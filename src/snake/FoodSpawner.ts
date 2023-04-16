import Position from "./Position";
import { Random } from "./Random";

export class FoodSpawner {
    pickFoodPosition(grid : string[][]): Position {  
        const randomizer = new Random();

        const result = randomizer.getNumber(1);

        return new Position(0,result);
    }
};