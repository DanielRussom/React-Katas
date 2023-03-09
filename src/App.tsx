import * as React from 'react';
import { useState } from 'react';
import './App.css';
import TreeGenerator from './tree-generator/TreeGenerator';

function App() {

  const [showTreeGenerator, setShowTreeGenerator] = useState(false);
  const [showStackExercise, setShowStackExercise] = useState(false);

  return (
    <div className="App">
      <button onClick={() => setShowTreeGenerator(!showTreeGenerator)}>Christmas Tree Generator</button>
      <button onClick={() => setShowStackExercise(!showStackExercise)}>Stack Exercise</button>

      <div data-testid="component-container">
        {(showTreeGenerator) ? <TreeGenerator data-testid="tree-generator"/> : null}
        {(showStackExercise) ? <p>Stack:</p> : null}
      </div>
    </div>
  );
}

export default App;
