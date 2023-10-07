import React, {ReactElement, useEffect, useState} from "react";
import {TransformComponent, TransformWrapper,} from "react-zoom-pan-pinch";

const TestZoom = () => {
    const gridSize = 100;
    const cellSize = 20; // Adjust the cell size as needed

    const [cells, setCells] = useState<ReactElement[]>()

    useEffect(() => {
        setCells(renderGrid())
    }, []);

    const renderGrid = () => {
        const cells = [];

        for (let i = 0; i < gridSize; i++) {
            const row = []
            for (let j = 0; j < gridSize; j++) {
                row.push(
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
            cells.push(row)
        }
        console.log(cells)
        return cells;
    };

    return (

        <TransformWrapper minScale={0.3} centerOnInit={true} centerZoomedOut={true} initialScale={0.5}>
            <TransformComponent wrapperStyle={{
                maxWidth: innerWidth,
                maxHeight: innerHeight - 264,
                backgroundColor: '#856767'
            }}>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${gridSize}, 1fr)`
                }}>
                    {cells}
                </div>

            </TransformComponent>
        </TransformWrapper>
    )

};

export default TestZoom;