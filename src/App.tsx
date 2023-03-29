import * as React from 'react';
import { useState } from 'react';
import './App.css';
import StackExercise from './stack-exercise/StackExercise';
import TreeGenerator from './tree-generator/TreeGenerator';
import Snake from './snake/Snake';

function App() {

  const [displayedComponent, setDisplayedComponent] = useState<JSX.Element>();

  return (
    <div className="App">
      <button onClick={() => setDisplayedComponent(<TreeGenerator/>)}>Christmas Tree Generator</button>
      <button onClick={() => setDisplayedComponent(<StackExercise/>)}>Stack Exercise</button>
      <button onClick={() => setDisplayedComponent(<Snake/>)}>Snake</button>

      <div data-testid="component-container">
        {displayedComponent}
      </div>

      <div className="testDiv">
        <p style={{gridColumn: 11, gridRow: 11}}>Test</p>

      </div>
    </div>
  );
}

export default App;
