import * as React from "react";
import {CSSProperties} from "react";
import {FixedSizeGrid} from 'react-window';
import {SquareChange, useSocketStore} from "../store/socketStore.ts";
import {Box, Skeleton} from "@mui/material";
import {AutoSizer} from "react-virtualized";
import {useColorStore} from "../store/colorStore.ts";
import '../css/HomePage.css'

const gridSize = 1000; // Size of the grid
const cellSize = 20;
export interface GridSquareProps {
    rowIndex: number;
    columnIndex: number;
    color: string;
    style: CSSProperties;
}


const GridSquare = (props: GridSquareProps) => {
    const selectedColor = useColorStore(state => state.selectedColor)
    const setSelectedColor = useColorStore(state => state.setSelectedColor);
    const actions = useSocketStore(state => state.actions)

    const getCellStyle = React.useMemo(
        () => () => ({
            width: `${cellSize}px`,
            height: `${cellSize}px`,
            backgroundColor: props.color,
            border: '1px solid gray',
        }),
        [props.color]
    );
    const getHoverActiveStyle = React.useMemo(
        () => () => ({
            '&:hover': {
                boxShadow: '5px 5px 20px 0px rgba(32,70,158,0.3) inset'
            },
            '&:active': {
                boxShadow: '5px 5px 20px 0px rgba(32,70,158,1) inset'
            },
        }),
        []
    );
    return (
        <Box
            sx={[getHoverActiveStyle()]}
            style={{...props.style, ...getCellStyle()}}
            onClick={() => {
                if (props.color !== selectedColor) {
                    const change: SquareChange = {
                        row: props.rowIndex,
                        col: props.columnIndex,
                        color: selectedColor
                    }
                    actions.changeColorLocal(change)
                    actions.changeColorGlobal(change)
                }
            }}
            onContextMenu={(e) => {
                e.preventDefault()
                console.log('right')
                if (props.color !== selectedColor) {
                    setSelectedColor(props.color)
                }
            }}
        />
    );
}

const VirtualGrid: React.FC = () => {
    const grid = useSocketStore((state) => state.grid)
    //const setCoordinates = useCoordinatesStore(state => state.setCoordinates)

    return (
        <div style={{height: '89vh', flex: '1'}}>
            <AutoSizer>
                {({height, width}) => (
                    grid.length !== 0 ?
                        (<FixedSizeGrid
                            //className={'no-scrollbars'}
                            columnCount={gridSize}
                            rowCount={gridSize}
                            columnWidth={cellSize}
                            rowHeight={cellSize}
                            width={width}
                            height={height}
                        >
                            {({columnIndex, rowIndex, style}) => (
                                <GridSquare rowIndex={rowIndex} columnIndex={columnIndex}
                                            color={grid[rowIndex][columnIndex]} style={style}/>
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
