import * as React from 'react';
import { useEffect, useState } from 'react';

function StackExercise() {
    const [sizeMessage, setSizeMessage] = useState("");
    const [timesPushed, setTimesPushed] = useState(0);
    const [newValue, setNewValue] = useState("");
    const [pushedValue, setPushedValue] = useState("");

    function pushValue() : void {
        setPushedValue(newValue);
        setNewValue("");
        setTimesPushed(timesPushed + 1); // 0 => 1
    }

    useEffect(() => {
        if(timesPushed === 0){
            setSizeMessage(`The stack is empty`);
            return;
        }
        setSizeMessage(`Size: ${timesPushed}`);
    }, [timesPushed])

    return (
    <React.Fragment>
        <p>Stack:</p>
        <input placeholder='New value' value={newValue} onChange={e => setNewValue(e.target.value)}/>
        <button onClick={pushValue}>Push</button>
        <button>Peek</button>
        <p>{sizeMessage}</p>
        <p>The top of the stack is {pushedValue}</p>
    </React.Fragment>
);
}

export default StackExercise;
