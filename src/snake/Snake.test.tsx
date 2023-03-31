import { render, screen, within } from "@testing-library/react";
import * as React from "react";
import { getButton } from "../../testExtensions/screenTestExtensions";
import Snake from "./Snake";

describe("snake game", () => {
    it("has a left button", () =>{
        render(<Snake/>);

        expect(getButton('<')).toBeInTheDocument();
    });

    it("has a right button", () =>{
        render(<Snake/>);

        expect(getButton('>')).toBeInTheDocument();
    });

    it("has a move button", () =>{
        render(<Snake/>);

        expect(getButton('Move')).toBeInTheDocument();
    });

    it("has a game board", () =>{
        render(<Snake/>);

        const board = screen.getByTitle("GameBoard");

        expect(board).toHaveStyle("display: grid");
    });

    it.each([[
        1,
        3,
        5
    ]])
    ("has a game board with expected row count", (expectedRows) =>{
        render(<Snake height={expectedRows}/>);

        const rows = screen.getByTitle("GameBoard").childNodes;

        expect(rows.length).toEqual(expectedRows);
    });
    

    it("has a game board with one column", () =>{
        render(<Snake />);

        const rows = screen.getByTitle("GameBoard").childNodes;

        const columns = rows[0].childNodes;

        expect(columns.length).toEqual(1);
    });

});