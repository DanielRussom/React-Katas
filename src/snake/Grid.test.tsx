import { render, screen, within } from "@testing-library/react";
import Grid from "./Grid";
import * as React from "react";
import Position from "./Position";
import { FoodSpawner } from "./FoodSpawner";
import "../../testExtensions/screenTestExtensions";
import { FoodToken, SnakeToken } from "./Constants";
import { Snake } from "./Snake";
import { SnakeContext } from "./SnakeGame";

jest.mock("./FoodSpawner");

let feedSnakeFunction: Function;

describe("game board", () => {
    it("does", () => {
      expect(true).toBeTruthy();
    });
    beforeEach(() => {
        FoodSpawner.prototype.pickFoodPosition = jest.fn().mockImplementation(() => {
            return new Position(0, 0);
        });

        feedSnakeFunction = jest.fn();
    });

    it("is a grid", () => {
        render(<SnakeContext.Provider value={{snake: new Snake(new Position(2,2)), setSnake: () => {}}}><Grid height={5} width={5}/></SnakeContext.Provider>);

        const board = screen.getByTitle("GameBoard");

        expect(board).toHaveStyle("display: grid");
    });

    it.each([[
        1,
        3,
        5
    ]])
        ("has the expected row count", (expectedRows) => {
            render(<SnakeContext.Provider value={{snake: new Snake(new Position(0,0)), setSnake: () => {}}}><Grid height={expectedRows} width={5}/></SnakeContext.Provider>);

            const rows = screen.getByTitle("GameBoard").childNodes;

            expect(rows.length).toEqual(expectedRows);
        });

    it.each([[
        1,
        2,
        3
    ]])("has the expected column count", (expectedColumns) => {
        render(<SnakeContext.Provider value={{snake: new Snake(new Position(0,0)), setSnake: () => {}}}><Grid height={5} width={expectedColumns}/></SnakeContext.Provider>);

        const firstRow = screen.getByTitle("GameBoard").childNodes[0];

        const columns = firstRow.childNodes;

        expect(columns.length).toEqual(expectedColumns);
    });

    it("populates the snake in the expected location", () => {
        const snakePosition = new Position(2, 2);
        render(<SnakeContext.Provider value={{snake: new Snake(snakePosition), setSnake: () => {}}}><Grid height={5} width={5}/></SnakeContext.Provider>);

        const expectedSnakeLocation = screen.getByTitle("GameBoard").getChildAt(snakePosition);

        expect(expectedSnakeLocation).toHaveTextContent(SnakeToken);
        expect(screen.getAllByText(SnakeToken).length).toEqual(1);
    });

    //TODO Review value of this test
    it.skip("repopulates the snake in the expected location", () => {
        const snakePosition = new Position(2, 2);
        const { rerender } = render(<Grid height={7} width={7} />); // Position 3,3
        rerender(<Grid height={7} width={7}/>); // Position 2,2

        const expectedSnakeLocation = screen.getByTitle("GameBoard").getChildAt(snakePosition);

        expect(expectedSnakeLocation).toHaveTextContent(SnakeToken);
        expect(screen.getAllByText(SnakeToken).length).toEqual(1);
        expect(feedSnakeFunction).toBeCalledTimes(0);
    });

    describe("Food", () => {
        it("exists in the grid", () => {
            render(<SnakeContext.Provider value={{snake: new Snake(new Position(2,2)), setSnake: () => {}}}><Grid height={5} width={5}/></SnakeContext.Provider>);

            const gameBoard = screen.getByTitle("GameBoard");
            const food = within(gameBoard).getByText(FoodToken);

            expect(food).toBeInTheDocument();
        });

        it.each([
            [new Position(1, 1)],
            [new Position(3, 4)],
            [new Position(6, 6)]
        ])
            ("exists in the expected location", (expectedPosition) => {
                const pickedFoodFunction = jest.fn().mockImplementationOnce(() => {
                    return expectedPosition;
                });

                FoodSpawner.prototype.pickFoodPosition = pickedFoodFunction;

                render(<SnakeContext.Provider value={{snake: new Snake(new Position(3,3)), setSnake: () => {}}}><Grid height={7} width={7}/></SnakeContext.Provider>);

                const expectedFoodLocation = screen.getByTitle("GameBoard").getChildAt(expectedPosition);

                expect(expectedFoodLocation).toHaveTextContent(FoodToken);
                expect(screen.getAllByText(FoodToken).length).toEqual(1);

                expect(pickedFoodFunction).toHaveBeenCalledTimes(1);
            });

        it("respawns after being eaten", () => {
            const pickedFoodFunction = jest.fn().mockImplementationOnce(() => {
                return new Position(1, 1);
            }).mockImplementationOnce(() => {
                return new Position(0, 0);
            });

            FoodSpawner.prototype.pickFoodPosition = pickedFoodFunction;
            const { rerender } = render(<SnakeContext.Provider value={{snake: new Snake(new Position(3,3)), setSnake: () => {}}}><Grid height={7} width={7}/></SnakeContext.Provider>);

            let expectedFoodLocation = screen.getByTitle("GameBoard").getChildAt(new Position(1, 1));

            expect(expectedFoodLocation).toHaveTextContent(FoodToken);
            expect(screen.getAllByText(FoodToken).length).toEqual(1);

            rerender(<SnakeContext.Provider value={{snake: new Snake(new Position(1,1)), setSnake: () => {}}}><Grid height={7} width={7}/></SnakeContext.Provider>);
            expectedFoodLocation = screen.getByTitle("GameBoard").getChildAt(new Position(0, 0));

            expect(expectedFoodLocation).toHaveTextContent(FoodToken);
            expect(screen.getAllByText(FoodToken).length).toEqual(1);
        });
        
        //TODO Do we still want this as well?
        it.skip("calls feed snake method", () => {
            const pickedFoodFunction = jest.fn().mockImplementationOnce(() => {
                return new Position(1, 1);
            }).mockImplementationOnce(() => {
                return new Position(0, 0);
            });

            FoodSpawner.prototype.pickFoodPosition = pickedFoodFunction;
            const { rerender } = render(<SnakeContext.Provider value={{snake: new Snake(new Position(3,3)), setSnake: () => {}}}><Grid height={7} width={7}/></SnakeContext.Provider>);

            rerender(<SnakeContext.Provider value={{snake: new Snake(new Position(1,1)), setSnake: () => {}}}><Grid height={7} width={7}/></SnakeContext.Provider>);
            
            expect(feedSnakeFunction).toBeCalledTimes(1);
        })
   });
});