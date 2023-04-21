import { render, screen, within } from "@testing-library/react";
import * as React from "react";
import { clickButton } from "../../testExtensions/screenTestExtensions";
import SnakeGame from "./SnakeGame";
import Position from "./Position";
import { FoodSpawner } from "./FoodSpawner";

jest.mock("./FoodSpawner");

describe("snake game", () => {
    beforeEach(() => {

        FoodSpawner.prototype.pickFoodPosition = jest.fn().mockImplementation(() => {
            return new Position(0, 0);
        });

    });

    describe("game board", () => {
        it("is a grid", () => {
            render(<SnakeGame />);

            const board = screen.getByTitle("GameBoard");

            expect(board).toHaveStyle("display: grid");
        });

        it.each([[
            1,
            3,
            5
        ]])
            ("has the expected row count", (expectedRows) => {
                render(<SnakeGame height={expectedRows} />);

                const rows = screen.getByTitle("GameBoard").childNodes;

                expect(rows.length).toEqual(expectedRows);
            });


        it.each([[
            1,
            2,
            3
        ]])("has the expected column count", (expectedColumns) => {
            render(<SnakeGame width={expectedColumns} />);

            const firstRow = screen.getByTitle("GameBoard").childNodes[0];

            const columns = firstRow.childNodes;

            expect(columns.length).toEqual(expectedColumns);
        });
    });

    describe("snake", () => {
        it.each([
            [5, new Position(2, 2)],
            [6, new Position(2, 2)],
            [7, new Position(3, 3)]
        ])
            ("spawns in the middle of the game board", (gridSize, expectedPosition) => {
                render(<SnakeGame height={gridSize} width={gridSize} />);

                const expectedSnakeLocation = screen.getByTitle("GameBoard").getChildAt(expectedPosition);

                expect(expectedSnakeLocation).toHaveTextContent("Snake");
                expect(screen.getAllByText("Snake").length).toEqual(1);
            });

        it.each(
            [[5, 1, new Position(2, 1)],
            [5, 2, new Position(2, 0)],
            [7, 1, new Position(3, 2)]]
        )("moves forward to expected location", (gridSize, timesToMove, expectedPosition) => {

            render(<SnakeGame height={gridSize} width={gridSize} />);

            for (let i = 0; i < timesToMove; i++) {
                clickButton('Move');
            }

            const expectedSnakeLocation = screen.getByTitle("GameBoard").getChildAt(expectedPosition);

            expect(expectedSnakeLocation).toHaveTextContent("Snake");
            expect(screen.getAllByText("Snake").length).toEqual(1);
        });

        it.each([
            [1, new Position(3, 2)],
            [2, new Position(3, 3)],
            [3, new Position(2, 3)],
            [4, new Position(2, 2)],
            [5, new Position(3, 2)]
        ])
            ("turns right", (times, expectedPosition) => {
                render(<SnakeGame height={5} width={5} />);

                for (let i = 0; i < times; i++) {
                    clickButton('>');
                }

                const expectedSnakeLocation = screen.getByTitle("GameBoard").getChildAt(expectedPosition);

                expect(expectedSnakeLocation).toHaveTextContent("Snake");
                expect(screen.getAllByText("Snake").length).toEqual(1);
            });

        it.each([
            [1, new Position(4, 2)],
            [2, new Position(3, 4)],
            [3, new Position(1, 3)],
        ])
            ("turns right and then forward", (times, expectedPosition) => {
                render(<SnakeGame height={5} width={5} />);

                for (let i = 0; i < times; i++) {
                    clickButton('>');
                }
                clickButton('Move');

                const expectedSnakeLocation = screen.getByTitle("GameBoard").getChildAt(expectedPosition);

                expect(expectedSnakeLocation).toHaveTextContent("Snake");
                expect(screen.getAllByText("Snake").length).toEqual(1);
            });


        it("moves right and then forward twice", () => {
            render(<SnakeGame height={7} width={7} />);

            clickButton('>');
            clickButton('Move');
            clickButton('Move');

            const middleRow = screen.getByTitle("GameBoard").childNodes[3];
            const snakeColumn = middleRow.childNodes[6];

            const snake = snakeColumn;

            expect(snake).toHaveTextContent("Snake");
            expect(screen.getAllByText("Snake").length).toEqual(1);
        });

        it.each([
            [1, new Position(1, 2)],
            [2, new Position(1, 3)],
            [3, new Position(2, 3)],
            [4, new Position(2, 2)],
            [5, new Position(1, 2)]
        ])
            ("turns left", (times, expectedPosition) => {
                render(<SnakeGame height={5} width={5} />);

                for (let i = 0; i < times; i++) {
                    clickButton('<');
                }

                const expectedSnakePosition = screen.getByTitle("GameBoard").getChildAt(expectedPosition);

                expect(expectedSnakePosition).toHaveTextContent("Snake");
                expect(screen.getAllByText("Snake").length).toEqual(1);
            });

    });

    describe("Food", () => {
        it("exists in the grid", () => {
            render(<SnakeGame height={7} width={7} />);

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

                render(<SnakeGame height={7} width={7} />);

                const expectedFoodLocation = screen.getByTitle("GameBoard").getChildAt(expectedPosition);

                expect(expectedFoodLocation).toHaveTextContent("Food");
                expect(screen.getAllByText("Food").length).toEqual(1);

                expect(pickedFoodFunction).toHaveBeenCalledTimes(1);
            });

        // Food respawns after snake collides with it
    });
});