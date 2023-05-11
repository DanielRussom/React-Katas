import * as React from 'react';
import { Suspense, createContext, lazy, useState } from 'react';
import './App.css';
import StackExercise from './stack-exercise/StackExercise';
import SnakeGame from './snake/SnakeGame';
import { Snake } from './snake/Snake';
import Position from './snake/Position';

const TreeGenerator = lazy(() => import('./tree-generator/TreeGenerator'))

export const SnakeContext = createContext<{snake: Snake, setSnake: Function}>(undefined!);
function App() { 

  //TODO Wrap SnakeGame's Ui with a "SnakeGameControls"??? Take this out of App
  const height = 5;
  const width = 5;

  function getInitialSnakePosition(): Position {
    const xPosition = Math.round(width / 2) - 1;
    const yPosition = Math.round(height / 2) - 1;

    return new Position(xPosition, yPosition);        
}
  const [snake, setSnake] = useState(new Snake(getInitialSnakePosition()))
  // const value = {snake: snake, setSnake: setSnake};
  const [displayedComponent, setDisplayedComponent] = useState<JSX.Element>(<SnakeContext.Provider value={{snake: snake, setSnake: setSnake}}>
    <SnakeGame />
  </SnakeContext.Provider>);

  React.useEffect(() => {
    console.log('Snake updated', snake.positions)
  }, [snake])


  return (
    <div className="App">
      <Suspense fallback={<h1>Loading...</h1>}>
        <button onClick={() => setDisplayedComponent(<TreeGenerator />)}>Christmas Tree Generator</button>
        <button onClick={() => setDisplayedComponent(<StackExercise />)}>Stack Exercise</button>
        <button onClick={() => setDisplayedComponent(<SnakeContext.Provider value={{snake: snake, setSnake: setSnake}}>
            <SnakeGame />
          </SnakeContext.Provider>)}>Snake</button>

        <div data-testid="component-container">
          <SnakeContext.Provider value={{snake: snake, setSnake: setSnake}}>
    <SnakeGame />
  </SnakeContext.Provider>
        </div>
      </Suspense>
    </div>
  );
}

export default App;
