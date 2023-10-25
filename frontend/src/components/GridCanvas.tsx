import React from 'react';
import {Layer, Rect, Stage} from 'react-konva';

interface GridCanvasProps {
    grid: string[][];
    cellSize: number;
    borderSize: number;
    width: number;
    height: number;
}

const GridCanvas: React.FC<GridCanvasProps> = ({grid, cellSize, borderSize, width, height}) => {
    return (
        <Stage draggable={true} width={width} height={height} style={{marginLeft: (innerWidth - width) / 2}}>
            <Layer>
                {grid.map((row, rowIndex) =>
                    row.map((color, colIndex) => (
                        <Rect
                            key={`${rowIndex}-${colIndex}`}
                            x={colIndex * (cellSize + borderSize)}
                            y={rowIndex * (cellSize + borderSize)}
                            width={cellSize}
                            height={cellSize}
                            fill={color}
                            stroke="grey"
                            strokeWidth={borderSize}
                            onClick={() => console.log(`Clicked square at row: ${rowIndex}, col: ${colIndex}`)}
                        />
                    ))
                )}
            </Layer>
        </Stage>
    );
};

export default GridCanvas;
