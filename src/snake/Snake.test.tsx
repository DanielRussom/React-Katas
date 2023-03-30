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

        expect(board).toHaveClass("gameBoard");
    });

    it("has a single snake square", () =>{
        render(<Snake/>);

        const board = screen.getByTitle("GameBoard");
        const snake = within(board).getByTestId("snake");

        expect(snake).toHaveStyle("gridColumn: 11");
        expect(snake).toHaveStyle("gridRow: 11");
    });
});