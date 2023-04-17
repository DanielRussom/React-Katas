import { FoodSpawner } from "./FoodSpawner";
import Position from "./Position";
import { Random } from "./Random";

jest.mock("./Random");


describe("Food spawner", () => {
    beforeEach(() => {

        Random.prototype.getNumber = jest.fn().mockImplementation(() => {
            return 0;
        });

    });
    it("picks 0,0", () => {
        const spawner = new FoodSpawner();

        const input = [[""]];
        const result = spawner.pickFoodPosition(input)
        
        expect(result).toEqual(new Position(0,0));
    });

    it("picks 0,1", () => {

        const randomFunction = jest.fn().mockImplementationOnce(() => {
            return 1;
        });

        Random.prototype.getNumber = randomFunction;

        const spawner = new FoodSpawner();

        const input = [["", ""]];
        const result = spawner.pickFoodPosition(input)
        
        expect(result).toEqual(new Position(0,1));
        expect(randomFunction).toHaveBeenCalledTimes(1);
        
        expect(randomFunction).toHaveBeenCalledWith(2);
    });


    it("picks a position from 0-2", () => {
        const randomFunction = jest.fn().mockImplementationOnce(() => {
            return 0;
        });

        Random.prototype.getNumber = randomFunction;

        const spawner = new FoodSpawner();

        const input = [["", "", ""]];
        spawner.pickFoodPosition(input)
        
        expect(randomFunction).toHaveBeenCalledTimes(1);
        
        expect(randomFunction).toHaveBeenCalledWith(3);
    })
});