// src/Grid.js
import React, {ReactElement, useEffect, useState} from 'react';


const Grid = () => {
    const gridSize = 100;
    const cellSize = 20; // Adjust the cell size as needed

    const [cells, setCells] = useState<ReactElement[]>()

    useEffect(() => {
        setCells(renderGrid())
    }, []);

    const renderGrid = () => {
        const cells = [];

        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                cells.push(
                    <div
                        key={`${i}-${j}`}
                        className="grid-cell"
                        style={{width: cellSize, height: cellSize}}
                        onClick={(event) => {
                            console.log(i, j)
                        }}
                    ></div>
                );
            }
        }

        return cells;
    };

    return (
        <div className="grid-container" style={{maxWidth: innerWidth}}>{cells}</div>
    );
}

export default Grid;
