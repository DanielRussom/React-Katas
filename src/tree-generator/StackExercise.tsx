import * as React from 'react';
import { useState } from 'react';

function StackExercise() {
    const [sizeMessage, setSizeMessage] = useState("The stack is empty");

    function pushValue() : void {
        setSizeMessage("");
    }

    return (
    <React.Fragment>
        <p>Stack:</p>
        <input placeholder='New value'/>
        <button onClick={pushValue}>Push</button>
        <p>{sizeMessage}</p>
    </React.Fragment>
);
}

export default StackExercise;
