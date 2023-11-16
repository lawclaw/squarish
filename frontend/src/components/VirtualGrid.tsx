import {FixedSizeGrid} from 'react-window';
import '../css/HomePage.css'
import * as React from "react";
import {useSocketStore} from "../store/socketStore.ts";
import {Skeleton} from "@mui/material";
import {AutoSizer} from "react-virtualized";
import {useColorStore} from "../store/colorStore.ts";

const cellSize = 50; // Size of each grid cell
const gridSize = 1000; // Size of the grid


const VirtualGrid: React.FC = () => {

    const grid = useSocketStore((state) => state.grid)
    const actions = useSocketStore(state => state.actions)
    const selectedColor = useColorStore(state => state.selectedColor)

    const getCellStyle = (rowIndex: number, columnIndex: number) => ({
        width: `${cellSize}px`,
        height: `${cellSize}px`,
        backgroundColor: grid[rowIndex][columnIndex],
        border: '1px solid gray'
    })

    return (
        <div style={{height: '100vh', flex: '1'}}>
            <AutoSizer>
                {({ height, width}) => (
                    grid.length !== 0 ?
                        (<FixedSizeGrid
                            className={'no-scrollbars'}
                            columnCount={gridSize}
                            rowCount={gridSize}
                            columnWidth={cellSize}
                            rowHeight={cellSize}
                            width={width}
                            height={height}
                        >
                            {({columnIndex, rowIndex, style}) => (
                                <>
                                    <div style={{...style, ...getCellStyle(rowIndex, columnIndex)}} onClick={() => {
                                        actions.changeColorLocal(rowIndex, columnIndex, selectedColor)
                                        actions.changeColorGlobal(rowIndex, columnIndex, selectedColor)
                                    }}>
                                    </div>
                                </>
                            )}
                        </FixedSizeGrid>) : (
                            <Skeleton animation={'wave'} variant="rectangular" width={width}
                                      height={height}/>)
                )}


            </AutoSizer>

        </div>

    );
};

export default VirtualGrid;
