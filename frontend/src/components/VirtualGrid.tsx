import {FixedSizeGrid} from 'react-window';
import '../css/HomePage.css'
import * as React from "react";
import {useSocketStore} from "../store/socketStore.ts";
import {Skeleton} from "@mui/material";

const cellSize = 50; // Size of each grid cell
const gridSize = 1000; // Size of the grid


const VirtualGrid: React.FC = () => {
    const width = window.innerWidth - 200

    const grid = useSocketStore((state) => state.grid)
    const actions = useSocketStore(state => state.actions)

    const getCellStyle = (rowIndex: number, columnIndex: number) => ({
        width: `${cellSize}px`,
        height: `${cellSize}px`,
        backgroundColor: grid[rowIndex][columnIndex],
        border: '1px solid gray'
    })

    return (
        <div style={{marginLeft: 100, marginTop: 50}}>
            {
                grid.length !== 0 ?
                    (<FixedSizeGrid
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
                            <>
                                <div style={{...style, ...getCellStyle(rowIndex, columnIndex)}} onClick={() => {
                                    actions.changeColorLocal(rowIndex, columnIndex, '#ff0013')
                                    actions.changeColorGlobal(rowIndex, columnIndex, '#ff0013')
                                }}>
                                </div>
                            </>
                        )}
                    </FixedSizeGrid>) : (
                        <Skeleton animation={'wave'} variant="rectangular" width={width} height={window.innerHeight}/>)}
        </div>

    );
};

export default VirtualGrid;
