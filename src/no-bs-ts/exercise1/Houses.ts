// import * as fs from "fs";

export interface House {
  //TODO
}

export interface HouseWithID {
  //TODO
}

export function findHouses(houses: string): HouseWithID[] {
  return [{ Id: 1, Name: "Atreides", Planets: "Calladan" }];
  // const jsonString = fs.readFileSync("./houses.json", "utf-8");
  // const jsonData = JSON.parse(jsonString);
}

// function findHouses(
//   houses: string,
//   filter: (house: House) => boolean
// ): HouseWithID[];

// function findHouses(houses: House[]): HouseWithID[];

// function findHouses(
//   houses: House[],
//   filter: (house: House) => boolean
// ): HouseWithID[];

//EXAMPLE TEST
// console.log(
//   findHouses(JSON.stringify(houses), ({ name }) => name === "Atreides")
// );

// console.log(findHouses(houses, ({ name }) => name === "Harkonnen"));
