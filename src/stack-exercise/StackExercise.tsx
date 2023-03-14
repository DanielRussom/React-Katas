import * as React from 'react';
import { useEffect, useState } from 'react';

function StackExercise() {
    const [sizeMessage, setSizeMessage] = useState("");
    const [timesPushed, setTimesPushed] = useState(0);

    function pushValue() : void {
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
        <input placeholder='New value'/>
        <button onClick={pushValue}>Push</button>
        <button>Peek</button>
        <p>{sizeMessage}</p>
        <p>The top of the stack is testValue</p>
    </React.Fragment>
);
}

export default StackExercise;
