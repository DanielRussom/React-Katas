import * as React from "react";

export const Snake = ({
    height = 5
}) => {

    let rows : JSX.Element[] = [
            <div></div>,
            <div></div>,
            <div></div>,
            <div></div>,
            <div></div>,
        ]
    
    if (height < 5) {
        rows = [<div />]
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