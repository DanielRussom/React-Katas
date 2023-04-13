import { render } from "@testing-library/react";
import SnakeGame from "./SnakeGame";
import * as React from "react";

describe("snake eating food feature", () => {
    it("should increase the snake's length and have the snake in the expected position", () => {
        render(<SnakeGame height={7} width={7} />);

        // Set food location

        // Move snake to food



        // Check snake is longer
        // Check snake is in expected positions
    });
});