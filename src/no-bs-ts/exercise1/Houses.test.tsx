import * as fs from "fs";

describe("Houses", () => {
  it("finds a house", () => {
    let thing = fs.readFileSync("./houses.json", "utf-8");
    console.warn(thing);
  });
});
