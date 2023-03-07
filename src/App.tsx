import * as React from 'react';
import { useState } from 'react';
import './App.css';
import TreeGenerator from './tree-generator/TreeGenerator';

function App() {

  const [showTreeGenerator, setshowTreeGenerator] = useState(false);

  return (
    <div className="App">
      <button onClick={() => setshowTreeGenerator(true)}>Christmas Tree Generator</button>

      <div data-testid="component-container">
        {(showTreeGenerator) ? <TreeGenerator data-testid="tree-generator"/> : null}
      </div>
    </div>
  );
}

export default App;
