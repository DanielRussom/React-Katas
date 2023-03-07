import * as React from 'react';
import { useState } from 'react';
import './App.css';

function App() {

  const [tree, setTree] = useState("");
  const [treeSize, setTreeSize] = useState("");
  
  function generateTree(): void {
    const treeInt = Number(treeSize);

    let treeOutput = "";
    for(let i = 1; i <= treeInt; i++){
      treeOutput += "X".repeat((i * 2) - 1);
      treeOutput += "\n";
    }

    treeOutput += "|"
    setTree(treeOutput);
  }

  return (
    <div className="App">
      <button>Christmas Tree Generator</button>

      <div data-testid="component-container"></div>
    </div>
  );
}

export default App;
