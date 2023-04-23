import { render, screen, within } from "@testing-library/react";
import Grid from "./Grid";
import * as React from "react";
import Position from "./Position";
import { FoodSpawner } from "./FoodSpawner";
import "../../testExtensions/screenTestExtensions";

jest.mock("./FoodSpawner");

describe("game board", () => {
    beforeEach(() => {
        FoodSpawner.prototype.pickFoodPosition = jest.fn().mockImplementation(() => {
            return new Position(0, 0);
        });
    });

    it("is a grid", () => {
        render(<Grid height={5} width={5} snakeLocation={new Position(2, 2)} />);

        const board = screen.getByTitle("GameBoard");

        expect(board).toHaveStyle("display: grid");
    });

    it.each([[
        1,
        3,
        5
    ]])
        ("has the expected row count", (expectedRows) => {
            render(<Grid height={expectedRows} width={5} snakeLocation={new Position(0, 0)} />);

            const rows = screen.getByTitle("GameBoard").childNodes;

            expect(rows.length).toEqual(expectedRows);
        });

    it.each([[
        1,
        2,
        3
    ]])("has the expected column count", (expectedColumns) => {
        render(<Grid height={5} width={expectedColumns} snakeLocation={new Position(0, 0)} />);

        const firstRow = screen.getByTitle("GameBoard").childNodes[0];

        const columns = firstRow.childNodes;

        expect(columns.length).toEqual(expectedColumns);
    });
    
    describe("Food", () => {
        it("exists in the grid", () => {
            render(<Grid height={7} width={7} snakeLocation={new Position(3, 3)}/>);

            const gameBoard = screen.getByTitle("GameBoard");
            const food = within(gameBoard).getByText("Food");

            expect(food).toBeInTheDocument();
        });

        it.each([
            [new Position(1, 1)],
            [new Position(3, 4)],
            [new Position(6, 6)]
        ])
            ("exists in the expected location", (expectedPosition) => {
                const pickedFoodFunction = jest.fn().mockImplementationOnce(() => {
                    return expectedPosition;
                });

                FoodSpawner.prototype.pickFoodPosition = pickedFoodFunction;

                render(<Grid height={7} width={7} snakeLocation={new Position(3, 3)}/>);

                const expectedFoodLocation = screen.getByTitle("GameBoard").getChildAt(expectedPosition);

                expect(expectedFoodLocation).toHaveTextContent("Food");
                expect(screen.getAllByText("Food").length).toEqual(1);

                expect(pickedFoodFunction).toHaveBeenCalledTimes(1);
            });

        // Food respawns after snake collides with it
    });
});