import React, {useEffect, useRef, useState} from 'react';
import {Rect} from "react-konva";
import Konva from "konva";

export interface SquareProps {
    columnIndex: number;
    rowIndex: number;
    size: number;
    color: string;
}

const Square = (props: SquareProps) => {
    const ref = useRef(null);
    const [color, setColor] = useState(props.color)
    useEffect(() => {
        const rect: any = ref.current;
        console.log(rect?.isClientRectOnScreen())
    }, []);
    return (
        <Rect
            ref={ref}
            key={"" + props.columnIndex + props.rowIndex}
            x={props.columnIndex * props.size}
            y={props.rowIndex * props.size}
            width={props.size}
            height={props.size}
            stroke={`rgba(0, 0, 0, 0.1)`}
            strokeWidth={0.5}
            fill={color}
            onClick={() => {
                console.log(color)
                setColor('yellow')
            }}
        />
    );
};

export default Square;