import { render, screen } from "@testing-library/react";
import Grid from "./Grid";
import * as React from "react";
import Position from "./Position";

describe("game board", () => {
    it("is a grid", () => {
        render(<Grid height={5} width={5} snakeLocation={new Position(2,2)}/>);

        const board = screen.getByTitle("GameBoard");

        expect(board).toHaveStyle("display: grid");
    });
    
});