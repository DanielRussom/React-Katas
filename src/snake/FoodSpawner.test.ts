import { FoodSpawner } from "./FoodSpawner";
import Position from "./Position";


describe("Food spawner", () => {
    it("picks 0,0", () => {
        const spawner = new FoodSpawner();

        const input = [[""]];
        const result = spawner.pickFoodPosition(input)
        
        expect(result).toEqual(new Position(0,0));
    });

});