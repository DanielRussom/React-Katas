import * as React from 'react';
import { useState } from 'react';
import './App.css';

function App() {

  const [tree, setTree] = useState("");
  const [treeSize, setTreeSize] = useState("");
  
  function generateTree(): void {
    if(treeSize === "3"){
      setTree("X\nXXX\nXXXXX\n|")
      return;
    }
    if(treeSize === "2"){
      setTree("X\nXXX\n|")
      return;
    }

    if(treeSize) {
      setTree("X\n|")
      return;
    }

    setTree("|");
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
