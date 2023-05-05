import * as React from 'react';
import { useEffect, useState } from 'react';

function StackExercise() {
    const [sizeMessage, setSizeMessage] = useState("");
    const [newValue, setNewValue] = useState("");
    const [storedValues, setStoredValues] = useState<string[]>([])

    function pushValue() : void {
        if(newValue === ""){
            return;
        }
        setStoredValues((previousValues) => [ newValue, ...previousValues]);
        setNewValue("");
    }

    function popValue() : void {
       setStoredValues(storedValues.slice(1));
    }

    useEffect(() => {
        if(storedValues.length === 0){
            setSizeMessage(`The stack is empty`);
            return;
        }
        setSizeMessage(`Size: ${storedValues.length}`);
    }, [storedValues])

    return (
    <React.Fragment>
        <div style={{display: "none"}}>
            <p>thing</p>
        </div>

        <p>Stack:</p>
        <input placeholder='New value' value={newValue} onChange={e => setNewValue(e.target.value)}/>
        <button onClick={pushValue}>Push</button>
        <button onClick={popValue}>Pop</button>
        <p>{sizeMessage}</p>
        {(storedValues[0]) ? <p>The top of the stack is: {storedValues[0]}</p> : null }
    </React.Fragment>
);
}

export default StackExercise;
