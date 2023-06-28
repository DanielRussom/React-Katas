import houses from "./houseData";
import * as houseFinder from "./Houses";

describe("Houses", () => {
  it.each([0, 1])("finds a single house", (houseIndex) => {
    const house = houses[houseIndex];
    const expectedFoundHouses = [
      { Id: 1, Name: house.name, Planets: house.planets },
    ];

    const result = houseFinder.findHouses(JSON.stringify(house));

    expect(result).toEqual(expectedFoundHouses);
  });
});
