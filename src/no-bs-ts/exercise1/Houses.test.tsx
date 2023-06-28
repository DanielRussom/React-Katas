import houses from "./houseData";
import * as houseFinder from "./Houses";

describe("Houses", () => {
  it("finds a house", () => {
    const firstHouse = houses[0];
    const expectedHouses = [
      { Id: 1, Name: firstHouse.name, Planets: firstHouse.planets },
    ];

    const result = houseFinder.findHouses(JSON.stringify(firstHouse));

    expect(result).toEqual(expectedHouses);
  });
});
