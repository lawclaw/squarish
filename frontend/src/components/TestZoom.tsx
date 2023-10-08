import React, {useEffect, useState} from "react";
import {TransformComponent, TransformWrapper,} from "react-zoom-pan-pinch";
import {Layer, Rect, Stage} from "react-konva";

const TestZoom = () => {
    const gridSize = 100;
    const cellSize = 20; // Adjust the cell size as needed

    const [cells, setCells] = useState<string[][]>()
    useEffect(() => {
        setCells(generateGrid())
    }, []);

    const generateGrid = () => {
        return Array.from(Array(gridSize), _ => Array(gridSize).fill('#ffffff'));
    }

    return (

        <TransformWrapper minScale={0.5} centerOnInit={true}>
            <TransformComponent wrapperStyle={{
                width: "fit-content",
                maxWidth: innerWidth,
                backgroundColor: '#856767'
            }}>

                <Stage width={1000} height={1000} style={{border: '1px solid black'}}>
                    <Layer>
                        {
                            cells && cells.map((cellRow, rowIndex) => {
                                return cellRow.map((cell, columnIndex) => {
                                    return (
                                        <Rect
                                            key={(rowIndex + 1) * (columnIndex + 1)}
                                            x={columnIndex * 20}
                                            y={rowIndex * 20}
                                            width={40}
                                            height={40}
                                            stroke={`rgba(0, 0, 0, 0.1)`}
                                            strokeWidth={0.5}
                                            fill={cell}
                                            onClick={() => {
                                                console.log(rowIndex, columnIndex)
                                            }}
                                        />
                                    )
                                })
                            })
                        }
                    </Layer>
                </Stage>
            </TransformComponent>
        </TransformWrapper>
    )

};

export default TestZoom;