import * as React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <label htmlFor="treeSize-input">Tree Size:</label>
      <input id="treeSize-input"/>
      <button>Generate Tree</button>
      <p>|</p>
    </div>
  );
}

export default App;
