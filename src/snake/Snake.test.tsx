import { render, screen } from "@testing-library/react";
import * as React from "react";
import { clickButton, getButton } from "../../testExtensions/screenTestExtensions";
import SnakeGame from "./SnakeGame";

describe("snake game", () => {
    it("has a left button", () => {
        render(<SnakeGame />);

        expect(getButton('<')).toBeInTheDocument();
    });

    it("has a right button", () => {
        render(<SnakeGame />);

        expect(getButton('>')).toBeInTheDocument();
    });

    it("has a move button", () => {
        render(<SnakeGame />);

        expect(getButton('Move')).toBeInTheDocument();
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

    it.each([
        [5, 2],
        [6, 2],
        [7, 3]
    ])
        ("has a snake in the middle of a grid", (gridSize, snakeLocation) => {
            render(<SnakeGame height={gridSize} width={gridSize} />);

            const middleRow = screen.getByTitle("GameBoard").childNodes[snakeLocation];
            const middleColumn = middleRow.childNodes[snakeLocation];

            const snake = middleColumn;

            expect(snake).toHaveTextContent("Snake");
            expect(screen.getAllByText("Snake").length).toEqual(1);
        });

    it("makes the snake's first move in a 5x5 grid", () => {
        render(<SnakeGame height={5} width={5} />);

        clickButton('Move');

        const middleRow = screen.getByTitle("GameBoard").childNodes[1];
        const middleColumn = middleRow.childNodes[2];

        const snake = middleColumn;

        expect(snake).toHaveTextContent("Snake");
        expect(screen.getAllByText("Snake").length).toEqual(1);
    });

    it("makes the snake's first move in a 7x7 grid", () => {
        render(<SnakeGame height={7} width={7} />);

        clickButton('Move');

        const snakeRow = screen.getByTitle("GameBoard").childNodes[2];
        const middleColumn = snakeRow.childNodes[3];

        const snake = middleColumn;

        expect(snake).toHaveTextContent("Snake");
        expect(screen.getAllByText("Snake").length).toEqual(1);
    });

    it("moves the snake twice", () => {
        render(<SnakeGame height={5} width={5} />);

        clickButton('Move');
        clickButton('Move');

        const snakeRow = screen.getByTitle("GameBoard").childNodes[0];
        const middleColumn = snakeRow.childNodes[2];

        const snake = middleColumn;

        expect(snake).toHaveTextContent("Snake");
        expect(screen.getAllByText("Snake").length).toEqual(1);
    });

    it("moves the snake right", () => {
        render(<SnakeGame height={5} width={5} />);

        clickButton('>');

        const middleRow = screen.getByTitle("GameBoard").childNodes[2];
        const snakeColumn = middleRow.childNodes[3];

        const snake = snakeColumn;

        expect(snake).toHaveTextContent("Snake");
        expect(screen.getAllByText("Snake").length).toEqual(1);
    });

    it("moves the snake right and forward", () => {
        render(<SnakeGame height={5} width={5} />);

        clickButton('>');
        clickButton('Move');

        const middleRow = screen.getByTitle("GameBoard").childNodes[2];
        const snakeColumn = middleRow.childNodes[4];

        const snake = snakeColumn;

        expect(snake).toHaveTextContent("Snake");
        expect(screen.getAllByText("Snake").length).toEqual(1);
    });

    it("moves the snake right then forward twice", () => {
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

    it("moves the snake right twice", () => {
        render(<SnakeGame height={5} width={5} />);

        clickButton('>');
        clickButton('>');

        const snakeRow = screen.getByTitle("GameBoard").childNodes[3];
        const snakeColumn = snakeRow.childNodes[3];

        const snake = snakeColumn;

        expect(snake).toHaveTextContent("Snake");
        expect(screen.getAllByText("Snake").length).toEqual(1);
    });

    it("moves the snake right three times", () => {
        render(<SnakeGame height={5} width={5} />);

        clickButton('>');
        clickButton('>');
        clickButton('>');

        const snakeRow = screen.getByTitle("GameBoard").childNodes[3];
        const snakeColumn = snakeRow.childNodes[2];

        const snake = snakeColumn;

        expect(snake).toHaveTextContent("Snake");
        expect(screen.getAllByText("Snake").length).toEqual(1);
    });

});