import Position from "./Position";

describe("Position", () => {
  it("is equal", () => {
    let originalPosition = new Position(1, 1);

    expect(originalPosition.equals(new Position(1, 1))).toBe(true);
  });

  it("is not equal", () => {
    let originalPosition = new Position(1, 1);

    expect(originalPosition.equals(new Position(1, 2))).toBe(false);
  });
});
