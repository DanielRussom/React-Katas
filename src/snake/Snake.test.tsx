import { render, screen } from "@testing-library/react";
import * as React from "react";
import { getButton } from "../../testExtensions/screenTestExtensions";
import Snake from "./Snake";

describe("snake game", () => {
    it("has a left button", () => {
        render(<Snake/>);

        expect(getButton('<')).toBeInTheDocument();
    });

    it("has a right button", () => {
        render(<Snake/>);

        expect(getButton('>')).toBeInTheDocument();
    });

    it("has a move button", () => {
        render(<Snake/>);

        expect(getButton('Move')).toBeInTheDocument();
    });

    it("has a game board", () => {
        render(<Snake/>);

        const board = screen.getByTitle("GameBoard");

        expect(board).toHaveStyle("display: grid");
    });

    it.each([[
        1,
        3,
        5
    ]])
    ("has a game board with the expected row count", (expectedRows) => {
        render(<Snake height={expectedRows}/>);

        const rows = screen.getByTitle("GameBoard").childNodes;

        expect(rows.length).toEqual(expectedRows);
    });
    

    it.each([[
        1,
        2,
        3
    ]])("has a game board with the expected column count", (expectedColumns) => {
        render(<Snake width={expectedColumns} />);

        const firstRow = screen.getByTitle("GameBoard").childNodes[0];

        const columns = firstRow.childNodes;

        expect(columns.length).toEqual(expectedColumns);
    });

    it.each([
        [5, 2],
        [6, 2],
        [7, 3]
    ])
    ("has a snake in the middle of a grid", (gridSize, snakeLocation) => {
        render(<Snake height={gridSize} width={gridSize}/>);

        const middleRow = screen.getByTitle("GameBoard").childNodes[snakeLocation];
        const middleColumn = middleRow.childNodes[snakeLocation];

        const snake = middleColumn;

        expect(snake).toHaveTextContent("Snake");
        expect(screen.getAllByText("Snake").length).toEqual(1);
    });
});