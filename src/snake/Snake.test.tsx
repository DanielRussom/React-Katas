import { render } from "@testing-library/react";
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
});