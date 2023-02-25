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
      <label htmlFor="treeSize-input">Tree Size:</label>
      <input id="treeSize-input" value={treeSize} onChange={e => setTreeSize(e.target.value)}/>
      <button onClick={() => generateTree()} >Generate Tree</button>
      <p role="paragraph" id="treeDisplay" style= {{ whiteSpace: "pre-line"}}>{tree}</p>
    </div>
  );
}

export default App;
