import { createContext } from "react";
import { Snake } from "./snake/Snake";

export const SnakeContext = createContext<{snake: Snake, killSnake: Function}>(undefined!);