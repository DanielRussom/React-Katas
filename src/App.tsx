import * as React from 'react';
import { useState } from 'react';
import './App.css';

function App() {

  const [tree, setTree] = useState("");
  const [treeSize, setTreeSize] = useState("");
  
  function generateTree(): void {
    if(treeSize) {
      setTree("X\n|")
      return;
    }

    setTree("|");
  }

  return (
    <div className="App">
      <p role="paragraph" id="treeDisplay" 
      style= {{ whiteSpace: "pre-line"}}
      >{tree}</p>
      <label htmlFor="treeSize-input">Tree Size:</label>
      <input id="treeSize-input" value={treeSize} onChange={e => setTreeSize(e.target.value)}/>
      <button onClick={() => generateTree()} >Generate Tree</button>
    </div>
  );
}

export default App;
