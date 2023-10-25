import {FixedSizeGrid} from 'react-window';
import '../css/HomePage.css'
import * as React from "react";

const cellSize = 50; // Size of each grid cell
const gridSize = 1000; // Size of the grid

const initialData = Array.from({length: gridSize}, () =>
    Array.from({length: gridSize}, () => ('#ffffff'))
);

const VirtualGrid: React.FC = () => {

    const width = window.innerWidth - 200
    const getCellStyle = (rowIndex: number, columnIndex: number) => ({
        width: `${cellSize}px`,
        height: `${cellSize}px`,
        backgroundColor: initialData[rowIndex][columnIndex],
        border: '1px solid gray',
    });

    return (
        <div style={{marginLeft: 100, marginTop: 50}}>
            <FixedSizeGrid
                style={{border: '3px solid green'}}
                className={'no-scrollbars'}
                columnCount={gridSize}
                rowCount={gridSize}
                columnWidth={cellSize}
                rowHeight={cellSize}
                width={width}
                height={window.innerHeight}
            >
                {({columnIndex, rowIndex, style}) => (
                    <div style={{...style, ...getCellStyle(rowIndex, columnIndex)}}>
                    </div>
                )}
            </FixedSizeGrid>
        </div>
    );
};

export default VirtualGrid;
