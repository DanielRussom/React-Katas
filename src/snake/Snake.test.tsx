import { render, screen } from "@testing-library/react";
import * as React from "react";
import Snake from "./Snake";

describe("snake game", () => {
    it("has a left button", () =>{
        render(<Snake/>);

        const leftButton = screen.getByRole('button', { name: "<" });

        expect(leftButton).toBeInTheDocument();
    });

    it("has a right button", () =>{
        render(<Snake/>);

        const rightButton = screen.getByRole('button', { name: ">" });

        expect(rightButton).toBeInTheDocument();
    });
});