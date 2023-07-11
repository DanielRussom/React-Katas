import { GridState } from "./GridState";

describe("GridState", () => {
  it.each([[5, 5], [2, 3], [15, 24]])("creates a gridState with the expected dimensions %s x %s", (expectedHeight, expectedWidth) => {
    const gridState = new GridState(expectedHeight, expectedWidth, []);
    
    expect(gridState.getGrid().length).toBe(expectedHeight);
    expect(gridState.getGrid()[0].length).toBe(expectedWidth);
  });
});
