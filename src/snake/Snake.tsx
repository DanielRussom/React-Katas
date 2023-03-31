import * as React from "react";

export const Snake = ({
    height = 5
}) => {

    let rows : JSX.Element[] = []
    
    for(let i = 0; i < height; i++){
        rows.push(<div key={i}><span>{i}</span></div>);
    }

    return (
        <>
            <style>{ }

            </style>
            <button>&lt;</button>
            <button>Move</button>
            <button>&gt;</button>

            <div title="GameBoard" style={{ display: "grid" }}>
                {rows}
            </div>
        </>
    )
}

export default Snake;