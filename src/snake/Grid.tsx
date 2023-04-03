import * as React from "react";

export default function Grid({
    grid
}) {
    let rows : JSX.Element[] = [];
    for(let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
        let columns = grid[rowIndex].map((columnValue, columnIndex) => <span key={columnIndex}>{columnValue}</span>);

        rows.push(<div key={rowIndex}>{columns}</div>);
    }

return (
    <div title="GameBoard" style={{ display: "grid" }}>
        {rows}
    </div>
    );
}