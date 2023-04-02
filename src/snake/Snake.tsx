import * as React from "react";

export const Snake = ({
    height = 5,
    width = 5,
}) => {

    let rows : JSX.Element[] = []
    
    for(let i = 0; i < height; i++){
        let columns : JSX.Element[] = []
        let middleColumn = Math.round(width/2) - 1;
        let middleRow = Math.round(height/2) - 1;

        for(let j = 0; j < width; j++){
            if(i === middleRow && j === middleColumn){
                columns.push(<span key={j}>Snake</span>)
                continue;
            }
            columns.push(<span key={j}>{j}</span>)
        }

        rows.push(<div key={i}>{columns}</div>);
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