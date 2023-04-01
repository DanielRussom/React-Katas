import * as React from "react";

export const Snake = ({
    height = 5,
    width = 1,
}) => {

    let rows : JSX.Element[] = []
    
    for(let i = 0; i < height; i++){
        var columns = [<span>{i}</span>]

        if(width === 2){
            columns.push(<span>{i+1}</span>)
        }

        rows.push(<div key={i}>
            {columns}
        </div>);
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