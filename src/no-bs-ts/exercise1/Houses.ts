// import * as fs from "fs";

interface House {
  //TODO
}

interface HouseWithID {
  //TODO
}

function findHouses(houses: string): HouseWithID[] {
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
