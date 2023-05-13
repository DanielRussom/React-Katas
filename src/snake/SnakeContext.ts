import { createContext } from "react";
import { Snake } from "./Snake";

export const SnakeContext = createContext<{snake: Snake, setSnake: Function}>(undefined!);