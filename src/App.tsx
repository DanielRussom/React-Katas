import * as React from 'react';
import { useState } from 'react';
import './App.css';
import StackExercise from './stack-exercise/StackExercise';
import TreeGenerator from './tree-generator/TreeGenerator';
import SnakeGame from './snake/SnakeGame';

function App() {

  const [displayedComponent, setDisplayedComponent] = useState<JSX.Element>();

  return (
    <div className="App">
      <button onClick={() => setDisplayedComponent(<TreeGenerator/>)}>Christmas Tree Generator</button>
      <button onClick={() => setDisplayedComponent(<StackExercise/>)}>Stack Exercise</button>
      <button onClick={() => setDisplayedComponent(<SnakeGame/>)}>Snake</button>

      <div data-testid="component-container">
        {displayedComponent}
      </div>
    </div>
  );
}

export default App;
