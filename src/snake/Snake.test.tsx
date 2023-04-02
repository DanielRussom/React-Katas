import { render, screen, within } from "@testing-library/react";
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

    it("has a snake in the middle of a 5x5 grid", () => {
        render(<Snake/>);

        const middleRow = screen.getByTitle("GameBoard").childNodes[2];
        const middleColumn = middleRow.childNodes[2];

        const snake = middleColumn;

        expect(snake).toHaveTextContent("Snake");
        expect(screen.getAllByText("Snake").length).toEqual(1);
    });

    it("has a snake in the middle of a 7x7 grid", () => {
        render(<Snake height={7} width={7}/>);

        const middleRow = screen.getByTitle("GameBoard").childNodes[3];
        const middleColumn = middleRow.childNodes[3];

        const snake = middleColumn;

        expect(snake).toHaveTextContent("Snake");
        expect(screen.getAllByText("Snake").length).toEqual(1);
    });
});