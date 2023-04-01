import * as React from "react";

export const Snake = ({
    height = 5,
    width = 5,
}) => {

    let rows : JSX.Element[] = []
    
    for(let i = 0; i < height; i++){
        let columns : JSX.Element[] = []
        
        for(let j = 0; j < width; j++){
            if(i === 2 && j === 2){
                columns.push(<span key={j}>Snake</span>)
                continue;
            }
<<<<<<< HEAD
            columns.push(<span key={j}>{j}</span>)
=======
            columns.push(<span key={j}>j</span>)
>>>>>>> 678e01b0328ad4581fdd0a257f327be29f88b2fe
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