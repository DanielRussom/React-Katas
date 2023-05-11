import * as React from 'react';
import { Suspense, createContext, lazy, useState } from 'react';
import './App.css';
import StackExercise from './stack-exercise/StackExercise';
import SnakeGame from './snake/SnakeGame';
import { Snake } from './snake/Snake';
import Position from './snake/Position';

const TreeGenerator = lazy(() => import('./tree-generator/TreeGenerator'))

function App() { 
  
  const [displayedComponent, setDisplayedComponent] = useState<JSX.Element>();


  return (
    <div className="App">
      <Suspense fallback={<h1>Loading...</h1>}>
        <button onClick={() => setDisplayedComponent(<TreeGenerator />)}>Christmas Tree Generator</button>
        <button onClick={() => setDisplayedComponent(<StackExercise />)}>Stack Exercise</button>
        <button onClick={() => setDisplayedComponent(<SnakeGame />)}>Snake</button>

        <div data-testid="component-container">
          {displayedComponent}
        </div>
      </Suspense>
    </div>
  );
}

export default App;
