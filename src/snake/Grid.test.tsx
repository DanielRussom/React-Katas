import { render, screen } from "@testing-library/react";
import Grid from "./Grid";
import * as React from "react";
import Position from "./Position";

describe("game board", () => {
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
});