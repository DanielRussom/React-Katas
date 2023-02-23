import * as React from 'react';
import { useState } from 'react';
import './App.css';

function App() {

  const [tree, setTree] = useState("");
  
  function generateTree(): void {
    setTree("|");
  }

  return (
    <div className="App">
      <p id="treeDisplay">{tree}</p>
      <label htmlFor="treeSize-input">Tree Size:</label>
      <input id="treeSize-input"/>
      <button onClick={() => generateTree()} >Generate Tree</button>
    </div>
  );
}

export default App;
