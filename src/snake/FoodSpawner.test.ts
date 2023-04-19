import { FoodSpawner } from "./FoodSpawner";
import Position from "./Position";
import { Random } from "./Random";

jest.mock("./Random");


describe("Food spawner", () => {
    beforeEach(() => {

        Random.prototype.getNumberBelowLimit = jest.fn().mockImplementation(() => {
            return 0;
        });

    });
    it("picks 0,0", () => {
        const spawner = new FoodSpawner();

        const input = [[""]];
        const result = spawner.pickFoodPosition(input)

        expect(result).toEqual(new Position(0, 0));
    });

    it.each([
        [[["", ""]], 2],
        [[["", "", ""]], 3],
        [[[""],[""]], 2],
        [[[""],[""],[""]], 3]
    ])
    ("picks a position from the expected range", (input, expectedRange) => {

        const randomFunction = jest.fn().mockImplementationOnce(() => {
            return 1;
        });

        Random.prototype.getNumberBelowLimit = randomFunction;

        const spawner = new FoodSpawner();

        const result = spawner.pickFoodPosition(input)

        expect(result).toEqual(new Position(0, 1));
        expect(randomFunction).toHaveBeenCalledWith(expectedRange);
    });

    it("picks an empty position", () => {
        
        const randomFunction = jest.fn().mockImplementationOnce(() => {
            return 1;
        });

        Random.prototype.getNumberBelowLimit = randomFunction;

        const spawner = new FoodSpawner();

        const result = spawner.pickFoodPosition([["Snake", ""]])
        expect(randomFunction).toHaveBeenCalledWith(1);
        expect(result).toEqual(new Position(0, 1));
    });
});