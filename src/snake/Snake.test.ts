import Position from "./Position";
import { Snake } from "./Snake";

describe("snake game", () => {
    it("starts in the expected location", () => {
        const expectedPosition = new Position(2,2);

        const snake = new Snake(expectedPosition);
        const actualPosition = snake.position;

        expect(actualPosition).toEqual(expectedPosition);
    });

    it("moves forward once", () => {
        const expectedPosition = new Position(2,1);

        const snake = new Snake(new Position(2,2));
        
        snake.move()
        const actualPosition = snake.position;

        expect(actualPosition).toEqual(expectedPosition);
    });
});