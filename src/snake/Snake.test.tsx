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

    it("has a game board with 1 row", () =>{
        render(<Snake height={1}/>);

        const rows = screen.getByTitle("GameBoard").childNodes;

        expect(rows.length).toEqual(1);
    });

    it("has a game board with 3 rows", () =>{
        render(<Snake height={3}/>);

        const rows = screen.getByTitle("GameBoard").childNodes;

        expect(rows.length).toEqual(3);
    });

    it("has a game board with 5 rows", () =>{
        render(<Snake/>);

        const rows = screen.getByTitle("GameBoard").childNodes;

        expect(rows.length).toEqual(5);
    });

});