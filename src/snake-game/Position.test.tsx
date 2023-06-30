import Position from "./Position";

describe("Position", () => {
  it("is equal", () => {
    let originalPosition = new Position(1, 1);

    expect(originalPosition.equals(new Position(1, 1))).toBe(true);
  });

  it.each([
    [1, 2],
    [2, 1],
  ])("is not equal", (x, y) => {
    let originalPosition = new Position(1, 1);

    expect(originalPosition.equals(new Position(x, y))).toBe(false);
  });

  it.each([
    
  ])("is out of bounds", () => {

  }
});
