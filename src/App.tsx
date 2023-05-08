import * as React from 'react';
import { Suspense, createContext, lazy, useState } from 'react';
import './App.css';
import StackExercise from './stack-exercise/StackExercise';
import SnakeGame from './snake/SnakeGame';
import { Snake } from './snake/Snake';
import Position from './snake/Position';

const TreeGenerator = lazy(() => import('./tree-generator/TreeGenerator'))

export const SnakeContext = createContext<{snake: Snake, setSnake: Function}>({snake: new Snake(new Position(0,0)), setSnake: () => {}});
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
  const value = {snake: snake, setSnake: setSnake};
  const [displayedComponent, setDisplayedComponent] = useState<JSX.Element>();


  return (
    <div className="App">
      <Suspense fallback={<h1>Loading...</h1>}>
        <button onClick={() => setDisplayedComponent(<TreeGenerator />)}>Christmas Tree Generator</button>
        <button onClick={() => setDisplayedComponent(<StackExercise />)}>Stack Exercise</button>
        <button onClick={() => setDisplayedComponent(<SnakeContext.Provider value={value}><SnakeGame /></SnakeContext.Provider>)}>Snake</button>

        <div data-testid="component-container">
          {displayedComponent}
        </div>
      </Suspense>
    </div>
  );
}

export default App;
