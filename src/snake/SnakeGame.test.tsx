import { render, screen, within } from "@testing-library/react";
import * as React from "react";
import { clickButton, getButton } from "../../testExtensions/screenTestExtensions";
import SnakeGame from "./SnakeGame";
import Position from "./Position";

describe("snake game", () => {
    it("has a left button", () => {
        render(<SnakeGame />);

        expect(getButton('<')).toBeInTheDocument();
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
            [5, 2],
            [6, 2],
            [7, 3]
        ])
            ("spawns in the middle of the game board", (gridSize, snakeLocation) => {
                render(<SnakeGame height={gridSize} width={gridSize} />);

                const middleRow = screen.getByTitle("GameBoard").childNodes[snakeLocation];
                const middleColumn = middleRow.childNodes[snakeLocation];

                const snake = middleColumn;

                expect(snake).toHaveTextContent("Snake");
                expect(screen.getAllByText("Snake").length).toEqual(1);
            });

        it("moves forward once in a 5x5 grid", () => {
            render(<SnakeGame height={5} width={5} />);

            clickButton('Move');

            const middleRow = screen.getByTitle("GameBoard").childNodes[1];
            const middleColumn = middleRow.childNodes[2];

            const snake = middleColumn;

            expect(snake).toHaveTextContent("Snake");
            expect(screen.getAllByText("Snake").length).toEqual(1);
        });

        it("moves forward once in a 7x7 grid", () => {
            render(<SnakeGame height={7} width={7} />);

            clickButton('Move');

            const snakeRow = screen.getByTitle("GameBoard").childNodes[2];
            const middleColumn = snakeRow.childNodes[3];

            const snake = middleColumn;

            expect(snake).toHaveTextContent("Snake");
            expect(screen.getAllByText("Snake").length).toEqual(1);
        });

        it("moves forward twice in a 5x5 grid", () => {
            render(<SnakeGame height={5} width={5} />);

            clickButton('Move');
            clickButton('Move');

            const snakeRow = screen.getByTitle("GameBoard").childNodes[0];
            const middleColumn = snakeRow.childNodes[2];

            const snake = middleColumn;

            expect(snake).toHaveTextContent("Snake");
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

                const snakeRow = screen.getByTitle("GameBoard").childNodes[expectedPosition.yPosition];
                const snakeLocation = snakeRow.childNodes[expectedPosition.xPosition];

                expect(snakeLocation).toHaveTextContent("Snake");
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

                const snakeRow = screen.getByTitle("GameBoard").childNodes[expectedPosition.yPosition];
                const snakeLocation = snakeRow.childNodes[expectedPosition.xPosition];

                expect(snakeLocation).toHaveTextContent("Snake");
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
            [1, new Position(1, 2)]
        ])
            ("turns left", (times, expectedPosition) => {
                render(<SnakeGame height={5} width={5} />);

                for (let i = 0; i < times; i++) {
                    clickButton('<');
                }

                const snakeRow = screen.getByTitle("GameBoard").childNodes[expectedPosition.yPosition];
                const snakeLocation = snakeRow.childNodes[expectedPosition.xPosition];

                expect(snakeLocation).toHaveTextContent("Snake");
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

        // Food spawns randomly
        // Handle spawning in a different component? This way we can mock it out to make this test reliable

        // Food doesn't spawn on snake

        // Food respawns after snake collides with it
    });
});