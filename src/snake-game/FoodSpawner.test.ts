import { EmptySpace, SnakeToken } from "./Constants";
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

    const input = [[EmptySpace]];
    const result = spawner.pickFoodPosition(input);

    expect(result).toEqual(new Position(0, 0));
  });

  it.each([
    [[[EmptySpace, EmptySpace]], 2],
    [[[EmptySpace, EmptySpace, EmptySpace]], 3],
    [[[EmptySpace], [EmptySpace]], 2],
    [[[EmptySpace], [EmptySpace], [EmptySpace]], 3],
  ])("picks a position from the expected range", (input, expectedRange) => {
    const randomFunction = jest.fn().mockImplementationOnce(() => {
      return 1;
    });

    Random.prototype.getNumberBelowLimit = randomFunction;

    const spawner = new FoodSpawner();

    spawner.pickFoodPosition(input);

    expect(randomFunction).toHaveBeenCalledWith(expectedRange);
  });

  it("picks an empty position", () => {
    const randomFunction = jest.fn().mockImplementationOnce(() => {
      return 0;
    });

    Random.prototype.getNumberBelowLimit = randomFunction;

    const spawner = new FoodSpawner();

    const result = spawner.pickFoodPosition([[SnakeToken, EmptySpace]]);
    expect(randomFunction).toHaveBeenCalledWith(1);
    expect(result).toEqual(new Position(1, 0));
  });

  it("picks 1,1", () => {
    const randomFunction = jest.fn().mockImplementationOnce(() => {
      return 3;
    });

    Random.prototype.getNumberBelowLimit = randomFunction;

    const spawner = new FoodSpawner();

    const result = spawner.pickFoodPosition([
      [EmptySpace, EmptySpace],
      [EmptySpace, EmptySpace],
    ]);

    expect(result).toEqual(new Position(1, 1));
  });
});
